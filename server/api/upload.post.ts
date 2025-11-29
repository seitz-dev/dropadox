import multer from "multer";
import { defineEventHandler, readMultipartFormData } from "h3";
import path from "path";
import fs from "fs";


const upload = multer({ dest:"uploads/"})

export default defineEventHandler( async (event) => {
    const formdata = await readMultipartFormData(event); 
    
    if (!formdata){
        return {error:"failded to grab form data"};
    }
    const file = formdata.find(item => item.name === "file");

    if (!file){
        return {error:"failed to get file"}
    }
    //if(!file.filename){
    //    return {error:"file has no filename"};
    //}
    const uuid = crypto.randomUUID();
    const filename = file.filename?.split(".")[0] + `${uuid}.` + file.filename?.split(".")[1] || `upload-${uuid}`;

    const uploadPath = path.join(
        process.cwd(),
        "public/uploads",
        filename
    );

    fs.writeFileSync(uploadPath, file.data);

    return {
        name: file.filename,
        type: file.type,
        size: file.data.length
    };

})