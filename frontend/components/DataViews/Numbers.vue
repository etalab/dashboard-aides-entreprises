

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

    beforeMount() {
      // set up view config
      this.viewConfig = this.getLocalConfig
    },
    
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
        getDataViewConfig : 'getDataViewConfig'
      }),

      // config
      getLocalConfig(){
        let viewId = {
          dataViewType : this.dataViewType,
          id : this.settings.id,
        }
        let localConfig = this.getDataViewConfig( viewId )
        return localConfig
      },

    },
    
    methods : {

    },



  }
</script>

