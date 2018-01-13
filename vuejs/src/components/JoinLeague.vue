<template>
  <div>
    <h1>LocoHot!</h1>
    <v-app id='inspire'>
      <v-card color='white' flat>
        <v-card-text>
          <v-container fluid>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  name='input-2'
                  label='Enter Your Name'
                  prepend-icon='person'
                  v-model='userName'
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-select
                  v-bind:items='leagues'
                  label='Choose Your League'
                  item-value='text'
                  prepend-icon='group'
                  v-model='chosenLeague'
                ></v-select>
              </v-flex>
            </v-layout>
            <v-alert v-if="credentialsProblem" color="error" icon="warning" value="true">
              Check your credentials.
            </v-alert>
            <v-btn
              color='secondary'
              :loading='loading'
              @click.native="loader = 'loading'"
              :disabled='loading || (!userName || !this.chosenLeague)'
            >
              Join Now!
            </v-btn>
          </v-container>
        </v-card-text>
      </v-card>
  </v-app>
  </div>
</template>


<script>
import {db} from '../firebase'
export default {
  name: 'JoinLeague',
  firebase: {
    allPlayers: db.ref('players')
  },
  data () {
    return {
      loader: null,
      loading: false,
      userName: null,
      chosenLeague: null,
      leagues: [
        'IDC Gaming League',
        'Israeli Premier League',
        'Likudiada',
        'Competitive Ballroom Dancing'
      ],
      credentialsProblem: false
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]
      let newUserName = this.userName.charAt(0).toUpperCase() + this.userName.slice(1)
      let found = this.allPlayers.some((el) => el.name === newUserName)
      if (!found) {
        console.log('Creating user')
        this.$firebaseRefs.allPlayers.push({name: newUserName})
      }
      setTimeout(() => {
        this[l] = false
        this.$router.push({path: '/rankings', query: {userName: newUserName}})
      }, 2000)
      this.loader = null
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
</style>
