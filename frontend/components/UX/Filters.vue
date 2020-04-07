

<style scoped>

</style>


<template>

  <div>
  </div>

</template>


<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    
    name: 'Filters',

    components: {
    },
    
    props : [
    ],

    mounted(){
      this.log && console.log('C-Filters / mounted ...')
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

