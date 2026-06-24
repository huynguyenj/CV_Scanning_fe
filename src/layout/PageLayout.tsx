import { useEffect, type PropsWithChildren } from 'react'
import LogoutGoogleButton from '../feature/goolge-login/components/LogoutGoogleButton'
import LoginGoogleButton from '../feature/goolge-login/components/LoginGoogleButton'
import { supabaseClient } from '../lib/supabase'
import {  authStore } from '../feature/goolge-login/store/auth-store'

type PageLayoutType = PropsWithChildren

export default function PageLayout({ children }: PageLayoutType) {
  const auth = authStore()
  useEffect(() => {
        // Supabase automatically handles the token from the URL
        supabaseClient.auth.onAuthStateChange((event, session) => {
          console.log(event)
            if (event === "SIGNED_IN" && session) {
             auth.setAuthInfo(session.access_token, session.user.user_metadata.avatar_url, session.user.user_metadata.email, session.user.user_metadata.name)   
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
