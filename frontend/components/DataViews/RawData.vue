

<style scoped>

</style>


<template>

  <v-container
    :id="`rawdata-${ settings.id }`"
    :class="``"
    :trigger="`${trigger}`"
    >

    <v-layout>

      RawData- settings.id : {{ settings.id  }}

    </v-layout>

  </v-container>

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
        trigger : state => state.data.triggerChange,
      }),

      ...mapGetters({
        getCurrentLocale : 'getCurrentLocale',
        getDataViewConfig : 'getDataViewConfig',
        windowSize : 'getWindowsSize',
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

