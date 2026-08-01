export const RETURN_URL_KEY = 'fish-tracker-return-url';
export const LOCK_STATE_KEY = 'fish-tracker-lock-state';
/** Set on successful PIN unlock; cleared on lock. Survives only for the browser tab session. */
export const UNLOCK_SESSION_KEY = 'fish-tracker-unlock-session';
/** Selected fishing mode for this app process (sessionStorage). */
export const FISHING_MODE_KEY = 'fish-tracker-fishing-mode';
/** Multi-slot weather cache (Open-Meteo snapshots keyed by coordinates). */
export const WEATHER_CACHE_KEY = 'fish-tracker-weather-cache';
/** Forward + reverse Nominatim geocode cache. */
export const GEOCODE_CACHE_KEY = 'fish-tracker-geocode-cache';
/** Last app version for which the What's New dialog was shown (or seeded). */
export const LAST_SEEN_VERSION_KEY = 'fish-tracker-last-seen-version';
/** Local calendar date (YYYY-MM-DD) when the feedback prompt was last shown. */
export const FEEDBACK_PROMPT_DATE_KEY = 'fish-tracker-feedback-prompt-date';
/** Statistics filter presets; suffixed with fishing mode at runtime. */
export const FILTER_PRESETS_KEY_PREFIX = 'fish-tracker-filter-presets';
