
import { Router } from "express"
import { SignleUserget, deleteUser, get, post, update } from "../controllers/user.controller.js";
const userRouter =Router();

userRouter.get('/',get);
userRouter.get('/:id',SignleUserget);
userRouter.post('/',post);
userRouter.put('/:id',update);
userRouter.delete('/:id',deleteUser);





export default  userRouter;