import { Request, Response, NextFunction } from "express";

export const authorize =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = req.user as { role: string };

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: You do not have access" });
    }

    next();
  };
