import express from "express";
import prisma from "../db";

const router = express.Router();

router.post("/add", async (req, res) => {
   const {name, description, rating, price} = req.body;

   const product = await prisma.product.create({data: {
    name: name,
    description: description,
    price: price,
    rating: rating
   }})
   return res.status(200).json(product);

});  

router.get("/byid/:id", async (req, res) => {
   const id = parseInt(req.params.id);

   const product = await prisma.product.findFirst({where: {id: id}});
   if(product == null) {
    return res.status(404).send("Product not found");
   }

   return res.status(200).json(product);
 }); 

 router.get("/all", async (req, res) => {
    const products = await prisma.product.findMany();
    return res.status(200).json(products);
 })

export default router;