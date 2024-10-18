<template>
    <div>
        <el-dialog v-model="state.showDialog" 
            destroy-on-close
            :title="title"
            draggable
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="600px">
            <el-form :model="state.form" ref="ruleFormRef" size="default" label-width="100px">
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="套餐名称" prop="name" :rules="[{required:true,message:'套餐名称不能为空',trigger:'blur'}]">
                            <el-input v-model="state.form.name" placeholder="套餐名称" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="启用">
                            <el-switch v-model="state.form.enabled" :active-value="1" :inactive-value="0" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="排序">
                        <el-input-number v-model="state.form.sort" />
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

<script lang="ts" setup name="console/package/form">

import { reactive, ref } from 'vue';
import { UpdatePackageInfoRequest } from '/@/api/console/data-contracts';
import { isValidGuid } from '/@/utils/toolsValidate';
import { PackageInfoApi } from '/@/api/console/PackageInfo';

const ruleFormRef = ref();

const emits = defineEmits(['handleQuery']);

defineProps({
    title:{
        type:String,
        default:''
    }
})

const state =reactive({
    loading:false,
    showDialog:false,
    form:{} as UpdatePackageInfoRequest
});

const open=(data:any)=>{
    state.form = JSON.parse(JSON.stringify(data));
    state.showDialog = true;
};

const onSave=()=>{
    ruleFormRef.value.validate(async(valid:boolean)=>{
        if(!valid) return;
        state.loading = true;
        let result = {} as any;
        if(isValidGuid(state.form.id)){
            result = await new PackageInfoApi().update(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;
            })
        }else{
            result = await new PackageInfoApi().create(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;
            })
        }
        state.loading = false;
        if(result.success){
            onClose();
        }
    })
}

const onClose=()=>{
    emits('handleQuery');
    onCancel();
};

const onCancel=()=>{
    state.showDialog = false;
};

defineExpose({open});

</script>