<template>
  <div ref="echart" :style="{ height: height, width: width }"></div>
</template>

<script setup>
import { getCurrentInstance, toRefs, reactive, watch, onMounted } from "vue"
import * as echarts from "echarts"
import useResize from "../hooks/useResize"

const { proxy } = getCurrentInstance() // 获取实例中的proxy

let echart
let echartInstance

const props = defineProps({
  // 数据
  data: {
    type: Array,
    default: [
      { value: 40, name: "rose 1" },
      { value: 38, name: "rose 2" },
      { value: 32, name: "rose 3" },
    ],
  },
  // 高度
  height: {
    type: [Number, String],
    default: "300px",
  },
  // 宽度
  width: {
    type: [Number, String],
    default: "100%",
  },
})

const { data } = toRefs(props)

const data1 = reactive({
  option: {
    legend: {
      top: "bottom",
    },
    toolbox: {
      show: false,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b} : {c} ({d}%)",
    },
    series: [
      {
        name: "Nightingale Chart",
        type: "pie",
        radius: [10, 120],
        center: ["50%", "45%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: data.value,
      },
    ],
  },
})

const { option } = toRefs(data1)

// 观察 data ，重新绘制
watch(
  data,
  (newValue) => {
    option.value.series[0].data = newValue
  },
  { deep: true }
)
watch(
  option,
  (newValue) => {
    echartInstance.setOption(newValue, true)
  },
  { deep: true }
)

onMounted(() => {
  echart = proxy.$refs.echart // 获取的DOM根节点
  echartInstance = echarts.init(echart, "macarons") // 初始化 echart
  echartInstance.setOption(option.value, true) // 绘制
  // notMerge 可选。是否不跟之前设置的 option 进行合并。默认为 false。即表示合并。合并的规则，详见 组件合并模式。如果为 true，表示所有组件都会被删除，然后根据新 option 创建所有新组件。
  // setOption 见 https://echarts.apache.org/zh/api.html#echartsInstance.setOption
})

function resize() {
  echartInstance.resize()
}

// 暴露函数 （供hook调用）
defineExpose({
  resize,
})

useResize()
</script>
