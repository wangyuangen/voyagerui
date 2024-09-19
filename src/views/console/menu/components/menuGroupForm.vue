<template>
    <div>
        <el-dialog
            v-model="state.showDialog"
            destroy-on-close
            :title="title"
            graggable
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="600px">
            <el-form :model="state.form" ref="ruleFormRef" size="default" label-width="80px">
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
                                class="w100"/>
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
                        <el-form-item label="重定向">
                        <el-input v-model="state.form.redirectUrl" clearable placeholder="重定向地址" />
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
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="展开">
                        <el-switch v-model="state.form.opened" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="隐藏">
                        <el-switch v-model="state.form.hidden" />
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

<script lang="ts" setup name="console/menu/groupform">
import { defineAsyncComponent, PropType, reactive, ref } from 'vue';
import { MenuRouteOutput, UpdateMenuRouteRequest } from '/@/api/console/data-contracts';
import { isValidGuid } from '/@/utils/toolsValidate';
import { MenuRouteApi } from '/@/api/console/MenuRoute';

const MySelectIcon = defineAsyncComponent(()=>import('/@/components/my-select-icon/index.vue'))

const ruleFormRef=ref();
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
    form:{
    } as UpdateMenuRouteRequest
});

const open=(row:any)=>{
    state.form = row;
    state.showDialog = true;
    ruleFormRef.value?.resetFields();
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

const onCancel=()=>{
    state.showDialog=false;
}

defineExpose({open});

</script>