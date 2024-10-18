<template>
    <el-upload 
        :limit="limit" 
        :multiple="multiple && limit>1"
        list-type="picture-card" 
        :auto-upload="false"
        :on-change="onChange" 
        :on-exceed="onExceed"
        accept=".jpg,.png,.bmp,.gif,.jpeg"
        v-model:file-list="state.imageList">
        <el-icon><ele-Plus /></el-icon>
        <template #file="{ file }">
        <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
            <span
                class="el-upload-list__item-preview"
                @click="onPreview()">
                <el-icon><ele-ZoomIn /></el-icon>
            </span>
            <span v-if="props.limit>1 && auth('api:console:file-storage:delete:delete')"
                class="el-upload-list__item-delete"
                @click="onRemove(file)">
                <el-icon><ele-Delete /></el-icon>
            </span>
            </span>
        </div>
        </template>
    </el-upload>
    <el-image-viewer v-if="state.showImgViewer" :url-list="state.imgViewList" @close="state.showImgViewer = false"></el-image-viewer>
</template>
<script lang="ts" setup>
import { getCurrentInstance, PropType, reactive, watch } from 'vue';
import { FileStorageInfoSimpleOutput } from '/@/api/console/data-contracts';
import { UploadRawFile, type UploadFile, type UploadFiles, type UploadUserFile } from 'element-plus';
import { FileStorageApi } from '/@/api/console/FileStorage';
import { auth, auths } from '/@/utils/authFunction';

const props = defineProps({
    limit:{
        type:Number,
        default:1
    },
    defaultImgs:{
        type:[] as PropType<FileStorageInfoSimpleOutput[]>,
        default:[]
    },
    multiple:{
        type:Boolean,
        default:false
    }
})

const emits = defineEmits(['onChange']);

const { proxy } = getCurrentInstance() as any;

const state = reactive({
    imageList:props.defaultImgs?.map(x=>{
        return {
            url:x.linkUrl,
            name:x.id,
        } as UploadUserFile
    }),
    showImgViewer:false,
    imgViewList:props.defaultImgs?.map(x=>x.linkUrl)
})

watch(
    ()=>props.defaultImgs,
    (images)=>{
        state.imageList = images.map(x=>{
            return {
                url:x.linkUrl,
                name:x.id,
            } as UploadUserFile
        })
    }
)

//删除
const onRemove=(image:UploadFile)=>{
    if(props.defaultImgs?.some(x=>x.id == image.name)){
        //服务端删除
        proxy.$modal.confirmDelete(`确定要从服务端删除该图片吗?`)
            .then(async()=>{
               let result =  await new FileStorageApi().delete({id:image.name},{showSuccessMessage:true});
               if(result.success){
                    state.imageList = state.imageList?.filter(x=>x.name != image.name);
                    state.imgViewList = state.imageList?.map(x=>x.url);
               }
            }).catch(()=>{});
    }else{
        state.imageList = state.imageList?.filter(x=>x.uid!=image.uid);
        state.imgViewList = state.imageList?.map(x=>x.url);
    }
}

//预览
const onPreview=()=>{
    state.showImgViewer = true;
}

const onExceed=(files:File[])=>{
    if(props.limit>1){
        proxy.$modal.msgWarning('允许上传的图片数量超过了限制');
        return;
    }
    if(state.imageList){
        let image = state.imageList[0];
        let file = files[0];
        image.name = file.name;
        image.raw = file as UploadRawFile;
        image.url = URL.createObjectURL(file);
        image.size = file.size;
    }
    emits('onChange',state.imageList);
    state.imgViewList =  state.imageList?.map(x=>x.url);
}

const onChange=(image:UploadFile,images:UploadFiles)=>{
    if(!auths(['api:console:file-storage:upload:post','api:console:file-storage:bulk-upload:post'])){
        proxy.$modal.msgError('您没有上传文件的权限,请联系管理员开通');
        return;
    }
    state.imageList?.push(image);
    state.imgViewList =  state.imageList?.map(x=>x.url);
    emits('onChange',images);
}

</script>