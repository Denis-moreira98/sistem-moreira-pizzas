import { Router, Request, Response } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

const router = Router();

//-- ROTAS USER --

router.post("/users", new CreateUserController().handle);

router.post("/session", new AuthUserController().handle);

router.get("/me", isAuthenticated, new DetailUserController().handle);

// -- ROTAS CATEGORY --

router.post("/category", new CreateCategoryController().handle);

router.get("/category", new ListCategoryController().handle);

export { router };
