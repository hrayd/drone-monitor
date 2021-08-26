// 数据面板
import React from "react";
import { Button, Drawer, Table, Icon, Tooltip, Tabs } from "antd";
import { observer } from "mobx-react";
import {
  controllerListColumns,
  droneListColumns,
  historyColumns,
  stationListColumns,
} from "../utils/getPanelTableColumns";
const TabPane = Tabs.TabPane;

const InfoPanel = observer(
  ({ drones, visible, setVisible, monitor, isConnected, connect }) => {
    const title = (
      <div>
        <Icon
          type="caret-down"
          style={{ width: "2rem" }}
          onClick={() => setVisible(false)}
        />
        <span>控制面板</span>
        <Button
          disabled={isConnected}
          onClick={connect}
          type="primary"
          style={{ marginLeft: "1rem" }}
        >
          {isConnected ? "已连接" : "连接"}
        </Button>
        <Tooltip title="无人机模拟：句号新增无人机，逗号清空无人机；i、j、k、l分别控制上左下右。">
          <Icon
            type="question-circle"
            style={{ float: "right", marginRight: "2rem", fontSize: "1.5rem" }}
          />
        </Tooltip>
      </div>
    );

    // 用于演示的无人机自动移动
    // const autoMove = () => {
    //     drones.add();
    //     setTimeout(drones.add, 1000);
    //     const t3 = setInterval(drones.move, 800);
    //     setTimeout(() => clearInterval(t3), 10000);
    // };

    return (
      <Drawer
        title={title}
        placement="bottom"
        onClose={() => setVisible(false)}
        visible={visible}
        height={350}
      >
        <Tabs defaultActiveKey="1" tabPosition="left">
          <TabPane tab="无人机列表" key="1">
            <Table
              rowKey="id"
              columns={[
                ...droneListColumns,
                {
                  title: "操作",
                  key: "operations",
                  render: () => (
                    <span>
                      <Button icon="alert" style={{ marginRight: ".2rem" }} />
                      <Button icon="rise" style={{ marginRight: ".2rem" }} />
                      <Button icon="like" style={{ marginRight: ".2rem" }} />
                      <Button icon="delete" style={{ marginRight: ".2rem" }} />
                    </span>
                  ),
                },
              ]}
              dataSource={drones.list}
              pagination={false}
              scroll={{ y: 200 }}
              size="small"
              bordered
            />
          </TabPane>
          <TabPane tab="监测站列表" key="2">
            <Table
              rowKey="id"
              columns={[
                ...stationListColumns,
                {
                  title: "操作",
                  key: "operations",
                  render: () => (
                    <span>
                      <Button icon="alert" style={{ marginRight: ".2rem" }} />
                      <Button icon="rise" style={{ marginRight: ".2rem" }} />
                      <Button icon="like" style={{ marginRight: ".2rem" }} />
                      <Button icon="delete" style={{ marginRight: ".2rem" }} />
                    </span>
                  ),
                },
              ]}
              dataSource={[monitor]}
              pagination={false}
              scroll={{ y: 180 }}
              size="small"
              bordered
            />
          </TabPane>
          <TabPane tab="操控者列表" key="3">
            <Table
              rowKey="id"
              columns={[
                ...controllerListColumns,
                {
                  title: "操作",
                  key: "operations",
                  render: () => (
                    <span>
                      <Button icon="alert" style={{ marginRight: ".2rem" }} />
                      <Button icon="rise" style={{ marginRight: ".2rem" }} />
                      <Button icon="like" style={{ marginRight: ".2rem" }} />
                      <Button icon="delete" style={{ marginRight: ".2rem" }} />
                    </span>
                  ),
                },
              ]}
              dataSource={[]}
              pagination={false}
              scroll={{ y: 180 }}
              size="small"
              bordered
            />
          </TabPane>
          <TabPane tab="白名单" key="4">
            <Table
              rowKey="id"
              columns={[
                ...droneListColumns,
                {
                  title: "操作",
                  key: "operations",
                  render: () => (
                    <span>
                      <Button icon="alert" style={{ marginRight: ".2rem" }} />
                      <Button icon="rise" style={{ marginRight: ".2rem" }} />
                      <Button icon="like" style={{ marginRight: ".2rem" }} />
                      <Button icon="delete" style={{ marginRight: ".2rem" }} />
                    </span>
                  ),
                },
              ]}
              dataSource={[]}
              pagination={false}
              scroll={{ y: 180 }}
              size="small"
              bordered
            />
          </TabPane>
          <TabPane tab="历史活动" key="5">
            <Table
              rowKey="id"
              columns={[
                ...historyColumns,
                {
                  title: "操作",
                  key: "operations",
                  render: () => (
                    <span>
                      <Button
                        icon="file-text"
                        style={{ marginRight: ".2rem" }}
                      />
                      <Button icon="rise" style={{ marginRight: ".2rem" }} />
                      <Button icon="like" style={{ marginRight: ".2rem" }} />
                      <Button icon="delete" style={{ marginRight: ".2rem" }} />
                    </span>
                  ),
                },
              ]}
              dataSource={[]}
              pagination={false}
              scroll={{ y: 180 }}
              size="small"
              bordered
            />
          </TabPane>
        </Tabs>
      </Drawer>
    );
  }
);

export default InfoPanel;
