<template>
    <div class="my-flex-column">
        <el-drawer v-model="state.isVisible" title="在线用户" size="50%">
            <el-card class="mt8" shadow="hover" :body-style="{paddingBottom:'0'}" style="margin:8px">
                <el-form :model="state.pageInput" ref="queryForm" :inline="true">
					<el-form-item label="关键字">
						<el-input placeholder="昵称/真实姓名" clearable @keyup.enter="onQuery" v-model="state.pageInput.keyword" />
					</el-form-item>
					<el-form-item>
						<el-button-group>
							<el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
						</el-button-group>
					</el-form-item>
				</el-form>
            </el-card>

            <el-card class="my-fill mt8" shadow="hover" style="margin: 8px; padding-bottom: 15px">
				<el-table :data="state.pageOutput.data" style="width: 100%" v-loading="state.loading">
					<el-table-column prop="nickName" label="昵称" show-overflow-tooltip />
					<el-table-column prop="realName" label="真实姓名"  show-overflow-tooltip />
					<el-table-column prop="ip" label="IP地址" min-width="100"  show-overflow-tooltip />
					<el-table-column prop="browser" label="浏览器" show-overflow-tooltip />
					<el-table-column prop="connectionTime" label="登录时间" :formatter="formatterTime" min-width="120" show-overflow-tooltip />
                    <el-table-column prop="os" label="操作系统" min-width="120"  show-overflow-tooltip />
					<el-table-column label="操作" width="81" fixed="right" v-auths="['api:console:online-user:force-offline:post']">
						<template #default="scope">
							<el-button v-auth="'api:console:online-user:force-offline:post'" icon="ele-CircleCloseFilled" size="small" text type="danger" @click="forceOffline(scope.row)"> 强制下线 </el-button>
						</template>
					</el-table-column>
				</el-table>
                <div class="my-flex my-flex-end" style="margin-top: 20px">
                    <el-pagination
                        v-model:currentPage="state.pageInput.pageNumber"
                        v-model:page-size="state.pageInput.pageSize"
                        :total="state.pageOutput.totalCount"
                        :page-sizes="[10, 20, 50, 100]"
                        small
                        background
                        @size-change="onSizeChange"
                        @current-change="onCurrentChange"
                        layout="total, sizes, prev, pager, next, jumper"
                    />
                </div>
			</el-card>
        </el-drawer>
    </div>
</template>

<script lang="ts" setup>

import { onMounted,reactive } from 'vue';
import { PaginationFilter, PaginationResponseOnlineUserInfo } from '/@/api/console/data-contracts'
import { signalR } from '/@/utils/signalR';
import { throttle } from 'lodash';
import { dayjs, ElMessageBox, ElNotification } from 'element-plus';
import { OnlineUserApi } from '/@/api/console/OnlineUser';
import { useUserInfo } from '/@/stores/userInfo';

const state=reactive({
    loading:false,
    isVisible:false,
    pageInput:{
        keyword:'',
        pageNumber: 1,
		pageSize: 10,
    } as PaginationFilter,
    pageOutput:{
        totalCount:0
    } as PaginationResponseOnlineUserInfo,
    lastUserState: {
		online: false,
		realName: '',
	}, // 最后接收的用户变更状态信息
});

const formatterTime = (row: any, column: any, cellValue: any) => {
  return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss')
}

onMounted(async()=>{
    signalR.off('OnlineUserList');
    signalR.on('OnlineUserList',(data:any)=>{
        state.pageOutput.data = data.noticeUsers;
        state.lastUserState = {
            online:data.online,
            realName: data.realName
        };
        notification();
    });
    signalR.off('ForceOffline');
    signalR.on('ForceOffline', async (data: any) => {
		window.console.log('强制下线', data);
		await signalR.stop();
        useUserInfo().clear();
	});
});

const notification = throttle(
    function(){
        ElNotification({
            title:'提示',
            message: `${state.lastUserState.online ? `【${state.lastUserState.realName}】上线了` : `【${state.lastUserState.realName}】离开了`}`,
            type:`${state.lastUserState.online ? 'info' : 'error'}`,
            position: 'bottom-right',
        });
    },
    2000,
    {
        leading:true,
        trailing:false
    }
);

const open=()=>{
    state.isVisible=true;
    onQuery();
};

// 强制下线
const forceOffline = async (row: any) => {
	ElMessageBox.confirm(`确定踢掉账号：【${row.realName}】?`, '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
            await new OnlineUserApi().forceOffline({connectionId:row.connectionId},{ loading: true, showSuccessMessage: true }).catch(function (err:any){
                window.console.log(err);
            });
            onQuery();
		})
		.catch(() => {});
};

const onQuery=async()=>{
    state.loading=true;
    const result = await new OnlineUserApi().page(state.pageInput).catch(()=>{
        state.loading=false;
    });
    state.pageOutput = result?.data??{};
    state.loading=false;
};

const onSizeChange=(val:number)=>{
    state.pageInput.pageSize=val;
    state.pageInput.pageNumber=1;
    onQuery();
};

const onCurrentChange=(val:number)=>{
    state.pageInput.pageNumber=val;
    onQuery();
};

defineExpose({open});

</script>