
import postgres from 'postgres'

async function connectDB() {


    try {
        const connectionString = process.env.DATABASE_URL
        const sql = postgres(connectionString)
        console.log("Supabase connected successfully to host : ",sql.options.host[0])
    }
    catch (error) {
        console.log("connection failed ", error)
    }
}

export default connectDB