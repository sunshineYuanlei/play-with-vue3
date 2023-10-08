<template>
  <el-cascader
    v-bind="{ ...$props, ...$attrs }"
    :options="state.options"
    @change="handleChange"
  ></el-cascader>
</template>
<script>
import { ElCascader } from "element-plus"
import { defineComponent, reactive, watch } from "vue"

export default defineComponent({
  extends: ElCascader,
  setup(props, { emit, attrs, expose, slots }) {
    console.log("props", props, emit, attrs, expose, slots)
    const state = reactive({
      options: [],
    })

    const mapArr = (arr) => {
      return arr.map((item) => ({
        ...item,
        label: item.label + "-test",
        children: item.children?.length ? mapArr(item.children) : [],
      }))
    }

    watch(
      () => props.options,
      (val) => {
        state.options = mapArr(val)
        // console.log(state.options)
        // console.log(props, val)
      },
      {
        deep: true,
        immediate: true,
      }
    )

    const handleChange = (value) => {
      console.log("child-cascader", value)
      emit('change', value)
    }

    return {
      state,
      handleChange,
    }
  },
})
</script>

<style scoped></style>
