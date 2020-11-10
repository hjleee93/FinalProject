<template>
    <div> 

        <b-container>
            <div class="info-box">
                <div class="right">
                </div>
                <div class="left">
                    <table style="width:100%" v-for="(item, i) in items.wantedDtl.corpInfo" :key="i">
                        
                        <tr>
                            <td colspan="2">타이틀</td>
                            <p>{{ item.corpNm._text }}</p>
                        </tr>
                        <tbody >
                        <tr >
                            <td class="cell">1</td>
                            <td class="cell">2</td>
                        </tr>
                        <tr>
                            <td class="cell">3</td>
                            <td class="cell">4</td>
                        </tr>
                        </tbody>
                        </table>
                </div>
            </div>
        </b-container>
    </div>
    
</template>
<script>
var convert = require('xml-js')
export default {
    data() {
    return {
      
      items:[]
    }
    },
    
    created() {
            this.wantedNo = this.$route.params.wantedNo;
        //세부 채용 정보
            this.$http.get("http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=D&returnType=XML&infoSvc=VALIDATION&wantedAuthNo=" +this.wantedNo)
      .then((response) => {
        var xml = response.data
        var json = convert.xml2json(xml, { compact: true })
        this.item = JSON.parse(json);    
        
        
      })
        },
}
</script>

<style scoped>
.info-box{
    height: 500px;
    border:1px solid #ededed;

}
.left{
    height: 500px;
    float: left;
width: 780px;
padding: 30px;
border-right: 1px solid #ededed;
}
.right{
    height: 500px;
    float: right;
width: calc(100% - 780px);
padding: 19px 30px 0 30px;
}
.job-title{
    display: inline-block;
    line-height: 1.5;
    font-size: 1.5174em;
    font-weight: 700;
}
.cell{
    width: 50%;
}
</style>