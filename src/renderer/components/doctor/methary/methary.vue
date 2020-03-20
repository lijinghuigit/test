<template>
  <div class="methary">
    <!--手术方法库的顶部-->
    <div style="display:flex;
            align-items: center;
            justify-content: space-between;">
      <!--左边的标题-->
      <div class="top">
        <div class="titl">
          手术方法库
        </div>
        <div class="center">
          选择适用于患者的手术方法
        </div>
      </div>
      <!--右边的搜索 需要引入electron-->
      <div class="trong">
        <!--</el-cascader>-->
        <el-select v-model="valueone" placeholder="请选择" @change="clickmath">
          <el-option
                  v-for="item in optione"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
          </el-option>
        </el-select>
        <el-select v-model="valuetwo" placeholder="请选择" @change="clickmaths">
          <el-option
                  v-for="item in optitwo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
          </el-option>
        </el-select>
        <el-select v-model="valuethree" placeholder="请选择" @change="metharyer">
          <el-option
                  v-for="item in optithree"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled">
          </el-option>
        </el-select>
      </div>
    </div>
    <!--手术方法库的内容-->
    <div>
      <div style="margin-top: 6px;display: flex;flex-direction:row;flex-wrap:wrap;">
        <div class="onebox" @click="fons">
          <div class="title">
            寻求帮助、权威教授量身定制
          </div>
          <div class="centers">
            骨折手术常用于修复膝关节软骨病损的技术。
            医生利用关节透镜将软骨受损部位移除,接下来在
            骨头上钻几个洞,使骨髓细胞与血液会凝结平滑且坚固的...
          </div>
        </div>

        <!--循环下面的内容-->
        <div class="box" v-for="(item,index) in metha" @click="metharycenter(item.surgicalPlanId)" :key="index">
          <el-row style="height: 100%;padding: 4px;">
            <el-col class="box-img" :style=imgitem[index]  :span="8">
            </el-col>
            <el-col style="height: 100%" :span="16">
              <div style="margin:8px;">
                <div class="box-title">
                  <div v-if="item.surgicalPlanName">
                    {{item.surgicalPlanName}}
                  </div>
                  <div v-else>
                    手术方法名称
                  </div>
                </div>
                <div class="box-name">
                  {{item.doctorName}}  |  {{item.diseaseCategoryName}}
                </div>
                <div class="box-center" style="min-height: 56px;">
                  <div v-if="item.title">
                    {{item.title}}
                  </div>
                  <div v-else>
                    暂无手术方法内容
                  </div>

                </div>

                <div class="box-name" style="line-height: 17px;text-align: right;">
                  2019-10-10 13:00
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  //

    export default {
        name: "methary",
      data() {
        return {
          input: '',  //无用处可删除
          metha:[            //循环的手术方法
          ],
            father:'',   //选中的一级病理
            main:'',   //选中的二级病理
            son:'',   //选中的三级病理
            imgitem:[],  //手术方法图片

            optione:[],  //所有的一级病例
            optitwo: [],  //所有的二级病例
            optithree:[],//所有的三级病例
            valueone: '',   //一级id
            valuetwo: '',   //二级id
            valuethree: ''   //三级id
        }
      },
      components:{

      },
        methods:{
            //点击进入详情 并且跳转页面
            metharycenter(disid){
              // console.log("this is center");
                //跳转手术方法页面
                this.$router.push({
                    path: '/method',  // 路由的名称
                    query: {
                        id: disid,
                    }
                })

            },
            fons(){
                this.$router.push({
                    path: '/addmethod'  // 路由的名称
                })
            },
            methary(){  //diseaseCategory/parentList  获取父级的方法
                        //需要一级的然后是二级的最后是三级的
                this.changeDatado("GET","diseaseCategory/parentList",{    //
                },(response) =>{
                    console.log(response);
                    this.optione = response.map((value, i) => {
                        return {
                            value: value.diseaseCategoryId,
                            label: value.diseaseCategoryName
                        }
                    });
                    this.metharyer("")
                },(error) =>{
                    console.log(error)
                });
            },
            clickmath(diseaseCategoryId){   //上一级获取下一级可调用同样的方法
                // /diseaseCategory/sonList
                //点击了父级的函数之后获取第二级的
                this.father = diseaseCategoryId;
                this.main = '';
                this.son = '';
                this.valuetwo = '';
                this.valuethree = '';
                this.changeDatado("GET","diseaseCategory/sonList",{
                  diseaseCategoryId:diseaseCategoryId  //参数点击了的一级的id
                  },(response) =>{
                    console.log(response);
                    this.optitwo = response.map((value, i) => {
                        return {
                            value: value.diseaseCategoryId,
                            label: value.diseaseCategoryName
                        }
                    });
                    //清空二级的内容
                    this.metharyer("")
                  },(error) =>{
                      console.log(error)
                  })
            },
            clickmaths(diseaseCategoryId){   //上一级获取下一级可调用同样的方法
                // /diseaseCategory/sonList
                this.son = '';
                this.valuethree = '';
                this.main = diseaseCategoryId;
                this.changeDatado("GET","diseaseCategory/sonList",{
                    diseaseCategoryId:diseaseCategoryId  //参数点击了的一级的id
                },(response) =>{
                    this.optithree = response.map((value, i) => {
                        return {
                            value: value.diseaseCategoryId,
                            label: value.diseaseCategoryName
                        }
                    });
                    this.metharyer("")
                },(error) =>{
                    console.log(error)
                })
            },
            metharyer(diseaseCategoryId2){
                this.changeDatado("GET","surgicalPlan/list",{
                    length:10000,
                    start:1,
                    parentId:this.father,
                    diseaseCategoryId:this.main,
                    diseaseCategoryId2:diseaseCategoryId2
                },(response) =>{
                    console.log("这里是手术方法库");
                    console.log(response);
                    this.metha = response.list;
                    let strs = new Array();
                    let stae = new Array();
                    //通过导板id获得图片;
                    for(let i= 0;i<this.metha.length; i++){
                        if(this.metha[i].spare1){
                            this.changeDatado("GET","guidePlateMaterial/getGuidePlateMaterialDetails",{
                                guideguidePlateMaterialId:this.metha[i].spare1
                            },(response) =>{
                                console.log(response);
                                if(response.sTLPicture){
                                    // 这里有图片
                                    stae=response.sTLPicture.split(","); //字符分割
                                    strs.push({backgroundImage:"url(" + this.GLOBAL.bastuse+"view-image/"+stae[0] + ")",
                                        backgroundPosition: "center center",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover"})
                                }else{
                                    strs.push({backgroundImage: "url(" + require("../../../assets/img/wupgo.png") + ")",
                                        backgroundPosition: "center center",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover"})
                                }
                            },(error) =>{
                                console.log(error)
                            });
                        }else{
                            strs.push({backgroundImage: "url(" + require("../../../assets/img/wupgo.png") + ")",
                                backgroundPosition: "center center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover"})
                        }
                    }
                    this.imgitem = strs;
                },(error) =>{
                    console.log(error)
                });
            },
        },
        created(){
            this.methary();     //获取父级的所有选项
        }
    }
</script>

<style>
  .trong .el-input__inner{
    line-height:30px;
    height: 30px;
    font-family: "PingFang-SC-Bold";
  }
  .trong .el-input__icon{
    line-height: 30px;
  }
  .trong .el-input{
    width: 100%;
  }
</style>

<style scoped>
  .trong{
    margin: 0 12px 0 25px;
    padding-bottom: 10px;
  }
  .methary{
    margin: 60px 5px 20px 25px;
    padding-bottom: 20px;
    min-width:920px;
    min-height: 680px;
  }

  .top{
    text-align: left;
  }

  .titl{
    font-size:18px;
    font-family:"PingFang-SC-Bold";
    font-weight:bold;
    color:rgba(51,51,51,1);
    line-height:26px;
    letter-spacing: 1px;
  }

  .center{
    font-size:12px;
    font-family:"PingFang-SC-Bold";
    font-weight:normal;
    color:rgba(157,157,161,1);
    line-height:24px;
    letter-spacing: 1px;
  }

  .methaays{
    margin-right: 45px;
  }

   .onebox{
     cursor:pointer;
     min-width:330px;
     max-width:330px;
     min-height:143px;
     background:linear-gradient(-32deg,rgba(254,116,134,1) 0%,rgba(253,216,177,1) 100%);
     border-radius:5px;
     margin: 7px 11px 7px 0;

   }
  .title{
    text-align: left;
    font-size:16px;
    letter-spacing:2px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(254,254,255,1);
    line-height:19px;
    text-shadow:0px 1px 1px rgba(17,33,60,0.1);
    margin: 16px 0 0 9px;
  }
  .centers{
    text-align: left;
    font-size:12px;
    font-family:PingFang-SC-Medium;
    font-weight:normal;
    color:rgba(251,251,255,1);
    letter-spacing: 1px;
    line-height:20px;
    text-shadow:0px 1px 1px rgba(17,33,60,0.1);
    margin: 10px 45px 18px 9px;
  }
  .box{
    cursor:pointer;
    min-width:327px;
    max-width:327px;
    height:140px;
    border-radius:5px;
    margin: 7px 11px 7px 0;
    text-align: left;
  }
  .box:hover{
    background: rgb(241, 241, 241);

  }
  .box-img{
    height: 100%;
  }

  .box-title{
    font-size:16px;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(51,51,51,1);
    line-height:26px;
    letter-spacing: 1px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .box-name{
    font-size:12px;
    font-family:PingFang-SC-Regular;
    font-weight:normal;
    color:rgba(190,190,190,1);
    line-height:25px;
    letter-spacing: 1px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;

  }
  .box-center{
    font-size:12px;
    font-family:PingFang-SC-Regular;
    font-weight:normal;
    color:rgba(190,190,190,1);
    line-height:19px;
    letter-spacing: 1px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

</style>
