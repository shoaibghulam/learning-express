
import { Router } from "express"
import { SignleUserget, deleteUser, get, post, update } from "../controllers/user.controller.js";
import { userValidateFields } from "../utils/validations.js";
import { upload } from "../middlewares/multer.middleware.js";
import { SigninUser, changePassword, logOut, refershToken } from "../controllers/auth.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const userRouter =Router();

// userRouter.route('/',verifyJwt,get);
userRouter.route('/').get(verifyJwt,get);
userRouter.get('/refersh',refershToken);
userRouter.post('/',verifyJwt,upload.fields([{name:'avatar'}]),userValidateFields,post);
userRouter.post('/signin', SigninUser);
userRouter.post('/logout',verifyJwt, logOut);
userRouter.post('/change-password',verifyJwt, changePassword);
userRouter.delete('/:id',verifyJwt,deleteUser);
userRouter.get('/:id',verifyJwt,SignleUserget);
userRouter.put('/:id',verifyJwt,update);



export default  userRouter;