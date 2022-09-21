import { Router } from "express";
import { sample_foods, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";
const router = Router();

router.get("/seed", asyncHandler(
  async (req, res) => {
    const foodsCount = await FoodModel.countDocuments();
    if(foodsCount>0){
      res.send("Seed is already done!");
      return;
    }

    await FoodModel.create(sample_foods);
    res.send("Seed is Done!");
  
  }));

router.get("/", asyncHandler(
  async(req, res) => {
    const foods = await FoodModel.find();
    res.send(foods); 
}));

router.get("/search/:searchTerm",asyncHandler(
  async (req, res) => {
    const searchRegex = new RegExp(req.params.searchTerm, 'i')
    const foods = await FoodModel.find({name: {$regex:searchRegex}})
    res.send(foods);
  })
);

router.get("/tags", asyncHandler(
  async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        //2 foods 3 tags, unwind tags => 6 foods tags 1 group and find the similars tags
        $unwind:'$tags'
      },
      {
        $group:{
          _id: '$tags',
          count: {$sum: 1}
      }
    },
    {
      $project:{
        _id: 0,
        name:'$_id',
        count: '$count'
      }
    }
    ]).sort({count: -1});

    const all ={
      name: 'All',
      count: await FoodModel.countDocuments()
    }
    //unshift is the opposite of push
    tags.unshift(all);
    res.send(tags);
  })
);


router.get("/tag/:tagName", asyncHandler(
  async (req, res) => {
    const foods = await FoodModel.find({tags: req.params.tagName})
    res.send(foods);
  }
))

router.get("/:foodId", asyncHandler(
  async (req, res) => {
  const foods = await FoodModel.findById(req.params.foodId)
  res.send(foods);
}));

export default router;
