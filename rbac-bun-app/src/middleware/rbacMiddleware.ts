import { Request, Response, NextFunction } from "express";
import pool from "../config/database";

interface AuthRequest extends Request {
  user?: { id: number; role_id: number };
}

export const checkPermission = (required: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    if (!userId) return res.status(401).send("Unauthorized");

    const [rows] = await pool.query(`
      SELECT p.name FROM users u
      JOIN role_permissions rp ON u.role_id = rp.role_id
      JOIN permissions p ON rp.permission_id = p.id
      WHERE u.id = ?
    `, [userId]);

    const permissions = (rows as any[]).map(r => r.name);

    if (!permissions.includes(required)) {
      return res.status(403).send("Forbidden");
    }

    next();
  };
};