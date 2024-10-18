<template>
    <el-cascader
      placeholder="请选择区域"
      :props="cascaderProps"
      filterable
      clearable
      class="w100"
      @change="onChange"
      v-bind="$attrs"
      ref="cascaderRef"
      ><template #default="{ data }">
        <span>{{ data.name }}</span>
        <MySvgIcon v-if="data.hot" name="hot" color="#ea322b" size="12" class="ml5"></MySvgIcon>
      </template>
    </el-cascader>
  </template>

<script lang="ts" setup>
import { CascaderProps } from 'element-plus';
import { PropType, ref } from 'vue';
import { RegionApi } from '/@/api/console/Region';
import { EnabledStatusEnum } from '/@/api/console/data-contracts';

const cascaderRef=ref();
const emits = defineEmits(['change']);

const props = defineProps({
    enabled:{
        type:Object as PropType<EnabledStatusEnum>,
        default:undefined
    },
    hot:{
        type:Boolean,
        default:undefined
    }
});

const cascaderProps : CascaderProps={
    checkStrictly:true,
    value:'code',
    label:'name',
    lazy:true,
    lazyLoad(node,resolve){
        let value = node.value as string;
        new RegionApi().list({
            parentCode:value,
            enabled:props.enabled,
            hot:props.hot
        }).then((r)=>{
            resolve(r.data as any);
        }).catch(()=>{
            resolve([]);
        })
    }
}

const onChange=()=>{
    let checkedNodes = cascaderRef.value.getCheckedNodes();
    let node={} as any;
    if(checkedNodes&&checkedNodes.length>0){
         node = checkedNodes[0];
    }
    //node.value  'code'
    //node.text   'name / name'
    emits('change',node);
}

</script>