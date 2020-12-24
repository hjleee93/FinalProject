<template>
  <v-footer class="footer px-4 mt-5 noprint">
    <v-row align-v="center" class="justify-content-lg-between">
      <v-col lg="12">
        <div class="copyright text-center text-lg-center text-muted pt-2">
          Copyright ⓒ<a to="/" class="font-weight-bold ml-1" target="_blank"
            >ItJobGo</a
          >
          All rights reserved.
        </div>
        <p class="mt-3 text-center">
          <a to="https://www.work.go.kr"
            ><img
              class="text-center"
              src="https://openapi.work.go.kr/images/info_source.gif"
          /></a>
        </p>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>
.footer {
  font-family: "Noto Sans KR", sans-serif;
}
@media print {
  .noprint {
    display: none;
  }
}
</style>
