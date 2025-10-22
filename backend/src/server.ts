import cors from "cors";
import { router } from "./routes";
import { NextFunction, Request, Response } from "express";

const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: "error",
        message: "Internal Server Error."
    })
})

app.listen(process.env.PORT, () => console.log("port 3333"))