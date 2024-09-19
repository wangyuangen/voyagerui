<template>
    <div class="my-flex-column w100 h100">
        <el-card class="mt8" shadow="never" :body-style="{ paddingBottom: '0' }">
            <el-form :model="state.pageFilter" :inline="true" @submit.stop.prevent>
                <el-form-item prop="name">
                    <el-input v-model="state.pageFilter.keyword" placeholder="关键字" @keyup.enter="onQuery" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
                    <el-button v-auth="'api:console:data-dict:create:post'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="my-fill mt8" shadow="never">
            <el-table v-loading="state.loading" :data="state.pageData.data" row-key="id" style="width: 100%">
                <el-table-column prop="code" label="编码" min-width="120" show-overflow-tooltip/>
                <el-table-column label="名称" min-width="120" show-overflow-tooltip>
                    <template #default="{row}">
                        <el-tag :type="row.themeStyle">
                            {{row.name}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="排序" width="60"/>
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
                <el-table-column label="操作" width="140" fixed="right" header-align="center" 
                v-auths="['api:console:data-dict:update:put','api:console:data-dict:delete:delete']">
                    <template #default="{ row }">
                        <el-button v-auth="'api:console:data-dict:update:put'" icon="ele-EditPen" size="small" text type="primary" @click="onUpdate(row)">编辑</el-button>
                        <el-button v-auth="'api:console:data-dict:delete:delete'" icon="ele-Delete" size="small" text type="danger" @click="onDelete(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="my-flex my-flex-end" style="margin-top: 20px">
                <el-pagination
                v-model:currentPage="state.pageFilter.pageNumber"
                v-model:page-size="state.pageFilter.pageSize"
                :total="state.pageData.totalCount"
                :page-sizes="[10, 20, 50, 100]"
                small
                background
                @size-change="onPagesizeChange"
                @current-change="onPagenumberChange"
                layout="total, sizes, prev, pager, next, jumper"
                />
            </div>
        </el-card>  
        <DataDictChildForm ref="dictChildFormRef" :title="state.formTitle" @handleQuery="onQuery"></DataDictChildForm>
    </div>
</template>

<script lang="ts" setup name="console/dictChild/page">
import { defineAsyncComponent, getCurrentInstance, reactive, ref } from 'vue';
import { DataDictOutput, DataDictPageRequest, PaginationResponseDataDictOutput } from '/@/api/console/data-contracts';
import { DataDictApi } from '/@/api/console/DataDict';
import { EnabledStatusEnum } from '/@/api/domain/enum-contracts';
import { getDescByValue, getThemeByValue } from '/@/utils/enum';

const DataDictChildForm = defineAsyncComponent(()=>import('./components/dictChildForm.vue'));
const AuditableRecord = defineAsyncComponent(()=>import('/@/components/table/auditableRecord.vue'));

const {proxy} = getCurrentInstance() as any;

const dictChildFormRef = ref();

const state = reactive({
    loading:false,
    pageData:{} as PaginationResponseDataDictOutput,
    pageFilter:{} as DataDictPageRequest,
    formTitle:'',
    dictName :''
})

const onQuery=async()=>{
    state.loading = true;
    let result  = await new DataDictApi().page(state.pageFilter).catch(()=>{
        state.loading = false;
    })
    state.pageData = result?.data??{};
    state.loading = false;
}

const onAdd=()=>{
    if(!state.pageFilter.parentCode){
        proxy.$modal.msgWarning('请先选择父级字典')
        return
    }
    state.formTitle = `新增 [${state.dictName}] 子项`;
    dictChildFormRef.value?.open({
        enabled:EnabledStatusEnum.Enabled.value,
        parentCode:state.pageFilter.parentCode,
        code:`${state.pageFilter.parentCode}_`
    });
}

const onUpdate=(data:DataDictOutput)=>{
    state.formTitle = `编辑 [${state.dictName}] 子项`;
    dictChildFormRef.value?.open(data);
}

const onDelete=(data:DataDictOutput)=>{
    proxy.$modal.confirmDelete(`确定要删除字典子项 ${data.name}?`)
        .then(async()=>{
            await new DataDictApi().delete({id:data.id??''},{showSuccessMessage:true});
            onQuery();
        }).catch(()=>{});
}

const onPagesizeChange = (value:number)=>{
    state.pageFilter.pageSize = value;
    state.pageFilter.pageNumber = 1;
    onQuery();
}

const onPagenumberChange=(value:number)=>{
    state.pageFilter.pageNumber = value;
    onQuery();
}

const onRefresh=(data:DataDictOutput)=>{
    state.pageFilter.parentCode = data.code;
    state.dictName = data.name ?? '';
    onQuery();
}

defineExpose({onRefresh});

</script>