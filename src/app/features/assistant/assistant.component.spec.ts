import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ChatThread } from '../../core/models';
import { ChatService } from '../../core/services/chat.service';
import { ConfirmService } from '../../core/services/confirm.service';
import { I18nService } from '../../core/services/i18n.service';
import { LlmService } from '../../core/services/llm.service';
import { AssistantComponent } from './assistant.component';

describe('AssistantComponent', () => {
  let fixture: ComponentFixture<AssistantComponent>;
  const language = signal('en');
  const dictionary = signal({});
  const threads: ChatThread[] = [
    {
      id: 'thread-1',
      title: 'Best fishing time',
      createdAt: '2026-08-01T10:00:00.000Z',
      updatedAt: '2026-08-01T12:00:00.000Z',
    },
  ];

  const chatServiceMock = {
    watchThreads: () => of(threads),
    watchMessages: () => of([]),
    createBlankThread: vi.fn(),
    startPromptThread: vi.fn(),
    sendMessage: vi.fn(),
    deleteThread: vi.fn(),
    getThread: vi.fn().mockResolvedValue(undefined),
    getLatestMessage: vi.fn().mockResolvedValue({
      id: 'msg-1',
      threadId: 'thread-1',
      role: 'assistant',
      content: 'Your strongest hour is around 06:00.',
      createdAt: '2026-08-01T12:00:00.000Z',
    }),
  };

  beforeEach(async () => {
    localStorage.removeItem('ft.assistant.activeThreadId');
    vi.clearAllMocks();
    chatServiceMock.getThread.mockResolvedValue(undefined);
    chatServiceMock.getLatestMessage.mockResolvedValue({
      id: 'msg-1',
      threadId: 'thread-1',
      role: 'assistant',
      content: 'Your strongest hour is around 06:00.',
      createdAt: '2026-08-01T12:00:00.000Z',
    });

    await TestBed.configureTestingModule({
      imports: [AssistantComponent],
      providers: [
        provideRouter([]),
        { provide: ChatService, useValue: chatServiceMock },
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

  it('renders recent chats when threads exist', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="recent-chats"]')).toBeTruthy();
    expect(compiled.textContent).toContain('Best fishing time');
    expect(compiled.textContent).toContain('Your strongest hour is around 06:00.');
  });

  it('selecting a thread sets activeThreadId and persists it', async () => {
    await fixture.whenStable();
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.selectThread('thread-1');
    fixture.detectChanges();

    expect(component.activeThreadId()).toBe('thread-1');
    expect(localStorage.getItem('ft.assistant.activeThreadId')).toBe('thread-1');
    expect((fixture.nativeElement as HTMLElement).querySelector('.chat')).toBeTruthy();
  });

  it('resumes last thread from localStorage when it still exists', async () => {
    localStorage.setItem('ft.assistant.activeThreadId', 'thread-1');
    chatServiceMock.getThread.mockResolvedValue(threads[0]);

    const resumed = TestBed.createComponent(AssistantComponent);
    await resumed.whenStable();
    resumed.detectChanges();

    expect(resumed.componentInstance.activeThreadId()).toBe('thread-1');
    expect((resumed.nativeElement as HTMLElement).querySelector('.chat')).toBeTruthy();
  });
});
