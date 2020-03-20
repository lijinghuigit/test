import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export const store=new Vuex.Store({
    strict:true,
    state:{
        arr:'',
        id:'',
    },
    getters:{

    },
    mutations:{
        axiosData(state,payload){
            console.log(payload)
            state.arr=payload.data.object
            state.id=payload.data.object.id
            console.log(state)
            console.log(state.arr)
        },
    },  
    actions:{
        getSetting(context){
            console.log('重新渲染新的数据了吧')
            console.log(localStorage.getItem('Token'))
            axios({
                url:'http://supplier.shoyii.com/settings/getSupSettings',
                method:"GET",
                headers:{
                    Token:localStorage.getItem('Token')
                } 
            }).then((ok)=>{
                console.log(ok.data)
                context.commit('axiosData',ok)
            })
        },
        setSetting(context,data){
            // console.log(localStorage.getItem('Token'))
            // console.log(data)
            var id=data.id
            var dataSetting=data.dataSetting
            var num=data.num
            // console.log('num'+num)
            var param =new URLSearchParams();
            switch(num){
                case 1:
                    console.log('1')
                    param.append("powerOnSelfStart",dataSetting) 
                break;
                case 2:
                    console.log('2')
                    param.append("downloadCompletionPrompt",dataSetting) 
                break;
                case 3:
                    console.log('3')
                    param.append("downloadFailurePrompt",dataSetting) 

                break;
                case 4:
                    console.log('4')
                    param.append("downloadLostPlayTone",dataSetting) 

                break;
                case 5:
                    console.log('5')
                    param.append("messagePointDisplay",dataSetting) 
                break;
                case 7:
                    console.log('7')
                    param.append("autoUpdate",dataSetting) 
                break;
                case 8:
                    console.log('8')
                    param.append("newVersionPrompt",dataSetting) 
                break;
                case 9:
                    console.log('9')  //最小化3 关闭为9
                    console.log(dataSetting)
                    param.append("ifExitProcedure",dataSetting) 
                break;
                case 10:
                    console.log('10')  //下载目录存储
                    console.log(dataSetting)
                    param.append("downloadDirectory",dataSetting) 
                break;
                
            }
            param.append("id",id)  
            console.log(param)
            axios({
                url:'http://supplier.shoyii.com/settings/modify',
                method:"POST",
                data:param,
                headers:{
                    Token:localStorage.getItem('Token')
                } 
            }).then((ok)=>{
                console.log(ok.data)
                context.commit('axiosData',ok)
            })
        }
    }
})