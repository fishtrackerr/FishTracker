import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter, startWith } from 'rxjs';
import { ConnectivityService } from '../../core/services/connectivity.service';
import { FeedbackPromptService } from '../../core/services/feedback-prompt.service';
import { FishingModeService } from '../../core/services/fishing-mode.service';
import { PrivacyWelcomeService } from '../../core/services/privacy-welcome.service';
import { SessionService } from '../../core/services/session.service';
import { ShareService } from '../../core/services/share.service';
import { WhatsNewService } from '../../core/services/whats-new.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    TranslatePipe,
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent implements AfterViewInit {
  readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sessionService = inject(SessionService);
  private readonly fishingMode = inject(FishingModeService);
  private readonly connectivity = inject(ConnectivityService);
  private readonly share = inject(ShareService);
  private readonly privacyWelcome = inject(PrivacyWelcomeService);
  private readonly whatsNew = inject(WhatsNewService);
  private readonly feedbackPrompt = inject(FeedbackPromptService);

  @ViewChild('content', { static: true })
  private contentRef?: ElementRef<HTMLElement>;

  readonly activeSession = toSignal(this.sessionService.watchActive(), {
    initialValue: undefined,
  });

  readonly currentMode = this.fishingMode.selectedMode;
  readonly moreMenuOpen = signal(false);

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
    void this.privacyWelcome
      .maybeShow()
      .then(() => this.whatsNew.maybeShow())
      .then(() => this.feedbackPrompt.maybeShow());
  }

  dismissOfflineBanner(): void {
    this.bannerDismissed.set(true);
  }

  toggleMoreMenu(event: Event): void {
    event.stopPropagation();
    this.moreMenuOpen.update((open) => !open);
  }

  closeMoreMenu(): void {
    this.moreMenuOpen.set(false);
  }

  shareViaWhatsApp(): void {
    this.closeMoreMenu();
    this.share.shareAppViaWhatsApp();
  }

  isMoreRouteActive(): boolean {
    const url = this.router.url.split('?')[0];
    return (
      url.startsWith('/gallery') ||
      url.startsWith('/statistics') ||
      url.startsWith('/settings') ||
      url.startsWith('/assistant') ||
      url.startsWith('/profile') ||
      url.startsWith('/release-notes') ||
      url.startsWith('/privacy')
    );
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMoreMenu();
  }

  ngAfterViewInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.closeMoreMenu();
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
