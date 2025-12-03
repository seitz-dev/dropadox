import { users, userSettings } from "../database/schema";
import { useDrizzle } from './useDrizzle';

interface CreateUserRequest {
    email: string;
    username: string;
    password: string;
}

export default async function createUser(request: CreateUserRequest) {
    const newUser = await useDrizzle().insert(users).values({
        name: request.username,
        password: request.password,
        email: request.email
    }).returning().get();

    const newUserSettings = await useDrizzle().insert(userSettings).values({
        userID: String(newUser.id),
        colorMode: "light"
    }).returning().get();

    return { user: newUser, settings: newUserSettings };
}