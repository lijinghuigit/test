<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 13:33:57
 * @LastEditTime: 2020-03-25 10:13:22
 * @LastEditors: Please set LastEditors
 -->

<template>
  <div>
    <div class="top">
      <i class="iconfont icon-zuoshanglogo" style="font-size:48px;"></i>
    </div>
    <!--下面的选择-->
    <div class="mid">
      <div class="centerleft" v-for="(item,index) in supdoc" :key="index"
           @mouseover="addClassload(index)"
           @mouseleave="removeClassload(index)"
           @click="addClassalways(index)"
           :class="{centerhover:ltcenter&&index==leftc,centeralways:index==clilef}">
        <router-link class="left-top-center-inp" :to="item.src">
           <div :class="index==clilef?'inpimg':'inp-img'">
              <i :class=item.img style="font-size: 22px;"></i>
           </div>
          <!--或者是ic图-->
           <div :class="index==clilef?'inpcenter':'inpCenter'">{{item.title}}</div>
        </router-link>
      </div>
    </div>
  </div>
  <!--</div>-->
</template>
<script>
  export default {
    name: "tobar",
    data(){
      return{
        leftc:0,  //鼠标移动到的按钮的位置
        supplierlist:[      //供应商页面左侧栏显示
          {img:"iconfont icon-shouye",title:"首页",src:"/"},
          {img:"iconfont icon-kurong",title:"材料库",src:"/material"},
          {img:"iconfont icon-xiaoxi ",title:"消息通知",src:"/notice"},
          {img:"iconfont icon-gongnengdingyi",title:"应用市场",src:"/apmaker"},
           {img:"iconfont icon-gongyingshang--gongsixinxi",title:"公司信息",src:"/ComponyInformation"},
          {img:"iconfont icon-shezhi",title:"设置",src:"/setup"},
          //  {img:"iconfont icon-shezhi",title:"好啦",src:"/settttupp"}
        ],
        
        supplierlists:[    //医生端页面左侧栏显示
          {img:"iconfont icon-shouye",title:"首页",src:"/"},
          {img:"iconfont icon-xiaoxi",title:"通知",src:"/notice"},
          {img:"iconfont icon-kurong",title:"手术方法库",src:"/methary"},
          {img:"iconfont icon-gongnengdingyi",title:"应用市场",src:"/apmaker"},
          {img:"iconfont icon-tubiaozhizuomoban4",title:"病例目录",src:"/caselist"},
          {img:"iconfont icon-shezhi",title:"设置",src:"/setup"}
        ],
          supplierlistst:[    //影视端页面左侧栏显示
            {img:"iconfont icon-tubiaozhizuomoban4",title:"病例目录",src:"/caselist"},
            {img:"iconfont icon-xiaoxi",title:"通知",src:"/notice"},
            {img:"iconfont icon-gongnengdingyi",title:"应用市场",src:"/apmaker"},
            {img:"iconfont icon-shezhi",title:"设置",src:"/setup"}
        ],
        supdoc:'',
        ltcenter:false,   //鼠标经过的按钮 切换了true
        clilef:0,   //点击的按钮
      }
    },
    components:{

    },
    //事件
    methods:{
      // 鼠标移入事件
      addClassload(index){
        this.ltcenter=true;
        this.leftc=index;
      },

      // 鼠标移除的时候事件
      removeClassload(index){
        this.ltcenter=false;
        this.leftc=index;
      },
      //鼠标点击事件
      addClassalways(index){
        this.clilef = index
      },
        //init事件
      init(){
        // console.log('你只新发')
          //判断登录的是哪个端口
          if(localStorage.getItem("logintt") ==1){
              // console.log("这是摄影端");  //supplierlist
              this.supdoc = this.supplierlistst;
          }else if(localStorage.getItem("logintt") ==2){
              //医生端
              this.supdoc = this.supplierlists;
              this.changeDatado("GET","doctor/getDoctorInformation",{
              },(response) =>{
                  //本地储存所有信息
                  this.GLOBAL.doctcenter = response;
                   console.log(this.GLOBAL.doctcenter)
              },(error) =>{
                  console.log(error);
              });
          }else if(localStorage.getItem("logintt") ==3){
              console.log("这是供应商");  //supplierlist
              this.supdoc = this.supplierlist;
              this.changeDatamo("GET","supplier/getSupplier",{
              },(response) =>{
                  // 这个是全局的信息供应商
                  this.GLOBAL.doctcenter = response;
                  console.log('你是id吧')
                   console.log(this.GLOBAL.doctcenter)
              },(error) =>{
                  console.log(error);
              });
          }
      },
      index(){
        if(localStorage.getItem("Token")){ // 这是已经登录的
            this.init();
        }else{
            let intervalid = setInterval(()=>{  //尚未登录
                if(localStorage.getItem("Token")){
                    this.init();
                    clearInterval(intervalid);
                }
            }, 1000);
        }
      }
    },
    created(){
        this.index();
    }
  }
</script>

<style scoped>
  .top{
    padding: 24px 0;
  }
  .top img{
    width: 122px;
    height: 42px;
    /* border-radius: 90%; */
    box-shadow:0px 0px 10px 0px rgba(18,49,137,0.05);
  }
  .top p{
    margin: 0px;
    font-size:14px;
    font-family:PingFang-SC-Bold;
    font-weight:normal;
    color:#949B99;
    line-height:20px;
  }

  .mid{
    margin-top: 30px;
    padding-bottom: 60px;
  }
  .left-top-img p{
    font-size:14px;
    font-family:PingFang-SC-Bold;
    font-weight:normal;
    color:rgba(155,165,183,1);
    line-height:21px;
  }
  .centerleft{
    width:210px;
    height:44px;
    border-radius:2px;
    margin: 12px auto;
    cursor:pointer;
    color:rgba(155,165,183,1);
  }
  /*鼠标移动的触发的样式*/
  .centerhover{
    background:#DFEDF9;
    /* color:rgba(3,215,143,1)!important; */
  }
  .centerhover a{
    color: #2b5c83;
  }
  /*鼠标点击触发的样式*/
  .centeralways{
    background:#DFEDF9;
    /* color:rgba(3,215,143,1)!important; */
  }
  .left-top-center-inp{
    text-decoration: none;
    display: flex;
    color:rgba(155,165,183,1);
    align-items:center;/*垂直居中*/
  }
  .inp-img{
    padding: 0 22px;
    width: 18px;
    height: 18px;
    display:flex;
  }
  .inpimg{
    padding: 0 22px;
    width: 18px;
    height: 18px;
    display:flex;
    color: #2b5c83;
  }
  .inp-img img{
    width: 100%;
    height: 100%;
  }
  .inpcenter{
    font-size:13px;
    letter-spacing: 2px;
    font-family:PingFang-SC-Bold;
    font-weight:normal;
    line-height:42px;
    color: #2b5c83;
  }
  .inpCenter{
    font-size:13px;
    letter-spacing: 2px;
    font-family:PingFang-SC-Bold;
    font-weight:normal;
    line-height:42px;
  }
  .clare{
    /*font-style: italic; 5000 5000 4100 4300 4200 */
  }

</style>
