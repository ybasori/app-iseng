import { promisify, renderHtml } from "@app/helper";
import { Request, Response } from "express"
import jwt from 'jsonwebtoken';



const homeController ={
    any: async (req:Request, res: Response)=>{
        try {
        const token = req.cookies.token;

        console.log(token)

        const decoded:any = await promisify(jwt.verify)(token, process.env.SECRET_KEY ?? "");

        delete decoded.id;
        res.status(200).send(renderHtml({reducer: {
            ...(!!decoded?{auth:{userData:decoded}}:{})
        }}))

    }catch(err){
        console.log(err);
        res.status(200).send(renderHtml({reducer: {
        }}))
    }

    }
}

export default homeController;