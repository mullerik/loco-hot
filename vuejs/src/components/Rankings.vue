<template>
  <div>
    <v-app id='vuetify'>
      <v-toolbar app
                 fixed
                 clipped-left
                 color='primary'
                 class='elevation-2'
                 card>
        <v-toolbar-title class='white--text'>{{userName}} @ IDC Football League</v-toolbar-title>
      </v-toolbar>
      <v-content class='pa-0' style='margin-bottom: 70px'>
        <v-container class='pa-1'>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <div v-if="curPage == 'rankings'">
                <v-card>
                  <v-alert color='success' icon='check_circle' value='true'>
                    <v-badge color="indigo">
                      <div class="headline">Ranked</div>
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
                        inline
                        :show-rating='false'
                        :star-size='20'
                        :max-rating='5'
                        read-only
                        ></star-rating>
                      </v-list-tile-action>
                    </v-list-tile>
                  </v-list>
                  <v-alert color='warning' icon='priority_high' value='true'>
                    <div class="headline">Unranked</div>
                  </v-alert>
                  <v-list>
                    <v-list-tile v-for='player in players' v-if='!rankings.map((r)=>r.name+r.rankedBy).includes(player.name+userName) && player.name != userName' v-bind:key='player.name'>
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
                <div v-if="this.teams.length" class="mt-2">
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
                        <v-list-tile v-for="(player, i) in this.teamA" :key="i">
                          <v-list-tile-content>
                            {{ player.name }}
                          </v-list-tile-content>
                          <v-list-tile-action>
                          </v-list-tile-action>
                        </v-list-tile>
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
                <div v-else class="mt-2">
                  <v-card color="blue-grey darken-2" class="white--text">
                    <v-card-title primary-title>
                      <div class="headline">Oops...</div>
                      <div class="text-xs-left">No teams were found. Go to settings and build them!</div>
                    </v-card-title>
                    <v-fab-transition>
                      <v-btn
                        color="blue"
                        fab
                        dark
                        medium
                        absolute
                        bottom
                        right
                        v-on:click="curPage='settings'"
                      >
                        <v-icon>settings</v-icon>
                    </v-btn>
                    </v-fab-transition>
                  </v-card>
                </div>
              </div>
              <div v-if="curPage == 'friends'">
                <div v-if="this.teams.length" class="mt-2">
                  <v-card>
                    <v-alert color='success' icon='thumbs_up_down' value='true'>
                      <v-badge color="indigo">
                        <div class="headline">Friends or Foes?</div>
                      </v-badge>
                    </v-alert>
                  <v-list>
                    <v-list-tile v-for='player in players' v-if='player.name != userName' v-bind:key='player.name'>
                      <v-list-tile-content>
                        {{ player.name }}
                      </v-list-tile-content>
                      <v-btn-toggle style="box-shadow: none" v-model="toggle_mood[player.name]">
                        <v-list-tile-action style="min-width: 35px">
                          <v-btn small flat icon color="success">
                            <v-icon>mood</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                        <v-list-tile-action style="min-width: 35px">
                          <v-btn small flat icon color="warning">
                            <v-icon>sentiment_neutral</v-icon>
                          </v-btn>
                        </v-list-tile-action style="min-width: 35px">
                        <v-list-tile-action>
                          <v-btn small flat icon color="error">
                            <v-icon>mood_bad</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </v-btn-toggle>
                    </v-list-tile>
                  </v-list>
                </v-card>
                </div>
                <div v-else class="mt-2">
                  <v-card color="blue-grey darken-2" class="white--text">
                    <v-card-title primary-title>
                      <div class="headline">Oops...</div>
                      <div class="text-xs-left">No teams were found. Go to settings and build them!</div>
                    </v-card-title>
                    <v-fab-transition>
                      <v-btn
                        color="blue"
                        fab
                        dark
                        medium
                        absolute
                        bottom
                        right
                        v-on:click="curPage='settings'"
                      >
                        <v-icon>settings</v-icon>
                    </v-btn>
                    </v-fab-transition>
                  </v-card>
                </div>
              </div>
              <div v-if="curPage == 'settings'">

                <img height="100px" src="http://vignette3.wikia.nocookie.net/scribblenauts/images/f/fc/Wizard_Male.png/revision/latest?cb=20130215182314" />
                <h2 class="pb-2">Team Building Wizard!</h2>
                <v-stepper v-model="e6" vertical class="pb-2 && mb-3">
                  <v-stepper-step step="1" v-bind:complete="e6 > 1">
                    Choose # Of Teams
                  </v-stepper-step>
                  <v-stepper-content step="1">
                    <v-flex xs12>
                      <v-select
                        v-bind:items="optionsForNumberOfTeams"
                        v-model="numberOfTeams"
                        label="Number Of Teams"
                        single-line
                        bottom
                      ></v-select>
                    </v-flex>
                    <v-btn color="primary" @click.native="e6 = 2">Continue</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="2" v-bind:complete="e6 > 2">
                    Decide Who's On The Bench
                    <small>(Optional)</small>
                  </v-stepper-step>
                  <v-stepper-content step="2">
                    <v-flex xs12>
                      <v-select
                        v-bind:items="this.players.map((p) => p.name)"
                        label="Players To Exclude"
                        multiple
                        bottom
                        max-height="200"
                      ></v-select>
                    </v-flex>
                    <v-btn color="primary" @click.native="e6 = 3">Continue</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="3" v-bind:complete="e6 > 3">Give Priority To
                    <small>What's the most important aspect?</small>
                  </v-stepper-step>
                  <v-stepper-content step="3">
                    <v-flex xs14 sm6 md6>
                      <v-radio-group v-model="priority" column>
                        <v-radio label="Friends"
                          color="primary"
                          value="friends">
                          <v-icon>add</v-icon>
                        </v-radio>
                        <v-radio label="Ranking"
                          color="secondary"
                          value="ranking"></v-radio>
                        <v-radio label="Score"
                          color="success"
                          value="score"></v-radio>
                        <v-radio label="Random"
                          color="info"
                          value="shuffle"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-btn color="primary" @click.native="e6 = 4">Continue</v-btn>
                  </v-stepper-content>
                  <v-stepper-step step="4">Summary</v-stepper-step>
                  <v-stepper-content step="4">
                    <h3 class="text-xs-left">
                      <v-icon>check</v-icon>{{ numberOfTeams }} Teams<br />
                      <v-icon>check</v-icon>Excluding Nobody <br />
                      <v-icon>check</v-icon> Prioritizing {{ priority }}<br />
                    </h3>
                    <v-btn v-on:click="buildTeams" class= "mt-3" round color="primary">
                      Build
                      <v-icon right>build</v-icon>
                    </v-btn>
                  </v-stepper-content>
                </v-stepper>
                <v-snackbar
                  :timeout="snack_timeout"
                  bottom
                  vertical
                  multi-line
                  v-model="snackbar"
                >
                  Building Teams.<br />
                  This might take a few seconds.
                  <v-progress-linear v-bind:indeterminate="true"></v-progress-linear>
                </v-snackbar>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-bottom-nav shift
                    fixed
                    :value='true'
                    :active.sync='curPage'
                    color='white'>
          <v-btn flat color='teal' value='rankings'>
            <span>Rankings</span>
            <v-icon>grade</v-icon>
          </v-btn>
          <v-btn flat color='teal' value='friends'>
            <span>Friends</span>
            <v-icon>people</v-icon>
          </v-btn>
          <v-btn flat color='teal' value='settings'>
            <span>Settings</span>
            <v-icon>settings</v-icon>
          </v-btn>
          <v-btn flat color='teal' value='teams'>
            <span>Teams</span>
            <v-icon>call_split</v-icon>
          </v-btn>
        </v-bottom-nav>
    </v-app>
  </div>
</template>


<script>
import _ from 'lodash'
import {db} from '../firebase'
const shuffleArray = arr => arr.sort(() => Math.random() - 0.5)
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
      newRatings: {},
      e6: 1,
      numberOfTeams: null,
      optionsForNumberOfTeams: [2, 3, 4],
      priority: 'friends',
      snackbar: false,
      snack_timeout: 4000,
      toggle_mood: {}
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
      this.newRatings[name] = 0
    },
    resetTeams () {
      this.$firebaseRefs.teams.remove()
    },
    buildTeams () {
      let teamA = []
      let teamB = []
      let overallRankgins = {}
      // Initialize overallRankings with all player names
      this.players.forEach((p) => {
        overallRankgins[p.name] = []
      })
      // Push rankings by name
      this.rankings.map((r) => {
        overallRankgins[r.name].push(r.ranking)
      })
      // Calculate average
      Object.keys(overallRankgins).map((k) => {
        let sum = _.sum(overallRankgins[k])
        let len = overallRankgins[k].length
        if (!len) {
          overallRankgins[k] = 2.5
        } else {
          overallRankgins[k] = +(sum / len).toFixed(2)
        }
      })
      let toggleTeam = (curTeam) => {
        if (curTeam === teamA) {
          return teamB
        } else {
          return teamA
        }
      }
      overallRankgins = Object.entries(overallRankgins).sort((a, b) => b[1] - a[1])
      if (this.priority === 'shuffle') {
        overallRankgins = shuffleArray(overallRankgins)
      }
      let turn = 1
      let teams = [teamA, teamB]
      let curTeam = teams[1]
      teamA.push({'name': overallRankgins[0][0]})
      for (var i = 1; i < overallRankgins.length; i++) {
        curTeam.push({'name': overallRankgins[i][0]})
        if (!turn) {
          curTeam = toggleTeam(curTeam)
        }
        turn = 1 - turn
      }
      this.$firebaseRefs.teamA.set(teamA)
      this.$firebaseRefs.teamB.set(teamB)
      this.snackbar = true
      setTimeout(() => {
        this.curPage = 'teams'
        this.e6 = 1
      }, 5000)
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
