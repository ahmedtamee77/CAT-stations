import express from "express";
import prisma from "../db";
import crypto from "crypto";

const router = express.Router();

router.post("/register", async (req, res) => {
   const {name, email, password} = req.body;

   const foundUser = await prisma.user.findFirst({where: {email: email}})
   if(foundUser != null) {
    return res.status(403).send("Email already taken");
   }

   const shasum = crypto.createHash('sha1');
   shasum.update(password);
   const encryptedPassword = shasum.digest('hex');

   const user = await prisma.user.create({data: {
    email: email,
    password: encryptedPassword,
    name: name
   }})
   
   return res.status(200).json({email: user.email, name: user.name, id: user.id});

});  

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const foundUser = await prisma.user.findFirst({where: {email: email}})
    if(foundUser == null) {
     return res.status(401).send("Incorrect email or password");
    }

    const shasum = crypto.createHash('sha1');
    shasum.update(password);
    const encryptedPassword = shasum.digest('hex');

    if(foundUser.password == encryptedPassword) {
        return res.cookie("userId", foundUser.id + "").status(200).json({email: foundUser.email, name: foundUser.name, id: foundUser.id});
    }

    
    return res.status(401).send("Incorrect email or password");
 }); 

export default router;