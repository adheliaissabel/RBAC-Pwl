import { Router } from "express";
import { listUsers } from "../controllers/userController";
import { checkPermission } from "../middleware/rbacMiddleware";

const router = Router();

router.get("/", checkPermission("user:view"), listUsers);

export default router;