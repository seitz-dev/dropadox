import { expect, it, vi } from "vitest";
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from '../../../../server/database/schema';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../../../../shared/types/UserPayload';
import { getUserFromPayload, getUserPayloadFromToken } from '../../../../server/utils/getUser';

it('returns a user payload from valid token', () => {
    const fakePayload: UserPayload =
    {
        id: 1,
        username: 'Test User',
        emailAddress: 'test@example.com'
    };

    const token = jwt.sign(fakePayload, process.env.JSON_SECRET_KEY!);
    const result = getUserPayloadFromToken(token);

    expect(result.id).toEqual(fakePayload.id);
    expect(result.username).toEqual(fakePayload.username);
    expect(result.emailAddress).toEqual(fakePayload.emailAddress);
});

const mockDb = {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    get: vi.fn()
}

vi.stubGlobal('useDrizzle', () => mockDb);

it('get a user via token', async () => {
    const fakeUser = { id: 1, username: 'Test User', emailAddress: 'test@example.com' };

    mockDb.get.mockResolvedValueOnce(fakeUser);

    const payload = { id: 1 };

    const result = await getUserFromPayload(payload);

    expect(result).toEqual(fakeUser);
    expect(mockDb.from).toHaveBeenCalledWith(schema.users);
    expect(mockDb.where).toHaveBeenCalled();
    expect(mockDb.get).toHaveBeenCalled();
})
