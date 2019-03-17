const getAllResturantsList = async function (req, res) {
  try{
  const RestrurantsModel = require('../models').Resturants;  
  let allResturants = await RestrurantsModel.findAll()
  res.status(200).send(allResturants)

  }catch(err) {
    res.status(400).send({err})
  }

}
const createRestrurant = async function (req, res) {
  try{
    const RestrurantsModel = require('../models').Resturants;
    let {title} = req.body
    let r = await RestrurantsModel.create({title})
    res.status(200).send(r)
  
    }catch(err) {
      console.log(err)
      res.status(400).send({err})
    }
}

const getAllDishes = async function (req, res) {
  try{
    const DishesModel = require('../models').Dishes;
    
    let allDishes =  await DishesModel.findAll()
    res.status(200).send(allDishes)
  
    }catch(err) {
      console.log(err)
      res.status(400).send({err})
    }
}
const getDishesofSingleResturant = async function (req, res) {
  try{

    const DishesModel = require('../models').Dishes;
    const RestrurantsModel = require('../models').Resturants;
    let {resturantId} = req.body
    console.log(resturantId)
    //find if the resturant exist or not
    let resturant = await RestrurantsModel.findOne({where : {id: resturantId}})
    if(resturant){
      //find Dishes of this resturant
      let dishes = await DishesModel.findAll({where: {resturant_id : parseInt(resturant.id)}})
      res.status(200).send(dishes)
    }
    else throw("Resturant Doesn't Exist")
    
  
    }catch(err) {
      console.log(err)
      res.status(400).send({err})
    }
}

const showOnlyAvaliableDishesList = async function (req, res) {
  try{

    const DishesModel = require('../models').Dishes;
    const RestrurantsModel = require('../models').Resturants;
    let {resturantId} = req.body
    //find if the resturant exist or not
    let resturant = await RestrurantsModel.findOne({where : {id: resturantId}})
    if(resturant){
      //find Dishes of this resturant
      let dishes = await DishesModel.findAll({where: {resturant_id : resturant.id}}).filter(d => d.currently_avaliable)
      res.status(200).send(dishes)
    }
    else throw("Resturant Doesn't Exist")
    
  
    }catch(err) {
      console.log(err)
      res.status(400).send({err})
    }
}

const enterDishesOfAResturant = async function (req, res) {
  try{
    const RestrurantsModel = require('../models').Resturants;
    const DishesModel = require('../models').Dishes;
    let {dish_name, resturantId, currently_avaliable, price} = req.body
    //find out resturant exist
    let resturant = await RestrurantsModel.findOne({where : {id: resturantId}})
    if(resturant){
     let d =  await DishesModel.create({dish_name, resturant_id: resturantId, currently_avaliable, price})
     res.status(200).send(d)
    }
    else throw("Resturant Not Found")
    }catch(err) {
      console.log(err)
      res.status(400).send({err})
    }
}
const editADish = async function (req, res) {
  try{
    const RestrurantsModel = require('../models').Resturants;
    const DishesModel = require('../models').Dishes;
    let {dish_name, dish_id, resturantId, currently_avaliable, price} = req.body
    //find out resturant exist
    let resturant = await RestrurantsModel.findOne({where : {id: resturantId}})
    if(resturant){

     let dish =  await DishesModel.findOne({where: {id: dish_id}})
     if(dish){
      let d = await dish.update({dish_name, dish_id, currently_avaliable, price})
      res.status(200).send(d)
     }else throw("Dish Does not exist")
     res.status(200).send(dishes)
    }
    else throw("Resturant Not Found")
    }catch(err) {
      console.log(err)
      res.status(400).send({err})
    }
}
const deleteResturant = async function (req, res) {
  //Algo : Delete all the dishes of that resturant first
  //Then delete resturant
  try{
    const RestrurantsModel = require('../models').Resturants;
    const DishesModel = require('../models').Dishes;
    let { resturantId } = req.body
    //find out resturant exist
    let resturant = await RestrurantsModel.findOne({where : {id: resturantId}})
    if(resturant){

     let dishes =  await DishesModel.findAll({where: {resturant_id: resturantId}})
     if(dishes && dishes.length){
       let akkIds = dishes.map(d => d.id)
       for(let d of dishes)
      await DishesModel.destroy({where : {id: d.id}})
     }
     //Now delete the resturant
     await resturant.destroy({id: resturantId})
     res.status(200).send("Successfully Deleted")
    }
    else throw("Resturant Not Found")
    }catch(err) {
      console.log(err)
      res.status(400).send({err})
    }
}

module.exports = {
  getAllResturantsList,
  createRestrurant,
  getAllDishes,
  getDishesofSingleResturant,
  showOnlyAvaliableDishesList,
  enterDishesOfAResturant,
  editADish,
  deleteResturant
};
