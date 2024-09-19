<template>
    <div>
        <el-dialog
        v-model="state.showDialog"
        destroy-on-close
        :title="title"
        draggable
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="500px">
            <el-form ref="ruleFormRef" :model="state.form" size="default" label-width="80px">
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="编码" prop="code" :rules="[{ required: true, message: '请输入字典编码', trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.form.code" autocomplete="off" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '请输入字典名称', trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.form.name" autocomplete="off" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="主题样式">
                            <el-select v-model="state.form.themeStyle" placeholder="请选择">
                                <el-option v-for="item in state.themeStyleList" :key="item.label" :label="item.label" :value="item.value" />
                             </el-select>
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
                        <el-form-item label="描述">
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
<script lang="ts" setup name="console/dict/form">
import { reactive, ref } from 'vue';
import { UpdateDataDictRequest } from '/@/api/console/data-contracts';
import { isValidGuid } from '/@/utils/toolsValidate';
import { DataDictApi } from '/@/api/console/DataDict';

defineProps({
    title:{
        type:String,
        default:''
    }
})

const emits=defineEmits(['handleQuery']);

const ruleFormRef = ref();

const state=reactive({
    showDialog:false,
    loading:false,
    form:{} as UpdateDataDictRequest,
    themeStyleList:[
        {label:'success',value:'success'},
        {label:'info',value:'info'},
        {label:'warning',value:'warning'},
        {label:'danger',value:'danger'}
    ]
})

const open=(data:any)=>{
    state.form = data;
    ruleFormRef.value?.resetFields();
    state.showDialog = true;
}

const onSave=()=>{
    ruleFormRef.value.validate(async(valid:boolean)=>{
        if(!valid) return;
        let result = {} as any;
        state.loading = true;
        if(isValidGuid(state.form.id)){
            result = await new DataDictApi().update(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;
            })
        }else{
            result = await new DataDictApi().create(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;
            })
        }
        state.loading = false;
        if(result.success){
            onClose();
        }
    })
}

const onCancel=()=>{
    state.showDialog = false;
}

const onClose=()=>{
    emits('handleQuery');
    onCancel();
}

defineExpose({open});

</script>