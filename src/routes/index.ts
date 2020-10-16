import { Router, Response } from "express";
const router = Router();

router.get('/', (_, res:Response) => {
    return res.json({message: "🚀 GO ahead!"})
});

export default router;