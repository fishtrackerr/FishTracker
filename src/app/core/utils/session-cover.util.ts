import { Catch, Lake } from '../models';

/** Most recent catch photo wins as the session cover. */
export function pickCatchCoverPhotoId(catches: Catch[]): string | undefined {
  return [...catches]
    .filter((c): c is Catch & { photoId: string } => !!c.photoId)
    .sort((a, b) => b.caughtAt.localeCompare(a.caughtAt))[0]?.photoId;
}

export function pickLakeCoverImageId(lake: Lake | undefined | null): string | undefined {
  if (!lake) {
    return undefined;
  }
  return lake.coverImageId ?? lake.photoIds?.[0];
}

/** Catch photo if any, otherwise the lake image. */
export function resolveSessionCoverImageId(
  catches: Catch[],
  lake: Lake | undefined | null,
): string | undefined {
  return pickCatchCoverPhotoId(catches) ?? pickLakeCoverImageId(lake);
}
