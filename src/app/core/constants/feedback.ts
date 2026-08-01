/** Recipient for in-app feedback / feature-request mailto links. */
export const FEEDBACK_EMAIL = 'erwin.torrenga@live.nl';

/** Opens the system mail client with a feedback email. */
export function openFeedbackMailto(subject: string): void {
  window.open(
    `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}`,
    '_self',
  );
}
