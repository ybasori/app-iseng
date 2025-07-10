import { promisify } from "@app/helper";
import Validator from "@app/helper/Validator";
import BlogContent from "@app/models/BlogContent";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const convertToObj = (input:any) => Object.entries(input).reduce((acc, [key, value]) => {
  const match = key.match(/^(\w+)\[(\w+)\]$/);
  if (match) {
    const [, outerKey, innerKey] = match;
    acc[outerKey] = acc[outerKey] || {};
    
    // If value looks like a number (e.g., '1' or '3.5'), convert it; otherwise, keep as string
    const maybeNumber = Number(value);
    acc[outerKey][innerKey] = !isNaN(maybeNumber) && (value as any).trim() !== '' ? maybeNumber : value;
  }
  return acc;
}, {} as Record<string, any>);

const blogController = {
  listContent: async (req: Request, res: Response) => {
    try {
      const token = req.cookies.token;

      const decoded: any = await promisify(jwt.verify)(
        token,
        process.env.SECRET_KEY ?? ""
      );

      let filter = {};
      let pagination = {};
      const query = convertToObj(req.query);

      if (!!query.page) {
        pagination = { ...pagination, page: query.page };
      }

      if (!!req.query.sort) {
        pagination = { ...pagination, sort: req.query.sort };
      }
      if (!!req.query.filter) {
        filter = {...filter, ...(req.query.filter as any)};
      }

      const blogContentModel = new BlogContent();
      const blogContents = await blogContentModel.getByFilter({
        filter: { created_by_user_id: decoded.id, ...filter },
        pagination,
        join: [{name:"created_by", show: ["name"]}],
        show: ["uid", "title", "created_at", "updated_at"]
      });
      const [[blogContentTotal]] = await blogContentModel.countByFilter({
        created_by_user_id: decoded.id,
      });
      return res.status(200).json({
        statusCode: 200,
        message: "Success!",
        result: {
          data: blogContents,
          total: blogContentTotal.total,
        },
      });
    } catch (err:any) {
      return res.status(500).json({
        statusCode: 500,
        message: err.message,
      });
    }
  },
  createContent: async (req: Request, res: Response) => {
    try {
      const token = req.cookies.token;

      const decoded: any = await promisify(jwt.verify)(
        token,
        process.env.SECRET_KEY ?? ""
      );
      const uid = uuidv4();
      const rules = {
        title: {
          label: "Title",
          rule: {
            required: true,
          },
        },
        content: {
          label: "Content",
          rule: {
            required: true,
          },
        },
      };

      const validate = await Validator.make(req.body, rules);
      if (validate.fails()) {
        return res.status(400).json({
          statusCode: 400,
          message: "Bad request!",
          error: validate.getMessages(),
        });
      }

      const blogContentModel = new BlogContent();
      await blogContentModel.store({
        title: req.body.title,
        content: req.body.content,
        created_by_user_id: decoded.id,
        uid,
      });
      const [blogContent] = await blogContentModel.getByFilter({
        filter: { uid },
      });
      return res.status(200).json({
        statusCode: 200,
        message: "Success!",
        result: blogContent,
      });
    } catch (err) {
      return res.status(500).json({
        statusCode: 500,
        message: err,
      });
    }
  },
};

export default blogController;
