import { loadModules } from "@esri/react-arcgis";
import { BASEMAP_URL, getOptions } from "./utils";

const OPTIONS = getOptions();

const loadBasemap = (callback) => {
  loadModules(["esri/Basemap", "esri/layers/WebTileLayer"], OPTIONS).then(
    ([Basemap, WebTileLayer]) => {
      const basemap = new Basemap({
        baseLayers: [
          new WebTileLayer({
            urlTemplate: BASEMAP_URL,
          }),
        ],
      });
      if (typeof callback === "function") {
        callback(basemap);
      }
    }
  );
};

export default loadBasemap;
