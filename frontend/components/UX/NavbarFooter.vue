

<style scoped>

</style>


<template>

  <v-bottom-navigation
    v-show="getCurrentNavbarFooter && getCurrentNavbarFooter.activated"
    :id="`navbar-footer-${ settings.id }`"
    :class="`${settings.navbarFooterClass}`"
    :trigger="`${trigger}`"
    v-model="bottomNav"
    :grow="navbarFooterConfig.grow"
    :shift="navbarFooterConfig.shift"
    color="primary"
    >

    <v-btn
      v-for="(btn, index) in navbarFooterConfig.buttons"
      :key="btn.value"
      :value="btn.value"
      @click.stop="goToRef(btn)"
      >
      <span>
        {{ btn.title[ locale ]}}
      </span>
      <v-icon>
        {{ btn.icon }}
      </v-icon>
    </v-btn>


  </v-bottom-navigation>

</template>


<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    
    name: 'NavbarFooter',

    components: {
    },
    
    props : [
      'settings',
    ],

    beforeMount() {
      // set up view config
      this.navbarFooterConfig = this.getLocalConfig
      this.log && console.log('C-NavbarFooter / this.navbarFooterConfig : ', this.navbarFooterConfig)
    },
    
    mounted(){
      this.log && console.log('C-NavbarFooter / mounted ...')
    },

    watch: {
      navbarFooterConfig(next, prev){
        this.$store.commit('setCurrentNavbarFooter', next )
      },
    },

    data(){
      return {
        dataViewType : 'navbarFooters',
        navbarFooterConfig : undefined,
        bottomNav : 1, 

        // type: 'number',
        // number: 9999,
        // selector: '#scroll-with-options',
        // selected: 'Button',
        // elements: ['Button', 'Radio group'],

        duration: 300,
        offset: 0,
        easing: 'easeInOutCubic',

        // easings: Object.keys(easings),

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
        getCurrentNavbarFooter : 'getCurrentNavbarFooter',
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

      options () {
        return {
          duration: this.duration,
          offset: this.offset,
          easing: this.easing,
        }
      },

    },
    
    methods : {
      
      ...mapActions({
        // selectFromDisplayedData : 'data/selectFromDisplayedData',
      }),

      getDisplayedData( paramsArray ){
        this.log && console.log('C-NavbarFooter / getDisplayedData ...')
        let dataFromDisplayedData = this.selectFromDisplayedData( paramsArray ) 
        return dataFromDisplayedData
      },

      toggleNavbarFooter( btn ){
        this.log && console.log('C-NavbarFooter / toggleNavbarFooter / btn : ', btn)
        this.$store.commit('toggleNavbarFooterVisibility')
      },

      goToRef( btn ){

        this.log && console.log('C-NavbarFooter / goToRef / btn : ', btn)

        if (btn.action == 'scrollTo'){
        // scroll action
          this.$vuetify.goTo( btn.to, this.options)
        } 
        if ( btn.action == 'goToUrl') {
          // router action
          this.$router.push( btn.toUrl )
        }
        // let el = document.getElementById('text-text-01')
        // this.log && console.log('C-NavbarFooter / goToRef / el : ', el)
        // document.scrollTop += 10
      },

    },



  }
</script>

