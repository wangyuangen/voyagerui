<template>
      <el-dialog
        v-model="state.showDialog"
        destroy-on-close
        :title="title"
        append-to-body
        draggable
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="900px"
    >
    <div style="padding: 0px 0px 8px 8px; background-color: var(--ba-bg-color)">
      <el-row :gutter="8" style="width: 100%">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-card shadow="never" :body-style="{ paddingBottom: '0' }" style="margin-top: 8px">
            <el-form :model="state.pageFilter" :inline="true" @submit.stop.prevent>
              <el-form-item>
                <el-input v-model="state.pageFilter.keyword" placeholder="关键字" @keyup.enter="onQuery" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
              </el-form-item>
            </el-form>
          </el-card>

          <el-card shadow="never" style="margin-top: 8px">
            <el-table
              ref="userStaffTableRef"
              :data="state.pageData?.data??[]"
              style="width: 100%"
              v-loading="state.loading"
              row-key="id"
              :highlight-current-row="!multiple"
              @row-click="onRowClick"
              @row-dblclick="onRowDbClick"
              @current-change="onTableCurrentChange"
                >
                <el-table-column v-if="multiple" type="selection" width="55" />
                <el-table-column prop="jobNo" label="工号" min-width="80" show-overflow-tooltip/>
                <el-table-column prop="realName" label="真实姓名" min-width="100" show-overflow-tooltip/>
                <el-table-column prop="user.mobile" label="手机" min-width="100" show-overflow-tooltip/>
                <el-table-column prop="post.name" label="岗位" min-width="100" show-overflow-tooltip/>
                <el-table-column label="是否为主管" width="100">
                    <template #default="{row}">
                        <el-tag type="danger" v-if="row.isManager">是</el-tag>
                        <el-tag type="success" v-else>否</el-tag>
                    </template>
                </el-table-column> 
                <el-table-column prop="org.name" label="直属机构" min-width="100" show-overflow-tooltip/>
            </el-table>
            <div class="my-flex my-flex-end" style="margin-top: 20px">
              <el-pagination
                v-model:currentPage="state.pageData.currentPage"
                v-model:page-size="state.pageData.pageSize"
                :total="state.pageData.totalCount"
                :page-sizes="[10, 20, 50, 100]"
                small
                background
                @size-change="onPageSizeChange"
                @current-change="onPageNumberChange"
                layout="total, sizes, prev, pager, next"
              />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close" size="default">取 消</el-button>
        <el-button type="primary" @click="onSure" size="default" :loading="sureLoading">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup name="console/userStaff/select">
import { ElTable } from 'element-plus';
import { reactive, ref } from 'vue';
import { PaginationResponseUserStaffPageOutput, UserStaffPageOutput, UserStaffPageRequest } from '/@/api/console/data-contracts';
import { UserStaffApi } from '/@/api/console/UserStaff';
import { EnabledStatusEnum } from '/@/api/domain/enum-contracts';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  sureLoading: {
    type: Boolean,
    default: false,
  }
})

const emits = defineEmits(['sure'])

const userStaffTableRef = ref<InstanceType<typeof ElTable>>();

const state=reactive({
    showDialog:false,
    loading:false,
    pageFilter:{ } as UserStaffPageRequest,
    pageData:{} as PaginationResponseUserStaffPageOutput
})

// 打开对话框
const open = () => {
  state.showDialog = true
  state.pageFilter.orgId = null;
  onQuery()
}

// 关闭对话框
const close = () => {
  state.showDialog = false
}

const onQuery=async()=>{
    state.loading = true;
    //查询启用的员工
    state.pageFilter.filter={
        field:'Enabled',
        operator:0,
        value:EnabledStatusEnum.Enabled.value
    }
    let result = await new UserStaffApi().page(state.pageFilter).catch(()=>{
        state.loading = false;
    })
    state.loading = false;
    state.pageData = result?.data??{};
}

const onPageSizeChange=(value:number)=>{
    state.pageFilter.pageSize = value;
    state.pageFilter.pageNumber = 1;
    onQuery();
}

const onPageNumberChange=(value:number)=>{
    state.pageFilter.pageNumber = value;
    onQuery();
}

const onRowClick = (row: UserStaffPageOutput) => {
  // TODO: improvement typing when refactor table
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  userStaffTableRef.value!.toggleRowSelection(row, props.multiple ? undefined : true)
}

const onRowDbClick = () => {
  if (!props.multiple) {
    onSure()
  }
}

const currentRow = ref()
const onTableCurrentChange = (row: UserStaffPageOutput) => {
  currentRow.value = row
}

// 确定
const onSure = () => {
  if (props.multiple) {
    const selectionRows = userStaffTableRef.value!.getSelectionRows() as UserStaffPageOutput[]
    emits('sure', selectionRows)
  } else {
    emits('sure', currentRow.value)
  }
}

defineExpose({
  open,
  close,
})
</script>

<style scoped lang="scss">
:deep(.el-dialog__body) {
  padding: 5px 10px;
}
</style>
