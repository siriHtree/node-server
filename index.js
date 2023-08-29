import 'dotenv/config';

import express from 'express';

import connectDB from './database/connect.js';
import stripeRoutes from './routes/stripeRoutes.js';


/**
 * express setup
 */

const app=express();

//global middlewares
app.use(express.json());


//API endpoints
app.use('/api/v1/payment',stripeRoutes);


const port=process.env.PORT || 3023;
const start=async()=>{
    try{

        await connectDB(process.env.MONGODB_URI);
        await app.listen(port,()=>console.log(`server is listening to port no.${port}`))


    }catch(err){
        console.log(err);

    }
}

start();