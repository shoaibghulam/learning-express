import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import categoryRoute from './routes/category.routes.js';
const app = express();
app.use(express.json({
    limit:"20kb"
}));
app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}));
app.use(cors({
    origin:process.env.CORS_ORIGIN
}))
app.use(cookieParser());
app.use(express.static('public'))
app.use('/user',userRouter)
app.use('/category',categoryRoute);
app.use('/post',categoryRoute);
export {app};