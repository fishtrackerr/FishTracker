import { Routes } from '@angular/router';
import { pinLockGuard } from './core/guards/pin-lock.guard';
import { activeSessionGuard } from './core/guards/active-session.guard';
import { pinSetupGuard } from './core/guards/pin-setup.guard';
import { pinUnlockGuard } from './core/guards/pin-unlock.guard';

export const routes: Routes = [
  {
    path: 'pin/setup',
    loadComponent: () =>
      import('./features/pin-setup/pin-setup.component').then((m) => m.PinSetupComponent),
    canActivate: [pinSetupGuard],
  },
  {
    path: 'pin/unlock',
    loadComponent: () =>
      import('./features/pin-unlock/pin-unlock.component').then((m) => m.PinUnlockComponent),
    canActivate: [pinUnlockGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/shell/shell.component').then((m) => m.ShellComponent),
    canActivate: [pinLockGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'sessions',
        loadComponent: () =>
          import('./features/sessions/sessions-list.component').then((m) => m.SessionsListComponent),
      },
      {
        path: 'sessions/active',
        loadComponent: () =>
          import('./features/active-session/active-session.component').then(
            (m) => m.ActiveSessionComponent,
          ),
        canActivate: [activeSessionGuard],
      },
      {
        path: 'sessions/:id/edit',
        loadComponent: () =>
          import('./features/sessions/session-edit.component').then((m) => m.SessionEditComponent),
      },
      {
        path: 'sessions/:id/catches/new',
        loadComponent: () =>
          import('./features/catches/catch-form.component').then((m) => m.CatchFormComponent),
      },
      {
        path: 'sessions/:id',
        loadComponent: () =>
          import('./features/sessions/session-detail.component').then((m) => m.SessionDetailComponent),
      },
      {
        path: 'lakes',
        loadComponent: () =>
          import('./features/lakes/lakes-list.component').then((m) => m.LakesListComponent),
      },
      {
        path: 'lakes/:id',
        loadComponent: () =>
          import('./features/lakes/lake-detail.component').then((m) => m.LakeDetailComponent),
      },
      {
        path: 'gallery',
        loadComponent: () =>
          import('./features/gallery/gallery.component').then((m) => m.GalleryComponent),
      },
      {
        path: 'statistics',
        loadComponent: () =>
          import('./features/statistics/statistics.component').then((m) => m.StatisticsComponent),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./features/settings/settings.component').then((m) => m.SettingsComponent),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/profile/profile.component').then((m) => m.ProfileComponent),
      },
      {
        path: 'profile/documents',
        loadComponent: () =>
          import('./features/profile/profile-documents.component').then(
            (m) => m.ProfileDocumentsComponent,
          ),
      },
      {
        path: 'release-notes',
        loadComponent: () =>
          import('./features/release-notes/release-notes.component').then(
            (m) => m.ReleaseNotesComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
