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
            <el-table ref="tableRef"
                v-loading="state.loading"
                :data="state.pageData.data"
                row-key="id"
                highlight-current-row
                style="width: 100%"
                @current-change="onSelectedChange">
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
        <DataDictForm ref="dataDictFormRef" :title="state.formTitle" @handleQuery="onQuery"></DataDictForm>
    </div>
</template>

<script lang="ts" setup name="console/dict/page">
import { defineAsyncComponent, getCurrentInstance, nextTick, onMounted, reactive, ref } from 'vue';
import { DataDictOutput, DataDictPageRequest, PaginationResponseDataDictOutput } from '/@/api/console/data-contracts';
import { EnabledStatusEnum } from '/@/api/domain/enum-contracts';
import { DataDictApi } from '/@/api/console/DataDict';
import { getDescByValue, getThemeByValue } from '/@/utils/enum';

const DataDictForm = defineAsyncComponent(()=>import('./components/dictForm.vue'));
const AuditableRecord = defineAsyncComponent(()=>import('/@/components/table/auditableRecord.vue'));

const emits = defineEmits(['selectedChange'])

const { proxy } = getCurrentInstance() as any;

const tableRef = ref()
const dataDictFormRef = ref();
 
const state = reactive({
    loading:false,
    formTitle:'',
    pageFilter:{} as DataDictPageRequest,
    pageData:{} as PaginationResponseDataDictOutput,
    selectedRow:{} as DataDictOutput
})

onMounted(async()=>{
    onQuery();
})

const onQuery=async()=>{
    state.loading = true;
    let result = await new DataDictApi().page(state.pageFilter).catch(()=>{
        state.loading = false;
    })
    state.pageData = result?.data??{};
    if(state.pageData.data?.length??0>0){
        nextTick(()=>{
            if(state.pageData.data){
                tableRef.value!.setCurrentRow(state.pageData.data[0]);
            }
        });
    }
    state.loading = false;
}

const onAdd = ()=>{
    state.formTitle = '新增字典';
    dataDictFormRef.value?.open({enabled:EnabledStatusEnum.Enabled.value});
}

const onUpdate=(data:DataDictOutput)=>{
    state.formTitle = '编辑字典';
    dataDictFormRef.value?.open(data);
}

const onDelete=(data:DataDictOutput)=>{
    proxy.$modal.confirmDelete(`确定要删除字典 ${data.name}?`)
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

const onSelectedChange=(selectedRow:DataDictOutput)=>{
    if(selectedRow && state.selectedRow.id!=selectedRow.id){
        state.selectedRow = selectedRow
        emits('selectedChange', selectedRow)
    }
}

</script>