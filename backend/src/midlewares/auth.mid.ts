import { verify } from "jsonwebtoken";
import { HTTP_UNAUTHORIZED } from "../constants/http_status";


export default (req: any, res:any, next:any)=>{
    const token = req.headers.access_token as string;
    if(!token) return res.status(HTTP_UNAUTHORIZED).send();

    //verify the token
    try{
        const decoderUser = verify(token, process.env.JWT_SECRET!);
        req.user = decoderUser;

    }catch(error){
        res.status(HTTP_UNAUTHORIZED).send();
    }

    return next();
}