<template>
   <div class="pagination">
    <button :disabled="pageNo == 1" @click="Next">上一页</button>
    <button v-if="startNumAndEndNum.start > 1"  @click="pageIndex(1)">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <button v-for="page,index in endArr"   @click="pageIndex(page)"
      :class="{active:pageNo==page}" :key="index">{{page}}</button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage"  @click="pageIndex(totalPage)">{{totalPage}}</button>
    <button @click="Pro" :disabled="pageNo == totalPage">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
    name:'Pagination',
    props:["pageNo","pageSize","total","contiunes"],
    data() {
      return {
        endnum: '',
      };
    },
    methods:{
      Next(){
        this.$emit('getPageNo', this.pageNo-1);
      },
      Pro(){
        this.$emit('getPageNo',this.pageNo+1)
      },
      pageIndex(page){
        this.$emit('getPageNo',page)
      }
    },
    computed:{
      //总页数
      totalPage(){
        return Math.ceil(this.total/this.contiunes)
      },
      //分页起始页数和结束页数
      startNumAndEndNum(){
        let start , end = 0
        start = this.pageNo - parseInt(this.contiunes/2)
        end = this.pageNo + parseInt(this.contiunes/2)
        if(start<1){
          start = 1
          end = this.contiunes
        }else if(end>this.totalPage){
          end = this.totalPage
        }
        this.endnum = end
        return {start,end}
      },
      //遍历时候使用的数组
      endArr(){
        let arr = []
        for(let i=this.endnum-this.contiunes+1;i<=this.endnum;i++){
          arr.push(i)
        }
        return arr
      }
    }
    // mounted(){
    //   let arr = []
    //   for(let i=0;i<=this.endArr;i++){
    //     console.log(i);
    //     arr.push(i)
    //   }
    //   return arr
    // }
}
</script>

<style lang="less" scoped>
.active {
  background-color: rgb(135, 206, 235);
}
.pagination {
  margin-bottom: 10px;
  text-align: center;
  user-select: none;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>