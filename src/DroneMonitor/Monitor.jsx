import { useState, useEffect } from "react";
import { loadModules } from "@esri/react-arcgis";
import station from "./img/station.png";

const Monitor = ({ center, view, radium, monitor }) => {
  const [graphics, setGraphics] = useState([]);

  useEffect(() => {
    loadModules(["esri/Graphic", "esri/geometry/Circle"])
      .then(([Graphic, Circle]) => {
        const circle = new Circle({
          center: center,
          radius: radium,
        });

        const circleSymbol = {
          type: "simple-fill", // autocasts as new SimpleFillSymbol()
          color: [0, 0, 200, 0.2],
          outline: {
            // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 1,
          },
        };

        const circleGraphic = new Graphic({
          id: "centerCircle",
          geometry: circle,
          symbol: circleSymbol,
        });

        const point = {
          type: "point", // autocasts as new Point()
          longitude: center[0],
          latitude: center[1],
        };

        const pointSymbol = {
          type: "picture-marker",
          url: station,
          width: "40px",
          height: "40px",
        };

        const pointGraphic = new Graphic({
          id: "centerPoint",
          geometry: point,
          symbol: pointSymbol,
          attributes: monitor,
          popupTemplate: {
            title: "监测站信息",
            content: [
              {
                type: "fields",
                fieldInfos: [
                  {
                    label: "监测设备ID",
                    fieldName: "id",
                  },
                  {
                    label: "设备名称",
                    fieldName: "name",
                  },
                  {
                    label: "经度",
                    fieldName: "longitude",
                  },
                  {
                    label: "纬度",
                    fieldName: "latitude",
                  },
                  {
                    label: "工作状态",
                    fieldName: "workState",
                  },
                  {
                    label: "运行状态",
                    fieldName: "runState",
                  },
                  {
                    label: "覆盖范围",
                    fieldName: "coverRange",
                  },
                ],
              },
            ],
          },
        });

        if (view.graphics.length) {
          view.graphics.removeMany(
            view.graphics.filter(
              (g) => g && g.id && g.id.indexOf("center") > -1
            )
          );
        }

        view.graphics.addMany([circleGraphic, pointGraphic]);
        setGraphics([circleGraphic, pointGraphic]);
      })
      .catch((err) => console.error(err));
    return () => {
      view.graphics.removeMany(graphics);
    };
    /* eslint-disable */
  }, [radium, center]);
  return null;
};

export default Monitor;
