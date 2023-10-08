<template>
  <el-input
    v-model="state.inputValue"
    @keyup.enter="addList"
    placeholder="请输入"
  />
  <el-button type="primary" @click="addList">添加</el-button>

  <el-tabs @tab-change="tabChange">
    <el-tab-pane label="全部">
      <el-card class="box-card" shadow="always">
        <template #header>
          <div class="card-header">
            <span>所有任务</span>
          </div>
        </template>

        <div v-for="(item, i) in state.todoList" :key="i" class="list">
          <div class="text">
            <div>
              <span>{{ item.name }}</span>
            </div>
            <div>
              <el-button type="text" @click="changeStatus(item)"
                >{{ showActionText(item.checked) }}
              </el-button>
              <el-button type="text" @click="deleteList(item)">删除 </el-button>
            </div>
          </div>
          <el-divider />
        </div>
      </el-card>
    </el-tab-pane>

    <el-tab-pane label="未完成的任务">
      <el-card class="box-card" shadow="always">
        <template #header>
          <div class="card-header">
            <span>未办理的任务</span>
          </div>
        </template>

        <div v-for="(item, i) in state.list1" :key="i" class="list">
          <div class="text">
            <div>
              <span>{{ item.name }}</span>
            </div>

            <div>
              <el-button type="text" @click="changeStatus(item)"
                >开始
              </el-button>

              <el-button type="text" @click="deleteList(item)">删除 </el-button>
            </div>
          </div>
          <el-divider />
        </div>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="进行中的任务">
      <el-card class="box-card" shadow="always">
        <template #header>
          <div class="card-header">
            <span>进行中的任务</span>
          </div>
        </template>
        <div v-for="(item, i) in state.list3" :key="i" class="list">
          <div class="text">
            <div>
              <span>{{ item.name }}</span>
            </div>

            <div>
              <el-button type="text" @click="changeStatus(item)"
                >继续
              </el-button>

              <el-button type="text" @click="deleteList(item)">删除 </el-button>
            </div>
          </div>
          <el-divider />
        </div>
      </el-card>
    </el-tab-pane>
    <el-tab-pane label="已完成的任务">
      <el-card class="box-card" shadow="always">
        <template #header>
          <div class="card-header">
            <span>已完成的任务</span>
          </div>
        </template>
        <div v-for="(item, i) in state.list2" :key="i" class="list">
          <div class="text">
            <div>
              <span>{{ item.name }}</span>
            </div>

            <div>
              <el-button type="text" @click="changeStatus(item)"
                >取消
              </el-button>

              <el-button type="text" @click="deleteList(item)">删除 </el-button>
            </div>
          </div>
          <el-divider />
        </div>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import ToDoList from "./todo-list.vue"
import { reactive, toRefs, defineComponent, getCurrentInstance } from "vue"

export default defineComponent({
  extends: ToDoList,
  setup(props, context) {
    console.log("props", props, context)
    // 核心逻辑-开始
    // 在setup函数中定义变量,实现新增事项功能。
    const state = reactive({
      todoList: [{ name: "我", checked: "1", isDelete: false }], // 所有列表
      list1: [], //未办事项列表
      list2: [], //已办事项列表
      list3: [], // 进行中事项列表
      inputValue: "", //输入框的值
    })

    //新增事项
    const addList = () => {
      if (state.inputValue) {
        state.todoList.push({
          name: state.inputValue,
          checked: "1",
          isDelete: false,
        })
        state.inputValue = null
        changeListDelete()
      }
    }

    //删除事项
    const deleteList = (item) => {
      item.isDelete = !item.isDelete
      changeListDelete()
    }

    const changeListDelete = () => {
      state.list1 = state.todoList.filter(
        (key) => key.checked === "1" && !key.isDelete
      )
      state.list2 = state.todoList.filter(
        (key) => key.checked === "3" && !key.isDelete
      )
      state.list3 = state.todoList.filter(
        (key) => key.checked === "2" && !key.isDelete
      )
      state.todoList = state.todoList.filter((key) => !key.isDelete)
    }

    // 已办事项和代办事项的相互转换
    const changeStatus = (item) => {
      if (item.checked === "1") {
        item.checked = "2"
      } else if (item.checked === "2") {
        item.checked = "3"
      } else {
        item.checked = "1"
      }
      state.list1 = state.todoList.filter((key) => key.checked === "1")
      state.list2 = state.todoList.filter((key) => key.checked === "3")
      state.list3 = state.todoList.filter((key) => key.checked === "2")
    }

    const tabChange = (e) => {
      changeListDelete()
    }

    // 核心逻辑-结束

    const showActionText = (checked) => {
      const stateMap = { 1: "开始", 2: "继续", 3: "取消" }
      return stateMap[checked]
    }

    return {
      changeStatus,
      addList,
      showActionText,
      deleteList,
      tabChange,
      state,
    }
  },
})
</script>

<style scoped></style>
