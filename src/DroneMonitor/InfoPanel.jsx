import React from 'react';
import { Button, Drawer, Row, Col, Form, Table, Icon, Collapse } from 'antd';
import { observer } from 'mobx-react';

const Panel = Collapse.Panel;

const btnStyle = {
    margin: '0 auto',
    marginTop: '1rem',
    display: 'block',
};

const InfoPanel = observer((
    {
        drones,
        visible,
        setVisible,
        monitor,
        sendMsg,
        isConnected,
        connect,
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
            width: '5%',
        },
        {
            title: '厂家型号',
            key: 'name',
            dataIndex: 'name',
            width: '12%',
        },
        {
            title: '无人机坐标',
            key: 'location',
            dataIndex: 'location',
            width: '16%',
            render: text => `${text[0]}, ${text[1]}`,
        },
        {
            title: '载波频率(GHz)',
            key: 'frequency',
            dataIndex: 'frequency',
            width: '12%',
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
            width: '20%',
        },
        {
            title: '距离(米)',
            key: 'distance',
            dataIndex: 'distance',
            width: '10%',
        },
        {
            title: '操作',
            key: 'operations',
            render: () => (<span>
                <Button icon="alert" style={{ marginRight: '.2rem' }} />
                <Button icon="rise" style={{ marginRight: '.2rem' }} />
                <Button icon="like" style={{ marginRight: '.2rem' }} />
                <Button icon="delete" style={{ marginRight: '.2rem' }} />
            </span>),
        }
    ];

    const autoMove = () => {
        drones.add();
        setTimeout(drones.add, 1000);
        const t3 = setInterval(drones.move, 800);
        setTimeout(() => clearInterval(t3), 10000);
    };

    return (
        <Drawer
            title={title}
            placement="bottom"
            onClose={() => setVisible(false)}
            visible={visible}
            height={500}
        >
            <Form>
                <Row>
                    <Col span={4}>
                        <Button style={btnStyle} onClick={autoMove} type="primary">自动模拟</Button>
                        <Button style={btnStyle} onClick={drones.add} type="primary">模拟添加</Button>
                        <Button style={btnStyle} onClick={drones.move} type="primary">模拟移动</Button>
                        <Button style={btnStyle} onClick={drones.clear} type="primary">清除模拟</Button>
                        <Button style={btnStyle} disabled={isConnected} onClick={connect} type="primary">
                            {isConnected ? '已连接' : '连接'}
                        </Button>
                        <Button style={btnStyle} onClick={sendMsg} type="primary">发送</Button>
                    </Col>
                    <Col span={20}>
                        <Collapse bordered={false} defaultActiveKey={['0']}>
                            <Panel header="无人机列表" key="0">
                                <Table
                                    rowKey="id"
                                    columns={columns}
                                    dataSource={drones.list}
                                    pagination={false}
                                    scroll={{ y: 150 }}
                                    size="small"
                                />
                            </Panel>
                            <Panel header="监测站列表" key="1">
                                <Table
                                    rowKey="id"
                                    columns={[
                                        {
                                            title: '监测设备ID',
                                            dataIndex: 'id',
                                            width: '16%',
                                        },
                                        {
                                            title: '设备名称',
                                            dataIndex: 'name',
                                            width: '10%',
                                        },
                                        {
                                            title: '经度',
                                            dataIndex: 'longitude',
                                            width: '10%',
                                        },
                                        {
                                            title: '纬度',
                                            dataIndex: 'latitude',
                                            width: '10%',
                                        },
                                        {
                                            title: '工作状态',
                                            dataIndex: 'workState',
                                            width: '10%',
                                        },
                                        {
                                            title: '运行状态',
                                            dataIndex: 'runState',
                                            width: '10%',
                                        },
                                        {
                                            title: '覆盖范围',
                                            dataIndex: 'coverRange',
                                            width: '10%',
                                        },
                                        {
                                            title: '操作',
                                            key: 'operations',
                                            render: () => (<span>
                                                <Button icon="alert" style={{ marginRight: '.2rem' }} />
                                                <Button icon="rise" style={{ marginRight: '.2rem' }} />
                                                <Button icon="like" style={{ marginRight: '.2rem' }} />
                                                <Button icon="delete" style={{ marginRight: '.2rem' }} />
                                            </span>),
                                        }
                                    ]}
                                    dataSource={[monitor]}
                                    pagination={false}
                                    scroll={{ y: 150 }}
                                    size="small"
                                    bordered
                                />
                            </Panel>
                            <Panel header="操控者列表" key="2">
                                <Table
                                    rowKey="id"
                                    columns={[
                                        {
                                            title: '型号',
                                            dataIndex: 'modal',
                                            width: '16%',
                                        },
                                        {
                                            title: '角度',
                                            dataIndex: 'angle',
                                            width: '10%',
                                        },
                                        {
                                            title: '站ID',
                                            dataIndex: 'stationId',
                                            width: '10%',
                                        },
                                        {
                                            title: '经度',
                                            dataIndex: 'longitude',
                                            width: '10%'
                                        },
                                        {
                                            title: '纬度',
                                            dataIndex: 'latitude',
                                            width: '10%',
                                        },
                                        {
                                            title: '载波频率',
                                            dataIndex: 'frequency',
                                            width: '10%',
                                        },
                                        {
                                            title: '操作',
                                            key: 'operations',
                                            render: () => (<span>
                                                <Button icon="alert" style={{ marginRight: '.2rem' }} />
                                                <Button icon="rise" style={{ marginRight: '.2rem' }} />
                                                <Button icon="like" style={{ marginRight: '.2rem' }} />
                                                <Button icon="delete" style={{ marginRight: '.2rem' }} />
                                            </span>),
                                        },
                                    ]}
                                    dataSource={[]}
                                    pagination={false}
                                    scroll={{ y: 120 }}
                                    size="small"
                                    bordered
                                />
                            </Panel>
                            <Panel header="白名单" key="3">
                                <Table
                                    rowKey="id"
                                    columns={columns}
                                    dataSource={[]}
                                    pagination={false}
                                    scroll={{ y: 80 }}
                                    size="small"
                                    bordered
                                />
                            </Panel>
                            <Panel header="历史活动" key="4">
                                <Table
                                    rowKey="id"
                                    columns={[
                                        {
                                            title: '活动名称',
                                            dataIndex: 'name',
                                            width: '25%',
                                        },
                                        {
                                            title: '开始时间',
                                            dataIndex: 'startTime',
                                            width: '25%',
                                        },
                                        {
                                            title: '结束时间',
                                            dataIndex: 'endTime',
                                            width: '25%',
                                        },
                                        {
                                            title: '操作',
                                            key: 'operations',
                                            render: () => (<span>
                                                <Button icon="file-text" style={{ marginRight: '.2rem' }} />
                                                <Button icon="rise" style={{ marginRight: '.2rem' }} />
                                                <Button icon="like" style={{ marginRight: '.2rem' }} />
                                                <Button icon="delete" style={{ marginRight: '.2rem' }} />
                                            </span>),
                                        }
                                    ]}
                                    dataSource={[]}
                                    pagination={false}
                                    scroll={{ y: 80 }}
                                    size="small"
                                    bordered
                                />
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
});

export default InfoPanel;
