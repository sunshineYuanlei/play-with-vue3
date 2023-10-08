import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import VueSetupExtend from "vite-plugin-vue-setup-extend"
import AutoImport from "unplugin-auto-import/vite"
import ViteImages from 'vite-plugin-vue-images'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  plugins: [
    vue({
      refTransform: true, // 开启ref转换
    }),
    VueSetupExtend(),
    AutoImport({
      dts: "src/auto-imports.d.ts", // 可以自定义文件生成的位置，默认是根目录下
      imports: ["vue"],
    }),
    ViteImages({
      // Vite中不支持require, 因此使用此插件自动导入图片
      dirs: ["src/assets/image"], // 指明图片存放目录
    }),
  ],
})
