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

const CreateProduct = () => {
  const [form] = Form.useForm();
  const [product, setProduct] = useState({
      id: "",
      companycode: "",
      name: "",
      price: 0,
      photohash: ""
  });

  const accounts = window.ethereum.request({ method: "eth_requestAccounts" });
  const { myAccount, balance } = useAccount();
  const producerContract = useContract(addresses.producer, abis.producer);
  const productContract = useContract(
    addresses.productManager,
    abis.productManager
  );

  async function connectToMetamask() {
    console.log("Connect to metamask!");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);
  }

  //submit
  async function handleFinish(values) {
    await setProduct({
            id: values.id,
            companycode: values.companycode,
            name: values.companycode,
            price: values.price,
            photohash: values.photohash
        });

    createProduct(
      product.id,
      product.companycode,
      product.name,
      product.price,
      product.photohash
    );
  }


  function createProduct(id, companycode, name, price, photohash) {
    productContract.methods
      .createProduct(id, companycode, name, price, photohash)
      .send({ from: myAccount })
      .then(console.log);
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
            <Form.Item
              name="companycode"
              label="Company Code"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="photohash" label="Photo Hash" >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Product
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

export default CreateProduct;