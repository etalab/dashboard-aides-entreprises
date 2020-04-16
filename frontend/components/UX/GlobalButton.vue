

<style scoped>

</style>


<template>

  <v-container 
    :id="`globalButton-${ settings.id }`" 
    :class="`${settings.containerClass}`"
    :trigger="`${trigger}`"
    >

    <!-- 
    <div>
      text- settings.id : {{ settings.id  }} test
    </div> 
    -->

    <!-- 
    <code>
      {{ viewConfig }}
    </code> 
    -->

    <v-divider
      v-if="viewConfig.dividers.before"
      >
    </v-divider>

    <v-row 
      :class="`${viewConfig.btnsRowClass}`"
      >

      <!-- <div
        > -->

        <v-btn 
          v-for="(btn, index) in viewConfig.componentButtons"
          :key="'B'+btn.id+index"
          :id="'B'+btn.id+index"
          :class="btn.btnClass"
          :block="btn.block"
          :icon="btn.icon"
          :outlined="btn.outlined"
          :fab="btn.fab"
          :color="btn.color"
          :large="btn.large"
          :small="btn.small"
          :dark="btn.dark"
          :tile="btn.tile"
          :rounded="btn.rounded"
          :disabled="btn.disabled"
          @click="runBtnFunctions( btn )"
          >
          {{ btn.title[ locale ] }}
        </v-btn>

      <!-- </div> -->

    </v-row>
  
    <v-divider
      v-if="getLocalConfig.dividers.after"
      >
    </v-divider>

  </v-container>


</template>


<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    
    name: 'GlobalButton',

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
      this.log && console.log('C-GlobalButton / mounted ...')
    },

    watch: {
    },

    data(){
      return {
        dataViewType : 'globalButtons',
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
        selectFromDisplayedData : 'data/selectFromDisplayedData',
        getSpecialStore : 'data/getSpecialStore',
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

      ...mapActions({
        // selectFromDisplayedData : 'data/selectFromDisplayedData',
      }),

      getDisplayedData( paramsArray ){
        this.log && console.log('C-GlobalButton / getDisplayedData ...')
        let dataFromDisplayedData = this.selectFromDisplayedData( paramsArray ) 
        return dataFromDisplayedData
      },

      runBtnFunctions(btn){
        this.log && console.log('C-GlobalButton / runBtnFunctions / btn : ', btn)
      }

    },



  }
</script>

