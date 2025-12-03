import { describe, expect, it } from 'vitest';
import jwt from 'jsonwebtoken';
import { fetch } from '@nuxt/test-utils';
import setupNuxt from '../../../setup.nuxt';
import createUser from '../../../../server/utils/createUser';
import bcrypt from 'bcryptjs';

await setupNuxt();

const unhashedPassword = 'testpassword';
const testUser = await createUser({
    username: Date.now().toString(),
    password: await bcrypt.hash(unhashedPassword, 10),
    email: `testuser${Date.now()}@example.com`
});

describe('POST /api/verifyToken', async () => {


    it('returns payload for a valid token', async () => {

        const fakePayload = { id: testUser.user.id, email: testUser.user.email };

        const token = jwt.sign(fakePayload, process.env.JSON_SECRET_KEY!);

        const result = await fetch('/api/verifyToken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });
        const body = await result.json();

        expect(body.id).toEqual(fakePayload.id);
        expect(body.email).toEqual(fakePayload.email);
    })

    it('returns 400 error if no token provided', async () => {
        const response = await fetch('/api/verifyToken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        expect(response.status).toBe(400);
    });

});

describe('POST /api/login', async () => {
    it('logs in with correct email and password', async () => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: testUser.user.email,
                password: unhashedPassword
            })
        });

        const body = await res.json();

        if (body.error) {
            throw new Error(`Login failed: ${body.statusCode} ${body.statusMessage}`);
        }

        const token = body.token;
        expect(token).toBeDefined();

        const decoded: any = jwt.verify(token, process.env.JSON_SECRET_KEY!);
        expect(decoded.id).toEqual(testUser.user.id);
        expect(decoded.emailAddress).toEqual(testUser.user.email);
    });

    it('fails login with incorrect password', async () => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: testUser.user.email,
                password: 'wrongpassword'
            })
        });

        expect(res.status).toBe(401);

    });

    it('fails login with non-existent email', async () => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'nonexistent@example.com',
                password: 'somepassword'
            })
        });

        expect(res.status).toBe(404);
    });
});