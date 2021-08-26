export const droneListColumns = [
  {
    title: "编号",
    key: "index",
    dataIndex: "index",
    render: (text, record, index) => index + 1,
    width: "5%",
  },
  {
    title: "厂家型号",
    key: "name",
    dataIndex: "name",
    width: "12%",
  },
  {
    title: "经度",
    dataIndex: "longitude",
    width: "8%",
  },
  {
    title: "纬度",
    dataIndex: "latitude",
    width: "8%",
  },
  {
    title: "载波频率(GHz)",
    key: "frequency",
    dataIndex: "frequency",
    width: "12%",
  },
  {
    title: "方向角",
    key: "angle",
    dataIndex: "angle",
    width: "10%",
  },
  {
    title: "发现时间",
    key: "discoveryTime",
    dataIndex: "discoveryTime",
    width: "20%",
  },
  {
    title: "距离(米)",
    key: "distance",
    dataIndex: "distance",
    width: "10%",
  },
];

export const stationListColumns = [
  {
    title: "监测设备ID",
    dataIndex: "id",
    width: "16%",
  },
  {
    title: "设备名称",
    dataIndex: "name",
    width: "10%",
  },
  {
    title: "经度",
    dataIndex: "longitude",
    width: "10%",
  },
  {
    title: "纬度",
    dataIndex: "latitude",
    width: "10%",
  },
  {
    title: "工作状态",
    dataIndex: "workState",
    width: "10%",
  },
  {
    title: "运行状态",
    dataIndex: "runState",
    width: "10%",
  },
  {
    title: "覆盖范围",
    dataIndex: "coverRange",
    width: "10%",
  },
];

export const controllerListColumns = [
  {
    title: "型号",
    dataIndex: "modal",
    width: "16%",
  },
  {
    title: "角度",
    dataIndex: "angle",
    width: "10%",
  },
  {
    title: "站ID",
    dataIndex: "stationId",
    width: "10%",
  },
  {
    title: "经度",
    dataIndex: "longitude",
    width: "10%",
  },
  {
    title: "纬度",
    dataIndex: "latitude",
    width: "10%",
  },
  {
    title: "载波频率",
    dataIndex: "frequency",
    width: "10%",
  },
];

export const historyColumns = [
  {
    title: "活动名称",
    dataIndex: "name",
    width: "25%",
  },
  {
    title: "开始时间",
    dataIndex: "startTime",
    width: "25%",
  },
  {
    title: "结束时间",
    dataIndex: "endTime",
    width: "25%",
  },
];
