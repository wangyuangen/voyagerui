
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
            <el-form-item label="上级地域">
              <RegionSelect @change="onRegionSelectedChange" v-model="state.checkedRegionNodes"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="地域类型" prop="level" :rules="[{ required: true, message: '请选择地域类型', trigger: ['change'] }]">
              <el-select v-model="state.form.level" placeholder="请选择地域类型" class="w100">
                <el-option v-for="item in state.regionLevelList" :key="item.label" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="地域名称" prop="name" :rules="[{ required: true, message: '请输入地域名称', trigger: ['blur', 'change'] }]">
              <el-input v-model="state.form.name" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="地域代码" prop="code" :rules="[{ required: true, message: '请输入地域代码', trigger: ['blur', 'change'] }]">
              <el-input v-model="state.form.code" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="排序">
              <el-input-number v-model="state.form.sort" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item label="热门">
              <el-switch v-model="state.form.hot" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <el-form-item label="启用">
                  <el-switch v-model="state.form.enabled" :active-value="1" :inactive-value="0" />
              </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <el-form-item label="提取地址" prop="url">
              <el-input v-model="state.form.url" clearable />
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

<script lang="ts" setup name="console/region/form">
import { defineAsyncComponent, getCurrentInstance, reactive, ref } from 'vue';
import { UpdateRegionInfoRequest } from '/@/api/console/data-contracts';
import { toOptionsByValue } from '/@/utils/enum';
import { RegionLevel } from '/@/api/domain/enum-contracts';
import { isValidGuid } from '/@/utils/toolsValidate';
import { RegionApi } from '/@/api/console/Region';

const RegionSelect = defineAsyncComponent(() => import('./regionSelect.vue'))
const ruleFormRef = ref();
const emits=defineEmits(['handleQuery']);
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
    form:{ } as UpdateRegionInfoRequest,
    regionLevelList:toOptionsByValue(RegionLevel),
    checkedRegionNodes:[] as string[]
})

const open=async(data:any)=>{
    state.form = JSON.parse(JSON.stringify(data));
    state.checkedRegionNodes = [];
    if(data.parentCode){
      proxy.$modal.loading();
      let result = await new RegionApi().parentCodes({code:data.parentCode});
      if(result.success){
        state.checkedRegionNodes = result?.data??[];
      }
      proxy.$modal.closeLoading();
    }
    ruleFormRef.value?.resetFields();
    state.showDialog = true;
}

const onRegionSelectedChange=(node:any)=>{
    state.form.parentCode = node?.value;
}

const onSave=()=>{
    ruleFormRef.value.validate(async(valid:boolean)=>{
        if(!valid) return;
        let result = {} as any;
        state.loading = true;
        if(isValidGuid(state.form.id)){
            result = await new RegionApi().update(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;
            })
        }else{
            result = await new RegionApi().create(state.form,{showSuccessMessage:true}).catch(()=>{
                state.loading = false;
            })
        }
        state.loading = false;
        if(result.success){
            onClose();
        }
    })
}

// 取消
const onCancel = () => {
  state.showDialog = false
}

const onClose=()=>{
    emits('handleQuery');
    onCancel();
}

defineExpose({open});

</script>