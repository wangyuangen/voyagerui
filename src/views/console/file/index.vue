<template>
    <div class="my-layout">
        <el-card class="mt8" shadow="never" :body-style="{paddingBottom:'0'}">
            <el-form :inline="true" @submit.stop.prevent>
                <el-form-item label="关键字">
                    <el-input v-model="state.pageFilter.keyword" placeholder="关键字" @keyup.enter="onQuery"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
                    <el-button v-auth="'api:console:file-storage:upload:post'" type="primary" icon="ele-Upload" @click="onUpload"> 上传 </el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="my-fill mt8" shadow="never">
            <el-table v-loading="state.loading" :data="state.pageData.data" row-key="id" style="width:100%">
                <el-table-column prop="fileName" label="文件名" min-width="220">
                    <template #default="{ row }">
                        <div class="my-flex">
                            <el-image
                                v-if="isImage(row.extension)"
                                :src="row.linkUrl"
                                :preview-src-list="previewImglist"
                                :initial-index="getInitialIndex(row.linkUrl)"
                                :lazy="true"
                                :hide-on-click-modal="true"
                                fit="scale-down"
                                preview-teleported
                                style="width: 80px; height: 80px"
                            />
                            <div class="ml10 my-flex-fill my-flex-y-center">
                                <div>{{ (row.fileName || '') + (row.extension || '') }}</div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="bizName" label="关联业务对象" min-width="100" show-overflow-tooltip/>
				<el-table-column prop="bizId" label="关联业务主键" min-width="100" show-overflow-tooltip/>
                <el-table-column prop="sizeFormat" label="文件大小" width="120" />
                <el-table-column prop="providerName" label="OSS供应商" min-width="100" />
                <el-table-column prop="bucketName" label="OSS存储桶" min-width="120" />
                <el-table-column prop="fileDirectory" label="目录" min-width="120" show-overflow-tooltip/>
                <el-table-column label="操作记录" width="100">
                    <template #default="{row}">
                        <AuditableRecord :data="row" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" fixed="right" >
                    <template #default="{row}">
                        <el-button icon="ele-View" size="small" text type="primary" @click="onPreview(row)"> 预览 </el-button>
                        <my-dropdown-more>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="onDownload(row)">下载</el-dropdown-item>
                                    <el-dropdown-item @click="onDelete(row)" v-auth="'api:console:file-storage:delete:delete'">删除</el-dropdown-item>
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
                    @size-change="onPagesizeChange"
                    @current-change="onPagenumberChange"
                    layout="total, sizes, prev, pager, next, jumper"/>
            </div>
        </el-card>
        <FileUploadDialog ref="fileUploadRef" :title="state.fileUploadTitle" @file-upload-success="fileUploadSuccess"></FileUploadDialog>
        <FilePreview ref="filePreviewRef"></FilePreview>
    </div>
</template>

<script lang="ts" setup name="console/file">
import { computed, defineAsyncComponent, getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { FileStorageInfoOutput, FileStorageInfoPageRequest, PaginationResponseFileStorageInfoOutput } from '/@/api/console/data-contracts';
import { FileStorageApi } from '/@/api/console/FileStorage';

import { downloadByUrl } from '/@/utils/download';
import { isImage } from '/@/utils/test';

const { proxy } = getCurrentInstance() as any;

const AuditableRecord = defineAsyncComponent(()=>import('/@/components/table/auditableRecord.vue'))
const FileUploadDialog = defineAsyncComponent(()=>import('/@/components/my-file-upload/dialog.vue'));
const MyDropdownMore = defineAsyncComponent(()=>import('/@/components/my-dropdown-more/index.vue'));
const FilePreview = defineAsyncComponent(()=>import('./components/filePreview.vue'));

const fileUploadRef = ref();
const filePreviewRef = ref();

const state = reactive({
    loading:false,
    pageFilter:{
        orderBy:['CreatedOn Desc']
    } as FileStorageInfoPageRequest,
    pageData:{} as PaginationResponseFileStorageInfoOutput,
    fileUploadTitle:''
})

const fileUploadSuccess = ()=>{
    onQuery();
}

const previewImglist = computed(() => {
  let imgList = [] as string[]
  state.pageData.data?.forEach((a) => {
    if (isImage(a.extension as string) && a.linkUrl) {
      imgList.push(a.linkUrl as string)
    }
  })
  return imgList
})

const getInitialIndex = (imgUrl: string) => {
  return previewImglist.value.indexOf(imgUrl)
}

const onQuery=async()=>{
    state.loading = true;
    let result = await new FileStorageApi().page(state.pageFilter).catch(()=>{
        state.loading = false;
    })
    state.pageData = result?.data??{};
    state.loading = false;
}

onMounted(async()=>{
    onQuery();
})

//上传
const onUpload = ()=>{
    state.fileUploadTitle = '上传文件';
    fileUploadRef.value?.open();
}

const onPreview = (data:FileStorageInfoOutput)=>{
    filePreviewRef.value.onPreview(data);
}

const onDownload = (data:FileStorageInfoOutput)=>{
    if(!data.linkUrl){
        proxy.$modal.msgWarning("无效链接");
        return;
    }
    downloadByUrl({url:data.linkUrl});
}

const onPagesizeChange=(value:number)=>{
    state.pageData.pageSize = value;
    state.pageData.currentPage = 1;
    onQuery();
}

const onPagenumberChange=(value:number)=>{
    state.pageData.currentPage = value;
    onQuery();
}

const onDelete=(data:FileStorageInfoOutput)=>{
    proxy.$modal.confirmDelete(`确定要删除文件 ${data.fileName}${data.extension}?`)
        .then(async()=>{
            await new FileStorageApi().delete({id:data.id??''},{showSuccessMessage:true});
            onQuery();
        }).catch(()=>{});
}

</script>