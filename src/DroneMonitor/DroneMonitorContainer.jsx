import React, { useState, useEffect } from 'react';
import { Map, loadModules } from "@esri/react-arcgis";
import { loadCss } from 'esri-loader';
import { observer } from "mobx-react";
import { Button, Icon } from 'antd';

import Monitor from './Monitor';
import Drones from './Drones';
import InfoPanel from './InfoPanel';

import drones from './store/DroneList';
import monitors from './store/MonitorStore';

import './style/DroneMonitor.css';

loadCss('http://localhost:8080/arcgis/library/4.10/esri/css/main.css');

const DroneMonitorContainer = observer(() => {
    const [basemap, setBasemap] = useState(null);
    // const [center, setCenter] = useState([116.347, 40.035]);
    const [radium, setRadium] = useState(0);
    const [maxRadium, setMaxRadium] = useState(3000);
    const [panelVisible, setPanelVisible] = useState(true);

    const options = {
        url: 'http://localhost:8080/arcgis/library/4.10/dojo/dojo.js',
    };

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
        loadModules(['esri/Basemap', 'esri/layers/WebTileLayer', 'esri/layers/WMTSLayer', 'esri/layers/TileLayer'], options).then(([Basemap, WebTileLayer, WMTSLayer, TileLayer]) => {
            const basemap = new Basemap({
                baseLayers: [
                    new WebTileLayer({
                        urlTemplate: 'https://a.tile.openstreetmap.org/{level}/{col}/{row}.png',
                        // urlTemplate: 'http://localhost:9009/arctiler/osgeo/services/Beijing/TMS/{level}/{col}/{row}.png',
                    })
                    // new WMTSLayer({
                    //     url: 'http://localhost:9009/arctiler/ogc/services/Beijing/WMTS',
                    // })
                //     new TileLayer({
                //         url: "http://localhost:9009/arctiler/arcgis/services/ArcGISCache/MapServer"
                //     })
                ],
            });
            setBasemap(basemap);
        })
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
                                // loaderOptions={options}
                            >
                                <Monitor center={monitor.location} radium={radium} monitor={monitor} loaderOptions={options} />
                                <Drones drones={drones} center={monitor.location} loaderOptions={options} />
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
