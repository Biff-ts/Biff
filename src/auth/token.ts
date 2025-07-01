// src/auth/token.ts
import { base64urlEncode, base64urlDecode } from "../utils/base64url";



const encoder = new TextEncoder();

/** HMAC-SHA256 による署名 */
async function sign(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}

/** トークン生成 */
// 変更点：btoa → base64urlEncode、atob → base64urlDecode に置換
export async function generateToken(payload: Record<string, any>, secret: string): Promise<string> {
  const data = base64urlEncode(JSON.stringify(payload));
  const sig = await sign(data, secret);
  return `${data}.${base64urlEncode(sig)}`; // ✅ 両方URL-safeに
}


export async function verifyToken(token: string, secret: string): Promise<Record<string, any> | null> {
  const [data, sig] = token.split(".");
  if (!data || !sig) return null;

  const expectedSig = await sign(data, secret);
  const expected = base64urlEncode(expectedSig);

  if (sig !== expected) return null;

  try {
    return JSON.parse(base64urlDecode(data));
  } catch {
    return null;
  }
}
