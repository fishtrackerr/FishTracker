import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { DialogService } from './dialog.service';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private readonly dialog = inject(DialogService);

  async confirmDelete(title: string, itemName?: string, message?: string): Promise<boolean> {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { title, itemName, message } satisfies ConfirmDialogData,
    });
    return (await firstValueFrom(ref.afterClosed())) === true;
  }

  async confirm(data: ConfirmDialogData): Promise<boolean> {
    const ref = this.dialog.open(ConfirmDialogComponent, { data });
    return (await firstValueFrom(ref.afterClosed())) === true;
  }
}
