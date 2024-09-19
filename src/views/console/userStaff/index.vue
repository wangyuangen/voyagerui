<template>
    <my-layout>
        <pane size="20" min-size="20" max-size="35">
            <div class="my-flex-column w100 h100">
                <OrgTree @node-click="onOrgSelectChange"></OrgTree>
            </div>
        </pane>
        <pane size="80">
            <div class="my-flex-column w100 h100">
                <el-card class="mt8" shadow="never" :body-style="{ paddingBottom:'0' }">
                    <el-form @submit.stop.prevent style="max-width: 650px;">
                        <el-row :gutter="35">
                            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                                <el-form-item>
                                    <my-select-input v-model="state.pageFilter.filter" :filters="state.filters" @search="onQuery" />
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                                <el-form-item>
                                <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
                                <el-button v-auth="'api:console:user-staff:create:post'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-card>

                <el-card class="my-fill mt8" shadow="never">
                    <el-table v-loading="state.loading" :data="state.pageData.data" row-key="id" style="width:100%">
                        <el-table-column prop="jobNo" label="工号" min-width="80" show-overflow-tooltip/>
                        <el-table-column prop="realName" label="真实姓名" min-width="100" show-overflow-tooltip/>
                        <el-table-column prop="user.gender" label="性别" min-width="80">
                            <template #default="{row}">
                                <el-tag :type="getThemeByValue(GenderEnum,row.user.gender)">
                                    {{getDescByValue(GenderEnum,row.user.gender)}}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="user.mobile" label="手机" min-width="100" show-overflow-tooltip/>
                        <el-table-column prop="entryDate" label="入职日期" :formatter="formatterDate" min-width="100" show-overflow-tooltip/>
                        <el-table-column prop="post.name" label="岗位" min-width="100" show-overflow-tooltip/>
                        <el-table-column label="是否为主管" width="100">
                            <template #default="{row}">
                                <el-tag type="danger" v-if="row.isManager">是</el-tag>
                                <el-tag type="success" v-else>否</el-tag>
                            </template>
                        </el-table-column> 
                        <el-table-column prop="org.name" label="直属机构" min-width="100" show-overflow-tooltip/>
                        <el-table-column prop="enabled" label="状态" min-width="80" >
                            <template #default="{ row }">
                                <el-tag :type="getThemeByValue(EnabledStatusEnum,row.enabled)">
                                    {{getDescByValue(EnabledStatusEnum,row.enabled)}}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作记录" width="100">
                            <template #default="{row}">
                                <AuditableRecord :data="row" />
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="160" fixed="right" 
                            v-auths="['api:console:user-staff:update:put','api:console:user-staff:delete:delete']" >
                            <template #default="{row}">
                                <el-button v-auth="'api:console:user-staff:update:put'" icon="ele-EditPen" text size="small" type="primary" @click="onUpdate(row)">编辑</el-button>
                                <el-button v-auth="'api:console:user-staff:delete:delete'" icon="ele-Delete" text size="small" type="danger" @click="onDelete(row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="my-flex my-flex-end" style="margin-top:20px">
                        <el-pagination 
                            v-model:currentPage="state.pageData.currentPage"
                            v-model:page-size="state.pageData.pageSize"
                            :total="state.pageData.totalCount"
                            :page-sizes="[10,20,50,100]"
                            small
                            background
                            @size-change="onSizeChange"
                            @current-change="onCurrentChange"
                            layout="total, sizes, prev, pager, next, jumper"/>
                    </div>
                </el-card>
                <UserStaffAddForm ref="userStaffAddFormRef" :title="state.formTitle" @handleQuery="onQuery"></UserStaffAddForm>
                <UserStaffUpdateForm ref="userStaffUpdateFormRef" :title="state.formTitle" @handleQuery="onQuery"></UserStaffUpdateForm>
            </div>
        </pane>
    </my-layout>
</template>

<script lang="ts" setup name="console/userStaff">
import { defineAsyncComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { OrganizeInfoOutput, PaginationResponseUserStaffPageOutput, UserStaffOutput, UserStaffPageRequest } from '/@/api/console/data-contracts';
import { UserStaffApi } from '/@/api/console/UserStaff';
import { EnabledStatusEnum, GenderEnum } from '/@/api/domain/enum-contracts';
import { Pane } from 'splitpanes'
import { getDescByValue, getThemeByValue } from '/@/utils/enum';
import dayjs from 'dayjs';

const OrgTree = defineAsyncComponent(()=>import('/@/views/console/org/components/orgTree.vue'));
const MyLayout = defineAsyncComponent(()=>import('/@/components/my-layout/index.vue'));
const UserStaffAddForm = defineAsyncComponent(()=>import('./components/userStaffAddForm.vue'))
const UserStaffUpdateForm = defineAsyncComponent(()=>import('./components/userStaffUpdateForm.vue'));
const AuditableRecord = defineAsyncComponent(()=>import('/@/components/table/auditableRecord.vue'));
const MySelectInput = defineAsyncComponent(()=>import('/@/components/my-select-input/index.vue'));

const { proxy } = getCurrentInstance() as any;

const userStaffAddFormRef = ref();
const userStaffUpdateFormRef = ref();

const state = reactive({
    loading:false,
    formTitle:'',
    pageData: {} as PaginationResponseUserStaffPageOutput,
    pageFilter: {
        pageNumber:1,
        pageSize:20,
    } as UserStaffPageRequest,
    filters:[
        {
            field: 'realName',
            operator: 'Contains',
            description: '真实姓名',
            componentName: 'el-input',
            defaultSelect: true,
        },
        {
            field: 'user.mobile',
            operator: 'Contains',
            description: '手机号',
            componentName: 'el-input',
        },
        {
            field: 'jobNo',
            operator: 'Contains',
            description: '工号',
            componentName: 'el-input',
        }
    ] as Array<DynamicFilterInfo>
})

onMounted(async()=>{
    onQuery();
})

const formatterDate = (row: any, column: any, cellValue: any) => {
  return dayjs(cellValue).format('YYYY-MM-DD')
}

const onQuery = async()=>{
    state.loading = true;
    let result = await new UserStaffApi().page(state.pageFilter).catch(()=>{
        state.loading = false;
    })
    state.pageData = result?.data??{};
    state.loading = false;
}

const onAdd = ()=>{
    state.formTitle = '新增员工';
    userStaffAddFormRef.value?.open({
        enabled:EnabledStatusEnum.Enabled.value,
        orgId:state.pageFilter.orgId
    });
}

const onUpdate=(data:UserStaffOutput)=>{
    state.formTitle = '编辑员工';
    userStaffUpdateFormRef.value?.open(data);
}

const onDelete=(data:UserStaffOutput)=>{
    proxy.$modal.confirmDelete(`确定要删除 ${data.realName}?`)
    .then(async()=>{
        await new UserStaffApi().delete({id:data.id??''},{showSuccessMessage:true});
        onQuery();
    }).catch(()=>{});
}

const onSizeChange = (val:number)=>{
    state.pageFilter.pageNumber = 1;
    state.pageFilter.pageSize = val; 
    onQuery();   
}

const onCurrentChange=(val:number)=>{
    state.pageFilter.pageNumber = val;
    onQuery();
}

const onOrgSelectChange=(node:OrganizeInfoOutput|null)=>{
    state.pageFilter.orgId = node?.id;
    onQuery();
}

</script>