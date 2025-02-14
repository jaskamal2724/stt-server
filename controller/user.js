import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body


        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    display_name: name
                },
            },
        })

        if (!data) {
            return res.status(400).json(error)
        }

        return res.status(200).json({ 
            Username: data.user.user_metadata.display_name, 
            Email: data.user.user_metadata.email, 
            msg: "Signed in successfully" 
        })

    }
    catch (error) {
        console.log("sign up error : ", error)
    }
}

const signIn = async (req, res) => {

    try {
        const { email, password } = req.body
        

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            return res.status(400).json(error)
        }

        return res.status(200).json({Username:data.session.user.user_metadata.display_name,msg:"sign in successfull"})
    }
    catch (error) {
        console.log("sign in error : ", error)
    }
}

export { signUp, signIn }