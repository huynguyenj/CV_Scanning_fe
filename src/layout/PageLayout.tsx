import { useEffect } from 'react'
import LogoutGoogleButton from '@/feature/goolge-login/components/LogoutGoogleButton'
import LoginGoogleButton from '@/feature/goolge-login/components/LoginGoogleButton'
import { supabaseClient } from '@/lib/supabase'
import {  authStore } from '@/feature/goolge-login/store/auth-store'
import { apiPrivate } from '@/config/api'
import { Outlet } from 'react-router'
import Logo from '@/assets/logo.png'

export default function PageLayout() {
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
    <div className='relative'>
      <nav className='fixed inset-0 w-full h-20 flex justify-between items-center bg-ebony-grey text-white px-10'>
        <div className='flex items-center gap-2'>
          <img src={Logo} alt="logo" width={11} height={11} className='w-11 aspect-square rounded-full'/>
          <p>CVAI</p>
        </div>
         <div className='flex items-center justify-end'>
            { auth.accessToken ?
            <div className='flex gap-2'>
              <div className='flex items-center justify-center w-10 aspect-square rounded-full bg-amber-200'>
                { auth.avatarUrl ?
                  <img src={auth.avatarUrl} alt="avatar" width={10} height={10} className='shrink-0 object-contain w-full aspect-square rounded-full'/>
                  :
                  <div className='bg-primary w-full h-full'>
                    {auth.name?.charAt(0).toUpperCase()}
                  </div>
                }
              </div>
              <LogoutGoogleButton/>
            </div>
                  :
                  <LoginGoogleButton/>
            }
         </div>
      </nav>
      <main className='mt-20 px-10 py-5'>
            <Outlet/>
      </main>
      <footer>

      </footer>
    </div>
  )
}
