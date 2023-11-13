import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import { viteMockServe } from 'vite-plugin-mock'

const localEnabled = process.env.USE_MOCK || false;
const prodEnabled = process.env.USE_CHUNK_MOCK || false;

export default function createVitePlugins(viteEnv, isBuild = false) {
    console.log('process.env----:', process.env)
    const vitePlugins = [
        vue(),
        viteMockServe({
            mockPath: 'src/mock', // mock文件地址
            localEnabled: false, // 开发打包开关
            prodEnabled: false, // 生产打包开关
            // 这样可以控制关闭mock的时候不让mock打包到最终代码内
            injectCode: `
                import { setupProdMockServer } from '../../src/mockProdServer';
                setupProdMockServer();
            `,
            supportTs: false
        })
        ]
    vitePlugins.push(createAutoImport())
    // vitePlugins.push(createSetupExtend())
    // vitePlugins.push(createSvgIcon(isBuild))
    // isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}
