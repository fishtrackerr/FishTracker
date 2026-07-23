import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LakeService } from '../../core/services/lake.service';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { ImageThumbComponent } from '../../shared/components/image-thumb/image-thumb.component';

@Component({
  selector: 'app-lakes-list',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    EmptyStateComponent,
    PageTitleComponent,
    ImageThumbComponent,
  ],
  templateUrl: './lakes-list.component.html',
  styleUrl: './lakes-list.component.css',
})
export class LakesListComponent {
  private readonly lakeService = inject(LakeService);
  private readonly router = inject(Router);

  readonly lakes = toSignal(this.lakeService.watchAll(), { initialValue: [] });

  get sortedLakes() {
    return this.lakeService.getSortedLakes(this.lakes());
  }

  async addLake(): Promise<void> {
    const lake = await this.lakeService.create({ name: 'New Lake' });
    await this.router.navigate(['/lakes', lake.id]);
  }

  async toggleFavorite(event: Event, id: string): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    await this.lakeService.toggleFavorite(id);
  }
}
