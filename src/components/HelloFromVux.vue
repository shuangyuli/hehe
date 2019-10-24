<template>
  <div class="container">
    <div class="vux-demo">
      <!-- 头部 -->
      <div class="header">
        <div class="header-left" @click="goBack()">
          <img src="../assets/zuo@2x.png" alt />
        </div>
        <p class="header-text">差旅</p>
      </div>
      <!-- 内容 -->
      <div class="count" ref="count">
        <div class="listDom" ref="vsAll" :class="ismenuDialog?'upDom':'downDom'">
          <div class="kefuAction">
            <div class="bodyMsg">
              <div class="bodyUp">
                <img src="../assets/zhinengren.jpg" alt />
                <span>Hi，请点击底部快捷按钮进行</span>
              </div>
              <div class="bodyDown">
                <vue-scroll :ops="ops" ref="vs">
                  <div class="taskList">
                    <ul class="tasks" id="tasks">
                      <li >
                        <img src="../assets/zhinengren.jpg" alt />
                        <span>出差申请</span>
                      </li>
                      <li >
                        <img :src="item.imgUrl" alt />
                        <span>出差申请</span>
                      </li>
                      <li >
                        <img :src="item.imgUrl" alt />
                        <span>出差申请</span>
                      </li>
                      <li >
                        <img :src="item.imgUrl" alt />
                        <span>出差申请</span>
                      </li>
                    </ul>
                  </div>
                </vue-scroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem, Popup, PopupPicker } from 'vux'

export default {
  components: {
    Grid,
    GridItem,
    Popup,
    PopupPicker
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      item: [
        {
          name: '出差申请'
        }
      ]
    }
  },
  methods: {
    show () {
      console.log(1111)
    }
  }
}
</script>

<style lang="less">
.container {
  height: 100%;
  width: 100%;
  position: relative;
  .vux-demo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .header {
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: center;
      position: relative;
      background-color: #fff;
      .header-text {
        font-size: 18px;
        color: #333;
      }
      .header-left {
        position: absolute;
        left: 0;
        top: 0;
        padding: 13px;
        img {
          height: 26px;
          width: 15px;
          vertical-align: top;
        }
      }
    }
    .count {
      flex: 1;
      background: #f7f7f7;
      -webkit-overflow-scrolling: touch;
      overflow: auto;
      .listDom {
        .kefuAction {
          padding: 15px 12px 0;
          display: flex;
          .bodyMsg {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            .bodyUp {
              img {
                display: block;
                width: 70px;
                height: 52px;
                margin-left: 0px;
              }
              span {
                font-family: "PingFangSC-Light";
                font-size: 16px;
                color: #333;
                display: inline-block;
                background: #fff;
                padding: 15px 10px;
                border-radius: 5px;
                border-top-left-radius: 0;
              }
            }
            .bodyDown {
              overflow-y: auto;
              -webkit-overflow-scrolling: touch;
              margin-top: 15px;
              .taskList {
                width: 100%;
                margin-left: 0;
                .tasks {
                  display: flex;
                  li {
                    font-family: PingFangSC-Light;
                    width: 80px;
                    height: 80px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: #fff;
                    margin-right: 5px;
                    border-radius: 5px;
                    img {
                      width: 0.72rem;
                      height: 0.72rem;
                      margin-bottom: 0.22rem;
                    }
                    span {
                      font-family: "PingFangSC-Light";
                      color: #333;
                      font-size: 16px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
