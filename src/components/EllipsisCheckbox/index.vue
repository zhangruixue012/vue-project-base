<template>
  <label class="out-tooltip-checkbox" @mouseout="mouseover" @mouseover="mouseover">
    <el-tooltip effect="dark" :content="label" :value="isShowTooltip" placement="top-start" manual>
      <el-checkbox ref="checkbox"
                   :label="value"
                   v-model="myChecked"
                   @change="$emit('change', $event)">{{label}}</el-checkbox>
    </el-tooltip>

    <span ref="hidden" style="position:absolute;left: -100000px;">
      <span class="el-checkbox__inner"></span>
      <span class="el-checkbox__label">
        {{ label }}
      </span>
    </span>

  </label>
</template>

<script>
export default {
  name: 'out-tooltip-checkbox',
  model: {
    prop: 'checked',
    event: 'v-model'
  },
  props: {
    // 整个checkbox的宽度，可设置px/%，默认200px
    width: {
      type: String,
      default: '200px'
    },
    // checkbox的文本
    label: {
      default: ''
    },

    // checkbox选中的值
    value: {
      default: ''
    },
    // 是否选中
    checked: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      isShowTooltip: false
    };
  },
  computed: {
    myChecked: {
      get() {
        return this.checked
      },
      set(v) {
        this.$emit('v-model', v)
      }
    }
  },
  created() {},
  mounted() {

  },
  methods: {
    mouseover(e) {
      if (e.type === 'mouseout') {
        return this.isShowTooltip = false
      }

      let hiddenLength = this.$refs.hidden.offsetWidth
      let checkboxLength = this.$refs.checkbox.$el.offsetWidth

      this.isShowTooltip = hiddenLength > checkboxLength
    }
  },
};
</script>

<style lang="scss">

.out-tooltip-checkbox {
  margin-right: 20px;
  .el-checkbox__label {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

</style>

<style lang="scss">


</style>
