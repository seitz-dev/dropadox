import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fetch } from '@nuxt/test-utils';
import setupNuxt from '../../../setup.nuxt';
import bcrypt from 'bcryptjs';


describe('POST /api/register', async () => {
    await setupNuxt();

    it('creates a new user and user settings', async () => {
        const payload = {
            username: 'newuser',
            password: 'password123',
            email: 'newuser@example.com'
        }

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: payload.email,
                username: payload.username,
                password: payload.password
            })
        });

        const body = await res.json();
        expect(body.user.email).toEqual(payload.email);
        expect(body.user.name).toEqual(payload.username);
        expect(bcrypt.compareSync(payload.password, body.user.password)).toBe(true);
    });
});