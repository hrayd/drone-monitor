/**
 * 无人机模拟器-键盘事件监听
 */
import drones from "../stores/DroneList";

export default () => {
  document.addEventListener(
    "keyup",
    (event) => {
      const keyName = event.key;
      switch (keyName) {
        case "i": {
          console.log("上");
          drones.moveUp();
          break;
        }
        case "k": {
          console.log("下");
          drones.moveDown();
          break;
        }
        case "j": {
          console.log("左");
          drones.moveLeft();
          break;
        }
        case "l": {
          console.log("右");
          drones.moveRight();
          break;
        }
        case ",": {
          console.log(",");
          drones.clear();
          break;
        }
        case ".": {
          console.log(".");
          drones.add();
          break;
        }
        default:
          break;
      }
    },
    false
  );
};
