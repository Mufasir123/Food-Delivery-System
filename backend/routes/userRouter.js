import express from 'express'
import { getMyProfile, loginUser, Logout, registerUser } from '../controllers/userController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const userRouter = express.Router()

userRouter.post('/login',loginUser)
userRouter.post('/register',registerUser)
userRouter.get('/logout',Logout)
userRouter.get('/profile/:id',authMiddleware,getMyProfile)

export default userRouter