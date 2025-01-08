import { app } from "./app.js"
import { connectdb } from "./db/connectdb.js"
import dotenv from "dotenv"

dotenv.config({
    path: './.env'
})

connectdb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("⚙️  Server is running on PORT ",process.env.PORT);
    })
}).catch(err => {
    console.log("DB Connection Failed ", err);
})