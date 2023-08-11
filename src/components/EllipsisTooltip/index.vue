<template>
  <el-tooltip
    ref="tlp"
    :content="content"
    effect="dark"
    manual
    popper-class="custom-tooltip"
    :value="tooltipFlag"
    :placement="placement"
  >
    <div class="tooltip-content" :style="{ maxWidth }" @mouseover="onMouseOver()" @mouseout="onMouseOut" :ref="refStr">
      <slot />
    </div>
  </el-tooltip>
</template>


<script>
export default {
  name: "EllipsisTooltip",
  props: {
    refStr: { type: String, default: "" },
    placement: { type: String, default: "top" },
    content: { type: String, default: "" },
    maxWidth: { type: String, default: "" }
  },
  data() {
    return {
      tooltipFlag: false
    };
  },
  methods: {
    onMouseOver() {
      const toolTipTag = this.$refs[this.refStr];
      if (toolTipTag) {
        const parentWidth = toolTipTag.offsetWidth; // 获取元素父级可视宽度
        const contentWidth = toolTipTag.childNodes[0].offsetWidth; // 获取元素可视宽度
        this.tooltipFlag = contentWidth > parentWidth;
      }
    },
    onMouseOut() {
      this.tooltipFlag = false;
    }
  }
}
</script>

<style scoped>
.tooltip-content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
