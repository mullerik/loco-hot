<template>
  <div>
    <v-app id='vuetify'>
      <v-toolbar app
                 fixed
                 clipped-left
                 color='primary'
                 class='elevation-2'
                 card>
        <v-toolbar-title class='white--text'>IDC Football League</v-toolbar-title>
      </v-toolbar>
      <v-content class='pa-0'>
        <v-container class='pa-1'>
          <!-- <v-text-field
            name='input-1-3'
            label='Filter players'
            prepend-icon='search'
          ></v-text-field> -->
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <div v-if="curPage == 'rankings'">
                <h2>Hi {{ userName }}</h2>
                <v-card>
                  <v-alert color='success' icon='check_circle' value='true'>
                    <v-badge color="indigo">
                      Rated
                    </v-badge>
                  </v-alert>
                  <v-list>
                    <v-list-tile v-for='ranking in this.rankings' v-if='ranking.rankedBy === userName' v-bind:key='ranking.name'>
                      <v-list-tile-content>
                        {{ ranking.name }}
                      </v-list-tile-content>
                      <v-icon v-on:click="clearRanking(ranking.name, ranking.ranking)" color="red lighten-1">clear</v-icon>
                      <v-list-tile-action>
                        <star-rating v-model='ranking.ranking'
                        :inline='true'
                        :show-rating='false'
                        :star-size='20'
                        :max-rating='5'
                        ></star-rating>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                  <v-alert color='warning' icon='priority_high' value='true'>
                    Unrated
                  </v-alert>
                  <v-list>
                    <v-list-tile v-for='player in players' v-if='!rankings.map((r)=>r.name).includes(player.name) && player.name != userName' v-bind:key='player.name'>
                      <v-list-tile-content>
                        <div>{{ player.name }}</div>
                      </v-list-tile-content>
                      <v-list-tile-action v-on:click="addRanking(player.name, newRatings[player.name], userName)">
                        <star-rating v-model="newRatings[player.name]"
                        :inline='true'
                        :show-rating='false'
                        :star-size='20'
                        :max-rating='5'
                        ></star-rating>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </div>
              <div v-if="curPage == 'teams'">
                <div v-if="this.teams.length">
                  <v-card>
                    <v-alert color='success' value='true'>
                      <v-badge color="indigo">
                        <div class="headline">Start Playing!</div>
                      </v-badge>
                    </v-alert>
                  </v-card>
                  <v-expansion-panel popout>
                    <v-expansion-panel-content>
                      <div slot="header">TeamA</div>
                      <v-card>
                        <v-list>
                          <v-list-tile v-for="(player, i) in this.teamA" :key="i">
                            <v-list-tile-content>
                              {{ player.name }}
                            </v-list-tile-content>
                            <v-list-tile-action>
                            </v-list-tile-action>
                          </v-list-tile>
                        </v-list>
                      </v-card>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content>
                      <div slot="header">TeamB</div>
                      <v-card>
                        <v-list>
                          <v-list-tile v-for="(player, i) in this.teamB" :key="i">
                            <v-list-tile-content>
                              {{ player.name }}
                            </v-list-tile-content>
                            <v-list-tile-action>
                            </v-list-tile-action>
                          </v-list-tile>
                        </v-list>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                  <v-btn v-on:click="resetTeams" round color="red" dark>Reset Teams
                    <v-icon dark right>clear</v-icon>
                  </v-btn>
                </div>
                <div v-else>
                  <v-card color="blue-grey darken-2" class="white--text">
                    <v-card-title primary-title>
                      <div class="headline">Oops...</div>
                      <div>No teams were found. Go to settings and build them!</div>
                    </v-card-title>
                    <v-fab-transition>
                      <v-btn
                        color="blue"
                        fab
                        dark
                        small
                        absolute
                        bottom
                        left
                      >
                        <v-btn flat v-on:click="curPage='settings'">
                          <v-icon>settings</v-icon>
                        </v-btn>
                      </v-btn>
                    </v-fab-transition>
                  </v-card>
                </div>
              </div>
              <v-card v-if="curPage == 'settings'">
                <h1>Settings</h1>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-bottom-nav shift
                    :value='true'
                    :active.sync='curPage'
                    color='white'>
          <v-btn flat color='teal' value='teams'>
            <span>Teams</span>
            <v-icon>people</v-icon>
          </v-btn>
          <v-btn flat color='teal' value='rankings'>
            <span>Rankings</span>
            <v-icon>grade</v-icon>
          </v-btn>
          <v-btn flat color='teal' value='settings'>
            <span>Settings</span>
            <v-icon>settings</v-icon>
          </v-btn>
        </v-bottom-nav>
    </v-app>
  </div>
</template>


<script>
// import _ from 'lodash'
import {db} from '../firebase'
export default {
  name: 'Rankings',
  firebase: {
    leagues: {
      source: db.ref('leagues')
    },
    players: {
      source: db.ref('players')
    },
    rankings: {
      source: db.ref('rankings')
    },
    teamA: {
      source: db.ref('teams/0')
    },
    teamB: db.ref('teams/1'),
    teams: db.ref('teams')
  },
  data () {
    return {
      curPage: 'rankings',
      userName: this.$route.query.userName,
      newRatings: {}
    }
  },
  computed: {},
  methods: {
    addRanking (name, ranking, rankedBy) {
      this.$firebaseRefs.rankings.push({name: name, ranking: ranking, rankedBy: rankedBy})
    },
    clearRanking (name, ranking) {
      let key = this.rankings.filter((r) => r.name === name && r.ranking === ranking && r.rankedBy === this.userName)[0]['.key']
      this.$firebaseRefs.rankings.child(key).remove()
      console.log(key)
    },
    resetTeams () {
      this.$firebaseRefs.teams.remove()
    },
    createTeam () {
      this.$firebaseRefs.teamA.set([{'name': 'Arik'}])
      // this.$firebaseRefs.teamA.push({'name': 'Arik'}, {'name': 'Sapir'})
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
#create .speed-dial {
  position: absolute;
}

#create .btn--floating {
  position: relative;
}
</style>
