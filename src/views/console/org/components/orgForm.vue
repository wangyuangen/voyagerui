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
                        <el-form-item label="上级机构" prop="parentId">
                            <el-tree-select
                                v-model="state.form.parentId"
                                :data="orgTreeList"
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
                        <el-form-item label="机构名称" prop="name" :rules="[{ required: true, message: '请输入机构名称', trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.form.name" clearable />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="所在区域">
                            <RegionSelect :enabled="1" @change="onRegionSelectedChange" v-model="state.checkedRegionNodes"/>
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
                        <el-form-item label="机构类型">
                            <el-select v-model="state.form.organizeType" placeholder="请选择">
                                <el-option v-for="item in toOptionsByValue(OrganizeTypeEnum)" :key="item" :label="item.label" :value="item.value"></el-option>
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

<script lang="ts" setup name="console/org/form">

import { defineAsyncComponent, getCurrentInstance, PropType, reactive, ref } from 'vue';
import { OrganizeInfoOutput, UpdateOrganizeInfoRequest } from '/@/api/console/data-contracts';
import { isValidGuid } from '/@/utils/toolsValidate';
import { OrganizeApi } from '/@/api/console/Organize';
import { toOptionsByValue } from '/@/utils/enum';
import { OrganizeTypeEnum } from '/@/api/domain/enum-contracts';
import { RegionApi } from '/@/api/console/Region';

const RegionSelect = defineAsyncComponent(() => import('/@/views/console/region/components/regionSelect.vue'));

defineProps({
  title: {
    type: String,
    default: '',
  },
  orgTreeList: {
    type: Array as PropType<OrganizeInfoOutput[]>,
    default: () => [],
  },
})

const state = reactive({
    showDialog:false,
    loading:false,
    form:{} as UpdateOrganizeInfoRequest,
    checkedRegionNodes:[] as string[]
})

const ruleFormRef = ref();

const { proxy } = getCurrentInstance() as any;

const emits = defineEmits(['handleQuery']);

const open=async(data:any)=>{
    state.form = JSON.parse(JSON.stringify(data));
    state.checkedRegionNodes = [];
    if(data.regionCode){
      proxy.$modal.loading();
      let result = await new RegionApi().parentCodes({code:data.regionCode});
      if(result.success){
        state.checkedRegionNodes = result?.data??[];
      }
      proxy.$modal.closeLoading();
    }
    state.showDialog = true;
}

const onRegionSelectedChange=(node:any)=>{
    state.form.regionCode = node?.value;
    state.form.regionText = node?.text;
}

const onSave=()=>{
   ruleFormRef.value.validate(async(valid:boolean)=>{
        if(!valid) return;
        state.loading = true;
        let result = {} as any;
        if(isValidGuid(state.form.id)){
            result = await new OrganizeApi().update(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;
            })
        }else{
            result = await new OrganizeApi().create(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;
            })
        }
        state.loading = false;
        if(result.success){
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