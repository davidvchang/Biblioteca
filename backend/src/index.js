import app from './app.js'
import { connectDB } from "./bd.js";

connectDB()

async function main () {
    await app.listen(app.get('port'))
    console.log(`Server on port: ${app.get('port')}`)
}

main()