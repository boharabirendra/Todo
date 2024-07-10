import todoRouter from "./todos";
import userRouter from "./users";
import authRouter from "./auth";
import refreshRouter from "./refresh"
import express from "express";


const router = express();

router.use("/todos",todoRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/refresh", refreshRouter);


export default router;

