import { AfterViewInit, Component, DestroyRef, ElementRef, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { filter, startWith } from 'rxjs';
import { SessionService } from '../../core/services/session.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, TranslatePipe],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent implements AfterViewInit {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sessionService = inject(SessionService);

  @ViewChild('content', { static: true })
  private contentRef?: ElementRef<HTMLElement>;

  readonly activeSession = toSignal(this.sessionService.watchActive(), {
    initialValue: undefined,
  });

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
