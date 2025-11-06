import HttpException from "../interfaces/http-exception.js";
import { getFixedLists, setFixed } from "../services/fixed.js";

export const fixedLists = async (req, res)=>{
    const result = await getFixedLists();
    res.status(200).json(result);
}

export const fixedSet = async(req, res)=>{
    try{
        if (req.path.startsWith('/fixed')) {
            res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.set('Pragma', 'no-cache');
            res.set('Expires', '0');
  }
        const result = await setFixed(req.body);
        console.log(-100);
        res.status(200).json(result);
    } catch(err){
        return res.status(400).json(err);
    }

}