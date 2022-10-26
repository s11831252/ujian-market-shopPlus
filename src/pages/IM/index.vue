<template>

    <div class="div1">
        <h4>WebSocket测试</h4>
        <input v-model="msg" />
        <button  @click="WebSocketSendMsg">发送数据</button>
    </div>
</template>
<script>
        //创建websockt

var webSocket = {};
var token= "7C6D46456680D91E3050DF1D4B161DE76EEA91A7EAE7A6DEF41262FBD2EB7DA477425D6E41F3ABC2140E4BD322F802186D98433DB4001BF3FD1C46CA3DA6BE7E900564B73A3150119994AE6349F278D73EE2DDDEDF8E76264C71CF4BE65904173EBF73E799272C3EA09977DB5CFC251B1EECFE8011F6C78853A26502FFD2DA384B3F16A16F662081992C3D29F62EE6A3091D1612";
    function WebSocketCreate(params) {
        webSocket = new WebSocket(`ws://127.0.0.1:8181/?token=${token}`);
        webSocket.onopen = WebSokectOnOpen;
        webSocket.onmessage = WebSocketOnMessage;
        webSocket.onclose = WebSocketOnClose;
    }
 
        //建立连接事件
        function WebSokectOnOpen() {
            alert("已经打开连接！");
            // webSocket.send("WebSocketCreate Success!");
        };
 
        //监听事件
        function WebSocketOnMessage(event) {
            //监听来自客户端的数据
            alert(event.data);
        };
 
        function WebSocketOnClose() {
            //监听来自客户端的数据
            alert('和服务器断开连接');
        };
export default {
    data(){
        return {
            msg:""
        }
    },
    methods:{
        //发送事件
         WebSocketSendMsg() {
            //发送到服务器
            var msgObj = {
                To: this.extConfig.sId,
                Msg:this.msg
            }

            var msg = {
                data:msgObj,
                action:"chat",
            }
            var msgStr =  JSON.stringify(msg);
            webSocket.send(msgStr);
        },
    },
    mounted(){
        WebSocketCreate();
    }
}
</script>
<style>

</style>