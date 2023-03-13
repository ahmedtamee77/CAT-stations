"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../db"));
const router = express_1.default.Router();
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productIds, address } = req.body;
    const userId = parseInt(req.header("UserID"));
    const products = [];
    for (const id of productIds) {
        const product = yield db_1.default.product.findFirst({ where: { id: parseInt(id) } });
        if (product != null) {
            products.push(product);
        }
    }
    let totalPrice = 0;
    for (const product of products) {
        totalPrice += product.price;
    }
    const productIdsForOrder = products.map(p => ({ id: p.id }));
    const order = yield db_1.default.order.create({
        data: {
            address: address,
            totalPrice: totalPrice,
            products: { connect: productIdsForOrder },
            userId: userId
        }
    });
    return res.status(200).json(order);
}));
router.get("/byuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.header("UserID"));
    const orders = yield db_1.default.order.findMany({ where: { userId: userId }, include: { products: true } });
    return res.status(200).json(orders);
}));
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield db_1.default.order.findMany({ include: { products: true } });
    return res.status(200).json(orders);
}));
exports.default = router;
