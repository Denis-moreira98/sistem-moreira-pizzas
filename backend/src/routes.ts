import { Router, Request, Response } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";

import UploadConfig from "./config/multer";

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

export { router };
