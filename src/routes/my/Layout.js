import React from 'react';
import {NavBar,List,WhiteSpace,Button,WingBlank, Flex} from 'antd-mobile'
const Item = List.Item;
const Brief = Item.Brief;
class Layout extends React.Component {
  render(){
    return (
     <div>
       <NavBar leftContent=""> 我的 </NavBar>
        <div className="user-div" style={{backgroundColor:"#fff",display:"flex",height:"100px"}}>
          <img src={require('./1.png')} style={{width:"60px",height:"60px",marginLeft:"5px",borderRadius:"50%",margin:"20px 20px"}}/>
          <div className="user-content" style={{fontSize:"18px",marginLeft:"10px",marginTop:"40px"}}>张佳乐</div>
        </div>
        <List>
        <Item

          thumb={require('./phone.png')}
          multipleLine  
          multipleLine  
          onClick={() => {}}
        >手机号码
        <span style={{marginLeft:"30px"}}>15555555555</span>
        </Item>
        <Item
          thumb={require('./email.png')}
          onClick={() => {}}
          multipleLine  
          multipleLine  
        >
        电子邮箱
        <span style={{marginLeft:"30px"}}>2627973337@qq.com</span>
        </Item>
      </List>
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      <WhiteSpace size="xl" />
      <WingBlank size="xl"><Button type="warning">退出登录</Button></WingBlank><WhiteSpace />
      
     </div> 
    )
  }
}

export default Layout;