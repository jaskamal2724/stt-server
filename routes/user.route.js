import Router from "express"
import { signIn, signout, signUp } from "../controller/user.js"

const router = Router()

router.route("/signup").post(signUp)
router.route("/signin").post(signIn)
router.route("/signout").post(signout)

export default router