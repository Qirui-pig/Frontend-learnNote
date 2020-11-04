window.onload = init;

function init() {

  const map = new ol.Map({
    view: new ol.View({
      center: [-8311737.139007321, -957205.8125536256],
      zoom: 7,
      maxZoom:10,
      minZoom:4,
      // 旋转
      // rotation:0.5
    }),
    // 在里面生成
    // layers:[
    //   new ol.layer.Tile({
    //     source: new ol.source.OSM()
    //   })
    // ],
    target:'map'
  })
  // map的点击事件
  // map.on('click',function (e) {
  //   // console.log(e);
  //   console.log(e.coordinate);
  // })

  // 外面生成
  const openStreetMapStandard = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible:false,
    title:'Standard'
  })
  const layer1 = new ol.layer.Tile({
    source:new ol.source.OSM({
      url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    }),
    visible: false,
    title: 'OSM1'
  })
  const layer2 = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
      attributions:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    visible:false,
    title:'XYZ'
  })
  // 单个导入图层
  // map.addLayer(openStreetMapStandard)
  // 一次导入
  const baseLayerGroup = new ol.layer.Group({
    layers:[
      openStreetMapStandard,layer1,layer2
    ]
  })

  map.addLayer(baseLayerGroup)

  //图层切换
  const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]')
  // console.log(baseLayerElement);
  for (let baseLayerElement of baseLayerElements){
    // console.log(baseLayerElement);
    baseLayerElement.addEventListener('change',function () {
      // console.log(this.value);
      let value = this.value
      baseLayerGroup.getLayers().forEach(function (element,index,array) {
        // console.log(element.get('title'));
        let baseLayerTitle = element.get('title')
        element.setVisible(baseLayerTitle == value)
      })
    })
  }

}