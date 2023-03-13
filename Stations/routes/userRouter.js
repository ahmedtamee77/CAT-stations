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
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const foundUser = yield db_1.default.user.findFirst({ where: { email: email } });
    if (foundUser != null) {
        return res.status(403).send("Email already taken");
    }
    const shasum = crypto_1.default.createHash('sha1');
    shasum.update(password);
    const encryptedPassword = shasum.digest('hex');
    const user = yield db_1.default.user.create({ data: {
            email: email,
            password: encryptedPassword,
            name: name
        } });
    return res.status(200).json({ email: user.email, name: user.name, id: user.id });
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const foundUser = yield db_1.default.user.findFirst({ where: { email: email } });
    if (foundUser == null) {
        return res.status(401).send("Incorrect email or password");
    }
    const shasum = crypto_1.default.createHash('sha1');
    shasum.update(password);
    const encryptedPassword = shasum.digest('hex');
    if (foundUser.password == encryptedPassword) {
        return res.cookie("userId", foundUser.id + "").status(200).json({ email: foundUser.email, name: foundUser.name, id: foundUser.id });
    }
    return res.status(401).send("Incorrect email or password");
}));
exports.default = router;
