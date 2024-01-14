
// require('dotenv').config({
//     path:'./env'
// })
import dotenv from 'dotenv';
dotenv.config({
    path:'./env'
})

import express from 'express';
import connectBD from './db/index.js';


const app = express();
connectBD();

app.listen(process.env.PORT, ()=>{
    console.log('listening on port',process.env.PORT);
})