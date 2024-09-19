<template>
    <div>
        <el-dialog
        v-model="state.showDialog" 
        destroy-on-close 
        :title="title" 
        draggable 
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="769px">
            <el-form ref="ruleFormRef" :model="state" size="default" label-width="100px">
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="账号" prop="userInfo.account" :rules="[{ required: true, message: '请输入登录账号', trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.userInfo.account" placeholder="系统登录账号"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="昵称" prop="userInfo.nickName" :rules="[{ required: true, message: '请输入昵称', trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.userInfo.nickName" placeholder="昵称"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="手机号" prop="userInfo.mobile" :rules="[
                            { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
                            { validator: testMobile, trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.userInfo.mobile" placeholder="手机号" @blur="onBlurMobile"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="邮箱" prop="userInfo.email" :rules="[{ validator: testEmail, trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.userInfo.email" placeholder="邮箱"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item prop="userInfo.password" :rules="[{ validator: validatorPwd, trigger: ['blur', 'change'] }]">
                            <template #label>
                                <div class="my-flex-y-center">
                                密码<el-tooltip effect="dark" placement="top" hide-after="0">
                                    <template #content>选填，不填则使用系统默认密码<br />字母+数字+可选特殊字符，长度在6-16之间</template>
                                    <SvgIcon name="ele-InfoFilled" class="ml5" />
                                </el-tooltip>
                                </div>
                            </template>
                            <el-input
                                key="password"
                                v-model="state.userInfo.password"
                                placeholder="选填，不填则使用系统默认密码"
                                @input="onInputPwd"
                                show-password
                                autocomplete="off"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="工号" prop="form.jobNo" :rules="[{ required: true, message: '请输入工号', trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.form.jobNo" autocomplete="off" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="性别">
                            <el-radio-group v-model="state.userInfo.gender">
                                <el-radio-button v-for="gender in toOptionsByValue(GenderEnum)" :key="gender.value" :label="gender.value">
                                    {{gender.label}}
                                </el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="真实姓名" prop="form.realName" :rules="[{ required: true, message: '请输入真实姓名', trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.form.realName" placeholder="真实姓名"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="机构" prop="form.orgIds" :rules="[{ required: true, message: '请选择机构', trigger: ['change'] }]">
                            <el-tree-select
                                v-model="state.form.orgIds"
                                placeholder="请选择机构"
                                :data="state.orgTreeList"
                                node-key="id"
                                :props="{ label: 'name' }"
                                check-strictly
                                default-expand-all
                                render-after-expand
                                fit-input-width
                                clearable
                                multiple
                                collapse-tags
                                collapse-tags-tooltip
                                filterable
                                class="w100"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="直属机构" prop="form.orgId" :rules="[{ required: true, message: '请选择直属机构', trigger: ['change'] }]">
                            <el-select v-model="state.form.orgId" placeholder="请选择直属机构" class="w100">
                                <el-option v-for="item in state.orgs" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </el-form-item>
                    </el-col> 
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="岗位" prop="form.postId" :rules="[{ required: true, message: '请选择岗位', trigger: ['change'] }]">
                        <el-select v-model="state.form.postId" placeholder="请选择岗位" filterable class="w100">
                            <el-option v-for="item in state.posts" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select> 
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="入职日期" prop="form.entryDate">
                        <el-date-picker v-model="state.form.entryDate" type="date" value-format="YYYY-MM-DD" style="width:100%" placeholder="选择日期"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="启用">
                            <el-switch v-model="state.form.enabled" :active-value="1" :inactive-value="0" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="是否为主管">
                            <el-switch v-model="state.form.isManager" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="角色" prop="form.roleIds" :rules="[{ required: true, message: '请选择角色', trigger: ['change'] }]">
                            <el-select v-model="state.form.roleIds" placeholder="请选择角色" multiple filterable class="w100">
                                <el-option v-for="item in state.roles" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select> 
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-form-item label="简介">
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

<script lang="ts" setup name="console/userStaff/addform">
import { getCurrentInstance, reactive, ref, watch } from 'vue';
import { CreateUserStaffRequest, OrganizeInfoOutput, PostInfoOutput, RoleInfoOutput, UserInfoInput } from '/@/api/console/data-contracts';
import { OrganizeApi } from '/@/api/console/Organize';
import { listToTree, treeToList } from '/@/utils/tree';
import { RoleApi } from '/@/api/console/Role';
import { PostApi } from '/@/api/console/Post';
import { UserStaffApi } from '/@/api/console/UserStaff';
import { isMobile, testEmail, testMobile } from '/@/utils/test';
import { validatorPwd } from '/@/utils/validators';
import { verifyCnAndSpace } from '/@/utils/toolsValidate';
import { cloneDeep } from 'lodash';
import { toOptionsByValue } from '/@/utils/enum';
import { GenderEnum } from '/@/api/domain/enum-contracts';

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
    form:{ } as CreateUserStaffRequest,
    userInfo:{} as UserInfoInput,
    loading:false,
    showDialog:false,
    orgs:[] as Array<OrganizeInfoOutput>,
    orgTreeList: []  as Array<OrganizeInfoOutput>,
    roles:[] as Array<RoleInfoOutput>,
    posts:[] as Array<PostInfoOutput>
})

const onInputPwd = (val:string)=>{
  state.userInfo.password = verifyCnAndSpace(val);
}

const onBlurMobile=()=>{
  if(!state.userInfo.account && state.userInfo.mobile && isMobile(state.userInfo.mobile)){
    state.userInfo.account = state.userInfo.mobile;
  }
}

watch(
  ()=>state.form.orgIds,
  (value)=>{
    if(value && value.length>0){
      let orgs=[] as any
      treeToList(cloneDeep(state.orgTreeList)).forEach((a:any)=>{
        if(value.some((b)=>a.id === b)){
          orgs.push(a);
        }
      })
      state.orgs = orgs;
    }else{
      state.orgs = [];
    }
  },
  {
    immediate:true
  }
)

watch(
  ()=>state.orgs,
  ()=>{
    if(state.orgs?.some((a:any)=>a.id===state.form.orgId)){
      return;
    }
    state.form.orgId = state.orgs && state.orgs.length>0?state.orgs[0]?.id??'':'';
  },
  {
    immediate:true,
    deep:true
  }
)

const getOrgs =async()=>{
    let result = await new OrganizeApi().list({enabled:1});
    state.orgTreeList = listToTree(result?.data);
}

const getRoles = async()=>{
    let result = await new RoleApi().list({enabled:1});
    state.roles = result?.data??[];
}

const getPosts = async()=>{
    let result = await new PostApi().list({});
    state.posts = result?.data??[];
}

const open=async(data:any)=>{
    proxy.$modal.loading();
    await getOrgs();
    await getPosts();
    await getRoles();
    proxy.$modal.closeLoading();
    state.form =JSON.parse(JSON.stringify(data));
    ruleFormRef.value?.resetFields();
    state.showDialog = true;
}

const onSave=()=>{
    ruleFormRef.value.validate(async(valid:boolean)=>{
        if(!valid)return;
        state.loading = true;
        state.form.userInfo = state.userInfo;
        let result = await new UserStaffApi().create(state.form,{showSuccessMessage:true}).catch(()=>{
            state.loading = false;
        });
        state.loading = false;
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