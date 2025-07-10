import Validator from "@app/helper/Validator";
import { Request, Response } from "express"


const blogController = {
    createContent: async (req: Request, res: Response) => {
        try {

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
        } catch (err) {
            return res.status(500).json({
                statusCode: 500,
                message: err,
            });
        }
    }
}

export default blogController;