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

    <v-card-subtitle class="pb-0">6/6명</v-card-subtitle>

    <v-card-text class="text--primary">
      <div>모집마감</div>

      <div>백엔드개발자,프론트엔드개발자,퍼블리셔</div>
    </v-card-text>

    <v-card-subtitle class="py-0">Number 10</v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  methods: {
    test(){
      alert("클릭메소드 실행")
    }
  },
}
</script>

<style>
.mcard{
    margin-top: 20px;
    margin-bottom: 10px;
    
}

</style>