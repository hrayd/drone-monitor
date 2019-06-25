import { useState } from 'react';
import { loadModules } from '@esri/react-arcgis';
import { observer, useDisposable } from 'mobx-react-lite';
import { reaction } from 'mobx';
import planeWarning from './img/planeWarning.png';

const Drones = observer(({view, drones, center}) => {
    useDisposable(() =>
        reaction(
            () => drones.list.map(l => l.location),
            locations => {
                loadModules(['esri/Graphic']).then(([Graphic]) => {
                    const points = locations.map((c, index) => {
                        const point = {
                            type: "point", // autocasts as new Point()
                            longitude: c[0],
                            latitude: c[1],
                        };

                        const pointSymbol = {
                            type: "picture-marker",
                            url: planeWarning,
                            width: '40px',
                            height: '40px',
                        };

                        return new Graphic({
                            id: `drone${index}`,
                            geometry: point,
                            symbol: pointSymbol,
                            popupTemplate: {
                                title: "testTitle",
                                content: "content",
                            },
                        });
                    });

                    const lines = locations.map((c, index) => {
                        const polyline = {
                            type: "polyline",  // autocasts as new Polyline()
                            paths: [
                                center,
                                c,
                            ]
                        };

                        const polylineSymbol = {
                            type: "simple-line",  // autocasts as SimpleLineSymbol()
                            color: [255, 0, 0],
                            width: '2px',
                            style: "short-dot",
                        };

                        // Add the geometry and symbol to a new graphic
                        return new Graphic({
                            id: `line${index}`,
                            geometry: polyline,
                            symbol: polylineSymbol,
                        });
                    });

                    view.graphics.removeMany(view.graphics.filter(g => g.id && (g.id.indexOf('line') > -1 || g.id.indexOf('drone') > -1)));
                    view.graphics.addMany([...points, ...lines]);
                }).catch((err) => console.error(err));
            },
        )
    );
    return null;
    // useEffect(() => {
    //     loadModules(['esri/Graphic']).then(([Graphic]) => {
    //         console.log(drones);
    //         const points = drones.list.map((drone, index) => {
    //             const c = drone.location;
    //             const point = {
    //                 type: "point", // autocasts as new Point()
    //                 longitude: c[0],
    //                 latitude: c[1],
    //             };
    //
    //             const pointSymbol = {
    //                 type: "picture-marker",
    //                 url: planeWarning,
    //                 width: '40px',
    //                 height: '40px',
    //             };
    //
    //             return new Graphic({
    //                 id: `target${index}`,
    //                 geometry: point,
    //                 symbol: pointSymbol,
    //                 popupTemplate: {
    //                     title: "testTitle",
    //                     content: [
    //                         {
    //                             type: "fields",
    //                             fieldInfos: [
    //                                 {
    //                                     fieldName: "name"
    //                                 },
    //                                 {
    //                                     fieldName: "address1",
    //                                     label: "address"
    //                                 },
    //                             ]
    //                         }
    //                     ]
    //                 },
    //             });
    //         });
    //
    //         const lines = drones.list.map(drone => {
    //             const polyline = {
    //                 type: "polyline",  // autocasts as new Polyline()
    //                 paths: [
    //                     center,
    //                     drone.location,
    //                 ]
    //             };
    //
    //             const polylineSymbol = {
    //                 type: "simple-line",  // autocasts as SimpleLineSymbol()
    //                 color: [255, 0, 0],
    //                 width: '2px',
    //                 style: "short-dot",
    //             };
    //
    //             // Add the geometry and symbol to a new graphic
    //             return new Graphic({
    //                 geometry: polyline,
    //                 symbol: polylineSymbol,
    //             });
    //         });
    //
    //         view.graphics.addMany([...points, ...lines]);
    //         setGraphics([...points, ...lines]);
    //     }).catch((err) => console.error(err));
    //     return () => {
    //         view.graphics.removeMany(graphics);
    //     };
    // }, [drones.list]);
});

export default Drones;
