import { Request, Response, NextFunction } from "express";

const verifyRoles = (...allowedRoles: any[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArr = [...allowedRoles];
    console.log(rolesArr);
    console.log(req.roles);
    const result = req.roles.map((role: any) => rolesArr.includes(role.id)).find((val: boolean) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
};

export default verifyRoles;
