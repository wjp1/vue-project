<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login" class="">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{userName}}</a>
            <a class="register" @click="loginOut">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myorder">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"  @keyup.enter="search" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch" >搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>

export default {
    name:'Header',
		data(){
			return {
				keyword:''
			}
		},
		methods:{
			goSearch(){
        this.$bus.$emit("keyword",this.keyword)
        let location = {name:"search",query:{keyword:this.keyword},params:{keyword:this.keyword || undefined}}
        console.log(location);
        //合并两个对象的属性名相同的方法
        console.log(location.query);
        console.log(this.$route.query);
        this.$route.query.keyword = this.keyword
        Object.assign(location.query,this.$route.query)
        console.log(this.$route.query);
        //如果别的地方传了params参数，需加入进去
        if(this.$route.params){
          this.$route.params.keyword = this.keyword
          location.params = Object.assign(location.params,this.$route.params)
          this.$router.push(location)
        }else{
          this.$router.push(location)
        }
        // this.$router.push(location)
        // console.log(this.$route.params);
        this.keyword = ""
			},
      //退出登录
      loginOut(){
        try {
          this.$store.dispatch('user/userLogout')
          this.$router.push('/home')
        } catch (error) {
          alert(error.messsage)
        }
        
      }
		},
    computed:{
      userName(){
        return this.$store.state.user.userInfo.name
      }
    },
    mounted(){
      this.$bus.$on("clearKeyword",()=>{
        this.keyword = ""
      })
    }
    
}
</script>

<style lang="less" scoped>
	a {
  cursor: pointer !important;
}
	.header {
    & > .top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .loginList {
            float: left;

            p {
            float: left;
            margin-right: 10px;

            .register {
                border-left: 1px solid #b3aeae;
                padding: 0 5px;
                margin-left: 5px;
            }
            }
        }

        .typeList {
            float: right;

            a {
            padding: 0 10px;

            & + a {
                border-left: 1px solid #b3aeae;
            }
            }
        }
        }
    }

    & > .bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
        float: left;

        .logo {
            img {
            width: 175px;
            margin: 25px 45px;
            }
        }
        }

        .searchArea {
        float: right;
        margin-top: 35px;

        .searchForm {
            overflow: hidden;

            input {
            box-sizing: border-box;
            width: 490px;
            height: 32px;
            padding: 0px 4px;
            border: 2px solid #ea4a36;
            float: left;

            &:focus {
                outline: none;
            }
            }

            button {
            height: 32px;
            width: 68px;
            background-color: #ea4a36;
            border: none;
            color: #fff;
            float: left;
            cursor: pointer;

            &:focus {
                outline: none;
            }
            }
        }
        }
    }
    }
</style>