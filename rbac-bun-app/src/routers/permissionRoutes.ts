import { Router } from 'express';
import { listPermissions } from '../controllers/permissionController';
import { checkPermission, simulateAuth } from '../middleware/rbacMiddleware';

const router = Router();

router.use(simulateAuth);
router.get('/', checkPermission('user:view'), listPermissions);

export default router;