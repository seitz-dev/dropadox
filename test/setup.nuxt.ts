import { setup } from "@nuxt/test-utils";

export default async function setupNuxt() {
    return await setup({
        build: false,
        buildDir: '.output',
        server: true,
        nuxtConfig: {
            nitro: {
                output: {
                    dir: '.output'
                }
            }
        }
    });
}