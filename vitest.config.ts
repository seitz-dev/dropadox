import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'

export default defineConfig({
    test: {
        projects: [
            {
                test: {
                    globals: true,
                    name: 'unit',
                    include: ['test/{e2e,unit}/**/*.{test,spec}.ts'],
                    environment: 'node',
                },
            },
            await defineVitestProject({
                test: {
                    globals: true,
                    name: 'nuxt',
                    include: ['test/nuxt/**/*.{test,spec}.ts'],
                    environment: 'nuxt',
                },
            }),
        ],
    },
})
