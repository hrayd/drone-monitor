// 地图服务
export const BASEMAP_URL = 'http://127.0.0.1:5000/tms/1.0.0/world-fs/{level}/{col}/{row}.png';
// 本地arcgis api服务配置
const ESRI_HOST = '127.0.0.1';
const ESRI_PORT = '8080';
const ESRI_PATH = '/arcgis_js_api/library/4.12';
// 无人机模拟websocket
export const WEBSOCKET_URL = 'ws:/127.0.0.1:5050/broadcast';

/**
 * ONLINE: 使用arcgis在线api服务
 * LOCAL: 使用本地搭建的arcgis api服务
 */
const NET_MODE = 'LOCAL'; // 'ONLINE' or 'LOCAL'

export const cssUrl = (
  NET_MODE === 'ONLINE'
    ? 'https://js.arcgis.com/3.28/esri/css/esri.css'
    : `http://${ESRI_HOST}:${ESRI_PORT}${ESRI_PATH}/esri/css/main.css`
);

export const getOptions = () => {
  if (NET_MODE === 'ONLINE') {
    return {};
  }
  return { url: `http://${ESRI_HOST}:${ESRI_PORT}${ESRI_PATH}/dojo/dojo.js` };
};
