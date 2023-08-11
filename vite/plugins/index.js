import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import { viteMockServe } from 'vite-plugin-mock'

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [
        vue(),
        viteMockServe({
            mockPath: 'src/mock',
            enable: true,
            localEnabled: true,
            supportTs: false,
            watchFiles: true
        })]
    vitePlugins.push(createAutoImport())
    // vitePlugins.push(createSetupExtend())
    // vitePlugins.push(createSvgIcon(isBuild))
    // isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}
