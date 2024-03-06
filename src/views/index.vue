<template>
  <div class="index-vue">

    <div ref="chinaMap" class="china-map"></div>

  </div>
</template>


<script setup>
import * as echarts from "echarts"
import chinaJSON from '../assets/json/china.json'


const chinaMap = ref();
const historyList = ref([]);
let myChart = {}
const timeFn = null;

const options = ref({
  geo: {
    map: 'china', //地图类型。
    zoom: 1,
    roam: true,
    animation: false,
    itemStyle: {
      // 区域样式
      areaColor: {
        type: "radial",
        x: 0.5,
        y: 0.5,
        r: 0.8,
        colorStops: [
          {
            offset: 0,
            color: "rgba(147, 235, 248, 1)", // 0% 处的颜色
          },
          {
            offset: 1,
            color: "rgba(2, 99, 206, 1)", // 100% 处的颜色
          },
        ],
        globalCoord: false, // 缺省为 false
      },
      shadowColor: "#105781", //地图区域的阴影颜色。
      shadowOffsetX: 0,
      shadowOffsetY: 10,
    },
  },
  series: [
    {
      name: "map",
      type: "map", // 地图
      map: "china", // 加载注册的地图
      selectedMode: false, // 不让单独选中
      roam: true, // 开始鼠标事件，scale缩放、move移动
      // 图形上的文本标签
      label: {
        show: true,
        color: "#000a3c",
      },
      // 地图样式
      itemStyle: {
        // 区域样式
        areaColor: {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 3,
          colorStops: [
            {
              offset: 0,
              color: "rgba(223, 231, 242, 1)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(2, 99, 206, 1)", // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        borderWidth: 1, // 边框大小
        borderColor: "rgba(104, 152, 190, 1)", // 边框样式
        shadowColor: "rgba(128, 217, 248, 1)", // 阴影颜色
        shadowOffsetX: -2, // 阴影水平方向上的偏移距离
        shadowOffsetY: 2, // 阴影垂直方向上的偏移距离
        shadowBlur: 10, // 文字块的背景阴影长度
      },
      // 选中状态下样式
      emphasis: {
        label: {
          color: "#ffffff",
        },
        itemStyle: {
          areaColor: "#a5d4fe",
        },
      },
    },
  ],
});

function initMap(mapData, mapName) {
  // 注册地图
  echarts.registerMap(mapName, mapData);

  // 配置项
  let options = {
    geo: {
      map: mapName, //地图类型
      zoom: 1,
      roam: true,
      animation: false,
      itemStyle: {
        // 区域样式
        areaColor: {
          type: "radial",
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [
            {
              offset: 0,
              color: "rgba(147, 235, 248, 1)", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(2, 99, 206, 1)", // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
        shadowColor: "#105781", //地图区域的阴影颜色。
        shadowOffsetX: 0,
        shadowOffsetY: 10,
      },
    },
    series: [
      {
        name: "map",
        type: "map", // 地图
        map: mapName, // 加载注册的地图
        selectedMode: false, // 不让单独选中
        roam: true, // 开始鼠标事件，scale缩放、move移动
        // 图形上的文本标签
        label: {
          show: true,
          color: "#000a3c",
        },
        // 地图样式
        itemStyle: {
          // 区域样式
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 3,
            colorStops: [
              {
                offset: 0,
                color: "rgba(223, 231, 242, 1)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(2, 99, 206, 1)", // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
          borderWidth: 1, // 边框大小
          borderColor: "rgba(104, 152, 190, 1)", // 边框样式
          shadowColor: "rgba(128, 217, 248, 1)", // 阴影颜色
          shadowOffsetX: -2, // 阴影水平方向上的偏移距离
          shadowOffsetY: 2, // 阴影垂直方向上的偏移距离
          shadowBlur: 10, // 文字块的背景阴影长度
        },
        // 选中状态下样式
        emphasis: {
          label: {
            color: "#ffffff",
          },
          itemStyle: {
            areaColor: "#a5d4fe",
          },
        },
      },
    ],
  };
  myChart.setOption(options); // 实例配置项与数据
}


function initEchartsMap() {
  echarts.registerMap('china', chinaJSON)

  myChart = echarts.init(chinaMap.value)

  historyList.value.push({
    code: "china",
    name: "中国",
  });

  myChart.setOption(options.value);

  // myChart.value.on("click", (params) => {
  //   // 当双击事件发生时，清除单击事件，仅响应双击事件
  //   clearTimeout(timeFn);
  //   timeFn = setTimeout(function () {
  //     if (
  //         allAreaCode.filter((item) => item.name.indexOf(params.name) > -1)[0]
  //     ) {
  //       let areaCode = allAreaCode.filter(
  //           (item) => item.name.indexOf(params.name) > -1
  //       )[0].code;
  //       loadMap(
  //           `https://geo.datav.aliyun.com/areas_v3/bound/${areaCode}_full.json`
  //       )
  //           .then((data) => {
  //             initMap(data, areaCode);
  //           })
  //           .catch(() => {
  //             loadMap(
  //                 `https://geo.datav.aliyun.com/areas_v3/bound/${areaCode}.json`
  //             )
  //                 .then((res) => {
  //                   initMap(res, areaCode);
  //                 })
  //                 .catch(() => {});
  //           });
  //
  //       historyList.push({
  //         code: areaCode,
  //         name: params.name,
  //       });
  //
  //       let result = [];
  //       let obj = {};
  //       for (let i = 0; i < historyList.length; i++) {
  //         if (!obj[historyList[i].code]) {
  //           result.push(historyList[i]);
  //           obj[historyList[i].code] = true;
  //         }
  //       }
  //       historyList = result;
  //     }
  //   }, 250);
  // });

  // myChart.value.on("dblclick", (params) => {
  //   // 当双击事件发生时，清除单击事件，仅响应双击事件
  //   clearTimeout(timeFn);
  //   if (historyList.length == 1) {
  //     alert("已经到达最上一级地图了");
  //     return;
  //   }
  //   let map = historyList.pop();
  //   if (historyList[historyList.length - 1].code == "china") {
  //     initMap(china, "china", "中国");
  //   } else {
  //     loadMap(
  //         `https://geo.datav.aliyun.com/areas_v3/bound/${
  //             historyList[historyList.length - 1].code
  //         }_full.json`
  //     ).then((data) => {
  //       initMap(data, historyList[historyList.length - 1].code);
  //     }).catch(() => {
  //       loadMap(
  //           `https://geo.datav.aliyun.com/areas_v3/bound/${
  //               historyList[historyList.length - 1].code
  //           }.json`
  //       )
  //           .then((res) => {
  //             initMap(res, historyList[historyList.length - 1].code);
  //           })
  //           .catch(() => {});
  //     });
  //   }
  // });

  // myChart.value.on("georoam", (params) => {
  //   let option = mapEcharts.getOption(); //获得option对象
  //   if (params.zoom != null && params.zoom != undefined) {
  //     //捕捉到缩放时
  //     option.geo[0].zoom = option.series[0].zoom; //下层geo的缩放等级跟着上层的geo一起改变
  //     option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
  //   } else {
  //     //捕捉到拖曳时
  //     option.geo[0].center = option.series[0].center; //下层的geo的中心位置随着上层geo一起改变
  //   }
  //   myChart.value.setOption(option); //设置option
  // });
}


onMounted(() => {
  initEchartsMap()
});

</script>

<style lang="scss" scoped>
.index-vue {
  width: 100%;
  height: 100%;

  .china-map {
    width: 800px;
    height: 600px;
  }
}
</style>
