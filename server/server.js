import express from "express"
import cors from "cors"
import CompanyRoute from "./routes/companyRoute.js"
import EmployeeRoute from "./routes/employeeRoute.js"
import AuthRoute from "./routes/authRoute.js"
import connectDB from "./db/dbConnect.js"
import env from "dotenv"


env.config()
const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.get("/api/test", (req, res) => {
    res.send("Hello how are you hadi")
})

app.use("/api/v1/auth", AuthRoute)
app.use("/api/v1/company", CompanyRoute)
app.use("/api/v1/employee", EmployeeRoute)

app.listen(process.env.PORT || 8080, () => {
    console.log("Connected to port 8080 ")
})