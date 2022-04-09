import { Table } from "antd";
import { useTheme } from "next-themes";
import React from "react";

export default function Transactions() {
  const columns = [
    {
      title: "Status",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Address",
      key: "address",
      dataIndex: "address",
    },
    {
      title: "Amount(SEL)",
      key: "amount",
    },
  ];

  const data = [];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
}
