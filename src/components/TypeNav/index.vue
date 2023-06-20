<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseenter="showCategory" @mouseleave="hideCategory">
      <h2 class="all" >全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <!-- 过度动画 -->
      <transition name="sort">
        <!-- 事件委托 -->
        <div class="sort" @mouseleave="delCol" v-show="isShow">
        <div class="all-sort-list2" @click="goSearch">
          <!-- 一级分类列表 -->
          <div class="item" :class="{'addcol':index===currentIndex}" 
            v-for="(c1,index) in categoryList" :key="c1.categoryId" >
            <h3 @mouseenter="changeIndex(index)" >
              <!-- 一级分类导航按钮 -->
              <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
            </h3>
            <!-- 二级分类列表 -->
            <!-- <div class="item-list clearfix" v-show="index==currentIndex?1:false"> -->
            <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
              <div class="subitem">
                <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dt>
                    <!-- 二级分类导航按钮 -->
                    <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId" >{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <!-- 三级分类导航按钮 -->
                      <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId" >{{c3.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        </div>
      </transition>
      
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
//实现防抖和节流的插件
import throttle from "lodash/throttle"
export default {
  name:"TypeNav",
  data(){
    return {
      currentIndex:-1,
      isShow:true,
      keyword:''
    }
  },
  methods:{
    //实现节流，防止数据频繁被触发，在规定时间间隔内触发
    changeIndex:throttle(function(index){
      this.currentIndex = index
    },50),
    delCol(){
      this.currentIndex = -1
    },
    //跳转到搜索页面
    goSearch(event){
      //声明式导航不断生成组件，销毁组件，导致内存占用率高
      //解决方案  编程式导航+事件委派
      let element = event.target
      console.log(element);
      let {categoryname,category1id,category2id,category3id} = element.dataset
      if(categoryname){
        //整理路由跳转的参数
        let location = {name:"search"}
        let query = {categoryName:categoryname}
        //分一级分类，二级分类，三级分类
        if(category1id){
           query = {categoryName:categoryname,category1Id:category1id,keyword:this.keyword}
        }else if(category2id){
           query = {categoryName:categoryname,category2Id:category2id,keyword:this.keyword}
        }else{
           query = {categoryName:categoryname,category3Id:category3id,keyword:this.keyword}
        }
        //如果别的地方传了params参数，需加入进去
        if(this.$route.params){
          location.params = this.$route.params
          location.query = query
          console.log(location.query);
          console.log(this.$route.query);
          this.$router.push(location)
        }else{
          this.$router.push(location)
        }
        this.keyword = ""
      }
      
    },
    //显示分类导航
    showCategory(){
      this.isShow = true
    },
    //隐藏分类导航
    hideCategory(){
      if(this.$route.path!="/home"){
        this.isShow = false
      }
    }
  },
  computed:{
    ...mapState({categoryList:state=>state.home.categoryList}),
  },
  mounted() {
    //当组件挂载完毕，让isShow属性值变为false
    if(this.$route.path!='/home'){
      this.isShow = false
    }
    this.$bus.$on("keyword",(keyword)=>{
      this.keyword = keyword
    })
  },
  
}
</script>

<style lang="less" scoped>
 .addcol {
  background-color: rgb(135, 206, 235) !important;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        display: inline-block;
        height: 45px;
        margin: 0 22px;
        margin-top: 15px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 61px;
      width: 210px;
      height: 530px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    .sort-enter {
      height: 0;
    }
    .sort-enter-to {
      height: 100%;
    }
    .sort-enter-active {
      transition: 0.5s;
    }
  }
}
</style>