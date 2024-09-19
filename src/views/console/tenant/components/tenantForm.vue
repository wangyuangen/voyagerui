
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
            <el-form ref="ruleFormRef" :model="state.form" size="default" label-width="100px">
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="租户名称" prop="name" :rules="[{ required: true, message: '请输入租户名称', trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.form.name" placeholder="租户名称"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="公司名称" prop="companyName" :rules="[{ required: true, message: '请输入公司名称', trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.form.companyName" placeholder="公司名称"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="联系人" prop="contactPerson" :rules="[{ required: true, message: '请输入联系人', trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.form.contactPerson" placeholder="联系人"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="联系手机" prop="contactMobile" :rules="[
                            { required: true, message: '请输入联系手机', trigger: ['blur', 'change'] },
                            { validator: testMobile, trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.form.contactMobile" placeholder="联系手机"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="有效期限" prop="expiryDate" :rules="[{ required: true, message: '请选择有效期限', trigger: ['blur', 'change'] }]">
                        <el-date-picker v-model="state.form.expiryDate" type="date" value-format="YYYY-MM-DD" style="width:100%" placeholder="选择日期"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="启用">
                            <el-switch v-model="state.form.enabled" :active-value="1" :inactive-value="0" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="套餐" prop="packageIds" :rules="[{ required: true, message: '请选择套餐', trigger: ['change'] }]">
                            <el-select v-model="state.form.packageIds" placeholder="请选择套餐" multiple filterable class="w100">
                                <el-option v-for="item in state.packages" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select> 
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="所在区域">
                            <RegionSelect @change="onRegionSelectedChange" v-model="state.checkedRegionNodes"/>
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

<script lang="ts" setup name="console/tenant/form">

import { defineAsyncComponent, getCurrentInstance, reactive, ref } from 'vue';
import { PackageInfoOutput, UpdateTenantRequest } from '/@/api/console/data-contracts';
import { TenantApi } from '/@/api/console/Tenant';
import { isValidGuid } from '/@/utils/toolsValidate';
import { PackageInfoApi } from '/@/api/console/PackageInfo';
import { testMobile } from '/@/utils/test';
import { RegionApi } from '/@/api/console/Region';

const RegionSelect = defineAsyncComponent(() => import('/@/views/console/region/components/regionSelect.vue'));

const { proxy } = getCurrentInstance() as any;
const ruleFormRef = ref();

const emits=defineEmits(['handleQuery'])

defineProps({
    title:{
        type:String,
        default:''
    }
})

const state = reactive({
    loading:false,
    showDialog:false,
    form:{} as UpdateTenantRequest,
    packages:[] as Array<PackageInfoOutput>,
    checkedRegionNodes:[] as string[]
})

const onRegionSelectedChange=(node:any)=>{
    state.form.regionCode = node?.value;
    state.form.regionText = node?.text;
}


const getPackages = async ()=>{
    let result = await new PackageInfoApi().list({enabled:1});
    state.packages = result?.data??[];
}

const open = async(data:any)=>{
    state.form = JSON.parse(JSON.stringify(data));
    proxy.$modal.loading();
    await getPackages();
    if(data.id && isValidGuid(data.id)){
        let result = await new TenantApi().packages({id:data.id}).catch(()=>{
            proxy.$modal.closeLoading();
        });
        state.form.packageIds = result?.data??[];
    }

    state.checkedRegionNodes = [];
    if(data.regionCode){
      let result = await new RegionApi().parentCodes({code:data.regionCode});
      if(result.success){
        state.checkedRegionNodes = result?.data??[];
      }
    }

    proxy.$modal.closeLoading();
    state.showDialog = true;
}

const onSave=()=>{
    ruleFormRef.value.validate(async(valid:boolean)=>{
        if(!valid) return;
        state.loading = true;
        let result = {} as any;
        if(isValidGuid(state.form.id)){
            result = await new TenantApi().update(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;
            })
        }else{
            result = await new TenantApi().create(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;
            })
        }
        if(result?.success){
            onClose();
        }
    });
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