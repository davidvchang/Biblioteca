import app from './src/app.js'
import { connectDB } from "./src/bd.js";

connectDB()

async function main () {
    await app.listen(app.get('port'))
    console.log(`Server on port: ${app.get('port')}`)
}

main()