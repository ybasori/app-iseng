import { renderHtml } from "@app/helper";
import { Request, Response } from "express"
import jwt from 'jsonwebtoken';



const homeController ={
    index: (req:Request, res: Response)=>{
        const token = req.cookies.token;

        jwt.verify(token, process.env.SECRET_KEY ?? "", (err:any, decoded:any) => {
            
            res.status(200).send(renderHtml({reducer: {
                counter:{
                    count:3456
                },
                ...(!!decoded?{auth:{userData:decoded}}:{})
            }}))
        });
    },
    any: (req:Request, res: Response)=>{
        const token = req.cookies.token;

        jwt.verify(token, process.env.SECRET_KEY ?? "", (err:any, decoded:any) => {
            
            res.status(200).send(renderHtml({reducer: {
                ...(!!decoded?{auth:{userData:decoded}}:{})
            }}))
        });
    }
}

export default homeController;