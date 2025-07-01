export function base64urlEncode(str: string): string {
  return btoa(str)
    .replace(/=/g, "")   // ✅ パディング削除
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function base64urlDecode(str: string): string {
  const pad = str.length % 4 === 0 ? "" : "=".repeat(4 - (str.length % 4));
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return atob(base64);
}
