## 简介
无人机监控系统

![截图2](https://sm.ms/image/VxywNrisobOKhtQ)

![截图1](https://sm.ms/image/VTCnUp3bB56Oqmz)

- build：react + mobx
- UI：ant-design
- map api: ArcGIS API for Javascript

## 命令：

### `npm start` 运行项目
### `npm build` 打包项目

## 在线环境：

### 1. 将 `src/config.js` 中的 `BASEMAP_URL` 改为在线TMS地图服务
- 如：`https://a.tile.openstreetmap.org/{level}/{col}/{row}.png`
### 2. 将 `src/config.js` 中的 `NET_MODE` 改为 `ONLINE`

## 离线环境：

### 1. 解压libs目录下的 `arcgis_js_api` 并部署至服务器（如tomcat），需参照其中的文档修改dojo.js与init.js中的路径
### 2. 下载地图切片，格式为 'google tile / 谷歌切片'
### 3. 解压libs目录中对应平台的地图服务，在 `appsettings.json` 中配置地图切片路径，启动地图服务
