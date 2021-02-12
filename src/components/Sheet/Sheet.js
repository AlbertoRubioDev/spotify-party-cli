import React, { useState } from "react";
import Search from "../Search";
import { Layout, Menu } from "antd";
import ChatRoom from "../Chat/Chat";
import {AuthContext} from "../../context";
import Authentication from "../Authentication";

const { Content, Footer } = Layout;

const Sheet = () => {

  const [loggedIn, setLoggedIn] = useState(false);    
  
  const login = () => {
    setLoggedIn(true);
  }    

  const logout = () => {
    setLoggedIn(false);
  }
  return (
    <AuthContext.Provider value={{isLoggedIn: loggedIn , login:login, logout:logout}}>
    <Layout bordered hoverable>
      <Content style={{ padding: "0 50px" }}>
        <Authentication />
        <Search />
        <ChatRoom roomId={1}/>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
    </AuthContext.Provider>

  );
};

export default Sheet;
