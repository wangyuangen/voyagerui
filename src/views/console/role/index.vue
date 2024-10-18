<template>
    <div class="my-layout">
        <el-card class="mt8" shadow="never" :body-style="{paddingBottom:'0'}">
            <el-form :inline="true" :model="state.filter" @submit.stop.prevent>
                <el-form-item label="关键字">
                    <el-input v-model="state.filter.keyword" placeholder="关键字" @keyup.enter="onQuery"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
                    <el-button v-auth="'api:console:role:create:post'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="my-fill mt8" shadow="never">
            <el-table v-loading="state.loading" :data="state.pageData.data" style="width:100%" highlight-current-row>
                <el-table-column prop="name" label="角色名称" min-width="120" show-overflow-tooltip/>
                <el-table-column prop="sort" label="排序" width="80" show-overflow-tooltip />
                <el-table-column prop="enabled" label="状态" width="80" >
                    <template #default="{ row }">
                        <el-tag :type="getThemeByValue(EnabledStatusEnum,row.enabled)">
                            {{getDescByValue(EnabledStatusEnum,row.enabled)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" fixed="right" 
                    v-auths="['api:console:role:update:put','api:console:role:auth-change:post','api:console:role:delete:delete']">
                    <template #default="{row}">
                        <el-button v-auth="'api:console:role:update:put'" icon="ele-EditPen" text size="small" type="primary" @click="onUpdate(row)">编辑</el-button>
                        <my-dropdown-more v-auths="['api:console:role:auth-change:post','api:console:role:delete:delete']">
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-if="auth('api:console:role:auth-change:post')" @click="onPermissionChange(row)"> 配置权限 </el-dropdown-item>
                                    <el-dropdown-item v-if="auth('api:console:role:delete:delete')" @click="onDelete(row)">删除</el-dropdown-item>
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
                    @size-change="onSizeChange"
                    @current-change="onCurrentChange"
                    layout="total, sizes, prev, pager, next, jumper"/>
            </div>
        </el-card>
        <RoleForm ref="roleFormRef" :title="state.formTitle" @handleQuery="onQuery"/>
        <RolePermissionForm ref="rolePermissionFormRef" :title="state.formTitle"/>
    </div>
</template>


<script lang="ts" setup name="console/role">
import { defineAsyncComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { PaginationResponseRoleInfoOutput, RoleInfoOutput, RoleInfoPageRequest } from '/@/api/console/data-contracts';
import { RoleApi } from '/@/api/console/Role';
import { EnabledStatusEnum } from '/@/api/domain/enum-contracts';
import { getDescByValue, getThemeByValue } from '/@/utils/enum';
import { auth } from '/@/utils/authFunction';

const MyDropdownMore = defineAsyncComponent(() => import('/@/components/my-dropdown-more/index.vue'))

const RoleForm = defineAsyncComponent(()=>import('./components/roleForm.vue'));
const RolePermissionForm = defineAsyncComponent(()=>import('./components/rolePermission.vue'));

const roleFormRef = ref();
const rolePermissionFormRef = ref();

const { proxy } = getCurrentInstance() as any;

const state=reactive({
    loading:false,
    formTitle:'',
    filter:{ 
        orderBy:['Sort']
    } as RoleInfoPageRequest,
    pageData:{} as PaginationResponseRoleInfoOutput
});

onMounted(async()=>{
    onQuery();
})

const onQuery=async()=>{
    state.loading =true;
    let result = await new RoleApi().page(state.filter).catch(()=>{
        state.loading = false;
    });
    state.pageData = result?.data??{};
    state.loading = false;
}

const onPermissionChange=(data:RoleInfoOutput)=>{
    state.formTitle = `权限配置-${data.name}`;
    rolePermissionFormRef.value?.open(data.id);
}

const onAdd=()=>{
    state.formTitle = '新增角色';
    roleFormRef.value?.open({enabled:EnabledStatusEnum.Enabled.value});
}

const onUpdate=(data:RoleInfoOutput)=>{
    state.formTitle = '编辑角色';
    roleFormRef.value?.open(data);
}

const onDelete=(data:RoleInfoOutput)=>{
    proxy.$modal.confirmDelete(`确定要删除角色 ${data.name}?`)
    .then(async()=>{
        await new RoleApi().delete({id:data.id??''},{showSuccessMessage:true,loading:true});
        onQuery();
    }).catch(()=>{});
}

const onSizeChange=(val:number)=>{
    state.filter.pageNumber = 1;
    state.filter.pageSize = val;
    onQuery();
}

const onCurrentChange=(val:number)=>{
    state.filter.pageNumber = val;
    onQuery();
}

</script>