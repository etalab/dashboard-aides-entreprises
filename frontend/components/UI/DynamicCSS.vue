<template>
  <div>


    <style type="text/css">


    </style>


  </div>
</template>



<script>

import { mapState, mapGetters } from 'vuex'

export default {

  components: {
  },

  data () {
    return {

    }
  },

  beforeMount (){
    // this.log && console.log('\nC-DynamicCSS.vue / beforeMount...')
  },

  mounted (){
    this.log && console.log('C-DynamicCSS.vue / mounted...')
  },

  computed: {

    ...mapState({
      locale : state => state.locale,
    }),

    ...mapGetters({
      locale : 'getCurrentLocale',
    })
  },

  methods: {
  }

}

</script>