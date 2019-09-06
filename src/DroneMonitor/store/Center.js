// 模拟数据的中心点
// WGS84: 116.396, 39.796
// GCJ02: 116.402,39.797
export const LONGITUDE = 116.402;
export const LATITUDE = 39.797;

function PixelToLnglat(x, y, zoom = 13) {
  const VV = 0.15915494309189535;
  const kW = 0.5;
  const yW = -0.15915494309189535;
  const WW = 0.5;

  const scale = 256 << zoom;
  const a = (x / scale - kW) / VV;
  const b = (y / scale - WW) / yW;
  const c = 180 / Math.PI;
  return [a * c, (2 * Math.atan(Math.exp(b)) - Math.PI / 2) * c];
}
