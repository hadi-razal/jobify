import express from "express"
import { loginController } from "../controllers/LoginController.js"

const router = express.Router()

// Jobify user login
router.post("/login", loginController)

export default router