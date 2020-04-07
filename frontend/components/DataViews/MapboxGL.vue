

<style scoped>

</style>


<template>

  <div>
  </div>

</template>


<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    
    name: 'MapboxGL',

    components: {
    },
    
    props : [
    ],

    mounted(){
      this.log && console.log('C-MapboxGL / mounted ...')
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
      }),

      ...mapGetters({
        getCurrentLocale : 'getCurrentLocale'
      }),

    },
    
    methods : {

    },



  }
</script>

