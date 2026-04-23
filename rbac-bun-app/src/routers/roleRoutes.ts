import { Router } from 'express';
import { listRoles, storeRole, removeRole, assignPermission } from '../controllers/roleController';
import { checkPermission, simulateAuth } from '../middleware/rbacMiddleware';

const router = Router();

router.use(simulateAuth);

router.get('/', checkPermission('user:view'), listRoles);
router.post('/', checkPermission('user:create'), storeRole);
router.post('/:id/delete', checkPermission('user:delete'), removeRole);
router.post('/assign-permission', checkPermission('user:edit'), assignPermission);

export default router;