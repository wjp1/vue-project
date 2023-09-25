<template>
  <div>
    <TypeNav/>
     <div class="outer">
      <!-- 窗口侧边栏 -->
      <!-- <div class="toolbar toolbar-wrap">
        <div class="content"></div>
        <div class="but list"></div>
        <div class="toolist">
          <div class="pull">
            <i class="tab-ico vip"></i>
            <em class="tab-text">商品会员</em>
          </div>
          <div class="pull">
            <i class="tab-ico cart"></i>
            <em class="tab-text">购物车</em>
          </div>
          <div class="pull">
            <i class="tab-ico follow"></i>
            <em class="tab-text">我的关注</em>
          </div>
          <div class="pull">
            <i class="tab-ico history"></i>
            <em class="tab-text">我的足迹</em>
          </div>
          <div class="pull">
            <i class="tab-ico message"></i>
            <em class="tab-text">我的消息</em>
          </div>
          <div class="pull">
            <i class="tab-ico jimi"></i>
            <em class="tab-text">咨询</em>
          </div>
        </div>
        <div class="back pull">
          <i class="tab-ico top"></i>
          <em class="tab-text">顶部</em>
        </div>
      </div> -->

      <!--list-content-->
      <div class="main">
        <div class="py-container">
          <!-- 面包屑 -->
          <div class="bread">
            <ul class="fl sui-breadcrumb">
              <li>
                <a href="#">全部结果</a>
              </li>
            </ul>
            <ul class="fl sui-tag">
              <!--分类的面包屑-->
              <li class="with-x" v-if="searchData.categoryName">{{searchData.categoryName}}<i @click="removeCategoryName">×</i></li>
              <!--关键字的面包屑-->
              <li class="with-x" v-if="searchData.keyword">{{searchData.keyword}}<i @click="removeKeyword">×</i></li>
              <!--品牌的面包屑-->
              <li class="with-x" v-if="searchData.trademark">{{searchData.trademark.split(":")[1]}}<i @click="removeTrademark">×</i></li>
              <!-- 商品属性面包屑 -->
              <li class="with-x" v-for="(item,index) in searchData.props" :key="index">{{item.split(":")[1]}}<i @click="removeAttrValue(index)">×</i>
              </li>
            </ul>
          </div>

          <!-- 商品筛选 -->
          <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"></SearchSelector>

          <!--主体区域-->
          <div class="details clearfix">
            <div class="sui-navbar">
              <div class="navbar-inner filter">
                <!-- 商品排序 -->
                <ul class="sui-nav">
                  <li :class="{active:isAllActive}">
                    <a @click="changeOrder('1')">综合<span v-show="isAllActive" 
                    :class="['iconfont', {'icon-xiangxiajiantoucuxiao':downArrow}, {'icon-xiangshangjiantoucuxiao':upArrow}]"></span></a>
                  </li>
                  <li :class="{active:isSaleActive}">
                    <a @click="changeOrder('2')">销量<span v-show="isSaleActive" 
                    :class="['iconfont', {'icon-xiangxiajiantoucuxiao':downArrow}, {'icon-xiangshangjiantoucuxiao':upArrow}]"></span></a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 商品列表 -->
            <div class="goods-list">
              <ul class="yui3-g">
                <li class="yui3-u-1-5" v-for="(item) in goodList" :key="item.id" @click="toDetailPage(item.id)">
                  <div class="list-wrap">
                    <div class="p-img">
                      <router-link :to="`/detail/${item.id}`"><img v-lazy="item.defaultImg" /></router-link>
                    </div>
                    <div class="price">
                      <strong>
                        <em>¥</em>
                        <i>{{item.price}}</i>
                      </strong>
                    </div>
                    <div class="attr">
                      <a target="_blank" v-html="item.title"></a>
                    </div>
                    <div class="commit">
                      <i class="command">已有<span>2000</span>人评价</i>
                    </div>
                    <div class="operate">
                      <a target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                      <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- 分页器 -->
            <Pagination :pageNo="searchData.pageNo" 
              :pageSize="searchData.pageSize" 
              :total="searchList.total" 
              :contiunes="searchList.totalPages"
              @getPageNo="getPageNo"></Pagination>
          </div>
          <!--热卖商品-->
          <div class="clearfix hot-sale">
            <h4 class="title">热卖商品</h4>
            <div class="hot-list">
              <ul class="yui3-g">
                <li class="yui3-u-1-4">
                  <div class="list-wrap">
                    <div class="p-img">
                      <img src="./images/like_01.png" />
                    </div>
                    <div class="attr">
                      <em>Apple苹果iPhone 6s (A1699)</em>
                    </div>
                    <div class="price">
                      <strong>
                        <em>¥</em>
                        <i>4088.00</i>
                      </strong>
                    </div>
                    <div class="commit">
                      <i class="command">已有700人评价</i>
                    </div>
                  </div>
                </li>
                <li class="yui3-u-1-4">
                  <div class="list-wrap">
                    <div class="p-img">
                      <img src="./images/like_03.png" />
                    </div>
                    <div class="attr">
                      <em>金属A面，360°翻转，APP下单省300！</em>
                    </div>
                    <div class="price">
                      <strong>
                        <em>¥</em>
                        <i>4088.00</i>
                      </strong>
                    </div>
                    <div class="commit">
                      <i class="command">已有700人评价</i>
                    </div>
                  </div>
                </li>
                <li class="yui3-u-1-4">
                  <div class="list-wrap">
                    <div class="p-img">
                      <img src="./images/like_04.png" />
                    </div>
                    <div class="attr">
                      <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                    </div>
                    <div class="price">
                      <strong>
                        <em>¥</em>
                        <i>4068.00</i>
                      </strong>
                    </div>
                    <div class="commit">
                      <i class="command">已有20人评价</i>
                    </div>
                  </div>
                </li>
                <li class="yui3-u-1-4">
                  <div class="list-wrap">
                    <div class="p-img">
                      <img src="./images/like_02.png" />
                    </div>
                    <div class="attr">
                      <em>Apple苹果iPhone 6s (A1699)</em>
                    </div>
                    <div class="price">
                      <strong>
                        <em>¥</em>
                        <i>4088.00</i>
                      </strong>
                    </div>
                    <div class="commit">
                      <i class="command">已有700人评价</i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
import SearchSelector from "./SearchSelector"
export default {
  name:'Search',
  components:{
    SearchSelector
  },
  data() {
    return {
      searchData: {
        categoryName:'',
        category1Id:'',
        category2Id:'',
        category3Id:'',
        keyword:'',
        //排序
        order:'1:desc',
        pageNo:1,
        pageSize:10,
        //物品属性
        props:[],
        //品牌
        trademark:'',
      },
    };
  },
  methods: {
    //传递数据给服务器
    //获取服务器返回的数据
    getData() {
      this.$store.dispatch("getSearchList",this.searchData)
    },

    //删除面包屑
    removeCategoryName(){
      //如果当前字段等于undefined，该字段不会带给服务器
      this.searchData.categoryName = undefined
      this.searchData.category1Id = undefined
      this.searchData.category2Id = undefined
      this.searchData.category3Id = undefined
      this.getData()
      if(this.$route.params){
        this.$router.push({name:"search",params:this.$route.params})
      }else{
        this.$router.push({name:"search"})
      }
    },

    //删除关键字面包屑
    removeKeyword(){
      //this.searchData.keyword滞空
      this.searchData.keyword = undefined
      this.getData()
      //滞空Header组件中的keyword
      this.$bus.$emit("clearKeyword")
      if(this.$route.query){
        this.$route.query.keyword=undefined
        this.$router.push({name:"search",query:this.$route.query})
      }
    },

    //删除品牌面包屑
    removeTrademark(){
      this.searchData.trademark = undefined
      this.getData()
    },

    //删除物品属性值面包屑
    removeAttrValue(index){
      this.searchData.props.splice(index,1)
      this.getData()
    },

    //获取子组件品牌的信息
    trademarkInfo(trademark){
      this.searchData.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getData()
    },

    //获取物品属性和属性值信息
    attrInfo(attr,value){
      let props = `${attr.attrId}:${value}:${attr.attrName}`
      if(this.searchData.props.indexOf(props)==-1){
        this.searchData.props.push(props)
        this.getData()
      }
    },

    //排序
    changeOrder(index){
      let originIndex = this.searchData.order.split(":")[0]
      let originSort = this.searchData.order.split(":")[1]
      let newOrder = ''
      if(index==originIndex){
        newOrder = `${originIndex}:${originSort=='desc' ? 'asc' : 'desc'}`
      }else{
        newOrder = `${index}:desc`
      }
      this.searchData.order = newOrder
      this.getData()
    },
    //自定义事件---获取当前页数
    getPageNo(value){
      this.searchData.pageNo = value
      this.getData()
    }
  },
  computed:{
    ...mapState({
      searchList:state=>state.search.searchList,

    }),
    ...mapGetters(['goodList']),
    //判断是否是综合排序
    isAllActive(){
      return this.searchData.order.indexOf('1')!=-1
    },
    //判断是否是价格排序
    isSaleActive(){
      return this.searchData.order.indexOf('2')!=-1
    },
    downArrow(){
      return this.searchData.order.indexOf('desc')!=-1
    },
    upArrow(){
      return this.searchData.order.indexOf('asc')!=-1
    }
  },
  beforeMount() {
    Object.assign(this.searchData,this.$route.query)
  },
  mounted() {
    this.getData()
  },
  watch:{
    $route(newValue,oldValue){
      //整理参数
      Object.assign(this.searchData,this.$route.query)
      this.getData()
      this.searchData.category1Id = ""
      this.searchData.category2Id = ""
      this.searchData.category3Id = ""
    }
  }
}
</script>

<style lang='less' scoped>
.outer .toolbar {
  position: fixed;
  z-index: 999;
  width: 300px;
  height: 100%;
  background-color: #7a6e6e;
  transition: right 0.3s ease-in-out 0s;
}
.outer .toolbar.toolbar-out {
  top: 0px;
  right: 0px;
}
.outer .toolbar.toolbar-wrap {
  top: 0px;
  right: -294px;
}
.outer .toolbar .content {
  position: relative;
  left: 6px;
  width: 294px;
  background-color: bisque;
  height: 100%;
  z-index: 99;
}
.outer .toolbar .but {
  position: relative;
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  margin-bottom: 1px;
  cursor: pointer;
  background-color: #7a6e6e;
  border-radius: 3px 0 0 3px;
  position: absolute;
  top: 0;
  /*right: -6px;*/
  left: -29px;
}
.outer .toolbar .but.list {
  background-image: url(./images/list.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.outer .toolbar .but.pull-wrap {
  background-image: url(./images/cross.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.outer .toolbar .toolist {
  position: absolute;
  top: 50%;
  left: -29px;
  width: 35px;
  margin-top: -80px;
  /*background-color: cadetblue;*/
}
.outer .toolbar .toolist .pull {
  position: relative;
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  margin-bottom: 1px;
  cursor: pointer;
  background-color: #7a6e6e;
  border-radius: 3px 0 0 3px;
  z-index: 66;
}
.outer .toolbar .toolist .pull .vip {
  background-image: url(./images/toolbars.png);
  background-position: -88px -175px;
}
.outer .toolbar .toolist .pull .cart {
  background-image: url(./images/toolbars.png);
  background-position: -50px 0;
}
.outer .toolbar .toolist .pull .follow {
  background-image: url(./images/toolbars.png);
  background-position: -50px -50px;
}
.outer .toolbar .toolist .pull .history {
  background-image: url(./images/toolbars.png);
  background-position: -50px -100px;
}
.outer .toolbar .toolist .pull .message {
  background-image: url(./images/toolbars.png);
  background-position: -190px -150px;
}
.outer .toolbar .toolist .pull .jimi {
  background-image: url(./images/toolbars.png);
  background-position: -50px -150px;
}
.outer .toolbar .toolist .pull .top {
  background-image: url(./images/toolbars.png);
  background-position: -50px -250px;
}
.outer .toolbar .toolist .pull .tab-text {
  width: 62px;
  height: 35px;
  line-height: 35px;
  color: #fff;
  text-align: center;
  font-family: 微软雅黑;
  position: absolute;
  /*position: relative;*/
  z-index: 1;
  left: 35px;
  top: 0;
  background-color: #7a6e6e;
  border-radius: 3px 0 0 3px;
  font-style: normal;
  -webkit-transition: left 0.3s ease-in-out 0.1s;
  transition: left 0.3s ease-in-out 0.1s;
}
.outer .toolbar .toolist .pull .tab-ico {
  display: inline-block;
  position: relative;
  /*background-image: url(img/toolbars.png);*/
  background-color: #7a6e6e;
  border-radius: 3px 0 0 3px;
  z-index: 2;
  width: 35px;
  height: 35px;
}
.outer .toolbar > .pull {
  position: relative;
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  margin-bottom: 1px;
  cursor: pointer;
  background-color: #7a6e6e;
  border-radius: 3px 0 0 3px;
  z-index: 66;
}
.outer .toolbar > .pull .tab-ico {
  display: inline-block;
  position: relative;
  /*background-image: url(img/toolbars.png);*/
  background-color: #7a6e6e;
  border-radius: 3px 0 0 3px;
  z-index: 2;
  width: 35px;
  height: 35px;
}
.outer .toolbar > .pull .top {
  background-image: url(./images/toolbars.png);
  background-position: -50px -250px;
}
.outer .toolbar > .pull .tab-text {
  width: 62px;
  height: 35px;
  line-height: 35px;
  color: #fff;
  text-align: center;
  font-family: 微软雅黑;
  position: absolute;
  /*position: relative;*/
  z-index: 1;
  left: 35px;
  top: 0;
  background-color: #7a6e6e;
  border-radius: 3px 0 0 3px;
  font-style: normal;
  -webkit-transition: left 0.3s ease-in-out 0.1s;
  transition: left 0.3s ease-in-out 0.1s;
}
.outer .toolbar > .back {
  position: absolute;
  bottom: 0;
  /*right: -6px;*/
  left: -29px;
  display: inline-block;
  background-image: url(./images/toolbars.png);
}
.outer .header > .top {
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;
}
.outer .header > .top .container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.outer .header > .top .container .loginList {
  float: left;
}
.outer .header > .top .container .loginList p {
  float: left;
  margin-right: 10px;
}
.outer .header > .top .container .loginList p .register {
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
  margin-left: 5px;
}
.outer .header > .top .container .typeList {
  float: right;
}
.outer .header > .top .container .typeList a {
  padding: 0 10px;
}
.outer .header > .top .container .typeList a + a {
  border-left: 1px solid #b3aeae;
}
.outer .header > .bottom {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.outer .header > .bottom .logoArea {
  float: left;
}
.outer .header > .bottom .logoArea .logo img {
  width: 175px;
  margin: 25px 45px;
}
.outer .header > .bottom .searchArea {
  float: right;
  margin-top: 35px;
}
.outer .header > .bottom .searchArea .searchForm {
  overflow: hidden;
}
.outer .header > .bottom .searchArea .searchForm input {
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  padding: 0px 4px;
  border: 2px solid #ea4a36;
  float: left;
}
.outer .header > .bottom .searchArea .searchForm input:focus {
  outline: none;
}
.outer .header > .bottom .searchArea .searchForm button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;
}
.outer .header > .bottom .searchArea .searchForm button:focus {
  outline: none;
}
.outer .typeNav {
  border-bottom: 2px solid #e1251b;
}
.outer .typeNav .container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}
.outer .typeNav .container .all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}
.outer .typeNav .container .nav a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}
.outer .typeNav .container .sort {
  left: 0;
  top: 45px;
  width: 210px;
  height: 461px;
  position: absolute;
  background: #fafafa;
  z-index: 999;
}
.outer .typeNav .container .sort .all-sort-list2 .item h3 {
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;
}
.outer .typeNav .container .sort .all-sort-list2 .item h3 a {
  color: #333;
}
.outer .typeNav .container .sort .all-sort-list2 .item .item-list {
  display: none;
  position: absolute;
  width: 734px;
  min-height: 460px;
  _height: 200px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}
.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}
.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;
}
.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem dl.fore {
  border-top: 0;
}
.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem dl dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}
.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem dl dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;
}
.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem dl dd em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}
.outer .typeNav .container .sort .all-sort-list2 .item:hover .item-list {
  display: block;
}
.outer .main {
  margin: 10px 0;
}
.outer .main .py-container {
  width: 1200px;
  margin: 0 auto;
}
.outer .main .py-container .bread {
  margin-bottom: 5px;
  overflow: hidden;
}
.outer .main .py-container .bread .sui-breadcrumb {
  padding: 3px 15px;
  margin: 0;
  font-weight: 400;
  border-radius: 3px;
  float: left;
}
.outer .main .py-container .bread .sui-breadcrumb li {
  display: inline-block;
  line-height: 18px;
}
.outer .main .py-container .bread .sui-breadcrumb li a {
  color: #666;
  text-decoration: none;
}
.outer .main .py-container .bread .sui-breadcrumb li a:hover {
  color: #4cb9fc;
}
.outer .main .py-container .bread .sui-tag {
  margin-top: -5px;
  list-style: none;
  font-size: 0;
  line-height: 0;
  padding: 5px 0 0;
  margin-bottom: 18px;
  float: left;
}
.outer .main .py-container .bread .sui-tag .with-x {
  font-size: 12px;
  margin: 0 5px 5px 0;
  display: inline-block;
  overflow: hidden;
  color: #000;
  background: #f7f7f7;
  padding: 0 7px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #dedede;
  white-space: nowrap;
  transition: color 400ms;
  cursor: pointer;
}
.outer .main .py-container .bread .sui-tag .with-x i {
  margin-left: 10px;
  cursor: pointer;
  font: 400 14px tahoma;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.outer .main .py-container .bread .sui-tag .with-x:hover {
  color: #28a3ef;
}

.outer .main .py-container .details {
  margin-bottom: 5px;
}
.outer .main .py-container .details .sui-navbar {
  overflow: visible;
  margin-bottom: 0;
}
.outer .main .py-container .details .sui-navbar .filter {
  min-height: 40px;
  padding-right: 20px;
  background: #fbfbfb;
  border: 1px solid #e2e2e2;
  padding-left: 0;
  border-radius: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
}
.outer .main .py-container .details .sui-navbar .filter .sui-nav {
  position: relative;
  left: 0;
  display: block;
  float: left;
  margin: 0 10px 0 0;
}
.outer .main .py-container .details .sui-navbar .filter .sui-nav li {
  float: left;
  line-height: 18px;
}
.outer .main .py-container .details .sui-navbar .filter .sui-nav li a {
  display: block;
  cursor: pointer;
  padding: 11px 15px;
  color: #777;
  text-decoration: none;
}
.outer .main .py-container .details .sui-navbar .filter .sui-nav li.active a {
  background: #e1251b;
  color: #fff;
}
.outer .main .py-container .details .goods-list {
  margin: 20px 0;
}
.outer .main .py-container .details .goods-list ul {
  display: flex;
  flex-wrap: wrap;
}
.outer .main .py-container .details .goods-list ul li {
  height: 100%;
  width: 20%;
  margin-top: 10px;
  line-height: 28px;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .p-img {
  padding-left: 15px;
  width: 215px;
  height: 255px;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .p-img a {
  color: #666;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .p-img a img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .price {
  padding-left: 15px;
  font-size: 18px;
  color: #c81623;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .price strong {
  font-weight: 700;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .price strong i {
  margin-left: 3px;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .attr {
  padding-left: 15px;
  width: 85%;
  overflow: hidden;
  margin-bottom: 8px;
  min-height: 38px;
  cursor: pointer;
  line-height: 1.8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .attr a {
  color: #333;
  text-decoration: none;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .commit {
  padding-left: 15px;
  height: 22px;
  font-size: 13px;
  color: #a7a7a7;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .commit span {
  font-weight: 700;
  color: #646fb0;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate {
  padding: 12px 15px;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate .sui-btn {
  display: inline-block;
  padding: 2px 14px;
  box-sizing: border-box;
  margin-bottom: 0;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 0;
  background-color: transparent;
  margin-right: 15px;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-bordered {
  min-width: 85px;
  background-color: transparent;
  border: 1px solid #8c8c8c;
  color: #8c8c8c;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-bordered:hover {
  border: 1px solid #666;
  color: #fff !important;
  background-color: #666;
  text-decoration: none;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-danger {
  border: 1px solid #e1251b;
  color: #e1251b;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-danger:hover {
  border: 1px solid #e1251b;
  background-color: #e1251b;
  color: white !important;
  text-decoration: none;
}

.outer .main .py-container .hot-sale {
  margin-bottom: 5px;
  border: 1px solid #ddd;
}
.outer .main .py-container .hot-sale .title {
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  border-bottom: 1px solid #ddd;
  background: #f1f1f1;
  color: #333;
  margin: 0;
  padding: 5px 0 5px 15px;
}
.outer .main .py-container .hot-sale .hot-list {
  padding: 15px;
}
.outer .main .py-container .hot-sale .hot-list ul {
  display: flex;
}
.outer .main .py-container .hot-sale .hot-list ul li {
  width: 25%;
  height: 100%;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .p-img,
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price,
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .attr,
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .commit {
  padding-left: 15px;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .p-img img {
  max-width: 100%;
  vertical-align: middle;
  border: 0;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .attr {
  width: 85%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 8px;
  min-height: 38px;
  cursor: pointer;
  line-height: 1.8;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price {
  font-size: 18px;
  color: #c81623;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price strong {
  font-weight: 700;
}
// .outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price strong i {

// }
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .commit {
  height: 22px;
  font-size: 13px;
  color: #a7a7a7;
}
.outer .footer {
  background-color: #eaeaea;
}
.outer .footer .footer-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
.outer .footer .footer-container .footerList {
  padding: 20px;
  border-bottom: 1px solid #e4e1e1;
  border-top: 1px solid #e4e1e1;
  overflow: hidden;
  padding-left: 40px;
}
.outer .footer .footer-container .footerList .footerItem {
  width: 16.6666667%;
  float: left;
}
.outer .footer .footer-container .footerList .footerItem h4 {
  font-size: 14px;
}
.outer .footer .footer-container .footerList .footerItem .footerItemCon li {
  line-height: 18px;
}
.outer .footer .footer-container .footerList .footerItem:last-child img {
  width: 121px;
}
.outer .footer .footer-container .copyright {
  padding: 20px;
}
.outer .footer .footer-container .copyright .helpLink {
  text-align: center;
}
.outer .footer .footer-container .copyright .helpLink li {
  display: inline;
}
.outer .footer .footer-container .copyright .helpLink li .space {
  border-left: 1px solid #666;
  width: 1px;
  height: 13px;
  background: #666;
  margin: 8px 10px;
}
.outer .footer .footer-container .copyright p {
  margin: 10px 0;
  text-align: center;
}
</style>