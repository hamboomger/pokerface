import { error, fail } from "@sveltejs/kit"

class _ServerAPI {
  async encode(message: string): Promise<string[]> {
    const res = await fetch('/api/encode', {
      method: 'POST',
      body: JSON.stringify({
        message
      })
    })

    if (res.status !== 200) {
      console.error(res.status, res.text)
    }

    const responseBody = await res.json()
    return responseBody.cards
  }
  async decode(cards: string[]): Promise<string> {
    const res = await fetch('/api/decode', {
      method: 'POST',
      body: JSON.stringify({
        cards
      })
    })

    if (res.status !== 200) {
      console.error(res.status, res.text)
    }
    
    const resBody = await res.json()
    return resBody.message
  }
}

export const ServerAPI = new _ServerAPI()
