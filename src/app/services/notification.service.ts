import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();

  constructor() { }

  getNotification(): Observable<Notification> {
    return this.notificationSubject.asObservable();
  }

  showSuccess(message: string): void {
    this.notificationSubject.next({ message, type: 'success' });
  }

  showError(message: string): void {
    this.notificationSubject.next({ message, type: 'error' });
  }

  showInfo(message: string): void {
    this.notificationSubject.next({ message, type: 'info' });
  }

  showWarning(message: string): void {
    this.notificationSubject.next({ message, type: 'warning' });
  }
}