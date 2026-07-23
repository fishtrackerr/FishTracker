import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  standalone: true,
  template: `<h1 class="app-title">{{ title }}</h1>`,
})
export class PageTitleComponent {
  @Input({ required: true }) title!: string;
}
