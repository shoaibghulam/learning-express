
import { Router } from "express"
import { SignleUserget, deleteUser, get, post, update } from "../controllers/user.controller.js";
import { userValidateFields } from "../utils/validations.js";
import { upload } from "../middlewares/multer.middleware.js";
import { SigninUser } from "../controllers/auth.controller.js";

const userRouter =Router();

userRouter.route('/',get);
userRouter.route('/').get(get);
userRouter.get('/:id',SignleUserget);
userRouter.post('/',upload.fields([{name:'avatar'}]),userValidateFields,post);
userRouter.put('/:id',update);
userRouter.delete('/:id',deleteUser);
userRouter.post('/signin', SigninUser);




export default  userRouter;