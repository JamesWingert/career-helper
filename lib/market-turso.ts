import { createClient } from "@libsql/client";

function env(...keys: string[]) {
  for (const key of keys) {
    const value = process.env[key];
    if (value) return value;
  }
  return undefined;
}

export function getMarketTursoClient() {
  const url = env(
    "career_gameplan_TURSO_DATABASE_URL",
    "CAREER_GAMEPLAN_TURSO_DATABASE_URL",
    "swe_ai_dashboard_TURSO_DATABASE_URL",
    "SWE_AI_DASHBOARD_TURSO_DATABASE_URL",
    "TURSO_DATABASE_URL",
  );
  const authToken = env(
    "career_gameplan_TURSO_AUTH_TOKEN",
    "CAREER_GAMEPLAN_TURSO_AUTH_TOKEN",
    "swe_ai_dashboard_TURSO_AUTH_TOKEN",
    "SWE_AI_DASHBOARD_TURSO_AUTH_TOKEN",
    "TURSO_AUTH_TOKEN",
  );

  if (!url || !authToken) return null;
  return createClient({ url, authToken });
}

export async function ensureMarketSchema() {
  const client = getMarketTursoClient();
  if (!client) return null;

  await client.execute(`
    CREATE TABLE IF NOT EXISTS swe_ai_snapshots (
      captured_at TEXT PRIMARY KEY,
      payload TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )
  `);

  return client;
}

export async function loadLatestSnapshot<T>(fallback: T): Promise<T> {
  try {
    const client = await ensureMarketSchema();
    if (!client) return fallback;

    const result = await client.execute(
      "SELECT payload FROM swe_ai_snapshots ORDER BY captured_at DESC LIMIT 1",
    );
    const payload = result.rows[0]?.payload;
    if (typeof payload !== "string") return fallback;
    return JSON.parse(payload) as T;
  } catch {
    return fallback;
  }
}

export async function saveMarketSnapshot(capturedAt: string, payload: unknown) {
  const client = await ensureMarketSchema();
  if (!client) return false;

  await client.execute({
    sql: `
      INSERT INTO swe_ai_snapshots (captured_at, payload, created_at)
      VALUES (?, ?, ?)
      ON CONFLICT(captured_at) DO UPDATE SET
        payload = excluded.payload,
        created_at = excluded.created_at
    `,
    args: [capturedAt, JSON.stringify(payload), Date.now()],
  });
  return true;
}
