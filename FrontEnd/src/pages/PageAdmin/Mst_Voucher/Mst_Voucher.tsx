import React from "react";
import AdminPageLayout from "../../../packages/layouts/admin-page-layout/admin-page-layout";
import { Button, Card, Col, Row } from "antd";
import { BiLogoShopify } from "react-icons/bi";

export default function Mst_Voucher() {
  return (
    <AdminPageLayout>
      <Row
        gutter={16}
        style={{
          margin: "20px",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Col span={8}>
          <Card bordered={false}>
            <div className="flex">
              <BiLogoShopify size={20} color="#bb0000" className="mr-2 mb-5" />{" "}
              <b>Voucher toàn shop</b>
            </div>
            <div>Voucher áp dùng cho tất cả sản phẩm trong shop của bạn!</div>
            <Button
              style={{
                backgroundColor: "#bb0000",
                color: "white",
                fontWeight: "bold",
                marginLeft: "80%",
              }}
            >
              Tạo
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <div className="flex">
              <BiLogoShopify size={20} color="#bb0000" className="mr-2 mb-5" />{" "}
              <b>Voucher toàn shop</b>
            </div>
            <div>Voucher áp dùng cho tất cả sản phẩm trong shop của bạn!</div>
            <Button
              style={{
                backgroundColor: "#bb0000",
                color: "white",
                fontWeight: "bold",
                marginLeft: "80%",
              }}
            >
              Tạo
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <div className="flex">
              <BiLogoShopify size={20} color="#bb0000" className="mr-2 mb-5" />{" "}
              <b>Voucher toàn shop</b>
            </div>
            <div>Voucher áp dùng cho tất cả sản phẩm trong shop của bạn!</div>
            <Button
              style={{
                backgroundColor: "#bb0000",
                color: "white",
                fontWeight: "bold",
                marginLeft: "80%",
              }}
            >
              Tạo
            </Button>
          </Card>
        </Col>
      </Row>
    </AdminPageLayout>
  );
}
