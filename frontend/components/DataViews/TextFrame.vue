

<style scoped>

</style>


<template>


  <div 
    :id="`text-${ settings.id }`" 
    :class="``"
    >

    <!-- 
    <div>
      text- settings.id : {{ settings.id  }} test
    </div> 
    -->

    <!-- 
    <code>
      {{ getLocalConfig }}
    </code> 
    -->

    <v-divider
      v-if="getLocalConfig.dividers.before"
      >
    </v-divider>

    <v-row
      v-for="(row, index) in getLocalConfig.componentRows"
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

        <div 
          :class="`text-center`"
          >

          <!-- TEXT TITLE -->
          <h3
            :class="``"
            >
            {{ col.colTitle[ locale ] }}
          </h3>

          <!-- TEXT FROM DISPLAYED DATA -->
          <p 
            :class="``"
            >
            {{ col.textPrefix[ locale ] }}
            {{ getDisplayedData( col.displayedData ) }}
            {{ col.textSuffix[ locale ] }}
            
          </p> 


        </div>

      </v-col>

    </v-row>

  
    <v-divider
      v-if="getLocalConfig.dividers.after"
      >
    </v-divider>

    <br>

  </div>


</template>


<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    
    name: 'TextFrame',

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
        getDataViewConfig : 'getDataViewConfig',
        selectFromDisplayedData : 'data/selectFromDisplayedData',
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
        this.log && console.log('C-Numbers / getDisplayedData ...')
        let dataFromDisplayedData = this.selectFromDisplayedData( paramsArray ) 
        return dataFromDisplayedData
      },

    },



  }
</script>

