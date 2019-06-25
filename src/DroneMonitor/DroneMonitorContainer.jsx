import React, { useState, useEffect } from 'react';
import { Map, loadModules } from "@esri/react-arcgis";
import { observer } from "mobx-react";
import { Button, Icon } from 'antd';

import Monitor from './Monitor';
import Drones from './Drones';
import InfoPanel from './InfoPanel';
import './style/DroneMonitor.css';
import drones from './store/DroneList';

const DroneMonitorContainer = observer(() => {
    const [basemap, setBasemap] = useState(null);
    const [center, setCenter] = useState([116.347, 40.035]);
    const [radium, setRadium] = useState(0);
    const [maxRadium, setMaxRadium] = useState(3000);
    const [panelVisible, setPanelVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            const newRadium = radium < maxRadium ? (radium + 300) : 0;
            setRadium(newRadium);
        }, 200);
        return () => clearInterval(interval);
    }, [radium]);

    useEffect(() => {
        loadModules(['esri/Basemap', 'esri/layers/WebTileLayer']).then(([Basemap, WebTileLayer]) => {
            const basemap = new Basemap({
                baseLayers: [
                    new WebTileLayer({
                        urlTemplate: 'https://a.tile.openstreetmap.org/{level}/{col}/{row}.png',
                        // urlTemplate: 'http://127.0.0.1:3030/{level}/{col}/{row}.png',
                        // urlTemplate: 'http://localhost:8080/geowebcache/service/tms/1.0.0/beijing@EPSG%3A3857_beijing@png/{level}/{col}/{row}.png',
                    })
                ],
            });
            setBasemap(basemap);
        })
    }, []);

    return (
        <div className="container">
            <Button
                type="primary"
                onClick={() => setPanelVisible(true)}
                style={{
                    display: panelVisible ? 'none' : '',
                    position: 'fixed',
                    bottom: 0,
                    zIndex: 5,
                    marginBottom: '1rem',
                    marginLeft: '1rem',
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
                                    center: [116.347, 40.035],
                                    zoom: 14,
                                }}
                            >
                                <Monitor center={center} radium={radium}/>
                                <Drones drones={drones} center={center} />
                            </Map>
                        )
                        : null
                }
            </div>
            <div className={drones.list.length ? 'shadow-container-alarm' : 'shadow-container-no-alarm'} />
            <InfoPanel
                center={center}
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
