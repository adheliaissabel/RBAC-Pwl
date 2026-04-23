import { Router } from 'express';
import { listUsers, storeUser, removeUser, updateUserHandler } from '../controllers/userController';
import { checkPermission, simulateAuth } from '../middleware/rbacMiddleware';

const router = Router();

router.use(simulateAuth);

router.get('/', checkPermission('user:view'), listUsers);
router.post('/', checkPermission('user:create'), storeUser);
router.post('/:id/update', checkPermission('user:edit'), updateUserHandler);
router.post('/:id/delete', checkPermission('user:delete'), removeUser);

export default router;