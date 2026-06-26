import { useEffect, type PropsWithChildren } from 'react'
import LogoutGoogleButton from '@/feature/goolge-login/components/LogoutGoogleButton'
import LoginGoogleButton from '@/feature/goolge-login/components/LoginGoogleButton'
import { supabaseClient } from '@/lib/supabase'
import {  authStore } from '@/feature/goolge-login/store/auth-store'
import { apiPrivate } from '@/config/api'

type PageLayoutType = PropsWithChildren

export default function PageLayout({ children }: PageLayoutType) {
  const auth = authStore()
  useEffect(() => {
        // Supabase automatically handles the token from the URL
        supabaseClient.auth.onAuthStateChange(async (event, session) => {
            const token = authStore.getState().accessToken 
            // using like this prevent stale closure (này do khi login xong mỗi lần ta tab qua lại supabase sẽ bắn event đến mà trong onAuthStateChange này nếu ta dùng auth.accessToken thì nó sẽ bị lệch giá trị, lấy giá trị trc đó chứ ko phải hiện tại nên ta mới dùng authStore.getState().accessToken để lấy state hiện tại)
            if (event === "SIGNED_IN" && session && !token) {
             console.log('Run in if statement')
             auth.setAuthInfo(session.access_token, session.user.user_metadata.avatar_url, session.user.user_metadata.email, session.user.user_metadata.name)
             const data: { name: string, email: string } = {
              email: session.user.user_metadata.email,
              name: session.user.user_metadata.name
             }
             await apiPrivate.post('/auth/callback', data)
            }
        });
    }, []);
  return (
    <div>
      <nav className='w-full h-20 flex justify-end items-center bg-black text-white px-10'>
         <div className='flex items-center justify-end'>
            { auth.accessToken ?
                  <LogoutGoogleButton/>
                  :
                  <LoginGoogleButton/>
            }
         </div>
      </nav>
      <main>
            {children}
      </main>
    </div>
  )
}
