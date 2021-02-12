<template>
    <ul class="list">
        <li v-for="(item,index) in list" :key="index" @click="onSelect(item)">
            {{item.name}}
        </li>
    </ul>
</template>
<script>
export default {
    name:"list",
    props:{
        list:{
            type:Array,
            default:()=>[]
        }
    },
    methods:{
        onSelect(item){
            this.$emit("onSelect",item)
        }
    }
}
</script>
<style lang="less" scoped>
    .list{
        li{
            padding:0.1rem 0;
        }
    }
</style>