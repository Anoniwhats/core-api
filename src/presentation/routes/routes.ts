import { Request, Response, Router } from "express";

const router = Router();

router.get("/health", (_req: Request, res: Response) => {
	return res.json({ status: "ok", message: "API funcionando! 🚀" });
});

export default router;
