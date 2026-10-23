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

A homepage image picked from a file is stored as `type: cover` (never shown in the gallery). `ImageService.replaceHomepageCover()` permanently removes the previous `cover` upload; a gallery photo used as homepage image is left alone. Replacing the profile picture soft-deletes the old one. Removing the profile picture on `/profile` asks for confirmation first (`ConfirmService`).

## Session images

Session detail shows a gallery of session photos (`type: session` / `photoIds`) and catch photos (`type: catch` / `photoId`) for that session. Photos can be added via the image picker; deleting from the gallery prunes stale refs on the session and catches.

Active session shows a compact horizontal photo strip of the same images (tap to open fullscreen viewer).

Both load through `ImageService.getSessionImages(sessionId, linkedIds)` (indexed `parentId` query + `bulkGet` of linked ids) and only reload when the set of photo ids changes, not on every session write (bites, weather).

## Deletion

Removed from `images` store when parent entity deleted or explicitly removed.

## Fullscreen display

Gallery component supports fullscreen overlay viewer.

- Each tile is a container with a separate open button (the thumbnail) and the favorite / homepage / delete icon buttons beside it, so no interactive control is nested inside another button.
- The viewer (`role="dialog"`, `tabindex="-1"`) receives focus when opened, so **Escape** closes it. Closing returns focus to the tile that opened it.
