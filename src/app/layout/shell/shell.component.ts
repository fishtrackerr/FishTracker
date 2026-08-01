import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { filter, startWith } from 'rxjs';
import { ConnectivityService } from '../../core/services/connectivity.service';
import { SessionService } from '../../core/services/session.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    TranslatePipe,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent implements AfterViewInit {
  readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sessionService = inject(SessionService);
  private readonly connectivity = inject(ConnectivityService);

  @ViewChild('content', { static: true })
  private contentRef?: ElementRef<HTMLElement>;

  readonly activeSession = toSignal(this.sessionService.watchActive(), {
    initialValue: undefined,
  });

  private readonly bannerDismissed = signal(false);

  readonly showOfflineBanner = computed(
    () => !this.connectivity.isOnline() && !this.bannerDismissed(),
  );

  constructor() {
    effect(() => {
      if (this.connectivity.isOnline()) {
        this.bannerDismissed.set(false);
      }
    });
  }

  dismissOfflineBanner(): void {
    this.bannerDismissed.set(true);
  }

  isMoreRouteActive(): boolean {
    const url = this.router.url.split('?')[0];
    return (
      url.startsWith('/gallery') ||
      url.startsWith('/statistics') ||
      url.startsWith('/settings') ||
      url.startsWith('/assistant') ||
      url.startsWith('/profile') ||
      url.startsWith('/release-notes')
    );
  }

  ngAfterViewInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        const content = this.contentRef?.nativeElement;
        if (!content) {
          return;
        }
        if (typeof content.scrollTo === 'function') {
          content.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        } else {
          content.scrollTop = 0;
        }
        content.focus({ preventScroll: true });
      });
  }
}
