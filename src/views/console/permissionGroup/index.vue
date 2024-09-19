
<template>
    <div class="my-layout">
        <el-card class="mt8" shadow="never" :body-style="{paddingBottom:'0'}">
            <el-form :inline="true" @submit.stop.prevent>
                <el-form-item label="名称">
                    <el-input v-model="state.keyword" placeholder="权限组名称" @keyip.enter="onQuery"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
                    <el-button v-auth="'api:console:permission-group:create:post'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="my-fill mt8" shadow="never">
            <el-table :data="state.treeList" style="width:100%"    
                v-loading="state.loading"
                row-key="id"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                :expand-row-keys="state.expandRowKeys">
                <el-table-column prop="name" label="名称" min-width="120" show-overflow-tooltip/> 
                <el-table-column prop="sort" label="排序" width="80" show-overflow-tooltip />
                <el-table-column prop="enabled" label="状态" width="80" >
                    <template #default="{ row }">
                        <el-tag :type="getThemeByValue(EnabledStatusEnum,row.enabled)">
                            {{getDescByValue(EnabledStatusEnum,row.enabled)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="接口资源" min-width="240">
                    <template #default="{row}">
                        <el-tag v-for="(api,index) in row.permissionGroupApis" :key="index">
                            {{api.api.code}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="权限范围" min-width="120" show-overflow-tooltip>
                    <template #default="{row}">
                        <el-tag :type="getThemeByValue(DataPermissionScope,row.scope)">
                            {{getDescByValue(DataPermissionScope,row.scope)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作记录" width="100">
                    <template #default="{row}">
                        <AuditableRecord :data="row" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" fixed="right" 
                    v-auths="['api:console:permission-group:delete:delete','api:console:permission-group:update:put']">
                    <template #default="{row}">
                        <el-button v-auth="'api:console:permission-group:update:put'" icon="ele-EditPen" text size="small" type="primary" @click="onUpdate(row)">编辑</el-button>
                        <el-button v-auth="'api:console:permission-group:delete:delete'" icon="ele-Delete" text size="small" type="danger" @click="onDelete(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <PermissionGroupForm ref="permissionGroupFormRef" :title="state.formTitle" :select-tree-data="state.treeList" @handleQuery="onQuery"/>
    </div>
</template>

<script lang="ts" setup name="console/permissionGroup">
import { defineAsyncComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { PermissionGroupWithApiOutput } from '/@/api/console/data-contracts';
import { PermissionGroupApi } from '/@/api/console/PermissionGroup';
import { filterTree, listToTree, treeToList } from '/@/utils/tree';
import { cloneDeep } from 'lodash';
import { DataPermissionScope, EnabledStatusEnum } from '/@/api/domain/enum-contracts';
import { isValidGuid } from '/@/utils/toolsValidate';
import { getDescByValue, getThemeByValue } from '/@/utils/enum';

const PermissionGroupForm = defineAsyncComponent(()=>import('./components/permissionGroupForm.vue'));
const AuditableRecord = defineAsyncComponent(()=>import('/@/components/table/auditableRecord.vue'))

const { proxy } = getCurrentInstance() as any;

const permissionGroupFormRef = ref();

    const state = reactive({
        loading:false,
        keyword:'',
        treeList:[] as Array<PermissionGroupWithApiOutput>,
        expandRowKeys: [] as string[],
        formTitle:''
    })

    onMounted(async()=>{
        await onQuery();
        state.expandRowKeys = treeToList(cloneDeep(state.treeList))
        .filter((a: PermissionGroupWithApiOutput) => !isValidGuid(a.parentId))
        .map((a: PermissionGroupWithApiOutput) => a.id + '') as string[]
    })

    const onQuery = async()=>{
        state.loading = true;
        let result = await new PermissionGroupApi().list({}).catch(()=>{
            state.loading=false;
        });
        state.treeList = filterTree(listToTree(cloneDeep(result?.data)),state.keyword,{
            filterWhere:(item:any,keyword:string)=>{
                return item.name?.toLocaleLowerCase().indexOf(keyword) > -1
            }
        })
        state.loading = false;
    }

    const onAdd = ()=>{
        state.formTitle = '新增权限组';
        permissionGroupFormRef.value?.open({enabled:EnabledStatusEnum.Enabled.value,scope:DataPermissionScope.All.value});
    }

    const onUpdate=(data:PermissionGroupWithApiOutput)=>{
        state.formTitle = '编辑权限组';
        permissionGroupFormRef.value?.open(data);
    }

    const onDelete=(data:PermissionGroupWithApiOutput)=>{
        proxy.$modal.confirmDelete(`确定要删除权限组${data.name}?`)
        .then(async()=>{
            await new PermissionGroupApi().delete({id:data.id??''},{showSuccessMessage:true,loading:true});
            onQuery();
        }).catch(()=>{});
    }
</script>