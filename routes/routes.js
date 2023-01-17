const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middleware/auth");
const registerRouter = express.Router();
const Users = require("../model/restaurantusermodel");
const Restaurants = require("../model/restaurantmodel");
const { request } = require("express");

registerRouter.use(express.json());

registerRouter.get("/", (req, res) => {
    res.status(200).json({message:"coucou"})
})



registerRouter.get("/displayUser", (req, res) => {
    Users.findOne( { email: req.body.email } ).then((user)=>{
        if(user == null) {
            console.log({message:"User doesn't exist"})
        }
        else{
            res.status(200).json(user);
        }})
    }
)

registerRouter.get("/displayAllRestaurant", function (request, res) {
    Restaurants.find().then((restaurant)=>{
        if(restaurant) {
            res.status(200).send(restaurant);
        }
        else{
            console.log({message:"Restaurant doesn't exist"})
        }})
    }
)


registerRouter.get("/displayRestaurant/:name", function (request, res) {
    Restaurants.findOne( { name: request.params.name} ).then((restaurant)=>{
        if(restaurant) {
            res.status(200).send(restaurant);
        }
        else{
            console.log({message:"Restaurant doesn't exist"})
        }})
    }
)



registerRouter.post("/registerUser", (req, res) => {
    Users.findOne( { email: req.body.email } ).then((user)=>{
        if(user == null) {
            newUser = {
                _id: req.body._id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                gender: req.body.gender,
                password: req.body.password,
                role: req.body.role,
                id_restaurant: req.body.id_restaurant
            }
        Users.insertMany(newUser)
        }
        else{
            return res.status(409).json({ message: "Restorer User already exist"})       
        }
    })  
}
);



registerRouter.post("/registerRestaurant", (req, res) => {
    const r = Restaurants.findOne( { name: req.body.name } ).then((restaurant)=>{
        if(restaurant == null) {
            newRestaurant = {
                name: req.body.name,
                zone: req.body.zone || '',
                address: req.body.address,
                notes: req.body.notes || 0,
                openingTime: req.body.openingTime,
                closingTime: req.body.closingTime,
                type: req.body.type,
                image: req.body.image
            }
        Restaurants.insertMany(newRestaurant)
        }
        else{
            return res.status(409).json({ message: "Restaurant already exist"})       
        }
    }).catch((err)=>{
        console.log("Error Creation : "+err.message);
    });
}
);




registerRouter.delete("/deleteUser", (req, res) => {
    Users.findOne( { email: req.body.email } ).then((user) => {
        if(user == null) {
            console.log({message:"User doesn't exist"})
        }
        else{
            user.remove();
            return res.status(409).json({ message: "User deleted"});
        }
    })
})




registerRouter.delete("/deleteRestaurant", (req, res) => {
    Restaurants.findOne( { name: req.body.name } ).then((restaurant) => {
        if(restaurant == null) {
            console.log({message:"Restaurant doesn't exist"})
        }
        else{
            restaurant.remove();
            return res.status(409).json({ message: "Restaurant deleted"});
        }
    })
})


module.exports = registerRouter;