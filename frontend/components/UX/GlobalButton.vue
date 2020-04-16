

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
      v-for="(row, index) in viewConfig.componentRows"
      :key="'R'+index"
      :id="'R'+index"
      >

      <v-col
        v-for="(col, i) in row.columns"
        :key="'R'+index+'-C'+i"
        :id="'R'+index+'-C'+i"
        :class="`${col.colClass} ${ col.positionFixed ? '' : '' }`"
        :cols="col.cols"
        >

        <v-layout 
          :class="`justify-center`"
          >

          <!-- TEXT TITLE -->
          <h3
            :class="``"
            >
            {{ col.colTitle[ locale ] }}
          </h3>

          <!-- TEXT FROM DISPLAYED DATA -->
          <p 
            :class="`${col.textClass}`"
            >
            globalButton            
          </p> 

          <!-- <code>
            specialStore[ 'levelname']  : 
            {{ getSpecialStore[ 'levelname' ] }}
          </code>  -->
    
        </v-layout>

      </v-col>

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
        dataViewType : 'globalButton',
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

    },



  }
</script>

