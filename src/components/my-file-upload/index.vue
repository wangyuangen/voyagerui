<template>
    <el-upload drag :auto-upload="false" :limit="limit" :on-change="onFileChange"  accept=".jpg,.png,.bmp,.gif,.txt,.pdf,.xlsx,.docx">
        <el-icon class="el-icon--upload">
            <ele-UploadFilled />
        </el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
</template>

<script lang="ts" setup name="fileUpload">

defineProps({
    limit:{
        type:Number,
        default:1
    }
})

const emits = defineEmits(['onFileChange'])

const onFileChange=(currentFile:any,currentfileList:[])=>{
    emits('onFileChange',currentfileList);
}

</script>