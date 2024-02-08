import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { authrPosts, authrPostsCount } from "../controllers/post.controller.js";


const AuthorRoutes = Router();

AuthorRoutes.get('/posts/:author',verifyJwt,authrPosts)
AuthorRoutes.get('/count/:author',verifyJwt,authrPostsCount)


export default AuthorRoutes