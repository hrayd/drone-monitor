import React, { useState, useEffect, useRef } from 'react';
import { Map, loadModules } from "@esri/react-arcgis";
import { loadCss } from 'esri-loader';
import { observer } from "mobx-react";
import { Button, Icon, message } from 'antd';

import Monitor from './Monitor';
import Drones from './Drones';
import InfoPanel from './InfoPanel';

import drones from './store/DroneList';
import monitors from './store/MonitorStore';

import './style/DroneMonitor.css';

import {cssUrl, BASEMAP_URL, WEBSOCKET_URL, getOptions} from "../config";

loadCss(cssUrl);

const DroneMonitorContainer = observer(() => {
    const [basemap, setBasemap] = useState(null);
    const [radium, setRadium] = useState(0);
    const [maxRadium, setMaxRadium] = useState(3000);
    const [panelVisible, setPanelVisible] = useState(false);

    const [socketIsConnected, setSocketStatus] = useState(false);
    const ws = useRef();

    // 暂时只有一个监测站
    const monitor = monitors.list[0];

    const OPTIONS = getOptions();

    const loadBasemap = (callback) => {
      console.log(getOptions());
      loadModules(['esri/Basemap', 'esri/layers/WebTileLayer'], OPTIONS).then(([Basemap, WebTileLayer]) => {
        const basemap = new Basemap({
          baseLayers: [
            new WebTileLayer({
              urlTemplate: BASEMAP_URL,
            })
          ],
        });
        if (typeof callback === 'function') {
          callback(basemap);
        }
      })
    };

    const openSocket = () => {
      if (ws.current) {
        return;
      }
      ws.current = new WebSocket(WEBSOCKET_URL);
      ws.current.onmessage = (e) => {
        console.log('Receive: ', e.data);
        switch(e.data) {
          case "up":
            drones.moveUp();
            break;
          case "down":
            drones.moveDown();
            break;
          case "left":
            drones.moveLeft();
            break;
          case "right":
            drones.moveRight();
            break;
          case "add":
            drones.add();
            break;
          case "clear":
            drones.clear();
            break;
          default:
            break;
        }
      };
      ws.current.onclose = () => {
        console.log('Websocket Closed');
        ws.current = null;
        setSocketStatus(false);
      };
      ws.current.onerror = () => {
        console.log('Websocket Error');
        ws.current = null;
        setSocketStatus(false);
      };
      ws.current.onopen = () => {
        console.log('Websocket Opened');
        message.success('连接成功');
        setSocketStatus(true);
      };
    };

    const closeSocket = () => {
      if (ws.current && ws.current.close) {
        ws.current.close();
        setSocketStatus(false);
        ws.current = null;
      }
    };

    const addKeyboardListener = () => {
      document.addEventListener('keyup', (event) => {
        const keyName = event.key;
        switch(keyName) {
          case 'i': {
            console.log("上");
            drones.moveUp();
            break;
          }
          case 'k': {
            console.log("下");
            drones.moveDown();
            break;
          }
          case 'j': {
            console.log("左");
            drones.moveLeft();
            break;
          }
          case 'l': {
            console.log("右");
            drones.moveRight();
            break;
          }
          case ',': {
            console.log(",");
            drones.clear();
            break;
          }
          case '.': {
            console.log(".");
            drones.add();
            break;
          }
          default: break;
        }
      }, false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const newRadium = radium < maxRadium ? (radium + 300) : 0;
            setRadium(newRadium);
        }, 150);
        return () => clearInterval(interval);
    }, [radium]);

    useEffect(() => {
      loadBasemap((bm) => setBasemap(bm));
      // openSocket();
      addKeyboardListener();
      return closeSocket;
    }, []);

    return (
        <div className="container">
            <Button
                type="primary"
                title="展开控制面板"
                onClick={() => setPanelVisible(true)}
                shape="circle"
                style={{
                    display: panelVisible ? 'none' : '',
                    position: 'fixed',
                    bottom: 0,
                    zIndex: 5,
                    marginBottom: '1.5rem',
                    marginLeft: '1.5rem',
                    fontSize: '1.5rem',
                    boxShadow: '0 2px 30px 8px rgba(0, 0, 0, .48)',
                    width: '3rem',
                    height: '3rem',
                }}
            >
                <Icon type="up" />
            </Button>
            <div className="map-container">
                {
                    basemap
                        ? (
                            <Map
                                mapProperties={{ basemap }}
                                viewProperties={{
                                    center: monitor.location,
                                    zoom: 14,
                                }}
                            >
                                <Monitor center={monitor.location} radium={radium} monitor={monitor} loaderOptions={OPTIONS} />
                                <Drones drones={drones} center={monitor.location} radium={radium} loaderOptions={OPTIONS} />
                            </Map>
                        )
                        : null
                }
            </div>
            <div className={drones.list.length ? 'shadow-container-alarm' : 'shadow-container-no-alarm'} />
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
