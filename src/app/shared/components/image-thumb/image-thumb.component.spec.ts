import { SimpleChange } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ImageService } from '../../../core/services/image.service';
import { ImageThumbComponent } from './image-thumb.component';

describe('ImageThumbComponent', () => {
  let getObjectUrl: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    getObjectUrl = vi.fn(async (id: string) => `blob:${id}`);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ImageService,
          useValue: { getObjectUrl, getPlaceholderUrl: () => 'placeholder' },
        },
      ],
    });
  });

  const setImageId = (component: ImageThumbComponent, id: string | undefined): void => {
    const previous = component.imageId;
    component.imageId = id;
    component.ngOnChanges({ imageId: new SimpleChange(previous, id, previous === undefined) });
  };

  it('shows the placeholder without an image id', async () => {
    const component = TestBed.runInInjectionContext(() => new ImageThumbComponent());
    setImageId(component, undefined);
    await vi.waitFor(() => expect(component.loading()).toBe(false));
    expect(component.url()).toBe('placeholder');
  });

  it('loads a new image when the id changes after the first render', async () => {
    const component = TestBed.runInInjectionContext(() => new ImageThumbComponent());
    setImageId(component, undefined);
    setImageId(component, 'cover-1');

    await vi.waitFor(() => expect(component.url()).toBe('blob:cover-1'));
  });

  it('does not let a slow earlier load overwrite a newer image', async () => {
    let releaseSlow: (url: string) => void = () => undefined;
    getObjectUrl.mockImplementationOnce(
      () => new Promise<string>((resolve) => (releaseSlow = resolve)),
    );
    const component = TestBed.runInInjectionContext(() => new ImageThumbComponent());
    setImageId(component, 'old');
    setImageId(component, 'new');
    await vi.waitFor(() => expect(component.url()).toBe('blob:new'));

    releaseSlow('blob:old');
    await Promise.resolve();

    expect(component.url()).toBe('blob:new');
  });
});
