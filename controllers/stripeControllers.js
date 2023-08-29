import Stripe from "stripe";
import 'dotenv/config';

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
const product = await stripe.products.create({
  name: 'Gold Special',
});

const price = await stripe.prices.create({
  currency: 'usd',
  custom_unit_amount: {
    enabled: true,
  },
  product: product.id,
});
//genrate payment link
export const creatingStripeUser=async(req,res,next)=>{
    try{
        // console.log(req.body);
        const paymentLink = await stripe.paymentLinks.create({
            line_items: [
              {
                price: price.id,
                quantity: 1,
              },
            ],
            after_completion: {
              type: 'redirect',
              redirect: {
                url: process.env.REDIRECT_LINK
              },
            },
          });
          console.log(paymentLink)
        res.status(200).json({
          success:true
        })


    }catch(err){
      res.status(500).json({
        success:false,
        message:err.message
      })

    }
}