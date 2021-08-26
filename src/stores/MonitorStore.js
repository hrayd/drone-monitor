import { decorate, observable } from "mobx";
import { LONGITUDE, LATITUDE } from "./Center";

class Monitor {
  constructor() {
    this.id = "fd98g7sf6y6v6cdd";
    this.code = 1;
    this.name = "1号监测塔";
    this.longitude = LONGITUDE; // 经度
    this.latitude = LATITUDE; // 纬度
    this.height = 5; // 高度
    this.location = [LONGITUDE, LATITUDE];
    this.workState = "正在工作";
    this.angle = 0;
    this.deviceType = "全覆盖";
    this.runState = "正常运行";
    this.coverRange = "360度";
    this.receiverId = "";
    this.args = [];
  }
}

class MonitorList {
  list = [new Monitor()];
}

decorate(MonitorList, {
  list: observable,
});

const monitorList = new MonitorList();

export default monitorList;
