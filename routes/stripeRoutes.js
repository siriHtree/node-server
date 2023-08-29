import express from 'express';
import {creatingStripeUser} from '../controllers/stripeControllers.js';
const router=express.Router();


router.post("/stripe",creatingStripeUser)

export default router;