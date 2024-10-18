<template>
    <div class="my-layout">
        <el-card class="mt8" shadow="never" :body-style="{paddingBottom:'0'}">
            <el-form :inline="true" :model="state.pageFilter" @submit.stop.prevent>
                <el-form-item label="关键字">
                    <el-input v-model="state.pageFilter.keyword" placeholder="关键字" @keyup.enter="onQuery"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="ele-Search" @click="onQuery"> 查询 </el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="my-fill mt8" shadow="never">
            <el-table v-loading="state.loading" :data="state.pageData.data" style="width:100%" highlight-current-row>
                <el-table-column prop="account" label="账号" min-width="100" show-overflow-tooltip/>
                <el-table-column prop="nickName" label="昵称" min-width="100" show-overflow-tooltip/>
                <el-table-column prop="avatarUrl" label="头像">
                    <template #default="{row}">
                        <el-avatar :src="avatar(row.avatarUrl)"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="gender" label="性别" min-width="80">
                    <template #default="{row}">
                        <el-tag :type="getThemeByValue(GenderEnum,row.gender)">
                            {{getDescByValue(GenderEnum,row.gender)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="passwordEncryptType" label="密码加密类型" min-width="100">
                    <template #default="{row}">
                        <el-tag :type="getThemeByValue(PasswordEncryptType,row.passwordEncryptType)">
                            {{getDescByValue(PasswordEncryptType,row.passwordEncryptType)}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="手机" min-width="120" show-overflow-tooltip/>
                <el-table-column prop="email" label="邮箱" min-width="120" show-overflow-tooltip/>
                <el-table-column label="操作记录" width="100">
                    <template #default="{row}">
                        <AuditableRecord :data="row" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="160" fixed="right">
                    <template #default="{row}">
                        <my-dropdown-more>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="onResetPassword(row)"> 重置密码 </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </my-dropdown-more>
                    </template>
                </el-table-column>
            </el-table>
            <div class="my-flex my-flex-end" style="margin-top: 20px">
                <el-pagination 
                    v-model:currentPage="state.pageData.currentPage"
                    v-model:page-size="state.pageData.pageSize"
                    :total="state.pageData.totalCount"
                    :page-sizes="[10,20,50,100]"
                    small
                    background
                    @size-change="onPageSizeChange"
                    @current-change="onPageNumberChange"
                    layout="total, sizes, prev, pager, next, jumper"/>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup name="console/user">
import { defineAsyncComponent, getCurrentInstance, onMounted, reactive } from 'vue';
import { PaginationResponseUserInfoOutput, UserInfoOutput, UserInfoPageRequest } from '/@/api/console/data-contracts';
import { UserApi } from '/@/api/console/User';
import { getDescByValue, getThemeByValue } from '/@/utils/enum';
import { GenderEnum, PasswordEncryptType } from '/@/api/domain/enum-contracts';

const MyDropdownMore = defineAsyncComponent(() => import('/@/components/my-dropdown-more/index.vue'))
const AuditableRecord = defineAsyncComponent(()=>import('/@/components/table/auditableRecord.vue'))

const state=reactive({
    loading:false,
    pageFilter:{
        orderBy:['CreatedOn Desc']
    } as UserInfoPageRequest,
    pageData:{} as PaginationResponseUserInfoOutput
})

const { proxy } = getCurrentInstance() as any;

onMounted(async()=>{
    onQuery();
})

// 头像地址
const avatar = (avatar:string | undefined | null) => {
    if(avatar) return avatar;
    return 'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500';
}

const onQuery=async()=>{
    state.loading = true;
    let result = await new UserApi().page(state.pageFilter).catch(()=>{
        state.loading = false;
    })
    state.pageData = result?.data??{};
    state.loading = false;
}

const onResetPassword = (data:UserInfoOutput)=>{
    proxy.$modal.confirm(`确定要重置用户 ${data.nickName} 的密码?`)
        .then(async()=>{
            return;
        }).catch(()=>{});
}

const onPageSizeChange=(value:number)=>{
    state.pageFilter.pageSize = value;
    state.pageFilter.pageNumber = 1;
    onQuery();
}

const onPageNumberChange=(value:number)=>{
    state.pageFilter.pageNumber = value;
    onQuery();
}
</script>