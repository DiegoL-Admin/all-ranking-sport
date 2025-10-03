import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService, Notification } from '../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  currentNotification: Notification | null = null;
  private notificationSubscription: Subscription | undefined;
  private timeoutId: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationSubscription = this.notificationService.getNotification().subscribe(notification => {
      this.currentNotification = notification;
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(() => {
        this.currentNotification = null;
      }, 3000); // Hide after 3 seconds
    });
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  closeNotification(): void {
    this.currentNotification = null;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}