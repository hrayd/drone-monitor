import { loadModules } from "@esri/react-arcgis";

/**
 * ONLINE: 使用arcgis在线api服务
 * LOCAL: 使用本地搭建的arcgis api服务
 */
export const NET_MODE = 'ONLINE'; // 'ONLINE' or 'LOCAL'

// 本地arcgis api服务配置
const HOST = '127.0.0.1';
const PORT = '8080';
const ESRI_PATH = '/arcgis/library/4.10';

export const cssUrl = (
  NET_MODE === 'ONLINE'
    ? 'https://js.arcgis.com/3.28/esri/css/esri.css'
    : `http://${HOST}:${PORT}${ESRI_PATH}/esri/css/main.css`
);

export const OPTIONS = (
  NET_MODE === 'ONLINE'
    ? {}
    : { url: `http://${HOST}:${PORT}${ESRI_PATH}/dojo/dojo.js` }
);

// 加载 basemap
export const loadBasemap = (callback) => {
  loadModules(['esri/Basemap', 'esri/layers/WebTileLayer', 'esri/layers/WMTSLayer', 'esri/layers/OpenStreetMapLayer', 'esri/layers/support/TileInfo'], OPTIONS).then(([Basemap, WebTileLayer, WMTSLayer, OpenStreetMapLayer, TileInfo]) => {
    const basemap = new Basemap({
      baseLayers: [
        // new WebTileLayer({
        //     urlTemplate: 'http://localhost:8080/map/{level}/{col}/{row}.png',
        // })
        // new WMTSLayer({
        //     url: 'http://localhost:9009/arctiler/ogc/services/cu/WMTS',
        // })
        // new TileLayer({
        //     url: "http://localhost:9009/arctiler/arcgis/services/ArcGISCache/MapServer"
        // })
        // new WMSLayer({
        //     url: 'http://localhost:8080/geowebcache/service/wms',
        //     imageFormat: 'image/png',
        //     sublayers: [
        //         {
        //           name: "ARCGIS-Demo"
        //         }
        //     ],
        // })
        new OpenStreetMapLayer()
      ],
    });
    if (typeof callback === 'function') {
      callback(basemap);
    }
  })
};