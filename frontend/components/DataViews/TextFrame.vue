

<style scoped>

</style>


<template>

  <div>
    TextFrame- settings.id : {{ settings.id  }}
  </div>

</template>


<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    
    name: 'TextFrame',

    components: {
    },
    
    props : [
      'settings',
    ],

    mounted(){
      this.log && console.log('C-TextFrame / mounted ...')
    },

    watch: {
    },

    data(){
      return {
        dataViewType : 'texts',
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

