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
            <el-form ref="ruleFormRef" :model="state.form" size="default" label-width="100px">
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="真实姓名" prop="realName" :rules="[{ required: true, message: '请输入真实姓名', trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.form.realName" placeholder="真实姓名"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="机构" prop="orgIds" :rules="[{ required: true, message: '请选择机构', trigger: ['change'] }]">
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
                        <el-form-item label="直属机构" prop="orgId" :rules="[{ required: true, message: '请选择直属机构', trigger: ['change'] }]">
                            <el-select v-model="state.form.orgId" placeholder="请选择直属机构" class="w100">
                                <el-option v-for="item in state.orgs" :key="item.id" :label="item.name" :value="item.id" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                  
                    
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="岗位" prop="postId" :rules="[{ required: true, message: '请选择岗位', trigger: ['change'] }]">
                        <el-select v-model="state.form.postId" placeholder="请选择岗位" filterable class="w100">
                            <el-option v-for="item in state.posts" :key="item.id" :label="item.name" :value="item.id" />
                        </el-select> 
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="入职日期" prop="entryDate">
                        <el-date-picker v-model="state.form.entryDate" type="date" value-format="YYYY-MM-DD" style="width:100%" placeholder="选择日期"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                        <el-form-item label="工号" prop="jobNo" :rules="[{ required: true, message: '请输入工号', trigger: ['blur', 'change'] }]">
                            <el-input v-model="state.form.jobNo" autocomplete="off" />
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
                        <el-form-item label="角色" prop="roleIds" :rules="[{ required: true, message: '请选择角色', trigger: ['change'] }]">
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

<script lang="ts" setup name="console/userStaff/updateform">

import { getCurrentInstance, reactive, ref, watch } from 'vue';
import { UserStaffApi } from '/@/api/console/UserStaff';
import { OrganizeInfoOutput, PostInfoOutput, RoleInfoOutput, UpdateUserStaffRequest } from '/@/api/console/data-contracts';
import { listToTree, treeToList } from '/@/utils/tree';
import { cloneDeep } from 'lodash';
import { OrganizeApi } from '/@/api/console/Organize';
import { RoleApi } from '/@/api/console/Role';
import { PostApi } from '/@/api/console/Post';

defineProps({
  title:{
    type:String,
    default:''
  }
})

const { proxy } = getCurrentInstance() as any;
 
const ruleFormRef = ref();

const emits=defineEmits(['handleQuery'])

const state = reactive({
    loading:false,
    showDialog:false,
    form: {} as UpdateUserStaffRequest,
    orgs:[] as Array<OrganizeInfoOutput>,
    orgTreeList: []  as Array<OrganizeInfoOutput>,
    roles:[] as Array<RoleInfoOutput>,
    posts:[] as Array<PostInfoOutput>
})

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
    state.form = JSON.parse(JSON.stringify(data));
    proxy.$modal.loading();
    await getOrgs();
    await getPosts();
    await getRoles();
    let result = await new UserStaffApi().extendForm({id:data.id}).catch(()=>{
        proxy.$modal.closeLoading();
    });
    state.form.orgIds = result?.data?.orgIds;
    state.form.roleIds = result?.data?.roleIds??[];
    proxy.$modal.closeLoading();
    state.showDialog = true;
}

const onSave=()=>{
    ruleFormRef.value.validate(async(valid:boolean)=>{
        if(!valid)return;
        state.loading = true;
        let result = await new UserStaffApi().update(state.form,{showSuccessMessage:true}).catch(()=>{
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