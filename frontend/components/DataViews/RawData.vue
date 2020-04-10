

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

    beforeMount() {
      // set up view config
      this.viewConfig = this.getLocalConfig
    },

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

