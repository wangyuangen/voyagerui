<template>
    <div>
        <el-dialog v-model="state.showDialog"
            destroy-on-close
            :title="title"
            draggable
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="769px">
                <el-form ref="ruleFormRef" :model="state.form" size="default" label-width="100px">
                    <el-row :gutter="35">
                        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item label="岗位名称" prop="name" :rules="[{ required: true, message: '请输入岗位名称', trigger: ['blur', 'change'] }]">
                                <el-input v-model="state.form.name" autocomplete="off" readonly/>
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

<script lang="ts" setup name="console/post/form">
import { reactive, ref } from 'vue';
import { UpdatePostInfoRequest } from '/@/api/console/data-contracts';
import { isValidGuid } from '/@/utils/toolsValidate';
import { PostApi } from '/@/api/console/Post';

const ruleFormRef = ref();
const emits = defineEmits(['handleQuery']);

defineProps({
    title:{
        type:String,
        default:''
    }
})

const state = reactive({
    form:{} as UpdatePostInfoRequest,
    loading:false,
    showDialog:false
})

const open=(data:any)=>{
    state.form =JSON.parse(JSON.stringify(data));
    state.showDialog = true;
}

const onSave=()=>{
    ruleFormRef.value.validate(async(valid:boolean)=>{
        if(!valid) return;
        let result = {} as any;
        state.loading = true;
        if(isValidGuid(state.form.id)){
            result = new PostApi().update(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;
            })
        }else{
            result = new PostApi().create(state.form,{showSuccessMessage:true}).catch(()=>{
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