<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 13:33:57
 * @LastEditTime: 2019-10-16 16:33:36
 * @LastEditors: Please set LastEditors
 -->
 <template>

  <div class="page-left">
    <!--顶部轮播-->
    <div class="carousel">
          <el-carousel height="210px" style="width:655px;height: 220px;">
            <el-carousel-item v-for="(item,index) in Image" :key="index">
                <img v-bind:src="item.src" alt="" style="border-radius:4px;"/>
            </el-carousel-item>
          </el-carousel>
    </div>
    <div class="center-left">
      <div style="position: relative">
        <div class="center-left-letter">
         材料打印机
        </div>
      </div>

      <div class="center-last-index" style="position:relative;">
        <!--内容-->
        <!-- 打印机的顶部栏 -->
        <!-- 这块是否有进行搜索的功能 -->
        <div class="index-title">
          <div>
              <select v-model="SelectInput" @change="getvalue" style="display:block;border:1px solid white;border-radius:5px;outline:none;">
                  <option value="" selected="selected" style="color:black">全部类型</option>
                  <option v-for="(item,index) in selectData" :key="index" :value="item.materialsid" style="color:black">{{item.name}}</option>
              </select> 
            </div>

            <div v-for="(item,index) in stamp" :key="index">{{item.name}}</div>
        </div>
        <!-- 展示的全部内容 -->
            <div class="index-center">
              <!-- 搜索出来要展示的内容 -->
                <div v-if="selectBoolean" class="Print">
                    <ul v-for="(item,index) in searchData" :key="index" style="height:40px;display:flex;font-size:14px;">
                          <li style="padding:0px 10px 26px 10px;color:black;">{{item.one_name}}</li>
                          <li style="padding:0px 10px 26px 10px;color:black;">{{item.two_name}}</li>
                          <li style="padding:0px 24px 26px 0px;color:black;">{{item.two_technology}}</li>
                          <li style="padding:0px 10px 26px 10px;color:black;">
                              <div class="Status">
                                  <el-switch
                                    style="display: block"
                                    v-model="s_SwitchStatus[item.materialScienceId]"
                                    active-color="#86B0D4"
                                    inactive-color="#ff4949"
                                    active-text="开"
                                    active-value="true"
                                    inactive-value="false"
                                    inactive-text="关" @change="selectSwitch(item.materialScienceId,s_SwitchStatus[item.materialScienceId],searchData)">
                                  </el-switch>
                              </div>
                          </li>
                    </ul>
                </div>      
              <!-- 这部分内容与搜索内容交替出现 -->
                <div class="Print" style="margin:10px 0px;" v-if="showBoolean">
                    <ul v-for="(item,index) in stamps" :key="index" style="height:40px;display:flex;">
                        <li style="padding:0px 10px 26px 10px;">{{item.one_name}}</li>
                        <li style="padding:0px 10px 26px 10px;">{{item.two_name}}</li>
                        <li style="padding:0px 24px 26px 0px;">{{item.two_technology}}</li>
                        <li style="padding:0px 10px 26px 10px;">
                            <el-switch
                                style="display: block"
                                v-model="SwitchStatus[item.materialScienceId]"
                                active-color="#86B0D4"
                                inactive-color="#ff4949"
                                active-text="开"
                                active-value="true"
                                inactive-value="false"
                                inactive-text="关" @change="change(item.materialScienceId,SwitchStatus[item.materialScienceId],stamps)">
                            </el-switch>
                        </li>     
                    </ul>
                </div>
            </div>
            <div style="height:10px;width:100%;background:#ffffff;position:absolute;bottom:32px;left:-40px;">

            </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "center",
    data(){
      return{
        stamps:[
        ],
        selectData:[],
        searchData:[],
        value: 'true',
        SelectInput:'',
        showBoolean:true,//默认材料数据是全部展示出来的
        selectBoolean:false,//默认选择的材料是隐藏的
        SwitchStatus:{},
        s_SwitchStatus:{},
        stamp:[
          // {name:"材料名称",num:"1"},
          {name:"可用材料",num:"2"},
          {name:"制造工艺",num:"3"},
          {name:"制造状态",num:"4"},
        ],
        status:'true',
        // 先暂时用本地图片
        Image:[
          {src:require('../../../assets/img/courser1.png')},
          {src:require('../../../assets/img/courser2.png')},
          // {src:require('../../../assets/img/courser1.png')},
        ],

      }
    },
    components:{
    },
    //事件
    methods:{
      // 选择材料
      getvalue(){
          //  这块选择材料之后，将数据渲染到页面上
          // 获取到这个材料的ID，
          //  console.log(this.SelectInput)
          // 点击某个材料时，获取这个材料的开关状态
           this.changeDatamo('GET','material/getlist',{
            // 发给后台的是材料的ID；
               materialsId:this.SelectInput,
          },(response)=>{
            this.searchData=response.data
            this.searchData.forEach(v=>{
                 this.s_SwitchStatus[v.materialScienceId]=v.style
            }) 
            // 成功返回后，原来默认的数据消失，查询到的数据替换上
            this.showBoolean=false
            this.selectBoolean=true
          })
      },
      // 控制开关
      selectSwitch(s_id,s_status,s_obj){
        this.changeDatamo('GET','material/materialSwitch',{
               materialScienceId:s_id,
               style:s_status,
             },(response)=>{
              //  修改成功,立即进行开关数据的展示
              if(response.code==1){
                this.changeDatamo('GET','material/getlist',{
                  // 发给后台的是材料的ID；
                  materialsId:this.SelectInput,
                  },(response)=>{
                    this.searchData=response.data
                    this.searchData.forEach(v=>{
                        this.s_SwitchStatus[v.materialScienceId]=v.style
                    })  
                  // 成功返回后，原来默认的数据消失，查询到的数据替换上
                  this.showBoolean=false
                  this.selectBoolean=true
                })
              }else{
                return;
              }
             }) 
      },
      change(id,status,obj){
          this.changeDatamo('GET','material/materialSwitch',{
               materialScienceId:id,
               style:status,
             },(response)=>{
               console.log(response)
               if(response.code==1){
                  this.changeDatamo("GET","material/getlist",{
                        page:1,
                        size:10000,
                    },(response) =>{
                      this.stamps=response.data
                      this.stamps.forEach(v=>{
                          this.SwitchStatus[v.materialScienceId]=v.style
                      })
                    },(error) =>{
                        console.log(error)
                    });
               }else{
                 return;
               }
             })
      },
      // 开关数据的展示
      Print_material(){
        // console.log(this.GLOBAL.doctcenter.adminid)
        console.log('开关数据的展示')
        this.changeDatamo("GET","material/getlist",{
               page:1,
               size:10000,
          },(response) =>{
            console.log('开关数据')
            console.log(response)
            this.stamps=response.data
            this.stamps.forEach(v=>{
                 this.SwitchStatus[v.materialScienceId]=v.style
            })
          },(error) =>{
              console.log(error)
          });
      },
      Select_material(){
         console.log('选择开关数据')
          this.changeDatamo("GET","materials/getlistone",{},(response) =>{
              this.selectData = response 
              console.log(response)
          })
      },
    },
      created(){
        console.log('我是开关')
        this.Print_material();
        this.Select_material();
      }
  }
</script>



<style>
/* select option::-ms-expand{display:none;} */
.Print ul li{
  list-style: none;
  line-height: 40px;
  width: 25%;
  font-size: 14px;
}
.el-carousel__button{
  width:10px!important;
  height: 10px!important;
  border-radius: 50%!important;
}
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

  table{
    color: black;
  }
  el-table{
    color: black;
    background-color: red;
  }

  .red{
      color: red;
  }
  .green{
    color: green;
  }
select  option{
    -moz-appearance:none;
    -webkit-appearance:none;
    appearance:none;
    border: 1px solid red;
}
select option:hover{
  color: rgb(133, 150, 99);
  background-color: red;
}
.material{
  margin: 0px;
  line-height: 25px;
}
  .page-left{
    margin: 0px 0px 0px 20px;
    height: calc(100% - 75px);
    width: 655px;
    background: rgba(255,255,255,1);
    padding-bottom: 10px;
    position: fixed;
    flex: 1;
    z-index:70;
  }
  .carousel{
    margin: 0 auto;
    text-align: left;
    width:100%;
    border-radius:4px;
  }
  .carousel img{
    width: 100%;
    height: 100%;
  }
  .page-left .center-left{
    width:100%;
    background-color: #fff;
    padding: 20px auto;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    /* box-shadow:0px 0px 10px 0px rgba(18,49,137,0.1); */
    border-radius:4px;
  }
  .center-left-letter{
    text-align: left;
    font-size:20px;
    letter-spacing:1px;
    font-family:PingFang-SC-Bold;
    font-weight:normal;
    color:#333333;
    line-height:60px;
    margin-bottom: 25px;
  }
  .center-left-raly{
    margin-left:auto;
    position: absolute;
    top: 18px;
    right: 18px;
    padding: 11px;
    width: 80px;
    background:rgba(244,244,244,1);
    border-radius:2px;
    z-index: 50;
  }
  .center-left-reply{
    cursor: pointer;
    font-size:11px;
    line-height: 12px;
    letter-spacing:1px;
    font-family:PingFang-SC-Bold;
    font-weight:normal;
    color:rgba(132,134,139,1);
  }
  .center-last-index{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin: 0px 20px 10px 0px;
  }
  .index-title{
    display: flex;
    padding-bottom: 13px;
    border-bottom:1px solid rgba(221,221,221,1);;
    text-align: center;
  }
  .index-title div{
    font-size:12px;
    line-height: 14px;
    font-family:Adobe Heiti Std R;
    font-weight:normal;
    color:#BCBEC5;
    width: 25%;
  }
  .index-title div:nth-child(1){
    text-align: left;
  }
  .index-title div:nth-child(2){
    text-align: left;
    margin-left: 20px;
  }
  .index-title div:nth-child(3){
    text-align: left;
  }
  .index-title div:nth-child(4){
    text-align: center;
    margin-right: 35px;
  }
  .index-center{
    display: flex;
    justify-content: space-around;
    padding: 0px 0px 8px 0px;
    /* border-bottom:1px solid rgba(18,49,137,0.1); */
    line-height: 40px;
    color: black;
    height:345px;
    overflow-y: scroll;
  }
  .index-center div:nth-child(1){
    flex: 7;
    text-align: left;
  }
  .index-center div:nth-child(2){
    flex: 6;

  }
  .index-center div:nth-child(3){
    flex: 5;
    display: flex;
    justify-content: center; /* 相对父元素水平居中 */
    align-items: center; /*  子元素相对父元素垂直居中 */
  }
  .index-center div:nth-child(4){
    flex: 3;
    display: flex;
    justify-content: center; /* 相对父元素水平居中 */
    align-items: center; /*  子元素相对父元素垂直居中 */
  }
  .bxg{
    font-size:13px;
    letter-spacing:1px;
    font-family:PingFang-SC-Bold;
    font-weight:normal;
    color:rgba(186,186,186,1);
  }

  .photo{
    flex: 0 0 40px!important;
    height: 40px;
    border-radius:50%;
  }
  .photo img{
    width: 100%;
    height: 100%;
    border-radius:50%;
  }

  .photo-neir{
    margin: 0px 0 0px 10px;
  }
  .photo-title{
    font-size:13px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(153,153,153,1);
    line-height:22px;
  }
  .photo-center{
    font-size:10px;
    margin-top: 2px;
    font-family:PingFang-SC-Bold;
    font-weight:normal;
    color:rgba(186,186,186,1);
    line-height:11px;
  }
  .fahuo{
    display: flex;
    flex: 0 0 57px!important;
    justify-content: center; /* 相对父元素水平居中 */
    align-items: center; /*  子元素相对父元素垂直居中 */
    height:24px;
    background:rgba(70,212,133,1);
    border-radius:12px;
    font-size:11px;
    line-height: 24px;
    font-family:Adobe Heiti Std R;
    font-weight:normal;
    color:rgba(255,255,255,1);
  }
  .dian{
    flex: 0 0 5px!important;
    height:5px;
    margin: 0 2px;
    background:rgba(199,199,199,1);
    border-radius:50%;
  }
  
.el-switch{
    /* margin-left:250px; */
    margin-top: 10px;
}

  /*移动到打印机的事件*/
  .centerhover{
    cursor: pointer;
    background:rgba(247,252,251,1);
  }
</style>
<style scoped>
  .Status{
  margin-right:105px!important;
}
</style>
