import HttpException from "../interfaces/http-exception.js";
import { delCustom, getCustoms, addCustom} from "../services/custom.js";

export const customLists = async (req, res)=>{
    const result = await getCustoms();
    res.status(200).json(result);
}

export const postCustom = async(req, res)=>{
    try{
        const ext = req.body.ext;
        if(!ext || ext.length > 20) return res.status(400).json({message: 'invalid ext'});
        const count = await getCustoms();
        
        if(count.length >= 200) return res.status(400).json({message : 'limit over'});
        for (const row of count) {
            if (row.ext === ext) {
                return res.status(409).json({message: "duplicate"});
            }
        }

        const result = await addCustom(req.body);
        res.status(201).json(result);
    } catch{
        throw new HttpException(500, "Internal Error")
    }

}

export const deleteCustom = async(req, res)=>{
    try{
        const id = Number(req.params.id);
        const result = await delCustom(id);
        res.status(205).json({message: '삭제 됐습니다.'});

    } catch{
        throw new HttpException(500, "Internal Error");
    }
}