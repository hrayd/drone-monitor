const configs = window.YS_DRONE_MONITOR_CONFIGS;

const arcgisURL = configs.arcgis_js_api[configs.arcgis_js_api.mode];
export const BASEMAP_URL = `${
  configs.map_server[configs.map_server.mode]
}/{level}/{col}/{row}.png`;
export const cssUrl = `${arcgisURL}/esri/css/main.css`;

// const HOST = "";
// const DEFAULT_HOST = HOST || window.location.hostname;
// 地图服务
// offline: http://${DEFAULT_HOST}:5000/tms/1.0.0/world-fs/{level}/{col}/{row}.png
// online: https://a.tile.openstreetmap.org/{level}/{col}/{row}.png
// export const BASEMAP_URL = `https://a.tile.openstreetmap.org/{level}/{col}/{row}.png`;
// export const BASEMAP_URL = `http://${DEFAULT_HOST}:3461/tile-server/{level}/{col}/{row}.png`;
// 本地arcgis api服务配置
// const ESRI_PORT = "3461";
// const ESRI_PATH = "/arcgis_js_api/library/4.15";
// 无人机模拟websocket
export const WEBSOCKET_URL = configs.ws;

/**
 * ONLINE: 使用arcgis在线api服务
 * LOCAL: 使用本地搭建的arcgis api服务
 */
// const NET_MODE = "OFFLINE"; // 'ONLINE' or 'OFFLINE'

// export const cssUrl =
//   NET_MODE === "ONLINE"
//     ? "https://js.arcgis.com/4.12/esri/themes/light/main.css"
//     : `http://${DEFAULT_HOST}:${ESRI_PORT}${ESRI_PATH}/esri/css/main.css`;

export const getOptions = () => {
  return {
    url: `${arcgisURL}/dojo/dojo.js`,
  };
};
