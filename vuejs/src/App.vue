<template>
  <div id='app'>
    <router-view></router-view>
    <!-- <v-app id='vuetify'>
      <v-toolbar app
                 fixed
                 clipped-left
                 color='primary'
                 class='elevation-2'
                 card>
        <v-toolbar-title class='white--text'>IDC Football League</v-toolbar-title>
      </v-toolbar>
      <v-content  tent class='pa-1'>
        <v-container class='pt-1'>
          <v-text-field
            name='input-1-3'
            label='Filter players'
            prepend-icon='search'
          ></v-text-field>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-card>
                <v-alert color='success' icon='check_circle' value='true'>
                  Rated
                </v-alert>
                <v-list>
                  <v-list-tile v-for='player in players' v-if='player.rating' v-bind:key='player.name'>
                    <v-list-tile-content>
                        {{ player.name }}
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <star-rating v-model='player.rating'
                                   :inline='true'
                                   :show-rating='false'
                                   :star-size='20'
                                   :max-rating='5'></star-rating>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
                <v-alert color='warning' icon='priority_high' value='true'>
                  Unrated
                </v-alert>
                <v-list>
                  <v-list-tile v-for='player in players' v-if='!player.rating' v-bind:key='player.name'>
                    <v-list-tile-content>
                      <div>
                        {{ player.name }}

                      </div>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <star-rating v-model='player.rating'
                                   :inline='true'
                                   :show-rating='false'
                                   :star-size='20'
                                   :max-rating='5'></star-rating>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-bottom-nav :value='true' :active.sync='e1' color='transparent'>
          <v-btn flat color='teal' value='players'>
            <span>Players</span>
            <v-icon>people</v-icon>
          </v-btn>
          <v-btn flat color='teal' value='rankings'>
            <span>Rankings</span>
            <v-icon>grade</v-icon>
          </v-btn>
          <v-btn flat color='teal' value='mix'>
            <span>Mix</span>
            <v-icon>shuffle</v-icon>
          </v-btn>
        </v-bottom-nav>
    </v-app> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  props: {
    source: String
  },
  data () {
    return {
      msg: 'Loco Hot',
      e1: 'recent',
      header: 'Rated Players'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
