# Images

## Image types

`StoredImage.type`: `session`, `catch`, `lake`, `cover`, etc.

## Compression

`ImageService.processFile()` resizes and compresses before IndexedDB storage.

## Thumbnails

Generated alongside full image; displayed via `ImageThumbComponent`.

## Favorites and homepage

- `isFavorite`: gallery filtering
- `isHomepageImage`: dashboard hero (one at a time)

## Cover images

Sessions and lakes may have `coverImageId`. Default cover generated on session start when possible.

## Deletion

Removed from `images` store when parent entity deleted or explicitly removed.

## Fullscreen display

Gallery component supports fullscreen overlay viewer.
