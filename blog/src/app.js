import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import categoryRoute from './routes/category.routes.js';
import bodyParser from 'body-parser';
import PostRoute from './routes/post.routes.js';
const app = express();
app.use(bodyParser.json({
    limit:"20kb"
}));
app.use(bodyParser.urlencoded({
    extended: true,
    // limit: "20kb"
}));
app.use(cors({
    origin:process.env.CORS_ORIGIN
}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'))
app.use('/user',userRouter)
app.use('/category',categoryRoute);
app.use('/post',PostRoute);
export {app};