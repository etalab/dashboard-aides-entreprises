

<style scoped>

</style>


<template>

  <v-container 
    v-show="canShow"
    :id="`text-${ settings.id }`" 
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
        :class="`${col.colClass}`"
        :cols="col.cols"
        >

        <!-- TITLE -->
        <v-layout 
          :class="`justify-center`"
          >

          <!-- TEXT TITLE -->
          <h3
            :class="`${col.colTitleClass} ${ isMobileWidth ? 'mb-0' : ''}`"
            >
            {{ col.colTitle[ locale ] }}
          </h3>

          <!-- TEXT FROM DISPLAYED DATA -->
          <p 
            :class="`${col.textClass} ${ isMobileWidth ? 'mb-0' : ''}`"
            >
            <span
              v-html="col.textPrefix[ locale ]">
            </span>

            <span
              v-if="col.specialStoreId"
              :class="`${col.specialStoreIdClass}`"
              >
              {{ getSpecialStore[ col.specialStoreId ] }}
            </span>

            <span
              v-html="col.textSuffix[ locale ]">
            </span>

          </p> 
    
        </v-layout>


        <!-- CONTENTS -->
        <template
          v-if="col.textsHtml"
          >
          <v-layout 
            v-for="(txt, idx) in col.textsHtml"
            :key="idx"
            :class="`${txt.textClass}`"
            >

            <!-- TEXT FROM DISPLAYED DATA -->
            <div
              v-if="!txt.fromUrl[ locale ]"
              >
              <p>
                <span
                  v-if="txt.textContent"
                  v-html="txt.textContent[ locale ]">
                </span>
              </p> 
            </div>


            <!-- TEXT FROM DISTANT HTML FILE -->
            <div
              v-show="txt.fromUrl[ locale ]"
              >
              <p>
                <RawHtml
                  :templateURL="txt.fromUrl[ locale ]">
                </RawHtml>
                <!-- <span
                  v-html="getHtmlContent( txt.id )">
                </span> -->
              </p> 

              <!-- rawHtmls : {{ rawHtmls }}  -->

            </div>


          </v-layout>
        </template>

        
      </v-col>

    </v-row>


    <v-divider
      v-if="getLocalConfig.dividers.after"
      >
    </v-divider>

  </v-container>


</template>


<script>

  import axios from 'axios'
  
  import { mapState, mapGetters, mapActions } from 'vuex'

  import RawHtml from '~/components/DataViews/RawHtml.vue'

  export default {
    
    name: 'TextFrame',

    components: {
      RawHtml,
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
      // this.getRawHtmls()
    },

    watch: {
    },

    data(){
      return {
        dataViewType : 'texts',
        viewConfig : undefined,
        rawHtmls : {},
        errorHtml : '<br><br>there is an <strong> Error </strong><br><br>',
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
        getCurrentBreakpoint : 'getCurrentBreakpoint',
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

      canShow(){
        let bool = true
        let noShowArray = this.viewConfig && this.viewConfig.notShowFor 
        if ( noShowArray ) {
          let bool = noShowArray.includes(this.getCurrentBreakpoint)
        }
        return bool
      },

      isMobileWidth() {
        let breakpoints = [ 'xs', 'sm' ] 
        let currentBreakpoint = this.$vuetify.breakpoint.name
        return breakpoints.includes( currentBreakpoint )
      },

    },
    
    methods : {

      ...mapActions({
        // selectFromDisplayedData : 'data/selectFromDisplayedData',
      }),

      getDisplayedData( paramsArray ){
        this.log && console.log('C-TextFrame / getDisplayedData ...')
        let dataFromDisplayedData = this.selectFromDisplayedData( paramsArray ) 
        return dataFromDisplayedData
      },

      getRawHtmls(){
        // this.log && console.log('C-TextFrame / getRawHtmls / this.viewConfig ', this.viewConfig)
        for ( let row of this.viewConfig.componentRows ){
          for ( let col of row.columns ){
            // this.log && console.log('C-TextFrame / getRawHtmls / col ', col)
            if ( col.textsHtml ){
              for ( let refText of col.textsHtml ){

                // this.log && console.log('C-TextFrame / getRawHtmls / refText ', refText)
                // let urlRefs = refText.filter( r => r.fromUrl )
                let urlRefs = refText.fromUrl

                // this.log && console.log('C-TextFrame / getRawHtmls / urlRefs ', urlRefs)
                this.getRawHtml( refText.id, urlRefs )

              }
            }
          }
        }
      },

      getRawHtml( id, urlRef ){
        
        // here we go fetch the raw HTML content of a webpage
        this.log && console.log('C-TextFrame / getRawHtml / id : ', id) 
        this.log && console.log('C-TextFrame / getRawHtml / urlRef : ', urlRef) 

        let promisesArray = [ ]

        for (let loc in urlRef){

          this.log && console.log('C-TextFrame / getRawHtml / loc : ', loc)
          
          let rawHtmls = this.rawHtmls
          
          // let contentContainer = {}
          // contentContainer[ id ] = ''

          let textContainer = {}
          textContainer[ loc ] = ''
          let rawHtml = ''

          let url = urlRef[ loc ]
          this.log && console.log('C-TextFrame / getRawHtml / url : ', url)

          let rawHtmls_texts = this.rawHtmls[ id ] ? this.rawHtmls[ id ] : textContainer
          this.log && console.log('C-TextFrame / getRawHtml / rawHtmls_texts : ', rawHtmls_texts)

          if (url){
            let head = {
              headers: {
                'accept' : 'text/html',
              }
            }
            let prom = axios.get(url, head)
            .then( (resp) => {
              
              // this.log && console.log('C-TextFrame / getRawHtml / resp : ', resp)

              rawHtml = (resp && resp.data) ? resp.data : this.errorHtml
              this.log && console.log('C-TextFrame / getRawHtml / rawHtml : \n', rawHtml)
              
              textContainer[ loc ] = rawHtml
              this.log && console.log('C-TextFrame / getRawHtml / textContainer : \n', textContainer)
              
              rawHtmls[ id ] = textContainer 
              this.log && console.log('C-TextFrame / getRawHtml / this.rawHtmls : \n', this.rawHtmls)
            })
            .catch( (err) => { 
              this.log && console.log('C-TextFrame / getRawHtml / err : ', err)
              rawHtml = this.errorHtml
              // this.rawHtmls[ id ] = this.rawHtmls[ id ] ? textContainer : textContainer
            })
            promisesArray.push( prom )
          }
        }
        return Promise.all( promisesArray )

      },

      getHtmlContent( id ){
        let raw = this.rawHtmls[ id ] ? this.rawHtmls[ id ][ this.locale ] : ''
        return raw
      },

    }



  }
</script>

