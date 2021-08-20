## 简介

无人机监控系统

![shot2.png](https://i.loli.net/2019/12/03/VTCnUp3bB56Oqmz.png)

![shot1.png](https://i.loli.net/2019/12/03/VxywNrisobOKhtQ.png)

- build：react + mobx
- UI：ant-design
- map api: ArcGIS API for Javascript

## 命令：

- `npm start` 运行项目

- `npm build` 打包项目

## 在线/离线环境配置：

在 `public/config.js` 文件中可配置 `arcgis_js_api` 和 `map_server` 在线/离线模式与对应服务 URL。

## 离线环境部署：

### 1. 部署 `arcgis_js_api`

在 (ArcGIS)[https://developers.arcgis.com/javascript/latest/] 下载 `arcgis_js_api` 部署至本地服务器（nginx 或 tomcat 等），参照官方文档，可能需要修改 dojo.js 与 init.js 中的路径；

### 2. 部署离线地图

参照网上其他文档部署离线地图服务，本系统仅支持 `https://a.tile.openstreetmap.org/{level}/{col}/{row}.png` 这样的瓦片服务。
