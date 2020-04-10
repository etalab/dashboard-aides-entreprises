

<style scoped>

</style>


<template>

  <div>
    Numbers- settings.id : {{ settings.id  }}
  </div>

</template>


<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    
    name: 'Numbers',

    components: {
    },
    
    props : [
      'settings',
    ],

    mounted(){
      this.log && console.log('C-Numbers / mounted ...')
    },

    watch: {
    },

    data(){
      return {
        dataViewType : 'numbers',
        viewConfig : undefined,
      }
    },

    computed: {

      ...mapState({
        log : state => state.log, 
        locale : state => state.locale,
      }),

      ...mapGetters({
        getCurrentLocale : 'getCurrentLocale',
      }),

    },
    
    methods : {

    },



  }
</script>

