<template>
    <div class="personal layout-pd" v-loading="state.loading">
        <el-row>
            <el-col :xs="24" :sm="24">
                <el-card shadow="hover" header="个人信息">
                    <div class="personal-user">
                        <div class="personal-user-left">
                            <el-avatar
                                :size="100"
                                :src="avatar(userInfoStore.userInfos.photo)"
                                @click="openCropperDialog"
                                v-loading="state.loading"
                                element-loading-spinner="el-icon-Upload"
                                element-loading-background="rgba(0, 0, 0, 0.2)"
                                @mouseenter="mouseEnterAvatar"
                                @mouseleave="mouseLeaveAvatar"/>
                        </div>
                        <div class="personal-user-right">
                            <el-row>
                                <el-col :span="24" class="personal-title mb18">
                                    {{currentTime}}，{{userInfoStore.userInfos.realName}}
                                </el-col>
                                <el-col :span="24">
                                    <el-row>
                                        <el-col :xs="24" :sm="6" class="personal-item mb6">
                                            <div class="personal-item-label">昵称：</div>
                                            <div class="personal-item-value">{{ state.personalInfo.user?.nickName }}</div>
                                        </el-col>
                                        <el-col :xs="24" :sm="6" class="personal-item mb6">
                                            <div class="personal-item-label">岗位：</div>
                                            <div class="personal-item-value">{{state.personalInfo.post?.name}}</div>
                                        </el-col>
                                        <el-col :xs="24" :sm="6" class="personal-item mb6">
                                            <div class="personal-item-label">直属机构：</div>
                                            <div class="personal-item-value">{{ state.personalInfo.org?.name }}</div>
                                        </el-col>
                                        <el-col :xs="24" :sm="6" class="personal-item mb6">
                                            <div class="personal-item-label">入职日期：</div>
                                            <div class="personal-item-value">{{formatterTime(state.personalInfo.entryDate)}}</div>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24">
                <el-card shadow="hover" class="mt15 personal-edit" header="更新信息">
                    <el-form :model="state.form" size="default" label-width="100px" class="mt35 mb35">
                        <el-row :gutter="35">
                            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                                <el-form-item label="账号" prop="account" :rules="[{ required: true, message: '请输入登录账号', trigger: ['blur', 'change'] }]">
                                    <el-input v-model="state.form.account" placeholder="系统登录账号"/>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                                <el-form-item label="昵称" prop="nickName" :rules="[{ required: true, message: '请输入昵称', trigger: ['blur', 'change'] }]">
                                    <el-input v-model="state.form.nickName" placeholder="昵称"/>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                                <el-form-item label="手机号" prop="mobile" :rules="[
                                    { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
                                    { validator: testMobile, trigger: ['blur', 'change'] }]">
                                    <el-input v-model="state.form.mobile" placeholder="手机号"/>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                                <el-form-item label="邮箱" prop="email" :rules="[{ validator: testEmail, trigger: ['blur', 'change'] }]">
                                    <el-input v-model="state.form.email" placeholder="邮箱"/>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                                <el-form-item label="性别">
                                    <el-radio-group v-model="state.form.gender">
                                        <el-radio-button v-for="gender in toOptionsByValue(GenderEnum)" :key="gender" :label="gender.value">
                                            {{gender.label}}
                                        </el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
                                <el-form-item label="真实姓名" prop="realName" :rules="[{ required: true, message: '请输入真实姓名', trigger: ['blur', 'change'] }]">
                                    <el-input v-model="state.form.realName" placeholder="真实姓名"/>
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-form-item label="简介">
                                    <el-input v-model="state.form.remark" clearable type="textarea" />
                                </el-form-item>
                            </el-col>
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-form-item>
                                    <el-popconfirm title="确定要更新个人信息吗？" hide-icon hide-after="0" width="180" @confirm="onUpdatePersonalInfo">
                                        <template #reference>
                                        <el-button :loading="state.loading" type="primary">
                                            <el-icon>
                                            <ele-Position />
                                            </el-icon>
                                            更新个人信息
                                        </el-button>
                                        </template>
                                    </el-popconfirm>
                                    <el-button icon="ele-Edit" type="primary" @click="onChangePassword"> 更改密码 </el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
        <CropperDialog ref="cropperDialogRef" :title="state.cropperTitle" @uploadCropperImg="uploadUserAvatar" />
        <ChangePasswordForm ref="changePasswordFormRef" title="更改密码"></ChangePasswordForm>
    </div>
</template>
<script lang="ts" setup name="workspace/personal">
import { computed, defineAsyncComponent, onMounted, reactive, ref } from 'vue';
import { UpdatePersonalUserInfoRequest, UserStaffPageOutput } from '/@/api/console/data-contracts';
import { UserStaffApi } from '/@/api/console/UserStaff';
import { useUserInfo } from '/@/stores/userInfo';
import CropperDialog from '/@/components/cropper/index.vue';
import { UserApi } from '/@/api/console/User';
import { formatAxis } from '/@/utils/formatTime';
import dayjs from 'dayjs';
import { testEmail, testMobile } from '/@/utils/test';
import { toOptionsByValue } from '/@/utils/enum';
import { GenderEnum } from '/@/api/domain/enum-contracts';

const ChangePasswordForm = defineAsyncComponent(()=>import('/@/views/console/user/components/changePassword.vue'));

const changePasswordFormRef = ref()
const cropperDialogRef = ref<InstanceType<typeof CropperDialog>>();

const state= reactive({
    loading:false,
    uploadAvatarLoding:false,
    form:{} as UpdatePersonalUserInfoRequest,
    personalInfo:{} as UserStaffPageOutput,
    cropperTitle:'',
})

const userInfoStore = useUserInfo();

onMounted(()=>{
    onGetPersonalInfo();
})

//更改密码
const onChangePassword = ()=>{
    changePasswordFormRef.value.open()
}

//更新个人身份信息
const onUpdatePersonalInfo=async()=>{
    state.loading = true;
    let result = await new UserApi().update(state.form,{showSuccessMessage:true}).catch(()=>{
        state.loading = false;
    })
    if(result?.success){
        state.personalInfo.remark = state.form.remark;
        state.personalInfo.realName = state.form.realName;
        if(state.personalInfo.user){
            state.personalInfo.user.nickName = state.form.nickName;
            state.personalInfo.user.mobile = state.form.mobile;
            state.personalInfo.user.email = state.form.email;
            state.personalInfo.user.gender = state.form.gender;
            state.personalInfo.user.account = state.form.account;
        }
        userInfoStore.setRealName(state.form.realName);
    }
    state.loading = false;
}

// 当前时间提示语
const currentTime = computed(() => {
  return formatAxis(new Date())
})

//日期格式化
const formatterTime = (date: any) => {
	if(date){
		return dayjs(date).format('YYYY-MM-DD')
	}
	return '无';
}

// 头像地址
const avatar = (avatar:string | undefined | null) => {
    if(avatar) return avatar;
    return 'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500';
}

// 鼠标进入和离开头像时
const mouseEnterAvatar = () => {
	state.uploadAvatarLoding = true;
};

const mouseLeaveAvatar = () => {
	state.uploadAvatarLoding = false;
};

//上传用户头像
const uploadUserAvatar = async(e:any)=>{
    state.uploadAvatarLoding = true;
    let result = await new UserApi().uploadAvatar({AvatarFile:e.img},{showSuccessMessage:true}).catch(()=>{
        state.uploadAvatarLoding = false;
    })
    if(state.personalInfo.user){
        state.personalInfo.user.avatarUrl = result?.data;
    }
    userInfoStore.setPhoto(result?.data??'');
    state.uploadAvatarLoding = false;
}

//获取个人身份信息
const onGetPersonalInfo=async()=>{
    state.loading = true;
    let result = await new UserStaffApi().getPersonal().catch(()=>{
        state.loading = false;
    });
    state.personalInfo = result?.data??{};
    state.form.account = state.personalInfo.user?.account??'';
    state.form.email = state.personalInfo.user?.email;
    state.form.gender = state.personalInfo.user?.gender??0;
    state.form.mobile = state.personalInfo.user?.mobile??'';
    state.form.nickName = state.personalInfo.user?.nickName??'';
    state.form.realName = state.personalInfo.realName??'';
    state.form.remark = state.personalInfo.remark;
    state.loading = false;
}

// 打开裁剪弹窗
const openCropperDialog = () => {
	state.cropperTitle = '更换头像';
	cropperDialogRef.value?.openDialog(avatar(userInfoStore.userInfos.photo));
};

</script>

<style scoped lang="scss">
@import '/@/theme/mixins/index.scss';

.personal {
  .personal-user {
    height: 100px;
    display: flex;
    align-items: center;
    .personal-user-left {
      width: 100px;
      height: 100px;
      border-radius: 3px;
      :deep(.el-upload) {
        height: 100%;
      }
    }
    .personal-user-right {
      flex: 1;
      padding: 0 15px;
      .personal-title {
        font-size: 18px;
        @include text-ellipsis(1);
      }
      .personal-item {
        display: flex;
        align-items: center;
        font-size: 13px;
        .personal-item-label {
          color: var(--el-text-color-secondary);
          @include text-ellipsis(1);
        }
        .personal-item-value {
          @include text-ellipsis(1);
        }
      }
    }
  }

  .personal-edit {
    .personal-edit-title {
      position: relative;
      padding-left: 10px;
      color: var(--el-text-color-regular);
      &::after {
        content: '';
        width: 2px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: var(--el-color-primary);
      }
    }
    .personal-edit-safe-box {
      border-bottom: 1px solid var(--el-border-color-light, #ebeef5);
      padding: 15px 0;
      .personal-edit-safe-item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .personal-edit-safe-item-left {
          flex: 1;
          overflow: hidden;
          .personal-edit-safe-item-left-label {
            color: var(--el-text-color-regular);
            margin-bottom: 5px;
          }
          .personal-edit-safe-item-left-value {
            color: var(--el-text-color-secondary);
            @include text-ellipsis(1);
            margin-right: 15px;
          }
        }
      }
      &:last-of-type {
        padding-bottom: 0;
        border-bottom: none;
      }
    }
  }
}
</style>