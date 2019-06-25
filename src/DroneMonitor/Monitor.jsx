import { useState, useEffect } from 'react';
import { loadModules } from '@esri/react-arcgis';
import station from './img/station.png';

const Monitor = ({ center, view, radium }) => {
    const [graphics, setGraphics] = useState([]);

    useEffect(() => {
        loadModules(['esri/Graphic', 'esri/geometry/Circle']).then(([Graphic, Circle]) => {
            const circle = new Circle({
                center: center,
                radius: radium,
            });

            const circleSymbol = {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [0, 0, 200, 0.2],
                outline: { // autocasts as new SimpleLineSymbol()
                    color: [255, 255, 255],
                    width: 1
                }
            };

            const circleGraphic = new Graphic({
                id: 'centerCircle',
                geometry: circle,
                symbol: circleSymbol,
                popupTemplate: {
                    title: '123',
                    content: '456',
                },
            });

            const point = {
                type: "point", // autocasts as new Point()
                longitude: center[0],
                latitude: center[1],
            };

            const pointSymbol = {
                type: "picture-marker",
                url: station,
                width: '40px',
                height: '40px',
            };

            const pointGraphic = new Graphic({
                id: 'centerPoint',
                geometry: point,
                symbol: pointSymbol,
                attributes: { Name: 'aa', Owner: 'fff' },
                popupTemplate: {
                    title: "testTitle",
                    content: [
                        {
                            type: "fields",
                            fieldInfos: [
                                {
                                    fieldName: "name"
                                },
                                {
                                    fieldName: "address1",
                                    label: "address"
                                },
                            ]
                        }
                    ]
                },
            });

            if (view.graphics.length) {
                view.graphics.removeMany(view.graphics.filter(g => g && g.id && g.id.indexOf('center') > -1));
            }

            view.graphics.addMany([circleGraphic, pointGraphic]);
            setGraphics([circleGraphic, pointGraphic]);
        }).catch((err) => console.error(err));
        return () => {
            view.graphics.removeMany(graphics);
        };
    }, [radium, center]);
    return null;
};

export default Monitor;
