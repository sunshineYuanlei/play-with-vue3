import { createVNode, render } from "vue"
import Notice from "./toast.vue"

interface IOptions {
  message: string
  toast_type?: "success" | "alert" | "warning" | "error"
  duration?: number
}
let mountNode = null

export default (options: IOptions) => {
  //确保只存在一个弹框，如果前一个弹窗还在，就移除
  if (mountNode) {
    document.body.removeChild(mountNode)
    mountNode = null
  }

  // 核心逻辑开始
  const duration = options.duration | 2000
  //将options参数传入，并将Notice组件转换成虚拟DOM，并赋值给app
  const app = createVNode(Notice, {
    ...options,
    duration,
    show_toast: true,
  })
  //创建一个空的div
  mountNode = document.createElement("div")
  //render函数的作用就是将Notice组件的虚拟DOM转换成真实DOM并插入到mountNode元素里
  render(app, mountNode)
  //然后把转换成真实DOM的Notice组件插入到body里
  document.body.appendChild(mountNode)
  // 核心逻辑结束

  //创建定时器，duration时间后将mountNode移除
  let timer = setTimeout(() => {
    document.body.removeChild(mountNode)
    mountNode = null
    clearTimeout(timer)
  }, duration)
}
