import React, { useState } from "react";
import { Form, Input, Button, Divider, Card, Row, Col } from "antd";
import Navbar from "../components/Navbar";
import abis from "../abi/abis";
import addresses from "../abi/addresses";
import useContract from "../hooks/useContract";
import useAccount from "../hooks/useAccount";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 12 },
  },
};

const Producer = () => {
  const [form] = Form.useForm();

  const accounts = window.ethereum.request({ method: "eth_requestAccounts" });
  const { myAccount, balance } = useAccount();
  const producerContract = useContract(addresses.producer, abis.producer);
  const productContract = useContract(
    addresses.productManager,
    abis.productManager
  );
  console.log(accounts);
  console.log(myAccount);
  console.log(producerContract);
  console.log(productContract);

  async function connectToMetamask() {
    console.log("Connect to metamask!");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
  }

  //submit
  function handleFinish(values) {
    console.log("Handle Finish");
    // productManager.methods.
  }

  function createProduct(id, companycode, name, price, photohash) {
    productContract.methods
      .createProduct(id, companycode, name, price, photohash)
      .send({ from: myAccount })
      .then(console.log);
  }

  function registerProducer(address, companycode, id, name, validDuration) {
    producerContract.methods
      .registerProducer(address, companycode, id, name, validDuration)
      .send({ from: myAccount }).then(console.log);
  }
  

  return (
    <>
      <Navbar />
      <Card className="page-card">
        <div className="container">
          <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>
            <Form.Item
              name="id"
              label="Product ID"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Button onClick={connectToMetamask} type="primary" htmlType="submit">
            Metamsk
          </Button>
        </div>
      </Card>
    </>
  );
};

export default Producer;
