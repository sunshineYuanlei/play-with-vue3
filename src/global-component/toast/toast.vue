<template>
  <div :class="`notice ${toast_type}`" v-if="show_toast">
    <!-- <div class="icon">
      <WlPic :src="toast_icon" alt="" />
    </div> -->
    <div>
      <el-icon :size="20" style="vertical-align: middle">
        <CircleCheck v-if="toast_icon === 'success'" color="#70cda1" />
        <CircleClose v-if="toast_icon === 'error'" color="#ff4545" />
        <ChatDotSquare v-if="toast_icon === 'alert'" color="#1c9fff" />
        <Warning v-if="toast_icon === 'warning'" color="#ff9444" />
      </el-icon>
    </div>

    <p class="text">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { ElIcon } from "element-plus"
import {
  CircleCheck,
  CircleClose,
  ChatDotSquare,
  Warning,
} from "@element-plus/icons-vue"
import "element-plus/es/components/icon/style/css"
// import {
//   toast_success_icon,
//   toast_alert_icon,
//   toast_warning_icon,
//   toast_error_icon,
// } from "@packages/utils/cdn"
// import WlPic from "@packages/components/Common/WlPic/src/index.vue"

interface Props {
  show_toast: boolean
  message: string
  toast_type?: "success" | "alert" | "warning" | "error"
  duration?: number
}
const props = withDefaults(defineProps<Props>(), {
  show_toast: true,
  message: "",
  toast_type: "success",
  duration: 1500,
})

const toast_icon = computed(() => {
  // const dict = {
  //   success: toast_success_icon,
  //   alert: toast_alert_icon,
  //   warning: toast_warning_icon,
  //   error: toast_error_icon,
  // };
  const dict = {
    success: "success",
    alert: "alert",
    warning: "warning",
    error: "error",
  }
  return dict[props.toast_type]
})
</script>

<style lang="scss" scoped>
$default-black-color: black;

@keyframes slideInDown {
  from {
    -webkit-transform: translate3d(-50%, -100%, 0);
    transform: translate3d(-50%, -100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(-50%, 20px, 0);
    transform: translate3d(-50%, 20px, 0);
  }
}

.notice {
  box-sizing: border-box;
  padding: 8px 16px;
  color: $default-black-color;
  animation: slideInDown 1s;
  display: inline-flex;
  align-items: center;
  border-radius: 30px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate3d(-50%, 20px, 0);
  z-index: 9999;
  font-size: 14px;

  // .icon {
  //   width: 18px;
  //   height: 18px;
  //   flex-shrink: 0;
  // }

  .text {
    flex: 1;
    word-break: break-all;
    margin-left: 5px;
  }

  &.success {
    border: 1px solid #70cda1;
    background-color: #f1faf5;
  }

  &.alert {
    border: 1px solid #1c9fff;
    background-color: #e8f6ff;
  }

  &.warning {
    border: 1px solid #ff9444;
    background-color: #fff5ed;
  }

  &.error {
    border: 1px solid #ff4545;
    background-color: #ffeded;
  }
}
</style>
