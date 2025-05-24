import crypto from "crypto"

export function generateSessionId(): string {
  const raw = crypto.randomBytes(16).toString("hex")
  const hmac = crypto.createHmac("sha256", "supersecret")
  hmac.update(raw)
  return raw + "." + hmac.digest("hex")
}
