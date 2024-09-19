<template>
    <div class="my-layout">
        <el-card class="mt8" shadow="never" :body-style="{paddingBottom:'0'}">
            <el-form :inline="true" @submit.stop.prevent>
                <el-form-item label="关键字">
                    <el-input v-model="state.keyword" placeholder="名称/地址" @keyup.enter="onQuery"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
                    <el-popconfirm title="确定要同步接口" hide-icon width="180" hide-after="0" @confirm="onSync">
                        <template #reference>
                            <el-button v-auth="'api:console:api-info:sync:post'" type="primary" icon="ele-Refresh" :loading="state.syncLoading"> 同步 </el-button>
                        </template>
                    </el-popconfirm>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="my-fill mt8" shadow="never">
            <el-table :data="state.treeList"  style="width: 100%"
                v-loading="state.loading"
                row-key="id"
                :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
                :expand-row-keys="state.expandRowKeys">
                <el-table-column prop="name" label="接口名称" min-width="120" show-overflow-tooltip/>
                <el-table-column prop="path" label="接口地址" min-width="120" show-overflow-tooltip/> 
                <el-table-column prop="code" label="权限编码" min-width="120" show-overflow-tooltip/>
                <el-table-column prop="httpMethod" label="请求方法" min-width="60"/>
                <el-table-column prop="sort" label="排序" width="80" />
                <el-table-column label="状态" width="80" fixed="right">
                    <template #default="{ row }">
                        <el-switch
                        v-if="auth('api:console:api-info:change-status:put')"
                        v-model="row.enabled"
                        :loading="row.loading"
                        :active-value="1"
                        :inactive-value="0"
                        inline-prompt
                        active-text="启用"
                        inactive-text="禁用"
                        :before-change="() => onStatusChange(row)"
                        />
                        <template v-else>
                            <el-tag :type="getThemeByValue(EnabledStatusEnum,row.enabled)">
                                    {{getDescByValue(EnabledStatusEnum,row.enabled)}}
                                </el-tag>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="接口描述" min-width="120" show-overflow-tooltip />
            </el-table>
        </el-card>
    </div>
</template>

<script lang="ts" setup name="console/api">
import { getCurrentInstance, onMounted, reactive } from 'vue';
import { ApiInfoEnabledStatusChangeRequest, ApiInfoOutput } from '/@/api/console/data-contracts';
import { ApiInfoApi } from '/@/api/console/ApiInfo';
import { filterTree, listToTree, treeToList } from '/@/utils/tree';
import { cloneDeep } from 'lodash';
import { isValidGuid } from '/@/utils/toolsValidate';
import { getDescByValue, getThemeByValue } from '/@/utils/enum';
import { EnabledStatusEnum } from '/@/api/domain/enum-contracts';
import { auth } from '/@/utils/authFunction';

const { proxy } = getCurrentInstance() as any;

const state = reactive({
    loading:false,
    syncLoading:false,
    keyword:'',
    treeList:[] as Array<ApiInfoOutput>,
    expandRowKeys: [] as string[],
});

onMounted(async()=>{
   await onQuery();
   state.expandRowKeys = treeToList(cloneDeep(state.treeList))
    .filter((a: ApiInfoOutput) => !isValidGuid(a.parentId))
    .map((a: ApiInfoOutput) => a.id + '') as string[]
});

const onQuery=async()=>{
    state.loading = true;
    let result = await new ApiInfoApi().list({}).catch(()=>{
        state.loading=false;
    });
    state.treeList = filterTree(listToTree(cloneDeep(result?.data)),state.keyword,{
        filterWhere:(item:any,keyword:string)=>{
            return item.name?.toLocaleLowerCase().indexOf(keyword) > -1 || item.path?.toLocaleLowerCase().indexOf(keyword) > -1
        }
    });
    state.loading = false;
}

const onSync=async ()=>{
    state.syncLoading = true;
    await new ApiInfoApi().sync({showSuccessMessage:true}).catch(()=>{
        state.syncLoading=false;
    })
    onQuery();
    state.syncLoading = false;
}

const onStatusChange=async(apiInfo:ApiInfoOutput)=>{
    proxy.$modal.confirm(`确定要${apiInfo.enabled === 1 ? '禁用' : '启用'}${apiInfo.name}?`)
    .then(async()=>{
        let requestParam = {
            id:apiInfo.id,
            enabled:apiInfo.enabled ===1 ?0 :1
        } as ApiInfoEnabledStatusChangeRequest
        await new ApiInfoApi().changeStatus(requestParam,{showSuccessMessage:true});
        onQuery();
    })
}

</script>