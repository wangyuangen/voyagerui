<template>
    <el-card shadow="never" style="margin-top: 8px" body-style="padding:0px;" class="my-fill">
      <template #header>
        <el-input v-model="state.filterKeyword" placeholder="筛选部门" clearable />
      </template>
      <el-scrollbar v-loading="state.loading" height="100%" max-height="100%" :always="false" wrap-style="padding:var(--el-card-padding)">
        <el-tree
          ref="orgTreeRef"
          :data="state.orgTreeList"
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          :filter-node-method="onFilterNode"
          highlight-current
          check-strictly
          default-expand-all
          render-after-expand
          :expand-on-click-node="false"
          v-bind="$attrs"
          @node-click="onNodeClick"
          @check-change="onCheckChange"
        >
        <template #default="{node}">
          <span class="node-label">{{node.label}}</span>
        </template>
      </el-tree>
      </el-scrollbar>
    </el-card>
  </template>

<script lang="ts" setup name="console/org/tree">

import { ElTree } from 'element-plus';
import { nextTick, onMounted, reactive, ref, watch } from 'vue';
import { OrganizeInfoOutput } from '/@/api/console/data-contracts';
import { OrganizeApi } from '/@/api/console/Organize';
import { listToTree } from '/@/utils/tree';

interface Props {
  modelValue: number[] | null | undefined
  selectFirstNode: boolean
}

const props=withDefaults(defineProps<Props>(),{
    modelValue:()=>[],
    selectFirstNode:false
})

const orgTreeRef = ref<InstanceType<typeof ElTree>>()

const state = reactive({
    loading:false,
    filterKeyword:'',
    orgTreeList:[] as Array<OrganizeInfoOutput>,
    lastKey: '',
})

watch(
    ()=>state.filterKeyword,
    (val)=>{
        orgTreeRef.value?.filter(val);
    }
)

onMounted(()=>{
    initData();
})

const emits = defineEmits<{
    (e: 'node-click', node: OrganizeInfoOutput | null): void
    (e: 'update:modelValue', node: any[] | undefined | null): void
}>();

const onFilterNode = (value:string,data:OrganizeInfoOutput)=>{
    if(!value) return true;
    return data.name?.indexOf(value)!==-1;
}

const onNodeClick = (node: OrganizeInfoOutput) => {
  if (state.lastKey === node.id) {
    state.lastKey = ''
    orgTreeRef.value?.setCurrentKey(undefined)
    emits('node-click', null)
  } else {
    state.lastKey = node.id ?? '';
    emits('node-click', node)
  }
}

const onCheckChange = () => {
  emits('update:modelValue', orgTreeRef.value?.getCheckedKeys())
}


const initData = async()=>{
    state.loading = true;
    let result = await new OrganizeApi().list({enabled:1}).catch(()=>{
        state.loading = false;
    })
    state.loading = false;
    if(result?.success && result?.data){
        state.orgTreeList = listToTree(result.data);
        if (state.orgTreeList.length > 0 && props.selectFirstNode) {
            nextTick(() => {
                const firstNode = state.orgTreeList[0]
                orgTreeRef.value?.setCurrentKey(firstNode.id)
                emits('node-click', firstNode)
            })
        }
    }
}

defineExpose({orgTreeRef});

</script>