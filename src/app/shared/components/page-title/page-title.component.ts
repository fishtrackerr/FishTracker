import { Component, Input } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [TranslatePipe],
  template: `<h1 class="app-title">{{ title | tr }}</h1>`,
})
export class PageTitleComponent {
  @Input({ required: true }) title!: string;
}
