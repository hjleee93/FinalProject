<template>

  <body>
    <div class="container-fluid">
      <div class="row">

      <div class="submenuimage ">
          <p class="subtitle" id="subtitle">Community</p>
      </div>
              
        <!-- 탭 -->   
        <div class="container">
        <v-tabs
        centered
        color="grey darken-3"
        >
          <v-tab to="/noticeList"><b>공지사항</b></v-tab>
          <v-tab to="/itNewsList"><b>IT소식</b></v-tab>
          <v-tab to="/communityBoardList"><b>자유게시판</b></v-tab>
          <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
        </v-tabs>

          <h2 class="sub-header">IT소식</h2>
          <br>

        <!-- 버튼 -->
        <!-- <div class="container"> -->
          <v-btn  to="/itNewsForm" exact  id="st_write">
               글쓰기
           </v-btn>

          <!-- 임시버튼 -->
          <v-btn to="/itNewsView" exact  id="st_write">
               상세페이지
           </v-btn>

      <div class="overflow-auto">
        <!-- </div>     -->

    <div class="site_ect">
    <!-- /.row -->
    <div class="row site_ect_s">
    <!-- card -->
          <v-card
          class="mx-auto"
          max-width="330"
          >
          <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
          Top western road trips
          </v-card-title>

          <v-card-subtitle>
          1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
          <v-btn
          color="orange lighten-2"
          text
          >
          Explore
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
          icon
          @click="show = !show"
          >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-card-actions>

          <v-expand-transition>
          <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>

            <!-- card -->
          <v-card
          class="mx-auto"
          max-width="330"
          >
          <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
          Top western road trips
          </v-card-title>

          <v-card-subtitle>
          1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
          <v-btn
          color="orange lighten-2"
          text
          >
          Explore
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
          icon
          @click="show = !show"
          >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-card-actions>

          <v-expand-transition>
          <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>

<!-- card -->
          <v-card
          class="mx-auto"
          max-width="330"
          >
          <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
          Top western road trips
          </v-card-title>

          <v-card-subtitle>
          1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
          <v-btn
          color="orange lighten-2"
          text
          >
          Explore
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
          icon
          @click="show = !show"
          >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-card-actions>

          <v-expand-transition>
          <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>

            <!-- card -->
          <v-card
          class="mx-auto"
          max-width="330"
          >
          <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
          Top western road trips
          </v-card-title>

          <v-card-subtitle>
          1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
          <v-btn
          color="orange lighten-2"
          text
          >
          Explore
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
          icon
          @click="show = !show"
          >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-card-actions>

          <v-expand-transition>
          <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>

            <!-- card -->
          <v-card
          class="mx-auto"
          max-width="330"
          >
          <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
          Top western road trips
          </v-card-title>

          <v-card-subtitle>
          1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
          <v-btn
          color="orange lighten-2"
          text
          >
          Explore
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
          icon
          @click="show = !show"
          >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-card-actions>

          <v-expand-transition>
          <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>

            <!-- card -->
          <v-card
          class="mx-auto"
          max-width="330"
          >
          <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
          Top western road trips
          </v-card-title>

          <v-card-subtitle>
          1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
          <v-btn
          color="orange lighten-2"
          text
          >
          Explore
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
          icon
          @click="show = !show"
          >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-card-actions>

          <v-expand-transition>
          <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>

            <!-- card -->
          <v-card
          class="mx-auto"
          max-width="330"
          >
          <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
          Top western road trips
          </v-card-title>

          <v-card-subtitle>
          1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
          <v-btn
          color="orange lighten-2"
          text
          >
          Explore
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
          icon
          @click="show = !show"
          >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-card-actions>

          <v-expand-transition>
          <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>

            <!-- card -->
          <v-card
          class="mx-auto"
          max-width="330"
          >
          <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
          Top western road trips
          </v-card-title>

          <v-card-subtitle>
          1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
          <v-btn
          color="orange lighten-2"
          text
          >
          Explore
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
          icon
          @click="show = !show"
          >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-card-actions>

          <v-expand-transition>
          <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>

            <!-- card -->
          <v-card
          class="mx-auto"
          max-width="330"
          >
          <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
          ></v-img>

          <v-card-title>
          Top western road trips
          </v-card-title>

          <v-card-subtitle>
          1,000 miles of wonder
          </v-card-subtitle>

          <v-card-actions>
          <v-btn
          color="orange lighten-2"
          text
          >
          Explore
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
          icon
          @click="show = !show"
          >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          </v-card-actions>

          <v-expand-transition>
          <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>


<!-- ============================================================= -->

    </div>
    </div>        

  </div>
      
        </div>

      </div>
    </div>
  </body>

</template>

<script>
  export default {
        data: () => ({
      show: false,
    }),

  }
</script>

<style>
@import '../assets/css/BoardList.css';


</style>