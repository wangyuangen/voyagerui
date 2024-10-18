<template>
    <div class="my-layout">
        <el-card class="mt8" shadow="never" :body-style="{paddingBottom:'0'}">
            <el-form :inline="true" @submit.stop.prevent>
                <el-form-item label="关键字">
                    <el-input v-model="state.keyword" placeholder="名称/路径" @keyup.enter="onQuery"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
                    <el-button v-auth="'api:console:view:create:post'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="my-fill mt8" shadow="never">
            <el-table
            :data="state.treeList"
            style="width: 100%"
            v-loading="state.loading"
            row-key="id"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                <el-table-column prop="name" label="视图名称" min-width="120" show-overflow-tooltip/>
                <el-table-column prop="routeName" label="路由命名" min-width="120" show-overflow-tooltip/>
                <el-table-column prop="path" label="视图路径" min-width="120" show-overflow-tooltip/>
                <el-table-column prop="sort" label="排序" width="80" show-overflow-tooltip />
                <el-table-column prop="enabled" label="状态" width="80" >
                    <template #default="{ row }">
                        <el-tag :type="getThemeByValue(EnabledStatusEnum,row.enabled)">
                            {{getDescByValue(EnabledStatusEnum,row.enabled)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" fixed="right" 
                    v-auths="['api:console:view:update:put','api:console:view:delete:delete']">
                    <template #default="{row}">
                        <el-button v-auth="'api:console:view:update:put'" icon="ele-EditPen" text size="small" type="primary" @click="onUpdate(row)">编辑</el-button>
                        <el-button v-auth="'api:console:view:delete:delete'" icon="ele-Delete" text size="small" type="danger" @click="onDelete(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <viewForm ref="viewFormRef" :title="state.formTitle" :-select-tree-list="state.treeList" @handleQuery="onQuery"/>
    </div>
</template>

<script lang="ts" setup name="console/view">
import { defineAsyncComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { ViewInfoOutput } from '/@/api/console/data-contracts';
import { ViewApi } from '/@/api/console/View';
import { filterTree, listToTree, treeToList } from '/@/utils/tree';
import { cloneDeep } from 'lodash';
import { EnabledStatusEnum } from '/@/api/domain/enum-contracts';
import { isValidGuid } from '/@/utils/toolsValidate';
import { getDescByValue, getThemeByValue } from '/@/utils/enum';

const viewForm = defineAsyncComponent(()=>import('./components/viewForm.vue'));

const viewFormRef = ref();

const { proxy } = getCurrentInstance() as any;

const state = reactive({
    loading:false,
    keyword:'',
    treeList:[] as Array<ViewInfoOutput>,
    expandRowKeys: [] as string[],
    formTitle:''
})

onMounted(async()=>{
    await onQuery();
    state.expandRowKeys = treeToList(cloneDeep(state.treeList))
    .filter((a: ViewInfoOutput) => !isValidGuid(a.parentId))
    .map((a: ViewInfoOutput) => a.id + '') as string[]
})

const onQuery=async()=>{
    state.loading=true;
    let result = await new ViewApi().list({}).catch(()=>{
        state.loading=false;
    });
    state.treeList = filterTree(listToTree(cloneDeep(result?.data)),state.keyword,{
       filterWhere:(item:any,keyword:string)=>{
        return item.name?.toLocaleLowerCase().indexOf(keyword) > -1 || item.path?.toLocaleLowerCase().indexOf(keyword) > -1
       } 
    });
    state.loading=false;
}

const onAdd = ()=>{
    state.formTitle = '新增视图';
    viewFormRef.value?.open({enabled:EnabledStatusEnum.Enabled.value});
}

const onUpdate=(view:any)=>{
    state.formTitle = '编辑视图';
    viewFormRef.value?.open(view);
}

const onDelete=(view:ViewInfoOutput)=>{
    proxy.$modal.confirmDelete(`确定要删除视图${view.name}?`)
    .then(async()=>{
        await new ViewApi().delete({id:view.id??''},{showSuccessMessage:true,loading:true});
        await onQuery();
    }).catch(()=>{});
}
</script>