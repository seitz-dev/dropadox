import { describe, expect, it } from 'vitest';
import jwt from 'jsonwebtoken';
import { fetch } from '@nuxt/test-utils';
import setupNuxt from '../../../setup.nuxt';
import createUser from '../../../../server/utils/createUser';

describe('POST /api/verifyToken', async () => {
    await setupNuxt();


    it('returns payload for a valid token', async () => {
        const testUser = await createUser({
            username: 'testuser',
            password: 'testpassword',
            email: 'testuser@example.com'
        });

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