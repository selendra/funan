import { Table } from "antd";
import React from "react";

export default function Assets() {
  const columns = [
    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
    },
    {
      title: "Available",
      dataIndex: "available",
      key: "available",
    },
    {
      title: "Deposited",
      key: "deposited",
      dataIndex: "deposited",
    },
    {
      title: "Borrowed",
      key: "borrowed",
    },
    {
      title: "Actions",
      key: "actions",
    },
  ];

  const data = [];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
