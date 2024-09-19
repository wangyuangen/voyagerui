<template>
    <div>
        <el-dialog v-model="state.showDialog"
        destroy-on-close
        :title="title"
        draggable
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="600px">
            <el-form :model="state.form" ref="ruleFormRef" size="default" label-width="80px">
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="上级视图">
                        <el-tree-select
                            v-model="state.form.parentId"
                            :data="SelectTreeList"
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
                        <el-form-item label="视图名称" prop="name" :rules="[{ required: true, message: '请输入视图名称', trigger: ['blur', 'change'] }]">
                        <el-input v-model="state.form.name" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="路由命名" prop="routeName" :rules="[{ required: true, message: '请输入路由命名', trigger: ['blur', 'change'] }]">
                        <el-input v-model="state.form.routeName" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="视图路径" prop="path" :rules="[{ required: true, message: '请输入视图路径', trigger: ['blur', 'change'] }]">
                        <el-input v-model="state.form.path" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
                        <el-form-item label="排序">
                        <el-input-number v-model="state.form.sort" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                        <el-form-item label="缓存">
                        <el-switch v-model="state.form.isKeepAlive" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="7" :md="7" :lg="7" :xl="7">
                        <el-form-item label="启用">
                            <el-switch v-model="state.form.enabled" :active-value="1" :inactive-value="0" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="视图描述" prop="remark">
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

<script lang="ts" setup name="console/view/form">

import { PropType, reactive, ref } from 'vue';
import { UpdateViewInfoRequest, ViewInfoOutput } from '/@/api/console/data-contracts';
import { ViewApi } from '/@/api/console/View';
import { isValidGuid } from '/@/utils/toolsValidate';

const emits = defineEmits(['handleQuery'])

const ruleFormRef = ref();

defineProps({
    title:{
        type:String,
        default:''
    },
    SelectTreeList:{
        type : Array as PropType<ViewInfoOutput[]>,
        default:()=>[]
    }
})

const state = reactive({
    showDialog:false,
    loading:false,
    form:{

    } as UpdateViewInfoRequest
});

const open=(data:any)=>{
    state.form = JSON.parse(JSON.stringify(data));
    state.showDialog = true;
    ruleFormRef.value?.resetFields();
}

const onSave=()=>{
    ruleFormRef.value.validate(async(valid:boolean)=>{
        if(!valid) return;
        state.loading = true;
        let result = {} as any;
        if(isValidGuid(state.form.id)){
            result = await new ViewApi().update(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;  
            });
        }else{
            result = await new ViewApi().create(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;
            })
        }
        state.loading = false; 
        if(result.success){
            onClose();
        }  
    });
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