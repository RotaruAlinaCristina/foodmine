import { model, Schema, Types } from "mongoose";
import { OrderStatus } from "../constants/order_status";
import { Food, FoodSchema } from "./food.model";

export { model, Schema, Types } from "mongoose";

export interface LatLng {
  lat: string;
  lng: string;
}

export const LatLngSchema = new Schema<LatLng>({
  lat: { type: String, required: true },
  lng: { type: String, required: true },
});

export interface OrderItem {
  food: Food;
  price: number;
  quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>({
  food: { type: FoodSchema, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export interface Order{
    id: number;
    items: OrderItem[];
    totalPrice:number;
    name:string;
    address:string;
    addressLatLng:LatLng;
    paymentId:string;

    status:OrderStatus;
    user: Types.ObjectId;
    createdAt:Date;
    updatedAt: Date
  }

const orderSchema = new Schema<Order>({
    name: {type:String, required:true},
    address: {type: String, required: true},
    addressLatLng: {type: LatLngSchema, required:true},
    paymentId: {type:String},
    totalPrice: {type:Number, required:true},
    items: {type: [OrderItemSchema], required:true},
    status: {type:String, default: OrderStatus.NEW},
    user: {type: Schema.Types.ObjectId, required:true},  
  },{
    //for the creat and updat - generate auto
    //for put TOJson and ToOBJ virtualsLtrue = make de order.id i not order_id will do it automaticly
    timestamps: true,
    toJSON: {
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
  });

  //'order' will be the name in MongoDB
  export const OrderModel = model('order', orderSchema)

