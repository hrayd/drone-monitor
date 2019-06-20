import React, { useState } from 'react';
import {Button, Drawer} from 'antd';
import { observer } from 'mobx-react';

const InfoPanel = observer((
    {
        center,
        maxRadium,
        setMaxRadium,
        drones,
    }) => {
    const [visible, setVisible] = useState(true);
    const addDrone = () => {
        drones.add();
        // console.log(drones.list);
    };
    return (
        <Drawer
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={() => setVisible(false)}
            visible={visible}
            mask={false}
        >
            <div>
                圆心位置: {center[0]}, {center[1]}<br/>
                半径：<input type="number" value={maxRadium} onChange={e => setMaxRadium(parseInt(e.target.value, 10))}/>
                <br/>
            </div>
            <Button onClick={addDrone}>ADD DRONE</Button>
        </Drawer>
    );
});

export default InfoPanel;
