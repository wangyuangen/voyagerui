<template>
    <el-upload drag 
        :auto-upload="false" 
        :limit="limit" 
        :multiple="multiple && limit>1"
        :on-change="onFileChange" 
        :on-exceed="onExceed"
        accept=".jpg,.png,.bmp,.gif,.txt,.pdf,.xlsx,.docx">
        <el-icon class="el-icon--upload">
            <ele-UploadFilled />
        </el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
</template>

<script lang="ts" setup name="fileUpload">
import { getCurrentInstance } from 'vue';

defineProps({
    limit:{
        type:Number,
        default:1
    },
    multiple:{
        type:Boolean,
        default:false
    }
})

const { proxy } = getCurrentInstance() as any;

const onExceed=()=>{
    proxy.$modal.msgWarning('允许上传的文件数量超过了限制');
}

const emits = defineEmits(['onFileChange'])

const onFileChange=(currentFile:any,currentfileList:[])=>{
    emits('onFileChange',currentfileList);
}

</script>