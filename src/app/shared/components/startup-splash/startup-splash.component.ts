import { Component } from '@angular/core';

@Component({
  selector: 'app-startup-splash',
  standalone: true,
  template: `
    <div class="splash" role="status" aria-live="polite" aria-label="Loading application">
      <div class="logo">🎣</div>
      <p class="label">Fishing Register</p>
      <div class="spinner" aria-hidden="true"></div>
    </div>
  `,
  styles: `
    .splash {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100dvh;
      background: var(--background-primary, #0b0b0b);
      color: var(--text-primary, #fff);
      gap: 12px;
    }
    .logo {
      font-size: 3rem;
    }
    .label {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--primary, #ff6b00);
      margin: 0;
    }
    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid var(--border-primary, #333);
      border-top-color: var(--primary, #ff6b00);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-top: 8px;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `,
})
export class StartupSplashComponent {}
