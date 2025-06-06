export type Context = {
  user?: { id: string } // 今後Luciaと統合予定
}

export const createContext = async (): Promise<Context> => {
  return {} // MVPではまだ空でOK
}
