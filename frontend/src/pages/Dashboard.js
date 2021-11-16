import React, { useState } from "react";
import { Form, Input, Button, Divider, Card, Row, Col, Table } from "antd";
import Navbar from "../components/Navbar";
import abis from "../abi/abis";
import addresses from "../abi/addresses";
import useContract from "../hooks/useContract";
import useAccount from "../hooks/useAccount";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import metamask from '../images/meta.png'
import CreateProduct from "./CreateProduct";

const ButtonGroup = Button.Group;

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

  const columns = [
    {
      title: 'ID',
      width: 100,
      key: 'id',
      fixed: 'left',
      render: (item)=> <a href={'/xxx'}>{item.id}</a>
    },
    {
      title: 'Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Producer',
      dataIndex: 'producer',
      key: 'producer',
      width: 150,
    },
    {
      title: 'Transfer Owner',
      key: 'transfer_owner',
      width: 150,
      render: (item)=> <Button onClick={()=> alert('transfer owner id: '+item.id)} style={{background:'#7aafff' , color:'white', fontWeight:'500'}}>Transfer Owner</Button>
    },
    {
      title: 'Accept / Reject',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (item) => <div> 
        {item.status.toLowerCase() === 'shipped'?<ButtonGroup>
      <Button onClick={()=> alert('Accept'+item.id)} style={{background:'#a7db79' , color:'white', fontWeight:'500'}}>Accept</Button>
      <Button onClick={ ()=> alert('Reject'+item.id)} style={{background:'#fa6c61' , color:'white', fontWeight:'500' }}>Reject</Button>
    </ButtonGroup>:''}  
        </div>,
    },
  ];
  
  const data = [];
  for (let i = 0; i < 20; i++) {
    if(i<5){
      data.push({
        id: i,
        name: `Edrward ${i}`,
        producer: 'test',
        transfer_owner: `London Park no. ${i}`,
        status:'shipped'
      });
    }else if(i>4 && i<9){
      data.push({
        id: i,
        name: `Edrward ${i}`,
        producer: 'test',
        transfer_owner: `London Park no. ${i}`,
        status:'unknown'
      });
    }else{
      data.push({
        id: i,
        name: `Edrward ${i}`,
        producer: 'test',
        transfer_owner: `London Park no. ${i}`,
        status:'shipped'
      });
    }
   
  }

  const accounts = window.ethereum&&window.ethereum.request({ method: "eth_requestAccounts" });
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
          <Button style={{background:'#f0c400', color: 'white',fontWeight:'500',fontSize:'15px'}} onClick={connectToMetamask} type="warning" htmlType="submit">
            <img width={21} height={21} src={metamask} alt={metamask}/>  {' '} Metamask
          </Button>
        </div>
        <div style={{marginTop:'20px'}}>
        <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 1000 }} />,
        </div>
        </Card>
     
    </>
  );
};

export default Dashboard;
