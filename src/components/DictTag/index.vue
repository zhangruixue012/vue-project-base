<template>

  <template v-for="(item, index) in options">
    <template v-if="values.includes(item.value)">
      <span
          v-if="item.elTagType == ''"
          :key="item.value"
          :index="index"
          :class="item.elTagClass"
      >{{item.label}}</span>

      <el-tag
          v-else
          :disable-transitions="true"
          :type="item.elTagType === 'primary' ? '' : item.elTagType"
          :index="item.value"
          :key="item.value + ''"
          :class="item.elTagClass"
      >{{ item.label }}
      </el-tag>
    </template>
  </template>

</template>


<script setup>

const props = defineProps({
  options: {
    type: Array,
    default: []
  },
  value: [Number, String, Array]
});

const values = computed(() => {
  if (props.value !== null && typeof props.value !== 'undefined') {
    return Array.isArray(props.value) ? props.value : [String(props.value)];
  } else {
    return []
  }
})

</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
