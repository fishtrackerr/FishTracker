# Ask-your-data assistant

Hybrid fishing insights chat at `/assistant`.

## Modes

| Mode | Requirements | Behavior |
|------|--------------|----------|
| Insight prompts | None (offline) | Predefined questions answered from IndexedDB via `LocalInsightService` |
| Online AI chat | Settings: enable AI + API key + network | OpenAI-compatible chat completions with a privacy-safe data summary |

Entry points: Dashboard button, Statistics link, Settings → Ask your data.

## Data flow

Components → `ChatService` → (`LocalInsightService` | `LlmService` + `FishingDataContextService`) → `ChatRepository` → Dexie.

Never send photos, PIN, or full addresses. Context is aggregated counts, lakes, hours, baits, species, recent session summaries.

## Storage

Tables `chatThreads` and `chatMessages` (Dexie schema v6). Included in backup/export and full reset.

## Settings

`AppSettings` fields (localStorage):

- `aiChatEnabled`
- `aiApiKeyEncrypted` / `aiApiKeyIv` / `aiKeySalt` — AES-GCM ciphertext wrapped with a PIN-derived key (`SecretVaultService`). Plaintext `aiApiKey` is never written once ciphertext exists; legacy plaintext is migrated on unlock.
- In-memory / tab sessionStorage plaintext while unlocked (cleared on lock)
- `aiBaseUrl` (default `https://api.openai.com/v1`; **exact allowlisted hosts only**: `api.openai.com`, `openrouter.ai`, `api.openrouter.ai`; HTTPS required; no URL credentials)
- `aiModel` (default `gpt-4o-mini`)

Enabling online AI sends an aggregated fishing summary to the provider. Settings UI warns about this.

## Predefined prompts

1. Best fishing time
2. Best lake
3. Best bait & rig
4. Species & records
5. New blank chat (free-form; needs AI for answers beyond matched prompts)

## Errors

LLM failures show snackbar (`offline` / `unauthorized` / generic). Prompt threads fall back to local insights when AI fails.
