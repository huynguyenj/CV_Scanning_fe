import { createClient } from '@supabase/supabase-js'
import { envVariables } from '../config/enviroment'

export const supabaseClient = createClient(envVariables.SUPABASE_CLIENT, envVariables.SUPABASE_PUBLISHABLE_KEY)