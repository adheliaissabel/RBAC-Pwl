import { Request, Response, NextFunction } from 'express';
import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

export interface AuthRequest extends Request {
  user?: { id: number; role_id: number; username: string };
}

interface PermissionRow extends RowDataPacket {
  name: string;
}

export const checkPermission = (requiredPermission: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).send('Unauthorized: silakan login dahulu');

    const [rows] = await pool.query<PermissionRow[]>(`
      SELECT p.name FROM users u
      JOIN roles r ON u.role_id = r.id
      JOIN role_permissions rp ON r.id = rp.role_id
      JOIN permissions p ON rp.permission_id = p.id
      WHERE u.id = ?
    `, [userId]);

    const permissions = rows.map(row => row.name);

    if (permissions.includes(requiredPermission)) {
      next();
    } else {
      res.status(403).send('Forbidden: Anda tidak memiliki akses');
    }
  };
};

export const simulateAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  req.user = { id: 1, role_id: 1, username: 'admin' };
  next();
};