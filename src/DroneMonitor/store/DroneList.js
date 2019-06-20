import { decorate, observable, action } from 'mobx';

class Drone {
    constructor(name, location, height, state, receiverId, args=[]) {
        this.id = Math.random();
        this.name = name;
        this.location = location;
        this.height = height;
        this.state = state;
        this.receiverId = receiverId;
        this.args = args;
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
                parseFloat((116.347 + flag * (Math.random() / 100)).toFixed(3)),
                parseFloat((40.035 + flag * (Math.random() / 100)).toFixed(3)),
            ];
            this.list.push(new Drone(
                `无人机${randomN}`,
                location,
                `${randomN}`,
                1,
                1,
                [],
            ));
        }
    };

    delete(item) {
        if (item.id) {
            this.list = this.list.filter(l => l.id !== item.id);
        }
    }

    update(item) {
        if (item.id) {
            this.list = this.list.map(l => {
                if (l.id !== item.id) {
                    return l;
                }
                return item;
            })
        }
    }

    clear() {
        this.list = [];
    }
}

decorate(DroneList, {
    list: observable,
    add: action,
    delete: action,
    update: action,
    clear: action,
});

export default DroneList;
