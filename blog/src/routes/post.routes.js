
import { Router } from "express"
import {addPost,getPost, getSinglePost } from "../controllers/post.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const PostRoute =Router();

// userRouter.get('/',get);
// userRouter.get('/:id',SignleUserget);
PostRoute.post('/',verifyJwt ,upload.single("thumbnail"),addPost);
PostRoute.get('/',verifyJwt,getPost);
PostRoute.get('/:id',verifyJwt,getSinglePost);

// userRouter.put('/:id',update);
// userRouter.delete('/:id',deleteUser);





export default  PostRoute;