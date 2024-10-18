<template>
    <div>
        <el-dialog v-model="state.showDialog"
            destroy-on-close
            :title="title"
            draggable
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="400px">
            <div class="mb15">
                <el-row :gutter="35">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <el-switch v-model="state.fileRename" active-text="文件自动重命名" />
                    </el-col>
                </el-row>
            </div>
           <FileUpload :limit="1" @on-file-change="onFileChange"></FileUpload>
           <template #footer>
                <span class="dialog-footer">
                    <el-button @click="onCancel" size="default">取 消</el-button>
                    <el-button type="primary" @click="onUpload" size="default" :loading="state.loading">上 传</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup name="fileUploadDialog">
import { defineAsyncComponent, getCurrentInstance, reactive } from 'vue';
import { FileStorageApi } from '/@/api/console/FileStorage';

const FileUpload = defineAsyncComponent(()=>import('./index.vue'));

const { proxy } = getCurrentInstance() as any;

const emits = defineEmits(['fileUploadSuccess']);

defineProps({
    title:{
        type:String,
        default:'上传文件'
    }
})

const state = reactive({
    showDialog:false,
    loading:false,
    fileList:[] as any,
    fileRename:false
})

const onFileChange=(fileList:[])=>{
    state.fileList = fileList;
}

const onCancel=()=>{
    state.showDialog = false;
}

const onSuccess=()=>{
    emits('fileUploadSuccess');
    onCancel();
}

const open=()=>{
    state.showDialog = true;
}

const onUpload = async()=>{
    state.loading = true;
    if(!state.fileList || state.fileList.length==0){
        proxy.$modal.msgWarning("请选择文件");
        return;
    }
    let result = await new FileStorageApi().upload({File:state.fileList[0].raw,ReName:state.fileRename},{showSuccessMessage:true}).catch(()=>{
        state.loading = false;
    })
    if(result?.success){
        onSuccess();
    }
    state.loading = false;
}

defineExpose({open});

</script>