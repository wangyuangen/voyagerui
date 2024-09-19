<template>
    <div class="my-layout">
        <el-card class="mt8" shadow="never" :body-style="{paddingBottom:'0'}">
            <el-form :inline="true" @submit.stop.prevent>
                <el-form-item>
                    <MySelectInput v-model="state.pageFilter.filter" :filters="state.filters" @search="onQuery"></MySelectInput>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
                    <el-button type="primary" icon="ele-Search" @click="onFilter"> 高级查询 </el-button>
                    <el-button v-auth="'api:console:tenant:create:post'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="my-fill mt8" shadow="never">
            <el-table v-loading="state.loading" :data="state.pageData.data" row-key="id" style="width:100%">
                <el-table-column prop="name" label="租户名称" min-width="120" show-overflow-tooltip/>
                <el-table-column prop="regionText" label="所在区域" min-width="100" show-overflow-tooltip/>
                <el-table-column prop="companyName" label="公司名称" min-width="120" show-overflow-tooltip/>
                <el-table-column prop="contactPerson" label="联系人" min-width="120" show-overflow-tooltip/>
                <el-table-column prop="contactMobile" label="联系手机" min-width="120" show-overflow-tooltip/>
                <el-table-column prop="tenantType" label="租户类型" width="100">
                    <template #default="{row}">
                        <el-tag :type="getThemeByValue(TenantTypeEnum,row.tenantType)">
                            {{getDescByValue(TenantTypeEnum,row.tenantType)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="enabled" label="状态" width="80" >
                    <template #default="{ row }">
                        <el-tag :type="getThemeByValue(EnabledStatusEnum,row.enabled)">
                            {{getDescByValue(EnabledStatusEnum,row.enabled)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="expiryDate" label="有效期限" :formatter="formatterDate" min-width="100" show-overflow-tooltip/>
                <el-table-column label="操作记录" width="100">
                    <template #default="{row}">
                        <AuditableRecord :data="row" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" fixed="right" 
                    v-auths="['api:console:tenant:update:put']">
                    <template #default="{row}">
                        <el-button v-auth="'api:console:tenant:update:put'" icon="ele-EditPen" text size="small" type="primary" @click="onUpdate(row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="my-flex my-flex-end" style="margin-top: 20px">
                <el-pagination 
                    v-model:currentPage="state.pageData.currentPage"
                    v-model:page-size="state.pageData.pageSize"
                    :total="state.pageData.totalCount"
                    :page-sizes="[10,20,50,100]"
                    small
                    background
                    @size-change="onPageSizeChange"
                    @current-change="onPageNumberChange"
                    layout="total, sizes, prev, pager, next, jumper"/>
            </div>
        </el-card>
        <TenantForm ref="tenantFormRef" :title="state.formTitle" @handleQuery="onQuery"></TenantForm>
        <MyFilterDialog ref="myFilterDialogRef" :fields="state.filters" @sure="onFilterSure"></MyFilterDialog>
    </div>
</template>

<script lang="ts" setup name="console/tenant">

import { defineAsyncComponent, onMounted, reactive, ref } from 'vue';
import { PaginationResponseTenantOutput, TenantOutput, TenantPageRequest } from '/@/api/console/data-contracts';
import { TenantApi } from '/@/api/console/Tenant';
import { EnabledStatusEnum, TenantTypeEnum } from '/@/api/domain/enum-contracts';
import { getDescByValue, getThemeByValue } from '/@/utils/enum';
import { dayjs } from 'element-plus';

const MySelectInput = defineAsyncComponent(()=>import('/@/components/my-select-input/index.vue'));
const MyFilterDialog = defineAsyncComponent(()=>import('/@/components/my-filter/dialog.vue'));
const TenantForm = defineAsyncComponent(()=>import('./components/tenantForm.vue'));
const AuditableRecord = defineAsyncComponent(()=>import('/@/components/table/auditableRecord.vue'));

const tenantFormRef = ref();
const myFilterDialogRef = ref()

const state = reactive({
    loading:false,
    pageData:{} as PaginationResponseTenantOutput,
    pageFilter:{} as TenantPageRequest,
    formTitle:'',
    filters:[
        {
            field: 'name',
            operator: 'Contains',
            description: '租户名称',
            componentName: 'el-input',
            defaultSelect: true,
        },
        {
            field: 'companyName',
            operator: 'Contains',
            description: '公司名称',
            componentName: 'el-input',
        },
        {
            field: 'contactPerson',
            operator: 'Contains',
            description: '联系人',
            componentName: 'el-input',
        },
        {
            field: 'contactMobile',
            operator: 'Contains',
            description: '联系手机',
            componentName: 'el-input',
        },
        {
            field: 'expiryDate',
            operator: 'GTE',
            description: '有效期限',
            componentName: 'el-date-picker',
            type: 'date',
            config: {
                format: 'YYYY-MM-DD',
                valueFormat: 'YYYY-MM-DD',
            },
        },
    ] as Array<DynamicFilterInfo>,
})

onMounted(async()=>{
    onQuery();
})

const formatterDate = (row: any, column: any, cellValue: any) => {
  return dayjs(cellValue).format('YYYY-MM-DD')
}

//高级查询
const onFilter = () => {
  myFilterDialogRef.value.open()
}

const onFilterSure = (dynamicFilter: any) => {
  state.pageFilter.filter = dynamicFilter
  onQuery()
}

const onQuery=async()=>{
    state.loading = true;
    let result = await new TenantApi().page(state.pageFilter).catch(()=>{
        state.loading = false;
    })
    state.pageData = result?.data??{};
    state.loading = false;
}

const onAdd = ()=>{
    state.formTitle = '新增租户';
    tenantFormRef.value?.open({enabled:EnabledStatusEnum.Enabled.value});
}

const onUpdate=(data:TenantOutput)=>{
    state.formTitle = '编辑租户';
    tenantFormRef.value?.open(data);
}

const onPageSizeChange=(value:number)=>{
    state.pageFilter.pageSize = value;
    state.pageFilter.pageNumber = 1;
    onQuery();
}

const onPageNumberChange=(value:number)=>{
    state.pageFilter.pageNumber = value;
    onQuery();
}
</script>