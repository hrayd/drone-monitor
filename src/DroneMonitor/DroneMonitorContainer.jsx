import React, { useState, useEffect } from 'react';
import { Map, loadModules } from "@esri/react-arcgis";
import { observer } from "mobx-react";

import Monitor from './Monitor';
import Drones from './Drones';
import InfoPanel from './InfoPanel';
import './style/DroneMonitor.css';
import DroneList from './store/DroneList';
import {autorun} from "mobx";

const drones = new DroneList();

const DroneMonitorContainer = observer(() => {
    const [basemap, setBasemap] = useState(null);
    const [center, setCenter] = useState([116.347, 40.035]);
    const [radium, setRadium] = useState(0);
    const [maxRadium, setMaxRadium] = useState(3000);
    // const [targets, setTargets] = useState([[116.357, 40.045], [116.337, 40.025]]);
    // const [editTarget, setEditTarget] = useState([116.347, 40.035]);

    // const changeCenter = () => {
    //     const newCenter = [
    //         parseFloat((center[0] + 0.005).toFixed(3)),
    //         parseFloat((center[1] + 0.005).toFixed(3)),
    //     ];
    //     setCenter(newCenter);
    // };

    // const resetCenter = () => setCenter([116.347, 40.035]);

    // const addTarget = () => {
    //     if (editTarget[0] && editTarget[1]) {
    //         setTargets(old => [...old, editTarget]);
    //     }
    // };

    useEffect(() => {
        const interval = setInterval(() => {
            const newRadium = radium < maxRadium ? (radium + 200) : 0;
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
                    })
                ],
            });
            setBasemap(basemap);
        })
    }, []);

    return (
        <div className="container">
            <div className="map-container">
                {
                    basemap
                        ? (
                            <Map
                                mapProperties={{ basemap }}
                                viewProperties={{
                                    center: [116.347, 40.035],
                                    zoom: 13,
                                }}
                            >
                                <Monitor center={center} radium={radium}/>
                                <Drones drones={drones} center={center} />
                            </Map>
                        )
                        : null
                }
            </div>
            <div className="shadow-container" />
            <InfoPanel
                center={center}
                maxRadium={maxRadium}
                setMaxRadium={setMaxRadium}
                drones={drones}
            />
        </div>
    );
});

export default DroneMonitorContainer;
