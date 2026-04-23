import { Response } from 'express';
import { AuthRequest } from '../middleware/rbacMiddleware';
import { getAllPermissions } from '../models/permissionModel';

export const listPermissions = async (req: AuthRequest, res: Response) => {
  const permissions = await getAllPermissions();
  res.render('permissions/list', { title: 'Permission Management', permissions, user: req.user });
};