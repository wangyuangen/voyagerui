<template>
    <el-dialog 
    v-model="state.showDialog"
    destroy-on-close
    :title="title"
    append-to-body
    draggable
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="1200px">
        <el-row :gutter="35">
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                <el-card>
                    <template #header>菜单</template>
                    <el-tree 
                        ref="menuTreeRef"
                        :data="state.menuRouteList"
                        node-key="id"
                        show-checkbox
                        highlight-current
                        default-expand-all
                        check-on-click-node
                        :check-strictly="true"
                        :expand-on-click-node="false"
                        :props="{ class: customNodeClass ,label:'name'}"
                        :default-checked-keys="state.meuRouteCheckedKeys"/>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
                <el-card>
                    <template #header>权限组</template>
                    <el-tree 
                        ref="permissionTreeRef"
                        :data="state.permissionGroupList"
                        node-key="id"
                        show-checkbox
                        highlight-current
                        default-expand-all
                        check-on-click-node
                        :check-strictly="true"
                        :expand-on-click-node="false"
                        :props="{ class: customNodeClass  ,label:'name'}"
                        :default-checked-keys="state.permissionCheckedKeys"/>
                </el-card>
            </el-col>
        </el-row>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="onCancel" size="default">取 消</el-button>
                <el-button type="primary" @click="onSave" size="default" :loading="state.loading">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup name="console/package/permission">
import { getCurrentInstance, reactive, ref } from 'vue';
import { MenuRouteApi } from '/@/api/console/MenuRoute';
import { deepClone } from '/@/utils/other';
import { listToTree } from '/@/utils/tree';
import { PermissionGroupApi } from '/@/api/console/PermissionGroup';
import { PackageInfoApi } from '/@/api/console/PackageInfo';
import { PackageAuthChangeRequest } from '/@/api/console/data-contracts';
import { ElTree } from 'element-plus';

const menuTreeRef = ref<InstanceType<typeof ElTree>>();
const permissionTreeRef = ref<InstanceType<typeof ElTree>>();

const { proxy } = getCurrentInstance() as any;

defineProps({
    title:{
        type:String,
        default:''
    }
})

const state = reactive({
    showDialog:false,
    loading:false,
    menuRouteList:[],
    permissionGroupList:[],
    meuRouteCheckedKeys:[],
    permissionCheckedKeys:[],
    packageId:''
});

const customNodeClass = (data: any, node: any) => {
  let isPenultimate = true
  for (const key in data.children) {
    if (data.children[key]?.children?.length ?? 0 > 0) {
      isPenultimate = false
      break
    }
  }
  return data.children?.length > 0 && isPenultimate ? `is-penultimate level${node.level}` : ''
}

const getMenuRoutes = async()=>{
    let result = await new MenuRouteApi().authMenuRoutes();
    state.menuRouteList = listToTree(deepClone(result?.data??[]));
}

const getPermissionGroups = async ()=>{
    let result = await new PermissionGroupApi().authPermissionGroup();
    state.permissionGroupList = listToTree(deepClone(result?.data??[]));
}

const getPacakgeAuths= async(packageId:string)=>{
    let result = await new PackageInfoApi().authInfo({id:packageId});
    state.meuRouteCheckedKeys =  result?.success ? (result.data?.menuRouteIds as never[]) : [];
    state.permissionCheckedKeys = result?.success ? (result.data?.permissionGroupIds as never[]) : [];
}

const open=async(packageId:any)=>{
    proxy.$modal.loading();
    await getPacakgeAuths(packageId);
    await getMenuRoutes();
    await getPermissionGroups();
    proxy.$modal.closeLoading();
    state.packageId = packageId;
    state.showDialog = true;
};


const onSave= async ()=>{
    state.loading = true;
    let menuRoutes = menuTreeRef.value?.getCheckedKeys()??[];
    let permissionGroups = permissionTreeRef.value?.getCheckedKeys()??[];
    let authInfo = {
        id:state.packageId,
        menuRouteIds:menuRoutes,
        permissionGroupIds:permissionGroups
    } as PackageAuthChangeRequest
    let result = await new PackageInfoApi().authChange(authInfo,{showSuccessMessage:true}).catch(()=>{
        state.loading = false;
    });
    state.loading = false;
    if(result && result.success) {
        onCancel();
    }
}

// 取消
const onCancel = () => {
  state.showDialog = false
}

defineExpose({open});

</script>


<style scoped lang="scss">
:deep(.el-dialog__body) {
  padding: 5px 10px;
}
:deep(.is-penultimate) {
  .el-tree-node__children {
    padding-left: 65px;
    white-space: pre-wrap;
    line-height: 100%;

    .el-tree-node {
      display: inline-block;
    }

    .el-tree-node__content {
      padding-left: 12px !important;
      padding-right: 12px;

      .el-tree-node__expand-icon.is-leaf {
        display: none;
      }
    }
  }
  &.level1 {
    .el-tree-node__children {
      padding-left: 36px;
    }
  }
  &.level2 {
    .el-tree-node__children {
      padding-left: 54x;
    }
  }
  &.level3 {
    .el-tree-node__children {
      padding-left: 72px;
    }
  }
  &.level4 {
    .el-tree-node__children {
      padding-left: 90px;
    }
  }
}
</style>
