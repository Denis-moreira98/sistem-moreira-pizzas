import { Router, Request, Response } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";

import { AddOrderController } from "./controllers/order/AddOrderController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";

import UploadConfig from "./config/multer";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

const upload = multer(UploadConfig.upload("./tmp"));

//-- ROTAS USER --

router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthUserController().handle);

router.get("/me", isAuthenticated, new DetailUserController().handle);

// -- ROTAS CATEGORY --

router.post("/category", new CreateCategoryController().handle);

router.get("/category", new ListCategoryController().handle);

// -- ROTAS DE PRODUCT --

router.post(
   "/product",
   isAuthenticated,
   upload.single("file"),
   new CreateProductController().handle
);

router.get(
   "/category/product",
   isAuthenticated,
   new ListByCategoryController().handle
);

// -- ROTAS ORDER --

router.post("/order", isAuthenticated, new CreateOrderController().handle);
router.delete("/order", isAuthenticated, new RemoveOrderController().handle);

router.post("/order/add", isAuthenticated, new AddOrderController().handle);

router.delete(
   "/order/remove",
   isAuthenticated,
   new RemoveItemController().handle
);

router.put("/order/send", isAuthenticated, new SendOrderController().handle);

router.get("/orders", isAuthenticated, new ListOrderController().handle);

export { router };
