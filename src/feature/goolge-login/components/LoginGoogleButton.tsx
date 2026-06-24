import { supabaseClient } from '../../../lib/supabase'
export default function LoginGoogleButton() {
  const handleLoginGoogle = async () => {
      const data = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                  redirectTo: 'http://localhost:5173/'
            }
      })
      if (data.error) console.log(data.error)
  }
  return (
    <button onClick={handleLoginGoogle}>
      Sign in with google
    </button>
  )
}
