<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Bar, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

@Component({
  extends: Bar,
  mixins: [reactiveProp],
})
export default class TaskCountChart extends Vue<Bar> {
    @Prop({ type: Object })
    public chartdata!: any;

    @Prop({ type: Object })
    public options!: any;

    age = 0;

    constructor(props: any) {
      super(props);
      this.age = 0;
    }

    mounted() {
      console.log(this.chartdata);
      this.renderChart(this.chartdata, this.options);
    }
}
</script>
