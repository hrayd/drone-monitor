/**
 * 无人机View
 */
import { loadModules } from "@esri/react-arcgis";
import { observer, useDisposable } from "mobx-react-lite";
import { reaction } from "mobx";
import planeWarning from "../assets/imgs/planeWarning.png";

const Drones = observer(({ view, drones, center }) => {
  useDisposable(() =>
    reaction(
      () => drones.list,
      (list) => {
        loadModules(["esri/Graphic"])
          .then(([Graphic]) => {
            const points = list.map((drone, index) => {
              const point = {
                type: "point", // autocasts as new Point()
                longitude: drone.longitude,
                latitude: drone.latitude,
              };

              const pointSymbol = {
                type: "picture-marker",
                url: planeWarning,
                width: "40px",
                height: "40px",
              };

              // 无人机信息面板
              return new Graphic({
                id: `drone${index}`,
                geometry: point,
                symbol: pointSymbol,
                attributes: drone,
                popupTemplate: {
                  title: "无人机信息",
                  content: [
                    {
                      type: "fields",
                      fieldInfos: [
                        {
                          label: "厂家型号",
                          fieldName: "name",
                        },
                        {
                          label: "无人机坐标",
                          fieldName: "location",
                        },
                        {
                          label: "载波频率",
                          fieldName: "frequency",
                        },
                        {
                          label: "方向角",
                          fieldName: "angle",
                        },
                        {
                          label: "发现时间",
                          fieldName: "discoveryTime",
                        },
                        {
                          label: "距离(米)",
                          fieldName: "distance",
                        },
                      ],
                    },
                  ],
                },
              });
            });

            // 无人机方向与距离标识
            const lines = list.map((drone, index) => {
              const polyline = {
                type: "polyline", // autocasts as new Polyline()
                paths: [center, [drone.longitude, drone.latitude]],
              };

              const polylineSymbol = {
                type: "simple-line", // autocasts as SimpleLineSymbol()
                color: [255, 0, 0],
                width: "2px",
                style: "short-dot",
              };

              return new Graphic({
                id: `line${index}`,
                geometry: polyline,
                symbol: polylineSymbol,
              });
            });

            // 重渲染前清理所有视图
            view.graphics.removeMany(
              view.graphics.filter(
                (g) =>
                  g.id &&
                  (g.id.indexOf("line") > -1 || g.id.indexOf("drone") > -1)
              )
            );
            view.graphics.addMany([...points, ...lines]);
          })
          .catch((err) => console.error(err));
      }
    )
  );
  return null;
});

export default Drones;
