import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FishingSession } from '../models';
import { DialogService } from './dialog.service';
import { SessionService } from './session.service';
import { LegacyRodSetupDialogComponent } from '../../features/sessions/legacy-rod-setup-dialog.component';

@Injectable({ providedIn: 'root' })
export class RodSetupFlowService {
  private readonly dialog = inject(DialogService);
  private readonly sessionService = inject(SessionService);

  async promptAfterSessionCreate(session: FishingSession): Promise<FishingSession> {
    const ref = this.dialog.open(LegacyRodSetupDialogComponent, {
      width: '100%',
      maxWidth: '420px',
      disableClose: false,
      data: { session, isNewSession: true },
    });
    await firstValueFrom(ref.afterClosed());
    return (await this.sessionService.getById(session.id)) ?? session;
  }
}
