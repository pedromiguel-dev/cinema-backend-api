import { Request, Response, NextFunction } from "express";

const verifyRoles = (...allowedRoles: any[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req?.roles) return res.sendStatus(403);
    const rolesArr = allowedRoles;
    const result = req.roles.map((role: any) => rolesArr[0].includes(role.id)).find((val: boolean) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

export default verifyRoles;
