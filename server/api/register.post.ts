import bcrypt from "bcryptjs";
import { users } from "../database/schema";
import { userSettings } from "../database/schema";
import createUser from "../utils/createUser";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { username, password, email } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserResponse = await createUser({
        username,
        password: hashedPassword,
        email
    })

    return { user: newUserResponse.user, settings: newUserResponse.settings };
});