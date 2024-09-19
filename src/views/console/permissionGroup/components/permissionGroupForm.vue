<template>
    <div>
        <el-dialog 
            v-model="state.showDialog"
            destroy-on-close
            :title="title"
            draggable
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="700px">
            <el-form :model="state.form" ref="ruleFormRef" size="default" label-width="100px">
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="上级">
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
                        <el-form-item label="权限组名称" prop="name" :rules="[{ required: true, message: '请输入权限组名称', trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.form.name" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="API接口">
                        <el-tree-select
                            v-model="state.form.apiIds"
                            :data="state.apiTreeList"
                            node-key="id"
                            :props="{ label: 'code' }"
                            render-after-expand
                            fit-input-width
                            clearable
                            filterable
                            multiple
                            collapse-tags
                            collapse-tags-tooltip
                            :filter-node-method="onApiFilterNode"
                            class="w100"
                            :default-expanded-keys="state.expandRowKeys">
                            <template #default="{ data }">
                            <span class="my-flex my-flex-between">
                                <span>{{ data.name }}</span>
                                <span class="my-line-1 my-mlr-12" :title="data.code">
                                {{ data.code }}
                                </span>
                            </span>
                            </template>
                        </el-tree-select>
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
                        <el-form-item label="权限范围">
                            <el-select v-model="state.form.scope" placeholder="请选择">
                                <el-option v-for="item in toOptionsByValue(DataPermissionScope)" :key="item" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="描述" prop="remark">
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

<script lang="ts" setup name="console/permissionGroup/form">
import { getCurrentInstance, PropType, reactive, ref } from 'vue';
import { ApiInfoOutput, PermissionGroupApiOutput, PermissionGroupWithApiOutput, UpdatePermissionGroupRequest } from '/@/api/console/data-contracts';
import { ApiInfoApi } from '/@/api/console/ApiInfo';
import { listToTree, treeToList } from '/@/utils/tree';
import { cloneDeep } from 'lodash';
import { isValidGuid } from '/@/utils/toolsValidate';
import { PermissionGroupApi } from '/@/api/console/PermissionGroup';
import { toOptionsByValue } from '/@/utils/enum';
import { DataPermissionScope } from '/@/api/domain/enum-contracts';

const ruleFormRef = ref();

const emits = defineEmits(['handleQuery']);

const { proxy } = getCurrentInstance() as any;

defineProps({
    title:{
        type:String,
        default:''
    },
    selectTreeData:{
        type:Array as PropType<PermissionGroupWithApiOutput[]>,
        default:()=>[]
    }
})

const state=reactive({
    showDialog:false,
    loading:false,
    form:{

    } as UpdatePermissionGroupRequest,
    apiTreeList:[] as Array<ApiInfoOutput>,
    expandRowKeys: [] as string[],
});

const getApis = async()=>{
    let result = await new ApiInfoApi().list({enabled:1});
    state.apiTreeList = listToTree(result?.data);
}

const open = async(data:any={})=>{
    proxy.$modal.loading();
    await getApis();
   
    state.expandRowKeys = treeToList(cloneDeep(state.apiTreeList))
    .filter((a: ApiInfoOutput) => !isValidGuid(a.parentId))
    .map((a: ApiInfoOutput) => a.id + '') as string[]
    
    state.form = JSON.parse(JSON.stringify(data));
    state.form.apiIds = [];
    if(data.permissionGroupApis && data.permissionGroupApis.length>0){
        let permissionGroupApis = data.permissionGroupApis as Array<PermissionGroupApiOutput>;
        state.form.apiIds= permissionGroupApis.map(x=>x.api?.id??'')
    }
    ruleFormRef.value?.resetFields();

    proxy.$modal.closeLoading()
    state.showDialog = true
}


const onSave=()=>{
    ruleFormRef.value.validate(async(valid:boolean)=>{
        if(!valid) return;
        state.loading = true;
        let result = {} as any;
        if(isValidGuid(state.form.id)){
            result = await new PermissionGroupApi().update(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;  
            });
        }else{
            result = await new PermissionGroupApi().create(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;
            })
        }
        state.loading = false; 
        if(result.success){
            onClose();
        }  
    });
}

const onApiFilterNode = (value: string, data: ApiInfoOutput) => {
  if (!value) return true
  return data.name?.indexOf(value) !== -1 || data.path?.indexOf(value) !== -1
}

const onClose=()=>{
    emits('handleQuery');
    onCancel();
}

const onCancel=()=>{
    state.showDialog = false;
}

defineExpose({open});
</script>