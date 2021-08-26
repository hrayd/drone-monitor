import React, { useState, useEffect, useMemo } from "react";
import { Map } from "@esri/react-arcgis";
import { loadCss } from "esri-loader";
import { observer } from "mobx-react";
import { Button, Icon } from "antd";

import Monitor from "./Monitor";
import Drones from "./Drones";
import InfoPanel from "./InfoPanel";
import drones from "../stores/DroneList";
import monitors from "../stores/MonitorStore";

import "./DroneMonitor.css";
import { cssUrl, getOptions } from "../utils/utils";
import loadBasemap from "../utils/loadBasemap";
import useSocket from "../utils/useSocket";
import addKeyboardListener from "../utils/addKeyboardListener";

// ArcGIS资源加载
loadCss(cssUrl);
const OPTIONS = getOptions();

const DroneMonitorContainer = observer(() => {
  const [basemap, setBasemap] = useState(null); // 地图对象
  const [radium, setRadium] = useState(0); // 监测圆形视图半径
  const [maxRadium, setMaxRadium] = useState(3000); // 最大监测半径
  const [panelVisible, setPanelVisible] = useState(false); // 数据面板可见性

  const { socketIsConnected, openSocket, closeSocket } = useSocket(); // 控制器Socket相关方法

  // 暂时只有一个监测站
  // TODO: 多监测站支持, 需等待监测站通信API文档
  const monitor = monitors.list[0];

  // 监测圆环动画
  useEffect(() => {
    const interval = setInterval(() => {
      const newRadium = radium < maxRadium ? radium + 300 : 0;
      setRadium(newRadium);
    }, 150);
    return () => clearInterval(interval);
  }, [radium, maxRadium]);

  // 页面载入与卸载
  useEffect(() => {
    loadBasemap((bm) => setBasemap(bm));
    // openSocket();  // socket改为按键手动连接
    addKeyboardListener();
    return closeSocket;
  }, [closeSocket]);

  /**
   * 地图View
   * 若basemap未加载会导致页面错误, 故先返回null
   */
  const mapView = useMemo(
    () =>
      basemap ? (
        <Map
          mapProperties={{ basemap }}
          viewProperties={{
            center: monitor.location,
            zoom: 12,
          }}
        >
          <Monitor
            center={monitor.location}
            radium={radium}
            monitor={monitor}
            loaderOptions={OPTIONS}
          />
          <Drones
            drones={drones}
            center={monitor.location}
            radium={radium}
            loaderOptions={OPTIONS}
          />
        </Map>
      ) : null,
    [basemap, monitor, radium]
  );

  /**
   * 报警View
   * 当有无人机临空时页面边框出现红色动画
   * TODO: 语音报警
   */
  const alarmView = useMemo(
    () => (
      <div
        className={
          drones.list.length
            ? "shadow-container-alarm"
            : "shadow-container-no-alarm"
        }
      />
    ),
    []
  );

  return (
    <div className="container">
      <Button
        type="primary"
        title="展开控制面板"
        onClick={() => setPanelVisible(true)}
        shape="circle"
        className="panel-button"
        style={{ display: panelVisible ? "none" : "" }}
      >
        <Icon type="up" />
      </Button>
      <div className="map-container">{mapView}</div>
      {alarmView}
      <InfoPanel
        center={monitor.location}
        monitor={monitor}
        maxRadium={maxRadium}
        setMaxRadium={setMaxRadium}
        drones={drones}
        visible={panelVisible}
        setVisible={setPanelVisible}
        isConnected={socketIsConnected}
        connect={openSocket}
      />
    </div>
  );
});

export default DroneMonitorContainer;
