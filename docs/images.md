# Images

## Image types

`StoredImage.type`: `session`, `catch`, `lake`, `cover`, etc.

## Compression

`ImageService.processFile()` stores the original JPEG/PNG/WebP when the longest edge is ≤4096px and the file is ≤15 MB. Larger images are resized to 4096px at JPEG quality 0.95. List thumbnails are generated at 480px (quality 0.85) for sharp retina tiles.

The homepage hero loads the full-size blob (`getFullObjectUrl`), not the thumbnail.

## Thumbnails

Generated alongside full image; displayed via `ImageThumbComponent` and gallery.

Gallery builds metadata without eagerly creating blob URLs. `ImageGalleryComponent` loads thumbnails via `IntersectionObserver` when tiles enter the viewport (`ImageService.getObjectUrl` caches thumbs).

Full-size viewer URLs are cached in `ImageService` and revoked when navigating between images or closing the viewer (`revokeFullUrl` / `revokeAllFullUrls`).

## Upload limits

`processFile` rejects non-image MIME types and files larger than 20 MB.

## Favorites and homepage

- `isFavorite`: gallery filtering (current fishing mode)
- `isHomepageImage`: dashboard hero (one at a time **per fishing mode**); id also stored in `modePreferences[mode].homepageImageId`

Images are stamped with `fishingMode` on write; gallery and homepage queries are mode-scoped.

## Cover images

Sessions and lakes may have `coverImageId`. Default cover generated on session start when possible.

## Session images

Session detail shows a gallery of session photos (`type: session` / `photoIds`) and catch photos (`type: catch` / `photoId`) for that session. Photos can be added via the image picker; deleting from the gallery prunes stale refs on the session and catches.

Active session shows a compact horizontal photo strip of the same images (tap to open fullscreen viewer).

## Deletion

Removed from `images` store when parent entity deleted or explicitly removed.

## Fullscreen display

Gallery component supports fullscreen overlay viewer.
