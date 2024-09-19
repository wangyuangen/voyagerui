<template>
    <div class="my-layout">
        <el-card class="mt8" shadow="never" :body-style="{paddingBottom:'0'}">
            <el-form :inline="true" :model="state.pageFilter" @submit.stop.prevent>
                <el-form-item label="关键字">
                    <el-input v-model="state.pageFilter.keyword" placeholder="关键字" @keyup.enter="onQuery"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
                    <el-button v-auth="'api:console:package-info:create:post'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="my-fill mt8" shadow="never">
            <el-table v-loading="state.loading" :data="state.pageData.data" style="width:100%" highlight-current-row>
                <el-table-column prop="name" label="套餐名称" min-width="120" show-overflow-tooltip/>
                <el-table-column prop="sort" label="排序" width="80" show-overflow-tooltip />
                <el-table-column prop="enabled" label="状态" width="80" >
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
                    v-auths="['api:console:package-info:auth-change:post','api:console:package-info:update:put','api:console:package-info:delete:delete']">
                    <template #default="{row}">
                        <el-button v-auth="'api:console:package-info:update:put'" icon="ele-EditPen" text size="small" type="primary" @click="onUpdate(row)">编辑</el-button>
                        <my-dropdown-more>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-if="auth('api:console:package-info:auth-change:post')" @click="onAuthChange(row)"> 配置权限 </el-dropdown-item>
                                    <el-dropdown-item v-if="auth('api:console:package-info:delete:delete')" @click="onDelete(row)">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </my-dropdown-more>
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
                    @size-change="onPageSizeChange"
                    @current-change="onPageNumberChange"
                    layout="total, sizes, prev, pager, next, jumper"/>
            </div>
        </el-card>
        <PackageForm ref="packageFormRef" :title="state.formTitle" @handleQuery="onQuery"></PackageForm>
        <PackagePermission ref="pacakgePermissionRef" :title="state.formTitle"></PackagePermission>
    </div>
</template>

<script lang="ts" setup name="console/package">

import { defineAsyncComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { PackageInfoOutput, PackageInfoPageRequest, PaginationResponsePackageInfoOutput } from '/@/api/console/data-contracts';
import { PackageInfoApi } from '/@/api/console/PackageInfo';
import { EnabledStatusEnum } from '/@/api/domain/enum-contracts';
import { getDescByValue, getThemeByValue } from '/@/utils/enum';
import { auth } from '/@/utils/authFunction';

const MyDropdownMore = defineAsyncComponent(()=>import('/@/components/my-dropdown-more/index.vue'));
const PackageForm = defineAsyncComponent(()=>import('./components/packageForm.vue'));
const PackagePermission = defineAsyncComponent(()=>import('./components/packagePermission.vue'));
const AuditableRecord = defineAsyncComponent(()=>import('/@/components/table/auditableRecord.vue'));

const packageFormRef = ref();
const pacakgePermissionRef = ref();

const { proxy } = getCurrentInstance() as any;

const state=reactive({
    formTitle:'',
    loading:false,
    pageData:{} as PaginationResponsePackageInfoOutput,
    pageFilter:{} as PackageInfoPageRequest
});

onMounted(async()=>{
    onQuery();
})

const onQuery=async()=>{
    state.loading = true;
    let result = await new PackageInfoApi().page(state.pageFilter).catch(()=>{
        state.loading = false;
    })
    state.pageData = result?.data??{};
    state.loading = false;
}

const onAdd = ()=>{
    state.formTitle = '新增套餐';
    packageFormRef.value?.open({enabled:EnabledStatusEnum.Enabled.value});
}

const onUpdate=(data:PackageInfoOutput)=>{
    state.formTitle = '编辑套餐';
    packageFormRef.value?.open(data);
}

const onDelete=(data:PackageInfoOutput)=>{
    proxy.$modal.confirmDelete(`确定要删除套餐 ${data.name}?`)
    .then(async()=>{
        await new PackageInfoApi().delete({id:data.id??''},{showSuccessMessage:true});
        onQuery();
    }).catch(()=>{});
}

const onAuthChange=(data:PackageInfoOutput)=>{
    state.formTitle = `权限配置-${data.name}`;
    pacakgePermissionRef.value?.open(data.id);
}

const onPageNumberChange=(value:number)=>{
    state.pageFilter.pageNumber = value;
    onQuery();
}

const onPageSizeChange=(value:number)=>{
    state.pageFilter.pageNumber = 1;
    state.pageFilter.pageSize = value;
    onQuery();
}

</script>