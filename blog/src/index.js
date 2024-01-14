import dotenv from 'dotenv';
dotenv.config({
    path:'./env'
})
import connectBD from './db/index.js';
import {app} from './app.js';

connectBD()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log('App is listening on port',process.env.PORT);
    });
})
.catch(err =>{
    console.error("DB Connection Failed: " + err)
})

