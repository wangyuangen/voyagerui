<template>
     <el-drawer :title="state.showViewerTitle" v-model="state.showDocxViewer" size="50%" destroy-on-close>
			<vue-office-docx :src="state.fileViewUrl" style="height: 100vh" @rendered="renderedHandler" @error="errorHandler" />
		</el-drawer>
		<el-drawer :title="state.showViewerTitle" v-model="state.showXlsxViewer" size="50%" destroy-on-close>
			<vue-office-excel :src="state.fileViewUrl" style="height: 100vh" @rendered="renderedHandler" @error="errorHandler" />
		</el-drawer>
		<el-drawer :title="state.showViewerTitle" v-model="state.showPdfViewer" size="50%" destroy-on-close>
			<vue-office-pdf :src="state.fileViewUrl" style="height: 100vh" @rendered="renderedHandler" @error="errorHandler" />
		</el-drawer>
		<el-image-viewer v-if="state.showImgViewer" :url-list="state.imgViewList" @close="state.showImgViewer = false"></el-image-viewer>
</template>

<script lang="ts" setup>
import VueOfficeDocx from '@vue-office/docx';
import VueOfficeExcel from '@vue-office/excel';
import VueOfficePdf from '@vue-office/pdf';
import '@vue-office/docx/lib/index.css';
import '@vue-office/excel/lib/index.css';
import { getCurrentInstance, reactive } from 'vue';
import { FileStorageInfoSimpleOutput } from '/@/api/console/data-contracts';

const { proxy } = getCurrentInstance() as any;

const state=reactive({
    showDocxViewer: false,
	showXlsxViewer: false,
	showPdfViewer: false,
	showImgViewer: false,
    imgViewList: [] as string[],
    showViewerTitle:'',
    fileViewUrl:'',
})

const onPreview = (data:FileStorageInfoSimpleOutput)=>{
    if(!data.linkUrl){
        proxy.$modal.msgWarning("无效链接");
        return;
    }
	state.showViewerTitle = `[${data.fileName}${data.extension}]`;
    state.fileViewUrl = data.linkUrl;
    if (data.extension == '.pdf') {
		state.showPdfViewer = true;
	} else if (data.extension == '.docx') {
		state.showDocxViewer = true;
	} else if (data.extension == '.xlsx') {
		state.showXlsxViewer = true;
	} else if (['.jpg', '.png', '.jpeg', '.bmp'].findIndex((e) => e == data.extension) > -1) {
		state.imgViewList = [data.linkUrl];
		state.showImgViewer = true;
	} else {
		proxy.$modal.msgWarning('此文件格式不支持预览');
	}
}

defineExpose({onPreview});

// 文件渲染完成
const renderedHandler = () => {

};
// 文件渲染失败
const errorHandler = () => {

};

</script>