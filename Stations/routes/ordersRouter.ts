import { Product } from "@prisma/client";
import express from "express";
import prisma from "../db";

const router = express.Router();

type ProductWhereUniqueInput = {
    id?: number
  }

router.post("/create", async (req, res) => {
   const {productIds, address} = req.body;
   const userId = parseInt(req.header("UserID")!);


   const products: Product[] = [];
    for(const id of productIds) {
        const product = await prisma.product.findFirst({where: {id: parseInt(id)}});
        if(product != null) {
            products.push(product);
        }
    }

    let totalPrice = 0;
    for(const product of products) {
        totalPrice += product.price;
    }


    const productIdsForOrder: ProductWhereUniqueInput[] = products.map(p => ({id: p.id}));
    const order = await prisma.order.create({
        data: {
            address: address,
            totalPrice: totalPrice,
            products: {connect: productIdsForOrder},
            userId: userId
        }
    });
    return res.status(200).json(order);
});  

router.get("/byuser",async (req, res) => {
    const userId = parseInt(req.header("UserID")!);
    const orders = await prisma.order.findMany({where: {userId: userId}, include: {products: true}})

    return res.status(200).json(orders);
 }); 

 router.get("/all",async (req, res) => {
    const orders = await prisma.order.findMany({include: {products: true}})

    return res.status(200).json(orders);
 })

export default router;