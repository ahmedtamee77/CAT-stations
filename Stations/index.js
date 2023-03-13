"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const productsRouter_1 = __importDefault(require("./routes/productsRouter"));
const ordersRouter_1 = __importDefault(require("./routes/ordersRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/static", express_1.default.static("./static"));
app.use("/user", userRouter_1.default);
app.use("/products", productsRouter_1.default);
app.use("/orders", ordersRouter_1.default);
app.listen(8080, () => {
    console.log("Listening on port 8080");
});
