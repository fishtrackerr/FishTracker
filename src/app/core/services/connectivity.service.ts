import { Injectable, OnDestroy, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/** Tracks browser online/offline state for waterside resilience UX. */
@Injectable({ providedIn: 'root' })
export class ConnectivityService implements OnDestroy {
  private readonly onlineSignal = signal(readNavigatorOnline());
  private readonly onlineSubject = new BehaviorSubject<boolean>(this.onlineSignal());

  /** Current connectivity — based on `navigator.onLine` + window events. */
  readonly isOnline = this.onlineSignal.asReadonly();

  /** Observable mirror of {@link isOnline} for RxJS subscribers. */
  readonly online$: Observable<boolean> = this.onlineSubject.asObservable();

  private readonly onOnline = (): void => this.setOnline(true);
  private readonly onOffline = (): void => this.setOnline(false);

  constructor() {
    if (typeof window === 'undefined') {
      return;
    }
    window.addEventListener('online', this.onOnline);
    window.addEventListener('offline', this.onOffline);
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') {
      return;
    }
    window.removeEventListener('online', this.onOnline);
    window.removeEventListener('offline', this.onOffline);
    this.onlineSubject.complete();
  }

  private setOnline(online: boolean): void {
    this.onlineSignal.set(online);
    this.onlineSubject.next(online);
  }
}

/** Shared fallback when ConnectivityService is not injected (e.g. unit tests). */
export function readNavigatorOnline(): boolean {
  return typeof navigator === 'undefined' || navigator.onLine !== false;
}
