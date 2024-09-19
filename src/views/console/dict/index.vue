<template>
    <my-layout>
        <pane size="50" min-size="30" max-size="70">
            <DataDict @selectedChange="onSelectChange"></DataDict>
        </pane>
        <pane>
            <DataDictChild ref="dataDictChildRef"></DataDictChild>
        </pane>
    </my-layout>
</template>

<script lang="ts" setup name="console/dict">

import { defineAsyncComponent, ref } from 'vue';
import { Pane } from 'splitpanes'
import { DataDictOutput } from '/@/api/console/data-contracts';
const DataDict = defineAsyncComponent(()=>import('./dictPage.vue'));
const DataDictChild = defineAsyncComponent(()=>import('./dictChildPage.vue'));
const MyLayout = defineAsyncComponent(()=>import('/@/components/my-layout/index.vue'));
const dataDictChildRef = ref();

const onSelectChange=(data:DataDictOutput)=>{
    dataDictChildRef.value?.onRefresh(data);
}

</script>