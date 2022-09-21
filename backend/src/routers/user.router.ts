import {Router} from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import asyncHandler from 'express-async-handler';

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
      const usersCount = await UserModel.countDocuments();
      if(usersCount>0){
        res.send("Seed is already done!");
        return;
      }
  
      await UserModel.create(sample_users);
      res.send("Seed is Done!");
    
    }));

router.post("/login",(req, res) => {
    const{email,password} = req.body;
    const user = sample_users
    .find(user => user.email === email && user.password === password)

    if(user){
        res.send(generateTokenResponse(user))
        //part when the user is not found
    }else{
        res.status(400).send("User name or password is not valid!");
    }
})

//generated tocken which is expirated in 30 days

const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    }, "SomeRandomText", {
        expiresIn: "30d"
    });
    user.token = token;
    return user;
}

export default router;


