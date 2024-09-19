<template>
    <div class="my-layout">
        <el-card class="mt8" shadow="never" :body-style="{paddingBottom:'0'}">
            <el-form :inline="true" @submit.stop.prevent>
                <el-form-item label="机构名称">
                    <el-input v-model="state.keyword" placeholder="机构名称" @keyup.enter="onQuery"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
                    <el-button v-auth="'api:console:organize:create:post'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
                </el-form-item>
            </el-form>
       </el-card>

       <el-card class="my-fill mt8" shadow="never">
            <el-table 
                :data="state.orgTreeList"
                style="width:100%"
                v-loading="state.loading"
                row-key="id"
                default-expend-all
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column prop="name" label="机构名称" min-width="120" show-overflow-tooltip/> 
                <el-table-column prop="regionText" label="所在区域" min-width="100" show-overflow-tooltip/>
                <el-table-column prop="sort" label="排序" width="80" />
                <el-table-column prop="organizeType" label="机构类型" min-width="80">
                    <template #default="{row}">
                        <el-tag :type="getThemeByValue(OrganizeTypeEnum,row.organizeType)">
                            {{getDescByValue(OrganizeTypeEnum,row.organizeType)}}
                        </el-tag>
                    </template>
                </el-table-column>
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
                    v-auths="['api:console:organize:update:put','api:console:organize:delete:delete']">
                    <template #default="{row}">
                        <el-button v-auth="'api:console:organize:update:put'" icon="ele-EditPen" text size="small" type="primary" @click="onUpdate(row)">编辑</el-button>
                        <el-button v-auth="'api:console:organize:delete:delete'" icon="ele-Delete" text size="small" type="danger" @click="onDelete(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
       </el-card>
       <OrgForm ref="orgFormRef" :title="state.formTitle" :org-tree-list="state.orgTreeList" @handleQuery="onQuery"></OrgForm>
    </div>
</template>

<script lang="ts" setup name="console/org">
import { defineAsyncComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { OrganizeInfoOutput } from '/@/api/console/data-contracts';
import { OrganizeApi } from '/@/api/console/Organize';
import { filterTree, listToTree } from '/@/utils/tree';
import { EnabledStatusEnum, OrganizeTypeEnum } from '/@/api/domain/enum-contracts';
import { getDescByValue, getThemeByValue } from '/@/utils/enum';
import { cloneDeep } from 'lodash';

const OrgForm = defineAsyncComponent(()=>import('./components/orgForm.vue'));

const AuditableRecord = defineAsyncComponent(()=>import('/@/components/table/auditableRecord.vue'));

const orgFormRef = ref();

const { proxy } = getCurrentInstance() as any;

onMounted(()=>{
    onQuery();
})

const state=reactive({
    loading:false,
    orgTreeList:[] as Array<OrganizeInfoOutput>,
    keyword:'',
    formTitle:''
})

const onQuery = async()=>{
    state.loading = true;
    let result = await new OrganizeApi().list({}).catch(()=>{
        state.loading = false;
    })
    state.orgTreeList = filterTree(listToTree(cloneDeep(result?.data)),state.keyword,{
        filterWhere:(item:any,keyword:string)=>{
            return item.name?.toLocaleLowerCase().indexOf(keyword) > -1
        }
    });
    state.loading = false;
}

const onAdd = ()=>{
    state.formTitle = '新增部门';
    orgFormRef.value?.open({
        enabled:EnabledStatusEnum.Enabled.value,
        organizeType:OrganizeTypeEnum.Department.value
    });
}

const onUpdate=(data:OrganizeInfoOutput)=>{
    state.formTitle = '编辑部门';
    orgFormRef.value?.open(data);
}

const onDelete=(data:OrganizeInfoOutput)=>{
    proxy.$modal.confirmDelete(`确认要删除部门 ${data.name}?`)
    .then(async()=>{
        await new OrganizeApi().delete({id:data.id??''},{showSuccessMessage:true});
        onQuery();
    }).catch(()=>{});
}

</script>