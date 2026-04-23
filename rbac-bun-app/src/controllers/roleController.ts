import { Response } from 'express';
import { AuthRequest } from '../middleware/rbacMiddleware';
import { getAllRoles, createRole, deleteRole } from '../models/roleModel';
import { getAllPermissions, assignPermissionToRole } from '../models/permissionModel';

export const listRoles = async (req: AuthRequest, res: Response) => {
  const roles = await getAllRoles();
  const permissions = await getAllPermissions();
  res.render('roles/list', { title: 'Role Management', roles, permissions, user: req.user });
};

export const storeRole = async (req: AuthRequest, res: Response) => {
  await createRole(req.body.name);
  res.redirect('/roles');
};

export const removeRole = async (req: AuthRequest, res: Response) => {
  await deleteRole(parseInt(req.params.id));
  res.redirect('/roles');
};

export const assignPermission = async (req: AuthRequest, res: Response) => {
  const { role_id, permission_id } = req.body;
  await assignPermissionToRole(parseInt(role_id), parseInt(permission_id));
  res.redirect('/roles');
};