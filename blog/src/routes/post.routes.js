
import { Router } from "express"
import { SignleUserget, deleteUser, get, post, update } from "../controllers/post.controller.js";
const PostRoute =Router();

userRouter.get('/',get);
// userRouter.get('/:id',SignleUserget);
PostRoute.post('/',post);
// userRouter.put('/:id',update);
// userRouter.delete('/:id',deleteUser);





export default  PostRoute;