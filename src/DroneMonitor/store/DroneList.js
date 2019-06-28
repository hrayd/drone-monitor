import { decorate, observable, action } from 'mobx';
import moment from 'moment';

import { LONGITUDE, LATITUDE } from './Center';

class Drone {
    constructor(drone) {
        this.id = Math.random();
        this.name = drone.name;
        this.monitorId = drone.monitorId; // 监测站ID
        this.longitude = drone.longitude; // 经度
        this.latitude = drone.latitude; // 纬度
        this.height = drone.height; // 高度
        this.frequency = drone.frequency; // 频率kHz
        this.signal = drone.signal; // 信号强度db
        this.pulseTime = drone.pulseTime; // 脉冲时间
        this.confidence = drone.confidence; // 置信度
        this.other = drone.other; // 保留字节
        this.discoveryTime = drone.discoveryTime || moment().format('YYYY/MM/DD HH:mm:ss'); // 发现时间
        this.dataType = drone.dataType; // 数据类型
        this.nameLength = drone.nameLength || drone.name.length; // 名称长度
        this.angle = drone.angle; // 方向角
        this.distance = drone.distance; // 距离
        this.location = [drone.longitude, drone.latitude];
    }
}

class DroneList {
    list = [];

    add = (item = {}) => {
        if (item.name) {
            this.list.push(item);
        } else {
            const randomN = parseInt(Math.random() * 100, 10);
            const flag = Math.round(Math.random()) ? 1 : -1; // 1 or -1
            const location = [
                parseFloat((LONGITUDE + 2 * flag * (Math.random() / 100)).toFixed(3)),
                parseFloat((LATITUDE + 2 * flag * (Math.random() / 100)).toFixed(3)),
            ];
            this.list = [
                ...this.list,
                new Drone({
                    name: `无人机${randomN}`,
                    longitude: location[0],
                    latitude: location[1],
                }),
            ];
        }
    };

    delete = (item) => {
        if (item.id) {
            this.list = this.list.filter(l => l.id !== item.id);
        }
    };

    update = (item) => {
        if (item.id) {
            this.list = this.list.map(l => {
                if (l.id !== item.id) {
                    return l;
                }
                return item;
            })
        }
    };

    clear = () => {
        this.list = [];
    };

    // 模拟移动
    move = () => {
        const flag = Math.round(Math.random()) ? 1 : -1;
        this.list = this.list.map(l => {
            const longitude = parseFloat((l.longitude + flag * (Math.random() / 800)).toFixed(3));
            const latitude = parseFloat((l.latitude + flag * (Math.random() / 800)).toFixed(3));
            return {
                ...l,
                longitude,
                latitude, 
                location: [longitude, latitude],
            }
        })
    }
}

decorate(DroneList, {
    list: observable,
    add: action,
    delete: action,
    update: action,
    clear: action,
});

const droneList = new DroneList();

export default droneList;
