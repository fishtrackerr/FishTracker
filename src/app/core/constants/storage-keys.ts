export const RETURN_URL_KEY = 'fish-tracker-return-url';
export const LOCK_STATE_KEY = 'fish-tracker-lock-state';
/** Set on successful PIN unlock; cleared on lock. Survives only for the browser tab session. */
export const UNLOCK_SESSION_KEY = 'fish-tracker-unlock-session';
/** Multi-slot weather cache (Open-Meteo snapshots keyed by coordinates). */
export const WEATHER_CACHE_KEY = 'fish-tracker-weather-cache';
/** Forward + reverse Nominatim geocode cache. */
export const GEOCODE_CACHE_KEY = 'fish-tracker-geocode-cache';
/** Last app version for which the What's New dialog was shown (or seeded). */
export const LAST_SEEN_VERSION_KEY = 'fish-tracker-last-seen-version';
/** Local calendar date (YYYY-MM-DD) when the feedback prompt was last shown. */
export const FEEDBACK_PROMPT_DATE_KEY = 'fish-tracker-feedback-prompt-date';
