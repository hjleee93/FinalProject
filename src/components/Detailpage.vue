<template>

    <div class="container">

        <div class="container detail_">

        <h7>작성일 : 20/11/02 </h7>
        <h7 class="detail_top">작성자 : master17 </h7>
        <h7 class="detail_top">조회수 : 1</h7>
            <div>
                <hr>
                <h5>Some asked questions</h5>
                <hr>
                <div class="detail_write">
                            Description lists
                            A description list is perfect for defining terms.
                            Euismod
                            Vestibulum id ligula porta felis euismod semper eget
                            <br>Donec id elit non mi porta gravida.
                            Malesuada porta
                            Etiam porta sem malesuada magna mollis euismod.<br><br>
                            Felis euismod semper eget lacinia
                            Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, <br>ut fermentum massa justo sit amet risus.
                            A description list is perfect for defining terms.
                            Euismod?<br>
                            Donec id elit non mi porta gravida at eget metus.
                            Malesuada porta
                            Etiam porta sem malesu<br>A description list is perfect for defining terms.
                            Euismod<br>
                            Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.
                            Donec id elit non mi porta gravida at eget metus.<br>
                            Malesuada porta
                            Etiam porta sem malesu
                </div>
                <hr>
                
                <div class="detail_btn_div">
                <b-button class="detail_btn" variant="primary" id="detailbtn1" @click="$router.push({name: 'detailpage_modify'}).catch(()=>{});">수정</b-button>
                <b-button class="detail_btn" variant="primary" id="detailbtn1">삭제</b-button>
                <b-button class="detail_btn" variant="primary" id="detailbtn1" onclick="history.back(-1);">목록</b-button>
                </div>
            </div>

        </div>
      </div>



</template>

<script>
export default {
    
    
}
</script>

<style>
.detail_{
    margin-top:6%;
    margin-right: 2%;
}
.detail_write{
    height: 400px;
}
.detail_top{
    margin-left: 12px;
}
.detail_btn{
    margin-left: 10px;
}
.detail_btn_div{
    text-align: center;
    margin-top: 3%;
}
#detailbtn1{
  background-color:  #424874;
  border: 1px  #424874 solid;
}
</style>