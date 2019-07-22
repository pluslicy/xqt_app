import React from 'react';
import {NavBar} from 'antd-mobile'

class Layout extends React.Component {

  constructor(props){
    super(props);
  }


  render(){
    return (
     <div id="cc" style={{height:'100%'}}>
       <NavBar leftContent=""> 视频监控 </NavBar>
       {/* 视频流 */}
       <iframe id='videoFrame' style={{width: '100%',height:'100%',border: '0', padding: 0,margin: 0}} src="http://134.175.154.93/rtmp.html"></iframe>
     </div> 
    )
  }
}

export default Layout;