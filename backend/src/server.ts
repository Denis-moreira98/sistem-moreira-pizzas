import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";

import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use(
   (err: Error, req: express.Request, res: Response, next: NextFunction) => {
      if (err instanceof Error) {
         //se for uma instancia do tipo error
         return res.status(400).json({
            error: err.message,
         });
      }
      return res.status(400).json({
         error: "error",
         message: "Internal  server error",
      });
   }
);

app.listen(3333, () => console.log("Server online"));
