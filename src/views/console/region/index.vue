<template>
    <div class="my-layout">
        <el-card class="mt8" shadow="never" :body-style="{paddingBottom:'0'}">
            <el-form :inline="true" @submit.stop.prevent>
                <el-form-item>
                    <RegionSelect @change="onRegionSelectedChange"></RegionSelect>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="state.pageFilter.name" placeholder="区域名称" @keyup.enter="onQuery"/>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="state.pageFilter.level" empty-values="[null]" style="width: 100px" @change="onQuery">
                        <el-option label="全部" :value="undefined" />
                        <el-option v-for="item in state.regionLevelList" :key="item.label" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="state.pageFilter.enabled" :empty-values="[null]" style="width: 100px" @change="onQuery">
                        <el-option label="全部" :value="undefined" />
                        <el-option v-for="item in state.enabledStatusList" :key="item.label" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="热门">
                    <el-select v-model="state.pageFilter.hot" :empty-values="[null]" style="width: 100px" @change="onQuery">
                        <el-option v-for="item in state.hotList" :key="item.name" :label="item.name" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
                    <el-button v-auth="'api:console:region:create:post'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
                    <el-button v-auth="'api:console:region:sync:post'" ref="syncRef" :loading="state.syncloading" type="primary" icon="ele-Refresh">
                        同步
                    </el-button>
                    <el-popover
                        v-if="auth('api:console:region:sync:post')"
                        ref="popoverRef"
                        :virtual-ref="syncRef"
                        trigger="click"
                        virtual-triggering
                        :width="300">
                        <p class="my-flex my-flex-items-center">
                        确定要同步至
                        <el-select v-model="state.syncRegionLevel" size="small" :teleported="false" style="width: 75px; margin: 0px 5px">
                            <el-option v-for="item in state.regionLevelList" :key="item.label" :label="item.label" :value="item.value" />
                        </el-select>
                        ？
                        </p>
                        <div class="mt10" style="text-align: right">
                        <el-button size="small" text @click="onSyncCancel">取消</el-button>
                        <el-button size="small" type="primary" @click="onSync"> 确定 </el-button>
                        </div>
                    </el-popover>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="my-fill mt8" shadow="never">
            <el-table v-loading="state.loading" :data="state.pageData.data" default-expand-all highlight-current-row style="width: 100%">
                <el-table-column prop="name" label="区域名称" min-width="120" show-overflow-tooltip />
                <el-table-column prop="code" label="区域代码" min-width="120" show-overflow-tooltip />
                <el-table-column prop="parentCode" label="上级代码" min-width="120" show-overflow-tooltip/>
                 <el-table-column label="类型" width="80">
                    <template #default="{row}">
                        <el-tag :type="getThemeByValue(RegionLevelEnum,row.level)">
                            {{getDescByValue(RegionLevelEnum,row.level)}}
                        </el-tag>
                    </template>
                 </el-table-column>
                <el-table-column prop="pinyin" label="拼音" min-width="120" show-overflow-tooltip />
                <el-table-column prop="sort" label="排序" width="80" show-overflow-tooltip />
                <el-table-column label="状态" width="80" fixed="right">
                    <template #default="{ row }">
                        <el-switch
                        v-if="auth('api:console:region:set-enabled:post')"
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
                <el-table-column label="热门" width="80" fixed="right">
                <template #default="{ row }">
                    <el-switch
                    v-if="auth('api:console:region:set-hot:post')"
                    v-model="row.hot"
                    :loading="row.hotLoading"
                    :active-value="true"
                    :inactive-value="false"
                    inline-prompt
                    active-text="是"
                    inactive-text="否"
                    :before-change="() => onHotChange(row)"
                    />
                    <template v-else>
                    <el-tag type="success" v-if="row.enabled">是</el-tag>
                    <el-tag type="danger" v-else>否</el-tag>
                    </template>
                </template>
                </el-table-column>
                <el-table-column label="操作" width="160" fixed="right" header-align="center">
                    <template #default="{ row }">
                        <el-button v-auth="'api:console:region:update:put'" icon="ele-EditPen" size="small" text type="primary" @click="onUpdate(row)">编辑</el-button>
                        <el-button v-auth="'api:console:region:delete:delete'" icon="ele-Delete" size="small" text type="danger" @click="onDelete(row)">删除</el-button>
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
                layout="total, sizes, prev, pager, next, jumper"/>
            </div>
        </el-card>
        <RegionForm ref="regionFormRef" :title="state.formTitle" @handleQuery="onQuery"></RegionForm>
    </div>
</template>

<script lang="ts" setup name="console/region">
import { defineAsyncComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { PaginationResponseRegionInfoPageOutput, RegionInfoEnabledChangeRequest, RegionInfoHotChangeRequest, RegionInfoPageOutput, RegionInfoPageRequest, RegionLevel } from '/@/api/console/data-contracts';
import { getDescByValue, getThemeByValue, toOptionsByValue } from '/@/utils/enum';
import { EnabledStatusEnum, RegionLevel as RegionLevelEnum } from '/@/api/domain/enum-contracts';
import { RegionApi } from '/@/api/console/Region';
import { auth } from '/@/utils/authFunction';

const RegionForm = defineAsyncComponent(()=>import('./components/regionForm.vue'));
const RegionSelect = defineAsyncComponent(()=>import('./components/regionSelect.vue'));

const { proxy } = getCurrentInstance() as any;
const regionFormRef = ref();
const syncRef = ref()
const popoverRef = ref()

const state=reactive({
    loading:false,
    syncloading:false,
    syncRegionLevel: 2 as RegionLevel,
    formTitle:'',
    pageData:{} as PaginationResponseRegionInfoPageOutput,
    pageFilter:{} as RegionInfoPageRequest,
    regionLevelList:toOptionsByValue(RegionLevelEnum),
    enabledStatusList:toOptionsByValue(EnabledStatusEnum),
    hotList:[
        { name: '全部', value: undefined },
        { name: '是', value: true },
        { name: '否', value: false },
    ]
})

const onRegionSelectedChange=(node:any)=>{
    state.pageFilter.parentCode = node?.value;
}

const onQuery = async()=>{
    state.loading = true;
    let result = await new RegionApi().page(state.pageFilter).catch(()=>{
        state.loading = false;
    })
    state.pageData = result?.data??{};
    state.loading = false;
}

onMounted(()=>{
    onQuery();
})

const onPagesizeChange=(value:number)=>{
    state.pageFilter.pageSize = value;
    state.pageFilter.pageNumber = 1;
    onQuery();
}

const onPagenumberChange=(value:number)=>{
    state.pageFilter.pageNumber = value;
    onQuery();
}

const onAdd = ()=>{
    state.formTitle = '新增区域';
    regionFormRef.value.open({
        enabled:EnabledStatusEnum.Enabled.value,
        hot:false
    });
}

const onUpdate =(data:RegionInfoPageOutput)=>{
    state.formTitle = '编辑区域';
    regionFormRef.value.open(data);
}

const onDelete=(data:RegionInfoPageOutput)=>{
    proxy.$modal.confirmDelete(`确定要删除区域 ${data.name} ?`)
        .then(async()=>{
            await new RegionApi().delete({Id:data.id??''},{showSuccessMessage:true});
            onQuery();
        }).catch(()=>{});
}

const onStatusChange=async(data:RegionInfoPageOutput)=>{
    proxy.$modal.confirm(`确定要${data.enabled === 1 ? '禁用' : '启用'}${data.name}?`)
    .then(async()=>{
        let requestParam = {
            id:data.id,
            enabled:data.enabled ===1 ?0 :1
        } as RegionInfoEnabledChangeRequest
        await new RegionApi().setEnabled(requestParam,{showSuccessMessage:true});
        onQuery();
    })
}

const onHotChange = async(data:RegionInfoPageOutput)=>{
    proxy.$modal.confirm(`确定要${data.hot ? '关闭' : '开启'}${data.name}热门?`)
    .then(async()=>{
        let requestParam = {
            id:data.id,
            hot:!data.hot
        } as RegionInfoHotChangeRequest;
        await new RegionApi().setHot(requestParam,{showSuccessMessage:true});
        onQuery();
    })
}

const onSyncCancel = () => {
  popoverRef.value?.hide?.()
}

const onSync=async()=>{
    onSyncCancel()
    state.syncloading = true;
    await new RegionApi().sync(state.syncRegionLevel,{showErrorMessage:false}).then(()=>{
        proxy.$modal.msgSuccess('同步任务后台运行中');
    }).catch(() => {
      proxy.$modal.msgError('同步任务启动失败');
    }).finally(() => {
        state.syncloading = false;
    })
}

</script>