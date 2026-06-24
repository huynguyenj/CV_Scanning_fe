import { create } from "zustand"
import { persist } from "zustand/middleware"

type AuthType = {
      accessToken: string | null
      avatarUrl: string | null
      email: string | null
      name: string | null
      setAuthInfo: (accessToken: string, avatarUrl: string, email: string, name: string) => void
      removeAuthInfo: () => void
}

export const authStore = create<AuthType>()(
      persist((set) => ({
            accessToken: null,
            avatarUrl: null,
            email: null,
            name: null,
            setAuthInfo: (accessToken: string, avatarUrl: string, email: string, name: string) => set({ accessToken, avatarUrl, email, name }),
            removeAuthInfo: () => set((state) => ({...state, accessToken: null, avatarUrl: null, email: null, name: null}))
      }),
      { name: 'authentication' }
)
)

