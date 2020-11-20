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
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>{{n.collabTitle}}</v-card-title>
    </v-img>

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
      msg:state=>state.meeting
    })
  },
  created() {
    this.$store.dispatch("FECH_MEETINGLIST")
  },
  methods: {
    cardclick(value){
        this.$router.push({name:'meetinginfo',params:{id:value.collabSq}})
    }
  },
}
</script>

<style>
.mainc{
  max-width: 960px;
  margin: 0 auto
}
</style>