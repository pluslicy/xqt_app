import React from 'react';
import { connect } from 'dva';
import { TabBar} from 'antd-mobile'
import Video from './video/Layout'
import Attendance from './attendance/Layout'
import My from './my/Layout'

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'attendance',
      hidden: false,
    };
  }

  render(){

    let content ;
    switch(this.state.selectedTab){
      case "attendance":
        content = <Attendance/>;
        break;
      case "video":
        content = <Video/>;
        break;
      case "my":
        content = <My/>;
        break;
    }

    return (
      <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 } }>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}>
          {/* 考勤  */}
          <TabBar.Item
            title="考勤"
            key="attendance"
            icon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px',
              background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
            />
            }
            selected={this.state.selectedTab === 'attendance'}
            onPress={() => {
              this.setState({selectedTab: 'attendance'});
            }}
            data-seed="logId"
          >
            {content}
          </TabBar.Item>
          {/* 视频监控 */}
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
              />
            }
            title="视频"
            key="video"
            selected={this.state.selectedTab === 'video'}
            onPress={() => {
              this.setState({
                selectedTab: 'video',
              });
            }}
            data-seed="logId1"
          >
            {content}
          </TabBar.Item>
          {/* 我的 */}
          <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'my'}
            onPress={() => {this.setState({  selectedTab: 'my', }); }}
          >
           {content}
          </TabBar.Item>
        </TabBar>
      </div>
  );
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
