import { defineStore } from "pinia";
import { DataDictApi } from "../api/console/DataDict";
import { DataDictOutput } from "../api/console/data-contracts";

declare interface DataDictState{
    dicts: Array<DataDictOutput>
}

/**
 * 字典
 */
export const dataDictStore = defineStore('dataDict',{
    state:():DataDictState=>({
        dicts:[]
    }),
    actions:{
        async loadData(){
            let data = await this.loadDataDicts().catch(() => {}) as Array<DataDictOutput>
            this.dicts = data;
        },
        getChildsByParent(code:string){
            return this.dicts.filter(x=>x.parentCode == code);
        },
        getDictByCode(code:string){
            return this.dicts.find(x=>x.code == code);
        },
        async loadDataDicts(){
            return new Promise((resolve,reject)=>{
                Promise.all([new DataDictApi().list({enabled:1})])
                    .then((res)=>{
                        let result = res[0];
                        if(result?.success){
                            let dicts = result?.data??[];
                            resolve(dicts);
                        }
                    }).catch((err) => {
                        reject(err)
                    })
            })
        }
    }
})