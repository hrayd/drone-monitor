import React, { useState, useEffect } from 'react';
import { Map } from "@esri/react-arcgis";
import { loadCss } from 'esri-loader';
import { observer } from "mobx-react";
import { Button, Icon } from 'antd';

import Monitor from './Monitor';
import Drones from './Drones';
import InfoPanel from './InfoPanel';

import drones from './store/DroneList';
import monitors from './store/MonitorStore';

import './style/DroneMonitor.css';

import { cssUrl, OPTIONS, loadBasemap } from "../config";

loadCss(cssUrl);

const DroneMonitorContainer = observer(() => {
    const [basemap, setBasemap] = useState(null);
    // const [center, setCenter] = useState([116.347, 40.035]);
    const [radium, setRadium] = useState(0);
    const [maxRadium, setMaxRadium] = useState(3000);
    const [panelVisible, setPanelVisible] = useState(false);

    // 暂时只有一个监测站
    const monitor = monitors.list[0];

    useEffect(() => {
        const interval = setInterval(() => {
            const newRadium = radium < maxRadium ? (radium + 300) : 0;
            setRadium(newRadium);
        }, 150);
        return () => clearInterval(interval);
    }, [radium]);

    useEffect(() => {
      loadBasemap((bm) => setBasemap(bm))
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
                                <Drones drones={drones} center={monitor.location} loaderOptions={OPTIONS} />
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
            />
        </div>
    );
});

export default DroneMonitorContainer;
