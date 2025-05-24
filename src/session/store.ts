const sessionDb = new Map<string, { id: string; name: string }>()

export function setSession(id: string, user: { id: string; name: string }) {
      console.log("💾 セッション保存:", id, user)
 console.trace("Session saved from:")
  sessionDb.set(id, user)
}

export function getSession(id: string) {
  return sessionDb.get(id) || null
}
