import express from "express";
import userRouter from "./routes/userRouter";
import productsRouter from "./routes/productsRouter";
import ordersRouter from "./routes/ordersRouter";

import cookieParser from "cookie-parser";

const app = express();

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser());

app.use("/static", express.static("./static"))
app.use("/user", userRouter);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);


app.listen(8080, () => {
    console.log("Listening on port 8080");
});