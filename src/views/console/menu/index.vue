<template>
    <div class="my-layout">
        <el-card class="mt8" shadow="never" :body-style="{paddingBottom:'0'}">
            <el-form :inline="true" @submit.stop.prevent>
                <el-form-item label="关键字">
                    <el-input v-model="state.keyword" placeholder="名称/地址" @keyup.enter="onQuery"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="ele-Search" @click="onQuery">查询</el-button>
                    <el-dropdown
                        v-auth="'api:console:menu-route:create:post'"
                        style="margin-left: 12px">
                        <el-button type="primary"
                        >新增<el-icon class="el-icon--right"><ele-ArrowDown /></el-icon
                        ></el-button>
                        <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="onAdd(1)">新增分组</el-dropdown-item>
                            <el-dropdown-item @click="onAdd(2)">新增菜单</el-dropdown-item>
                        </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="my-fill mt8" shadow="never">
            <el-table
                :data="state.treeList"
                style="width:100%"
                v-loading="state.loading"
                row-key="id"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                :expand-row-keys="state.expandRowKeys">
                <el-table-column prop="name" label="名称" min-width="120" show-overflow-tooltip>
                    <template #default="{ row }">
                        <SvgIcon :name="row.icon" />
                        {{ row.name }}
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="类型" width="80" show-overflow-tooltip>
                    <template #default="{ row }">
                        {{ row.type === 1 ? '分组' : row.type === 2 ? '菜单'  : '' }}
                    </template>
                </el-table-column>
                <el-table-column prop="routeUrl" label="地址" min-width="240" show-overflow-tooltip>
                    <template #default="{row}">
                        {{row.routeUrl?`路由地址：${row.routeUrl}`:''}}
                        {{row.redirectUrl?`重定向地址：${row.redirectUrl}`:''}}
                        {{row.view?.path?`视图路径：${row.view?.path}`:''}}
                        {{row.link?`链接地址：${row.link}`:''}}
                    </template>
                </el-table-column>
                <el-table-column prop="routeName" label="路由命名" min-width="120" show-overflow-tooltip/>
                <el-table-column prop="sort" label="排序" width="80" />
                <el-table-column prop="enabled" label="状态" width="80" >
                    <template #default="{ row }">
                        <el-tag :type="getThemeByValue(EnabledStatusEnum,row.enabled)">
                            {{getDescByValue(EnabledStatusEnum,row.enabled)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" fixed="right"
                v-auths="['api:console:menu-route:update:put','api:console:menu-route:delete:delete']">
                    <template #default="{row}">
                        <el-button icon="ele-EditPen" v-auth="'api:console:menu-route:update:put'" text size="small" type="primary" @click="onUpdate(row)">编辑</el-button>
                        <el-button icon="ele-Delete" v-auth="'api:console:menu-route:delete:delete'" text size="small" type="danger" @click="onDelete(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <MenuForm ref="menuFormRef" :title="state.formTitle" :select-tree-data="state.selectTreeList" @handleQuery="onQuery"/>
        <MenuGroupForm ref="menuGroupFormRef" :title="state.formTitle" :select-tree-data="state.selectTreeList" @handleQuery="onQuery"/>
    </div>
</template>

<script lang="ts" setup name="console/menu">
import { defineAsyncComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { MenuRouteOutput } from '/@/api/console/data-contracts';
import { getDescByValue, getThemeByValue } from '/@/utils/enum';
import { EnabledStatusEnum } from '/@/api/domain/enum-contracts';
import { MenuRouteApi } from '/@/api/console/MenuRoute';
import { filterTree, listToTree, treeToList } from '/@/utils/tree';
import { cloneDeep } from 'lodash';

const proxy = getCurrentInstance() as any;

const MenuForm = defineAsyncComponent(()=>import('./components/menuForm.vue'));
const MenuGroupForm = defineAsyncComponent(()=>import('./components/menuGroupForm.vue'));

const menuFormRef=ref();
const menuGroupFormRef=ref();

const state=reactive({
    loading:false,
    keyword:'',
    treeList:[] as Array<MenuRouteOutput>,
    expandRowKeys: [] as string[],
    selectTreeList:[] as Array<MenuRouteOutput>,
    formTitle:''
});

onMounted(async()=>{
    await onQuery();
    state.expandRowKeys = treeToList(cloneDeep(state.treeList))
    .filter((a: MenuRouteOutput) => a.opened === true)
    .map((a: MenuRouteOutput) => a.id + '') as string[]
});

const onQuery=async()=>{
    state.loading=true;
    let result = await new MenuRouteApi().list({}).catch(()=>{
        state.loading=false;
    });
    state.treeList = filterTree(listToTree(cloneDeep(result?.data)), state.keyword, {
      filterWhere: (item: any, keyword: string) => {
        return item.name?.toLocaleLowerCase().indexOf(keyword) > -1 || item.routeUrl?.toLocaleLowerCase().indexOf(keyword) > -1
      },
    })
    state.selectTreeList = listToTree(cloneDeep(result?.data));
    state.loading=false;
}

const onAdd=(menuType:Number)=>{
    switch(menuType){
        case 1:
            state.formTitle = '新增分组';
            menuGroupFormRef.value?.open({type:menuType,enabled:EnabledStatusEnum.Enabled.value});
            break;  
        case 2:
            state.formTitle = '新增菜单';
            menuFormRef.value?.open({type:menuType,enabled:EnabledStatusEnum.Enabled.value});
            break;
    }
}

const onUpdate=(menu:MenuRouteOutput)=>{
    switch(menu.type){
        case 1:
            state.formTitle='编辑分组';
            menuGroupFormRef.value?.open(menu);
            break;
        case 2:
            state.formTitle = '编辑菜单';
            menuFormRef.value.open(menu);
            break;  
    }
}

const onDelete=(menu:MenuRouteOutput)=>{
    proxy.$modal.confirmDelete(`确定要删除${menu.type===1?'分组':menu.type===2?'菜单':''}${menu.name}?`)
    .then(async()=>{
        await new MenuRouteApi().delete({id:menu.id??''},{loading:true});
        onQuery();
    }).catch(()=>{})
}

</script>