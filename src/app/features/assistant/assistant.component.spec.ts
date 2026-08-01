import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ChatService } from '../../core/services/chat.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { I18nService } from '../../core/services/i18n.service';
import { LlmService } from '../../core/services/llm.service';
import { AssistantComponent } from './assistant.component';

describe('AssistantComponent', () => {
  let fixture: ComponentFixture<AssistantComponent>;
  const language = signal('en');
  const dictionary = signal({});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistantComponent],
      providers: [
        provideRouter([]),
        {
          provide: ChatService,
          useValue: {
            watchThreads: () => of([]),
            watchMessages: () => of([]),
            createBlankThread: vi.fn(),
            startPromptThread: vi.fn(),
            sendMessage: vi.fn(),
            deleteThread: vi.fn(),
          },
        },
        { provide: ConfirmService, useValue: { confirm: vi.fn() } },
        {
          provide: I18nService,
          useValue: {
            t: (key: string) => key,
            language: language.asReadonly(),
            dictionary: dictionary.asReadonly(),
          },
        },
        { provide: LlmService, useValue: { isConfigured: () => false } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AssistantComponent);
    fixture.detectChanges();
  });

  it('renders starter prompts', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('assistant.starterTitle');
    expect(compiled.querySelectorAll('.prompt-card').length).toBeGreaterThan(0);
  });
});
