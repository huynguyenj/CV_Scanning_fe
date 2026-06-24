import { supabaseClient } from '../../../lib/supabase'
import { authStore } from '../store/auth-store'

export default function LogoutGoogleButton() {
  const auth = authStore()
  const handleSignOut = async () => {
      await supabaseClient.auth.signOut()
      auth.removeAuthInfo()
  }
  return (
    <button onClick={handleSignOut}>Logout</button>
  )
}
