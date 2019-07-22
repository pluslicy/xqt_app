import React from 'react';
import style from './login.css';
import { List, InputItem, Button,WhiteSpace ,Toast} from 'antd-mobile';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state ={
        user:'',
        password:''
    }
  }
  handleChange(key,val) {
    this.setState({[key]:val})
  }

  handleSubmit(){
    Toast.loading('登录中',3,()=>{
      console.log('关闭了')
    })
  }


  render(){
    return (
      <div style={{position:"absolute",top:0,bottom:0,width:'100%'}}>
        <div className={style.bg}>
          农大校企通
        </div>
        <div>
          <List>
            <InputItem
              onChange={this.handleChange.bind(this,'user')}
              clear
              placeholder="">用户名</InputItem>
            <InputItem
              onChange={this.handleChange.bind(this,'password')}
              type="password"
              clear
              placeholder="" >密码</InputItem>
            <WhiteSpace/>
            <Button onClick={this.handleSubmit.bind(this)} type="primary" style={{marginLeft:'.5em',marginRight:'.5em'}}>登录</Button>
          </List>

        </div>
      </div>
    )
  }
}

export default Login;