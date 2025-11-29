import jwt, { JwtPayload } from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const {token} = body;

    if(!token){
        throw createError({
            statusText: "Token must be in the body.",
            status: 400
        })
    }

    const payload = jwt.verify(String(token), process.env.JSON_SECRET_KEY!) as JwtPayload;

    return payload
}); 