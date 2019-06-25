import React, { useState } from 'react';
import { Button, Drawer, Input, Row, Col, Form, Table, Icon } from 'antd';
import { observer } from 'mobx-react';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
};

// const btnGroupStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-around',
// };
const btnStyle = {
    marginLeft: '1rem',
    marginTop: '1rem',
    display: 'block',
};

const InfoPanel = observer((
    {
        center,
        maxRadium,
        setMaxRadium,
        drones,
        visible,
        setVisible
    }) => {
    const title = (
        <div>
            <Icon type="caret-down" style={{ width: '2rem' }} onClick={() => setVisible(false)} />
            <span>控制面板</span>
        </div>
    );

    const columns = [
        {
            title: '编号',
            key: 'index',
            dataIndex: 'index',
            render: (text, record, index) => (index + 1),
            width: '8%',
        },
        {
            title: '厂家型号',
            key: 'name',
            dataIndex: 'name',
            width: '15%',
        },
        {
            title: '无人机坐标',
            key: 'location',
            dataIndex: 'location',
            width: '20%',
            render: text => `${text[0]}, ${text[1]}`,
        },
        {
            title: '载波频率(GHz)',
            key: 'frequency',
            dataIndex: 'frequency',
            width: '15%',
        },
        {
            title: '方向角',
            key: 'angle',
            dataIndex: 'angle',
            width: '10%',
        },
        {
            title: '发现时间',
            key: 'discoveryTime',
            dataIndex: 'discoveryTime',
            width: '15%',
        },
        {
            title: '距离(米)',
            key: 'distance',
            dataIndex: 'distance',
            width: '17%',
        },
    ];

    const autoMove = () => {
        drones.add();
        setTimeout(drones.add, 1000);
        const t3 = setInterval(drones.move, 800);
        setTimeout(() => clearInterval(t3), 10000);
    };

    if (visible) {
        return (
            <Drawer
                title={title}
                placement="bottom"
                closable={false}
                onClose={() => setVisible(false)}
                visible={visible}
                mask={false}
                height={400}
            >
                <Form>
                    <Row>
                        {/*<Col span={12}>*/}
                        {/*    <FormItem label="中心位置" {...formItemLayout}>*/}
                        {/*        {center[0]}, {center[1]}*/}
                        {/*    </FormItem>*/}
                        {/*</Col>*/}
                        {/*<Col span={12}>*/}
                        {/*    <FormItem label="监测半径" {...formItemLayout}>*/}
                        {/*        <Input type="number" value={maxRadium} onChange={e => setMaxRadium(parseInt(e.target.value, 10))}/>*/}
                        {/*    </FormItem>*/}
                        {/*</Col>*/}
                        <Col span={2}>
                            <Button style={btnStyle} onClick={autoMove} type="primary">自动模拟</Button>
                            <Button style={btnStyle} onClick={drones.add} type="primary">模拟添加</Button>
                            <Button style={btnStyle} onClick={drones.move} type="primary">模拟移动</Button>
                            <Button style={btnStyle} onClick={drones.clear} type="primary">清除模拟</Button>
                        </Col>
                        <Col span={10}>
                            <Table
                                rowKey="id"
                                columns={columns}
                                dataSource={drones.list}
                                pagination={false}
                                scroll={{ y: 240 }}
                                size="small"
                                bordered
                                title={() => <div style={{ textAlign: 'center' }}>无人机列表</div>}
                            />
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        );
    }
    return (
        <div style={{ height: '2rem', width: '2rem', float: 'right', marginRight: '1rem', fontSize: '1.5rem' }}>
            <Button type="primary" onClick={() => console.log('2')} >
                <Icon type="double-left"/>
            </Button>
        </div>
    );
});

export default InfoPanel;
