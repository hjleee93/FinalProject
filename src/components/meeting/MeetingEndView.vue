<template>
  <div class="mainc d-flex justify-space-around flex-wrap">
  
    <v-card
    class="mx-auto mcard"
    max-width="250"
     v-for="n in msg" :key="n.id"
    @click="cardclick(n)"
  >
    <v-img
      class="white--text align-end"
     
      width="200px"
      :src="`http://localhost:8082/itjobgo/meeting/imagesrequest${n.collabSq}`"
    >
     
    </v-img>
    <v-card-subtitle class="pb-0">제목:{{n.collabTitle}}</v-card-subtitle>
    <v-card-subtitle class="pb-0">인원모집: {{n.collabBack+n.collabFront+n.collabDesgin+"명"}}</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>모집요강</div>

      <div>{{n.collabSimcontent}}</div>
    </v-card-text>

    <v-card-subtitle class="py-0">작성자 : {{n.collabWriter}}</v-card-subtitle>
  </v-card>

  </div>
</template>

<script>
import { mapState } from 'vuex'


export default {
  
  components:{
  
  },
  computed: {
    ...mapState({
      msg:state=>state.meetingend
    })
  },
  created() {
    this.$store.dispatch("FECH_MEETINGENDLIST")
  },
  methods: {
    cardclick(value){
        this.$router.push({name:'meetinginfo',params:{id:value.collabSq}})
    }
  },
}
</script>

<style scoped>
.mainc{
  max-width: 960px;
  margin: 0 auto
}
* {
  font-family: "Noto Sans KR", sans-serif;
}
</style>