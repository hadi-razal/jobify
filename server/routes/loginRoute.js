import express from "express"
import { getUserByIdController, loginController } from "../controllers/LoginController.js"
import { requireSignIn } from "../middlewares/authMiddleware.js"

const router = express.Router()

// Jobify user login
router.post("/login", loginController)

// get jobify user by id
router.post("/get-user/:id", requireSignIn, getUserByIdController)

export default router