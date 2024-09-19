<template>
     <el-dialog title="选择身份" width="500px" v-bind="$attrs">
        <el-row :gutter="24">
            <el-col :span="24" style="margin-top: 5px;cursor: pointer;" v-for="(staff,index) in state.currentUserStaffs" :key="index">
                <el-card shadow="hover" @click="onChange(staff.id)">
                    <el-descriptions :title="staff.org?.name" column="2">
                        <el-descriptions-item label="工号">
                            {{staff.jobNo}}
                        </el-descriptions-item>
                        <el-descriptions-item label="岗位">
                            {{staff.post?.name}}
                        </el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script lang="ts" setup name="changeUserIdentity">

import { reactive } from 'vue';
import { UserStaffApi } from '/@/api/console/UserStaff';
import { UserStaffOutput } from '/@/api/console/data-contracts';

const emits = defineEmits(['onChange'])

const state = reactive({
    loading:false,
    currentUserStaffs:[] as Array<UserStaffOutput>
});

const loadIdentity = async()=>{
    state.loading=true;
    let result = await new UserStaffApi().currentUserStaff().catch(()=>{
        state.loading=false;
    });
    state.currentUserStaffs = result?.data??[];
    state.loading=false;
};

const onChange=(userStaffId:any)=>{
    emits('onChange',userStaffId);
};

defineExpose({loadIdentity});
</script>