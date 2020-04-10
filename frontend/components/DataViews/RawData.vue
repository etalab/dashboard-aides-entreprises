

<style scoped>

</style>


<template>

  <div>
    RawData- settings.id : {{ settings.id  }}
  </div>

</template>


<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    
    name: 'RawData',

    components: {
    },
    
    props : [
      'settings',
    ],

    mounted(){
      this.log && console.log('C-RawData / mounted ...')
    },

    watch: {
    },

    data(){
      return {
        dataViewType : 'rawdatas',
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

