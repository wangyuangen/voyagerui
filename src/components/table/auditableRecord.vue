<template>
	<el-popover placement="bottom" width="300" trigger="hover">
		<template #reference>
			<el-text type="primary" class="cursor-default">
				<el-icon><ele-InfoFilled /></el-icon>详情
			</el-text>
		</template>
		<el-descriptions direction="vertical" :column="2" border>
			<el-descriptions-item>
				<template #label>
					<el-text>
						<el-icon><ele-UserFilled /></el-icon>创建者
					</el-text>
				</template>
				<el-tag>{{ props.data.createdUserName ?? '无' }}</el-tag>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<el-text>
						<el-icon><ele-Calendar /></el-icon>创建时间
					</el-text>
				</template>
				<el-tag>{{ formatterTime(props.data.createdOn) }}</el-tag>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<el-text>
						<el-icon><ele-UserFilled /></el-icon>修改者
					</el-text>
				</template>
				<el-tag>{{ props.data.modifiedUserName ?? '无' }}</el-tag>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<el-text>
						<el-icon><ele-Calendar /></el-icon>修改时间
					</el-text>
				</template>
				<el-tag>{{ formatterTime(props.data.lastModifiedOn)}}</el-tag>
			</el-descriptions-item>
			<el-descriptions-item>
				<template #label>
					<el-text>
						<el-icon><ele-Tickets /></el-icon>描述
					</el-text>
				</template>
				{{ props.data.remark ?? '无' }}
			</el-descriptions-item>
		</el-descriptions>
	</el-popover>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';

const props = defineProps<{
	data: AuditableRecord;
}>();

const formatterTime = (time: any) => {
	if(time){
		return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
	}
	return '无';
}
</script>
