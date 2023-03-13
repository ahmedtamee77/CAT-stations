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
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, rating, price } = req.body;
    const product = yield db_1.default.product.create({ data: {
            name: name,
            description: description,
            price: price,
            rating: rating
        } });
    return res.status(200).json(product);
}));
router.get("/byid/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const product = yield db_1.default.product.findFirst({ where: { id: id } });
    if (product == null) {
        return res.status(404).send("Product not found");
    }
    return res.status(200).json(product);
}));
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield db_1.default.product.findMany();
    return res.status(200).json(products);
}));
exports.default = router;
