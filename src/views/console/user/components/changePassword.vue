<template>
    <div>
      <el-dialog
        v-model="state.showDialog"
        destroy-on-close
        :title="title"
        draggable
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="475px"
      >
        <el-form ref="ruleFormRef" :model="state.form" size="default" label-width="80px" label-position="left">
          <el-row :gutter="35">
            <el-col :span="24">
              <el-form-item label="旧密码" prop="oldPassword" :rules="[{ required: true, message: '请输入旧密码', trigger: ['blur', 'change'] }]">
                <el-input v-model="state.form.oldPassword" show-password autocomplete="off" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                label="新密码"
                prop="password"
                :rules="[
                  { required: true, message: '请输入新密码', trigger: ['blur', 'change'] },
                  { validator: testNewPassword, trigger: ['blur', 'change'] },
                  { validator: validatorPwd, trigger: ['blur', 'change'] },
                ]"
              >
                <el-input v-model="state.form.password" show-password autocomplete="off" clearable @input="onInputNewPassword" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item
                label="确认密码"
                prop="confirmPassword"
                :rules="[
                  { required: true, message: '请输入确认密码', trigger: ['blur', 'change'] },
                  { validator: testConfirmPassword, trigger: ['blur', 'change'] },
                ]"
              >
                <el-input v-model="state.form.confirmPassword" show-password autocomplete="off" clearable @input="onInputConfirmPassword" />
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

<script lang="ts" setup name="console/user/changePwd">
import { reactive, ref } from 'vue';
import { ChangePersonalPasswordRequest } from '/@/api/console/data-contracts';
import { UserApi } from '/@/api/console/User';
import { verifyCnAndSpace } from '/@/utils/toolsValidate';
import { validatorPwd } from '/@/utils/validators';


defineProps({
    title:{
        type:String,
        default:''
    }
})

const ruleFormRef = ref();

const state = reactive({
    showDialog:false,
    loading:false,
    form:{ } as ChangePersonalPasswordRequest
})

// 新密码验证器
const testNewPassword = (rule: any, value: any, callback: any) => {
  if (value) {
    if (state.form.confirmPassword) {
      ruleFormRef.value.validateField('confirmPassword')
    }
    callback()
  }
}

// 确认密码验证器
const testConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value) {
    if (value !== state.form.password) {
      callback(new Error('确认密码和新密码不一致'))
    } else {
      callback()
    }
  }
}

// 输入新密码
const onInputNewPassword = (val: string) => {
  state.form.password = verifyCnAndSpace(val)
}

// 输入确认密码
const onInputConfirmPassword = (val: string) => {
  state.form.confirmPassword = verifyCnAndSpace(val)
}


const open  = ()=>{
    state.showDialog = true;
    state.form = {} as ChangePersonalPasswordRequest;
}

const onSave=()=>{
    ruleFormRef.value.validate(async(valid:boolean)=>{
        if(!valid) return;
        state.loading = true;
        let result = await new UserApi().changePwd(state.form,{showSuccessMessage:true}).catch(()=>{
            state.loading = false;
        })
        state.loading = false;
        if(result?.success){
            onCancel();
        }
    })
}

// 取消
const onCancel = () => {
  state.showDialog = false
}

defineExpose({open});


</script>