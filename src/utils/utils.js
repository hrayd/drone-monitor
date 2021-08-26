const configs = window.YS_DRONE_MONITOR_CONFIGS;

const arcgisURL = configs.arcgis_js_api[configs.arcgis_js_api.mode];
export const BASEMAP_URL = `${
  configs.map_server[configs.map_server.mode]
}/{level}/{col}/{row}.png`;
export const cssUrl = `${arcgisURL}/esri/css/main.css`;

// 无人机模拟websocket
export const WEBSOCKET_URL = configs.ws;

export const getOptions = () => {
  return {
    url: `${arcgisURL}/dojo/dojo.js`,
  };
};
