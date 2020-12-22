<template>

  <v-card
    class="mx-auto mcard"
    max-width="250"
    to="/meetinginfo"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>토이프로젝트 모집해요</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">1/6명</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>모집요강</div>

      <div>백엔드개발자,프론트엔드개발자,퍼블리셔</div>
    </v-card-text>

    <v-card-subtitle class="py-0">Number 10</v-card-subtitle>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      mlist:state=>state.mlist
    })
  },
methods: {
  
},
created() {
  this.$store.dispatch("FECH_MSUBLIST")
},
    
  
}
</script>

<style scoped> 
.mcard{
    margin-top: 20px;
    margin-bottom: 10px;
    
}
* {
  font-family: "Noto Sans KR", sans-serif;
}

</style>