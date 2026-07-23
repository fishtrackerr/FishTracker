import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProfileDocumentRepository } from '../../core/services/profile-document.repository';
import { ConfirmService } from '../../core/services/confirm.service';
import { NotificationService } from '../../core/services/notification.service';
import { ImagePickerComponent } from '../../shared/components/image-picker/image-picker.component';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-profile-documents',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    PageTitleComponent,
    SearchBarComponent,
    ImagePickerComponent,
  ],
  templateUrl: './profile-documents.component.html',
  styleUrl: './profile-documents.component.css',
})
export class ProfileDocumentsComponent {
  private readonly docRepo = inject(ProfileDocumentRepository);
  private readonly confirm = inject(ConfirmService);
  private readonly notifications = inject(NotificationService);

  readonly documents = toSignal(this.docRepo.watchAll(), { initialValue: [] });
  readonly searchQuery = signal('');
  readonly typeFilter = signal('');
  readonly editingId = signal<string | null>(null);

  title = '';
  type = 'license';
  description = '';
  expiryDate = '';
  activeDocId = '';

  readonly documentTypes = [
    'license',
    'permit',
    'membership',
    'identification',
    'insurance',
    'lake-permit',
    'other',
  ];

  filteredDocs() {
    let docs = this.documents();
    const q = this.searchQuery().toLowerCase();
    const type = this.typeFilter();
    if (q) {
      docs = docs.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description?.toLowerCase().includes(q) ||
          d.type.includes(q),
      );
    }
    if (type) {
      docs = docs.filter((d) => d.type === type);
    }
    return docs;
  }

  isExpiringSoon(expiryDate?: string): boolean {
    if (!expiryDate) return false;
    const days = (new Date(expiryDate).getTime() - Date.now()) / 86400000;
    return days >= 0 && days <= 30;
  }

  isExpired(expiryDate?: string): boolean {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
  }

  startAdd(): void {
    this.editingId.set('new');
    this.title = '';
    this.type = 'license';
    this.description = '';
    this.expiryDate = '';
    this.activeDocId = '';
  }

  editDoc(id: string): void {
    const doc = this.documents().find((d) => d.id === id);
    if (!doc) return;
    this.editingId.set(id);
    this.title = doc.title;
    this.type = doc.type;
    this.description = doc.description ?? '';
    this.expiryDate = doc.expiryDate ?? '';
    this.activeDocId = id;
  }

  cancelEdit(): void {
    this.editingId.set(null);
  }

  async saveDoc(): Promise<void> {
    if (!this.title.trim()) {
      this.notifications.error('Title is required');
      return;
    }
    const id = this.editingId();
    if (id === 'new') {
      await this.docRepo.create({
        title: this.title.trim(),
        type: this.type,
        description: this.description || undefined,
        expiryDate: this.expiryDate || undefined,
      });
    } else if (id) {
      const existing = await this.docRepo.getById(id);
      if (existing) {
        await this.docRepo.put({
          ...existing,
          title: this.title.trim(),
          type: this.type,
          description: this.description || undefined,
          expiryDate: this.expiryDate || undefined,
          updatedAt: new Date().toISOString(),
        });
      }
    }
    this.notifications.success('Document saved');
    this.editingId.set(null);
  }

  async deleteDoc(id: string, title: string): Promise<void> {
    const ok = await this.confirm.confirmDelete('Delete document?', title);
    if (ok) {
      await this.docRepo.delete(id);
      this.notifications.success('Document deleted');
    }
  }

  async onImageUploaded(imageId: string): Promise<void> {
    const docId = this.activeDocId || this.editingId();
    if (!docId || docId === 'new') {
      this.notifications.error('Save the document first');
      return;
    }
    const doc = await this.docRepo.getById(docId);
    if (doc) {
      await this.docRepo.put({
        ...doc,
        imageIds: [...doc.imageIds, imageId],
        updatedAt: new Date().toISOString(),
      });
      this.notifications.success('Image added to document');
    }
  }
}
