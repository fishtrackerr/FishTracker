import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { I18nService } from '../../core/services/i18n.service';
import {
  ReleaseNotesData,
  ReleaseNotesService,
} from '../../core/services/release-notes.service';
import { ReleaseNotesComponent } from './release-notes.component';

describe('ReleaseNotesComponent', () => {
  const getReleaseNotes = vi.fn<ReleaseNotesService['getReleaseNotes']>();

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [ReleaseNotesComponent],
      providers: [
        {
          provide: ReleaseNotesService,
          useValue: {
            getReleaseNotes,
          },
        },
        {
          provide: I18nService,
          useValue: {
            t: (key: string) => key,
            language: signal('en'),
            dictionary: signal({}),
          },
        },
      ],
    }).compileComponents();
  });

  it('renders commit links when changelog items include commit URLs', async () => {
    getReleaseNotes.mockResolvedValue({
      version: '0.0.22',
      date: '2026-07-23',
      sections: [
        {
          category: 'New Features',
          items: [
            {
              message: 'add focused navigation behavior',
              shortHash: 'abc1234',
              commitUrl: 'https://github.com/example/repo/commit/abc1234full',
            },
          ],
        },
      ],
    } as ReleaseNotesData);

    const fixture = TestBed.createComponent(ReleaseNotesComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const commitLink = fixture.nativeElement.querySelector('a.commit-link') as HTMLAnchorElement;
    expect(commitLink).toBeTruthy();
    expect(commitLink.getAttribute('href')).toBe('https://github.com/example/repo/commit/abc1234full');
    expect(commitLink.textContent).toContain('abc1234');
  });

  it('suppresses non-github commit URLs', async () => {
    getReleaseNotes.mockResolvedValue({
      version: '0.0.22',
      date: '2026-07-23',
      sections: [
        {
          category: 'Notes',
          items: [
            {
              message: 'bad link',
              shortHash: 'abc',
              commitUrl: 'javascript:alert(1)',
            },
          ],
        },
      ],
    } as ReleaseNotesData);

    const fixture = TestBed.createComponent(ReleaseNotesComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('a.commit-link')).toBeNull();
  });

  it('renders multiple releases from history', async () => {
    getReleaseNotes.mockResolvedValue({
      version: '0.0.43',
      date: '2026-08-02',
      sections: [],
      releases: [
        {
          version: '0.0.42',
          date: '2026-08-02',
          sections: [{ category: 'New Features', items: ['i18n updates'] }],
        },
        {
          version: '0.0.29',
          date: '2026-08-01',
          sections: [{ category: 'New Features', items: ['icons and fonts'] }],
        },
      ],
    } as ReleaseNotesData);

    const fixture = TestBed.createComponent(ReleaseNotesComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('0.0.42');
    expect(text).toContain('i18n updates');
    expect(text).toContain('0.0.29');
    expect(text).toContain('icons and fonts');
    expect(fixture.nativeElement.querySelectorAll('.release-notes').length).toBe(2);
  });

  it('hides placeholder-only notes', async () => {
    getReleaseNotes.mockResolvedValue({
      version: '0.0.43',
      date: '2026-08-02',
      sections: [
        {
          category: 'Notes',
          items: ['No conventional commits found since last tag.'],
        },
      ],
    } as ReleaseNotesData);

    const fixture = TestBed.createComponent(ReleaseNotesComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('releaseNotes.empty');
  });
});
