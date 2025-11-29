import multer from "multer";
import { defineEventHandler, readMultipartFormData } from "h3";

const upload = multer({ dest:"uploads/"})

export default defineEventHandler( async (event) => {
    const formdata = readMultipartFormData(event); 
    
})