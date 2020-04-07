

<style scoped>

</style>


<template>

    <v-footer
      :fixed="fixed"
      app
      >

      <span>&copy; {{ new Date().getFullYear() }}</span>

      -{{ locale }}

    </v-footer>


</template>


<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    
    name: 'Footer',

    components: {
    },

    props : [
    ],

    mounted(){
      this.log && console.log('C-Footer / mounted ...')
    },

    watch: {
    },

    data(){
      return {
        fixed: false,
      }
    },

    computed: {

      ...mapState({
        log : state => state.log, 
        locale : state => state.locale,

        fixed : state => state.navbar.fixed, 
      }),

      ...mapGetters({
        getCurrentLocale : 'getCurrentLocale'
      }),

    },

    methods : {

    },



  }

</script>

