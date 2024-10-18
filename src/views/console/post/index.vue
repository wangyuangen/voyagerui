<template>
    <div class="my-layout">
        <el-card class="mt8" shadow="never" :body-style="{paddingBottom:'0'}">
            <el-form :inline="true" :model="state.pageFilter" @submit.stop.prevent>
                <el-form-item label="关键字">
                    <el-input v-model="state.pageFilter.keyword" placeholder="关键字" @keyup.enter="onQuery"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
                    <el-button v-auth="'api:console:post:create:post'" type="primary" icon="ele-Plus" @click="onAdd"> 新增 </el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="my-fill mt8" shadow="never">
            <el-table v-loading="state.loading" :data="state.pageData.data" style="width:100%" highlight-current-row>
                <el-table-column prop="name" label="岗位名称" min-width="120" show-overflow-tooltip/>
                <el-table-column label="操作" width="140" fixed="right" header-align="center"
                    v-auths="['api:console:post:update:put','api:console:post:delete:delete']">
                        <template #default="{ row }">
                            <el-button v-auth="'api:console:post:update:put'" icon="ele-EditPen" size="small" text type="primary" @click="onUpdate(row)">编辑</el-button>
                            <el-button v-auth="'api:console:post:delete:delete'" icon="ele-Delete" size="small" text type="danger" @click="onDelete(row)">删除</el-button>
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
        <PostForm ref="postFormRef" :title="state.formTitle" @handleQuery="onQuery"></PostForm>
    </div>
</template>

<script lang="ts" setup name="console/post">
import { defineAsyncComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { PaginationResponsePostInfoOutput, PostInfoOutput, PostInfoPageSearchRequest } from '/@/api/console/data-contracts';
import { PostApi } from '/@/api/console/Post';

const postFormRef = ref();
const { proxy } = getCurrentInstance() as any;
const PostForm = defineAsyncComponent(()=>import('./components/postForm.vue'));

const state = reactive({
    loading:false,
    formTitle:'',
    pageFilter:{} as PostInfoPageSearchRequest,
    pageData:{} as PaginationResponsePostInfoOutput
})

onMounted(async()=>{
    onQuery();
})

const onAdd = ()=>{
    state.formTitle = '新增岗位';
    postFormRef.value?.open({});
}

const onUpdate=(data:PostInfoOutput)=>{
    state.formTitle = '编辑岗位';
    postFormRef.value?.open(data);
}

const onQuery=async()=>{
    state.loading = true;
    let result = await new PostApi().page(state.pageFilter).catch(()=>{
        state.loading = false;
    })
    state.pageData = result?.data??{};
    state.loading = false;
}

const onPagesizeChange=(value:number)=>{
    state.pageFilter.pageSize = value;
    state.pageFilter.pageNumber = 1;
    onQuery();
}

const onPagenumberChange = (value:number)=>{
    state.pageFilter.pageNumber = value;
    onQuery();
}

const onDelete=(data:PostInfoOutput)=>{
    proxy.$modal.confirmDelete(`确定要删除岗位 ${data.name}?`)
        .then(async()=>{
            await new PostApi().delete({id:data.id??''},{showSuccessMessage:true});
            onQuery();
        }).catch(()=>{});
}

</script>