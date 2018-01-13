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
                <div v-else class="mt-5">
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
              <div v-if="curPage == 'settings'">

                <img height="100px" src="http://vignette3.wikia.nocookie.net/scribblenauts/images/f/fc/Wizard_Male.png/revision/latest?cb=20130215182314" />
                <h2 class="pb-2">Team Building Wizard!</h2>
                <v-stepper v-model="e6" vertical>
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
                      <v-radio-group v-model="ex8" column>
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
                      <v-icon>check</v-icon> Prioritizing {{ ex8 }}<br />
                    </h3>
                    <v-btn v-on:click="goToTeams" class= "mt-3" round color="primary">
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
      newRatings: {},
      e6: 1,
      numberOfTeams: null,
      optionsForNumberOfTeams: [2, 3, 4],
      ex8: 'friends',
      snackbar: false,
      snack_timeout: 4000
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
    },
    goToTeams () {
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
