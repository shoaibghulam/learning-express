
import { Router } from "express"
import { SignleUserget, deleteUser, getUser, postUser, updateAvatar, updateUser,  } from "../controllers/user.controller.js";
import { updateUserAvatarValidate, updateUserValidateField, userValidateFields } from "../utils/validations.js";
import { upload } from "../middlewares/multer.middleware.js";
import { SigninUser, changePassword, logOut, refershToken } from "../controllers/auth.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const userRouter =Router();

// userRouter.route('/',verifyJwt,get);
userRouter.get("/",verifyJwt,getUser);
userRouter.post('/',verifyJwt,upload.fields([{name:'avatar'}]),userValidateFields,postUser);
userRouter.post('/signin', SigninUser);
userRouter.post('/logout',verifyJwt, logOut);
userRouter.post('/change-password',verifyJwt, changePassword);
userRouter.get('/refersh',refershToken);
// anything with id put it into bottom
userRouter.delete('/:id',verifyJwt,deleteUser);
userRouter.get('/:id',verifyJwt,SignleUserget);
userRouter.put('/avatar',verifyJwt,upload.single("avatar"),updateAvatar);
userRouter.put('/:id',updateUserValidateField,verifyJwt,updateUser);



export default  userRouter;