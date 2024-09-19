<template>
    <div>
        <el-dialog
        v-model="state.showDialog"
        destroy-on-close
        :title="title"
        draggable
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="600px">
            <el-form :model="state.form" ref="ruleFormRef" size="default" label-width="80px">
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="上级分组">
                            <el-tree-select
                                v-model="state.form.parentId"
                                :data="selectTreeData"
                                node-key="id"
                                :props="{ label: 'name' }"
                                check-strictly
                                default-expand-all
                                render-after-expand
                                fit-input-width
                                clearable
                                filterable
                                class="w100"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="视图">
                        <el-tree-select
                            v-model="state.form.viewId"
                            :data="state.viewTreeList"
                            node-key="id"
                            :props="{ label: 'path' }"
                            default-expand-all
                            render-after-expand
                            fit-input-width
                            clearable
                            filterable
                            :filter-node-method="onViewFilterNode"
                            class="w100"
                            @current-change="onViewCurrentChange"
                        >
                            <template #default="{ data }">
                            <span class="my-flex my-flex-between">
                                <span>{{ data.name }}</span>
                                <span class="my-line-1 my-ml-12" :title="data.path">
                                {{ data.path }}
                                </span>
                            </span>
                            </template>
                        </el-tree-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '请输入名称', trigger: ['blur', 'change'] }]">
                        <el-input v-model="state.form.name" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="路由地址" prop="routeUrl" :rules="[{ required: true, message: '请输入路由地址', trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.form.routeUrl" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="路由命名">
                            <el-input v-model="state.form.routeName" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="图标" prop="icon">
                            <my-select-icon v-model="state.form.icon" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="排序">
                            <el-input-number v-model="state.form.sort" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="启用">
                            <el-switch v-model="state.form.enabled" :active-value="1" :inactive-value="0" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="链接地址">
                            <el-input v-model="state.form.link" clearable placeholder="内嵌/外链链接地址" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="内嵌窗口">
                            <el-switch v-model="state.form.isIframe" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="缓存">
                            <el-switch v-model="state.form.isKeepAlive" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="固定">
                            <el-switch v-model="state.form.isAffix" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="隐藏">
                            <el-switch v-model="state.form.hidden" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="新窗口">
                            <el-switch v-model="state.form.newWindow" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="链接外显">
                            <el-switch v-model="state.form.external" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="说明">
                        <el-input v-model="state.form.remark" clearable type="textarea" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="onCancel" size="default">取 消</el-button>
                    <el-button type="primary" @click="onSave" size="default" :loading="state.loading">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup name="console/menu/form">
import { defineAsyncComponent, getCurrentInstance, PropType, reactive, ref } from 'vue';
import { MenuRouteOutput, UpdateMenuRouteRequest, ViewInfoOutput } from '/@/api/console/data-contracts';
import { listToTree } from '/@/utils/tree';
import { isValidGuid } from '/@/utils/toolsValidate';
import { MenuRouteApi } from '/@/api/console/MenuRoute';
import { ViewApi } from '/@/api/console/View';

const { proxy } = getCurrentInstance() as any;
const MySelectIcon = defineAsyncComponent(()=>import('/@/components/my-select-icon/index.vue'));
const ruleFormRef = ref();

const emits=defineEmits(['handleQuery']);

defineProps({
    title:{
        type:String,
        default:''
    },
    selectTreeData:{
        type:Array as PropType<MenuRouteOutput[]>,
        default:()=>[]
    }
})

const state = reactive({
    showDialog:false,
    loading:false,
    viewTreeList:[] as Array<ViewInfoOutput>,
    form:{

    } as UpdateMenuRouteRequest
})

const getViews = async()=>{
    let result = await new ViewApi().list({enabled:1});
    state.viewTreeList = listToTree(result?.data);
}

const open= async(row:any={})=>{
    proxy.$modal.loading();
    await getViews();
    state.form = row;
    ruleFormRef.value?.resetFields();
    proxy.$modal.closeLoading();
    state.showDialog = true;
}

const onClose=()=>{
    emits('handleQuery');
    onCancel();
}

const onSave=()=>{
    ruleFormRef.value.validate(async(valid:boolean)=>{
        if(!valid) return;
        state.loading = true;
        let result={} as any;
        if(!isValidGuid(state.form.id)){
            result = await new MenuRouteApi().create(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;
            })
        }else{
            result = await new MenuRouteApi().update(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;
            })
        }
        state.loading=false;
        if(result.success){
            onClose();
        }
    });
}

const onViewFilterNode = (value: string, data: ViewInfoOutput) => {
  if (!value) return true
  return data.name?.indexOf(value) !== -1 || data.path?.indexOf(value) !== -1
}

const onViewCurrentChange = (data: ViewInfoOutput) => {
  if (data) {
    if (!state.form.name) {
      state.form.name = data.name??'';
    }
    if (!state.form.routeUrl) {
      state.form.routeUrl = '/' + data.routeName;
    }
    if(!state.form.routeName){
        state.form.routeName = data.routeName??'';
    }
  }
}


const onCancel=()=>{
    state.showDialog=false;
}

defineExpose({open});

</script>