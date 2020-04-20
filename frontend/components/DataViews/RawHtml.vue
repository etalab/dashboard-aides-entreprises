<template>
  <span v-html="rawHtml" />
</template>

<script>
import { mapState, mapGetters } from "vuex"

import axios from "axios"

export default {
  name: "TextFrame",

  props: ["templateURL"],

  data: () => {
    return {
      rawHtml: "",
      errorRawHtml: "-",
      // errorRawHtml : '<br><br>there was an <strong> error </strong> getting the distant html<br><br>',
      head: {
        baseURL: "https://raw.githubusercontent.com/",
        headers: {
          // 'Access-Control-Allow-Origin': '*',
          accept: "text/html",
        },
      },
    }
  },

  watch: {
    templateURL(next, prev) {
      this.getRawHtml(next)
    },
  },

  computed: {
    ...mapState({
      log: (state) => state.log,
      breakpoint: (state) => state.breakpoint,
    }),
  },

  mounted() {
    // this.log && console.log('\nC-RawHtml / mounted... ')

    // here we go fetch the raw HTML content of a webpage
    let templateUrl = this.templateURL ? this.templateURL : ""
    // this.log && console.log('C-RawHtml / mounted / template_url : ', template_url)

    this.getRawHtml(templateUrl)
  },

  methods: {
    getRawHtml(templateUrl) {
      let raw_html = ""

      if (templateUrl && templateUrl != "") {
        axios
          .get(templateUrl, this.head)
          .then((response) => {
            this.rawHtml =
              response && response.data
                ? response.data
                : "<br><br>there is an Error <br><br>"
          })
          .catch((err) => {
            console.log(err)
            this.rawHtml = this.errorRawHtml
          })
      }
    },
  },
}
</script>
