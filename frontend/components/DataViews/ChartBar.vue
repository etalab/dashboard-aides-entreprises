<script>
import { Bar, mixins } from "vue-chartjs"
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: ["optionsSettings"],
  mounted() {
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scaleShowLabels: false,
      scales: {
        xAxes: [
          {
            ticks: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            id: "montants",
            type: "linear",
            position: "left",
            ticks: {
              beginAtZero: true,
              callback: (label, index, labels) => {
                return `${label / 1000 / 1000} M€`
              },
            },
          },
          {
            id: "nombres",
            type: "linear",
            position: "right",
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    }
    this.renderChart(this.chartData, options)
  },
}
</script>

<style></style>
