import { loadModules } from "@esri/react-arcgis";

/**
 * ONLINE: 使用arcgis在线api服务
 * LOCAL: 使用本地搭建的arcgis api服务
 */
export const NET_MODE = 'LOCAL'; // 'ONLINE' or 'LOCAL'

// 本地arcgis api服务配置
const HOST = '127.0.0.1';
const PORT = '8080';
const ESRI_PATH = '/arcgis_js_api/library/4.12';

export const WEBSOCKET_URL = 'ws:/localhost:5050/broadcast';

export const cssUrl = (
  NET_MODE === 'ONLINE'
    ? 'https://js.arcgis.com/3.28/esri/css/esri.css'
    : `http://${HOST}:${PORT}${ESRI_PATH}/esri/css/main.css`
);

export const OPTIONS = (
  NET_MODE === 'ONLINE'
    ? ({})
    : ({ url: `http://${HOST}:${PORT}${ESRI_PATH}/dojo/dojo.js` })
);
export const getOptions = () => {
  if (NET_MODE === 'ONLINE') {
    return {};
  }
  return { url: `http://${HOST}:${PORT}${ESRI_PATH}/dojo/dojo.js` };
};

// 加载 basemap
export const loadBasemap = (callback) => {
  console.log(getOptions());
  loadModules(['esri/Basemap', 'esri/layers/WebTileLayer', 'esri/layers/WMTSLayer', 'esri/layers/OpenStreetMapLayer', 'esri/layers/support/TileInfo'], getOptions()).then(([Basemap, WebTileLayer, WMTSLayer, OpenStreetMapLayer, TileInfo]) => {
    const basemap = new Basemap({
      baseLayers: [
        new WebTileLayer({
            urlTemplate: 'http://localhost:5000/tms/1.0.0/world-fs/{level}/{col}/{row}.png',
        })
      ],
    });
    if (typeof callback === 'function') {
      callback(basemap);
    }
  })
};