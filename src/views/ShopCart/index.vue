<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked" @change="changeisChecked(item,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice?item.skuPrice.toFixed(2):item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="changeNum('reduce',-1,item)">-</a>
            <input autocomplete="off" type="text" @blur="changeNum('change',$event.target.value*1,item)" :value="item.skuNum" minnum="1" class="itxt">
            <a class="plus" @click="changeNum('add',1,item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{(item.skuPrice*item.skuNum)?(item.skuPrice*item.skuNum).toFixed(2):(item.skuPrice*item.skuNum)}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="delCartGoods(item.skuId)">删除</a>
            <br>
            <a>移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="allChecked&&cartInfoList.length!==0" @change="isAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="delSelectGoods">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalNum}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">￥{{totalPrice?totalPrice.toFixed(2):0}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import throttle from "lodash/throttle"
export default {
    name:'ShopCart',
    methods:{
      //发请求
      getData(){
        this.$store.dispatch("getShopCart")
      },

      //全选按钮
      async isAllChecked(event){
          try {
              let isChecked = event.target.checked ? "1" : "0"
              await this.$store.dispatch('upDataAllCartType',isChecked)
              this.getData()
          } catch (error) {
              alert(error.message)
          }
        
      },
      //删除购物车选择的产品
      async delSelectGoods(){
          try {
              await this.$store.dispatch("deleteisChecked")
              this.getData()
          } catch (error) {
              alert(error.message)
          }
          
      },
      //修改物品选中或未选中
      async changeisChecked(item,event){
          try {
              let isChecked = event.target.checked ? "1" : "0"
              await this.$store.dispatch("updataCheckedType",{skuId:item.skuId,isChecked})
              this.getData()
          } catch (error) {
              alert(error.message)
          }
      },
      //改变物品数量
      async changeNum(type,num,item){
        switch(type){
          case "add":
            num = 1
            break
          case "reduce":
            if(item.skuNum>1){
              num = -1
            }else{
              num = 0
            }
            break
          case "change":
            if(num<1){
              num = 0
            }else{
              num = parseInt(num) - item.skuNum
            }
            break
        }
        try {
          await this.$store.dispatch('UpDataShopCar',{skuId:item.skuId,skuNum:num})
          this.getData()
        } catch (error) {
          console.log(error);
        }
      },

      //删除购物车物品
      delCartGoods:throttle(async function(skuId){
        try {
          await this.$store.dispatch('delShopCart',skuId)
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },20)
    },
    computed:{
      ...mapGetters(['cartList']),
      //购物车数据
      cartInfoList(){
        return  this.cartList.cartInfoList || []
      },
      //计算总价
      totalPrice(){
        let sum = 0
        this.cartInfoList.forEach(item => {
          sum = sum + item.skuPrice
        });
        return sum
      },
      allChecked(){
        return this.cartInfoList.every(item=>item.isChecked==1)
      }
    },
    mounted() {
      this.getData()
    },
    
}
</script>

<style lang="less" scoped>
a {
  cursor: pointer !important;
}
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>