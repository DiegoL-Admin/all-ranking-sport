import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

interface ChatMessage {
  sender: 'user' | 'ai';
  message: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, OnDestroy {

  isChatOpen: boolean = false;
  userMessage: string = '';
  messages: ChatMessage[] = [];
  isLoggedIn: boolean = false;
  private authSubscription: Subscription | undefined;

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    // A more robust way to track login status would be to use an observable from AuthService
    // For this prototype, we'll check on init and assume it doesn't change during chat session
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage(): void {
    if (this.userMessage.trim() === '') {
      return;
    }

    const messageToSend = this.userMessage;
    this.messages.push({ sender: 'user', message: messageToSend });
    this.userMessage = ''; // Clear input

    if (!this.isLoggedIn) {
      this.messages.push({ sender: 'ai', message: 'Please log in to chat with the AI assistant.' });
      return;
    }

    this.chatService.sendMessage(messageToSend).subscribe({
      next: (response) => {
        this.messages.push({ sender: 'ai', message: response.response });
      },
      error: (err) => {
        console.error('Error sending message to AI:', err);
        this.messages.push({ sender: 'ai', message: 'Sorry, I am having trouble connecting to the AI assistant. Please try again later.' });
      }
    });
  }
}