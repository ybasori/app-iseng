import { promisify, renderHtml } from "@app/helper";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const homeController = {
  any: async (req: Request, res: Response) => {
    return res.json({
      aaa: "aa"
    })
  },
};

export default homeController;
