<template>

<div class="insertresume" >
    <div class="submenuimage">
        <p class="subtitle">{{title}}</p>
    </div>
 </div>

 
</template>

<script>
export default {
  data(){
      return{
          title:'portfoilo'
      }
  },
 
}
</script>

<style scoped>
.insertresume
{
    margin: 0px;

}
.subtitle{
    font-family: 'Masque';
    color:#4e5157 ;
    font-size: 50px;
}
.insertresume{
    display: flex;
    align-content: center;
}
.submenuimage{
    width: 100%;
    height:180px;
    background-color:#F4EEFF;
    text-align: center;
    line-height: 180px;
}
</style>