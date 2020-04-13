

<style scoped>

</style>


<template>

  <v-container
    :id="`numbers-${ settings.id }`"
    :class="``"
    >

    <!-- 
    <div>
      Numbers- settings.id : {{ settings.id  }} test
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

        <v-layout
          :class="`d-flex justify-center`"
          >

          <!-- NUMBER TITLE -->
          <h3
            :class="``"
            >
            {{ col.colTitle[ locale ] }}
          </h3>

          <!-- NUMBER FROM DISPLAYED DATA -->
          <p 
            :class="``"
            >
            <!-- <code> -->
            {{ getDisplayedData( col.displayedData).join(' ') }}
            {{ col.unit[ locale ] }}
            <!-- </code> -->
          </p> 

          <!-- NUMBER LEGEND -->
          <h4
            :class="``"
            >
            {{ col.legend[ locale ] }}
          </h4>

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

