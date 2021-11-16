import React, { useState } from "react";
import { Form, Input, Button, Divider, Card, Row, Col } from "antd";
import Navbar from "../components/Navbar";
import abis from "../abi/abis";
import addresses from "../abi/addresses";
import useContract from "../hooks/useContract";
import useAccount from "../hooks/useAccount";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import CreateProduct from "./CreateProduct";

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

const Dashboard = () => {
  const [form] = Form.useForm();

  const [createProductButton, setCreateProductButton] = useState(false);

  const accounts = window.ethereum.request({ method: "eth_requestAccounts" });
  const { myAccount, balance } = useAccount();
  const producerContract = useContract(addresses.producer, abis.producer);
  const productContract = useContract(
    addresses.productManager,
    abis.productManager
  );

  const navigate = useNavigate();


  

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


  function registerProducer(address, companycode, id, name, validDuration) {
    producerContract.methods
      .registerProducer(address, companycode, id, name, validDuration)
      .send({ from: myAccount })
      .then(console.log);
  }


  if (createProductButton) {
      return <Navigate to= "/newproduct"></Navigate>
  } 

  return (
    <>
      <Navbar />
      <Card className="page-card">
        <Button onClick={()=> navigate("/newproduct")} type="primary" htmlType="submit">
          {" "}
          Create Product{" "}
        </Button>
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

export default Dashboard;
