import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderStatus } from "../constants/order_status";
import { OrderModel } from "../models/order.model";
import auth from '../midlewares/auth.mid';

const router = Router();
router.use(auth);

router.post('/create',
asyncHandler(async (req:any, res:any)=>{
    const requestOrder = req.body;

    if(requestOrder.items.length<=0){
        res.status(HTTP_BAD_REQUEST).send('Cart is Empty!');
        return;
    }

    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    });

    //create a new order
    //(...) - spread Operator 
    //   var user = {id:1, name:'Jhon}
    //   var newUser = {...user,ssid:123}
    //    newUser will be {id:1, name:'Jhon, ssid:123}
    const newOrder = new OrderModel({...requestOrder,user: req.user.id});
    await newOrder.save();
    res.send(newOrder);
}))


router.get('/newOrderForCurrentUser', asyncHandler(
    async(req:any, res) =>{
        const order = await getNewOrderForCurrentUser(req);
        if(order) res.send(order);
        else res.status(HTTP_BAD_REQUEST).send();
    }
))

async function getNewOrderForCurrentUser(req:any){
    return await OrderModel.findOne({user:req.user.id, status: OrderStatus.NEW})
}

router.post('/pay', asyncHandler( async (req:any, res) => {
    const {paymentId} = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if(!order){
        res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
}))

router.get('/track/:id', asyncHandler(async(req,res)=>{
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
}))

export default router;