import React from 'react';
import {NavBar,Tabs,Grid, List,SegmentedControl,Toast,Modal } from 'antd-mobile';
import { Chart,Geom,Axis,Tooltip,Coord,Guide } from 'bizcharts';
import DataSet from "@antv/data-set";
import axios from '../../http';
const Item = List.Item;
function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // 实时统计总数据
      realTimeTotalData:{},
      // 模态框的显示与隐藏
      modal:false,
      // 模态框标题
      modalTitle:'',
      // 统计选项卡
      tabs:[
        { title: '实时统计'},
        { title: '周月统计'},
      ],
      // 实时统计图表数据
      realTimeData:[{
        item: "打卡人数",
        count: 0
      },{
        item: "未到人数",
        count: 0
      }],
      //实时统计考勤分类人数
      checkTypeData:[{
        num:0,
        name:'未打卡'
      },{
        num:0,
        name:'迟到'
      },{
        num:0,
        name:'早退'
      },{
        num:0,
        name:'严重迟到'
      }],
      // 默认周月显示的选中状态  周/月
      timeType:'周',
      // 周月统计
      weekMonthData:[{
        name:'迟到',
        num:23,
      },{
        name:'早退',
        num:27,
      },{
        name:'缺卡',
        num:45,
      },{
        name:'旷工',
        num:10,
      }],
      // 实时统计或者周月统计某一状态详细数据，比如迟到人详细数据
      detailsData:[],
    };
  }
  componentDidMount(){
    this.findRealTimeData();
  }
  //查找数据
  findRealTimeData(){
    Toast.loading('加载中...', 300, () => {
      // console.log('Load complete !!!');
    },false);
    axios.get('/attendace/getAttendanceResult').then((res)=>{
      if(res.status===200){
        Toast.hide();
      }
      console.log(res);
      // res.data是后台给的所有的数据
      // 拦截器处理之后，res.data就是后台返回的数组数据
      // this.setState({
      //   // courses:res.data.data
      //   courses:res.data
      // })
      // this.realTimeTotalData
      this.setState({
        realTimeData:[{
          item: "打卡人数",
          count: res.data.attendance
        },{
          item: "未打卡人数",
          count: res.data.notSingnedTotal
        }],
        checkTypeData:[{
          num:res.data.notSingnedTotal,
          name:'未打卡'
        },{
          num:res.data.lateTotal,
          name:'迟到'
        },{
          num:res.data.earlyTotal,
          name:'早退'
        },{
          num:res.data.seriousLateTotal,
          name:'严重迟到'
        }],
      });
    }).catch((error)=>{
      console.log(error);
    });
  }
  // 某个状态的详细数据
  /* detailsData = [
    {title: '张三' },
    {title: '李四' },
    {title: '李司丞' },
    {title: '张小敬' },
    {title: '王五溜溜' },
    {title: '张三2' },
    {title: '李四' },
    {title: '李司丞' },
    {title: '张小敬' },
    {title: '王五溜溜' },
    {title: '张三' },
    {title: '李四' },
    {title: '李司丞' },
    {title: '张小敬' },
    {title: '王五溜溜' },
    {title: '张三2' },
    {title: '李四' },
    {title: '李司丞' },
    {title: '张小敬' },
    {title: '王五溜溜' },
    {title: '张三2' },
    {title: '李四' },
    {title: '李司丞' },
    {title: '张小敬' },
    {title: '王五溜溜' },
    {title: '张三' },
    {title: '李四' },
    {title: '李司丞' },
    {title: '张小敬' },
    {title: '王五溜溜' },
    {title: '张三2' },
    {title: '李四' },
    {title: '李司丞' },
    {title: '张小敬' },
    {title: '王五溜溜' },
    {title: '张三3' },
    {title: '李四' },
    {title: '李司丞' },
    {title: '张小敬' },
    {title: '王五溜溜' },
    {title: '张三4' },
    {title: '李四' },
    {title: '李司丞' },
    {title: '张小敬' },
    {title: '王五溜溜' },
    {title: '李司丞' },
    {title: '张小敬' },
    {title: '王五溜溜' },
  ].map(obj => ({
    icon: <div style={{lineHeight:'10%',textAlign:'center'}}>{obj.title}</div>,
    // title: obj.title,
  })); */
  // 点击了tab键，向后台发送请求
  tabClick = (tab, index)=>{
    console.log(tab);
    if(index===1){
      this.setState({
        timeType:'周'
      });
    }
  }
  // 点击周，月更改时间类型
  timeTypeChange = (type,event)=>{
    console.log(type);
    this.setState({
      timeType:type
    });
  }
  // 查看考勤详情
  showDetails = (staticType,checkType,event)=>{
    console.log(staticType,checkType);
    this.setState({
      modal:true,
      modalTitle:staticType+'-'+checkType
    });
    /* let trueData = [];
    for(var i=0;i<this.detailsData.length;i+=15){
      trueData.push(this.detailsData.slice(i,i+15));
    }
    ActionSheet.showShareActionSheetWithOptions({
      options: trueData,
      // title: 'title',
      message: staticType+'-'+checkType+'详细数据',
      cancelButtonText:'取消'
    },
    (buttonIndex) => {
      this.setState({ clicked1: buttonIndex > -1 ? this.dataList[buttonIndex].title : '取消' });
      // also support Promise
      return new Promise((resolve) => {
        resolve();
      });
    }); */
  }
  // 模态框关闭
  onClose = () => {
    this.setState({
      modal: false,
    });
  }
  
  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }
  render(){
    const { DataView } = DataSet;
    const { Html } = Guide;
    const dv = new DataView();
    dv.source(this.state.realTimeData).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
    });
    const cols = {
      percent: {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      }
    };
    const htmlStr = `<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;line-height:3em;">打卡人数/实到人数<br><span style="color:#008AE6;font-size:2.5em;">`+this.state.realTimeData[0].count+`/`+(this.state.realTimeData[0].count+this.state.realTimeData[1].count)+`</span></div>`;
    return (
     <div className="check-tab">
       <NavBar leftContent=""> 考勤信息 </NavBar>
       <div className="check-tab-div">
        <Tabs tabs={this.state.tabs}
          initialPage={0}
          onTabClick={this.tabClick} 
        >
          {/* 实时统计 */}
          <div className="time-statics-div" style={{backgroundColor: '#fff',paddingTop:'20px',paddingBottom:'50px' }}>
            {/* 图表 */}
            <div id="chart-div">
              <Chart
                height={300}
                data={dv}
                scale={cols}
                padding={[10,0,0,0]}
                forceFit
              >
                <Coord type={"theta"} radius={0.9} innerRadius={0.895} />
                <Axis name="percent" />
                <Tooltip
                  showTitle={false}
                  itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                />
                <Guide>
                  <Html
                  position={["50%", "50%"]}
                  html={htmlStr}/>
                </Guide>
                <Geom
                  type="intervalStack"
                  position="percent"
                  color={['item', ['#008AE6', '#eeeeee']]}
                  tooltip={[
                    "item*percent",
                    (item, percent) => {
                      percent = percent * 100 + "%";
                      return {
                        name: item,
                        value: percent
                      };
                    }
                  ]}
                  style={{
                    lineWidth: 1,
                    stroke: "#fff"
                  }}
                >
                </Geom>
              </Chart>
            </div>
            {/* 具体分类人数 */}
            <div>
              <Grid hasLine={false} data={this.state.checkTypeData}
                columnNum={4}
                renderItem={item => (
                  <div style={{ padding: '0 12.5px' }} onClick={this.showDetails.bind(this,'实时统计',item.name)}>
                    <div style={{ color: '#008AE6', fontSize: '30px'}}>
                      <span>{item.num}</span>
                    </div>
                    <div style={{ color:'#8c8c8c',fontSize: '16px', marginTop: '12px' }}>
                      <span>{item.name}</span>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
          {/* 周月统计 */}
          <div style={{backgroundColor: '#fff',paddingTop:'10px',paddingBottom:'10px' }}>
            <div className="time-type" style={{padding:'0 10px 10px'}}>
              <div >
                <SegmentedControl values={['周', '月']} onValueChange={this.timeTypeChange}
                style={{ height: '40px'}} />
              </div>
            </div>
            {/* 统计信息 */}
            <div className="time-details">
              <div style={{height:'50px',backgroundColor:'#F5F5F9',lineHeight:'50px',paddingLeft:'10px',color:'#777'}}>46人出勤</div>
              {/* 出勤详细信息 */}
              <div>
                <List className="date-picker-list" style={{ backgroundColor: 'white',marign:'10px' }}>
                  {        
                    this.state.weekMonthData.map((item,index) => {
                      // return <Item key={index} extra={item.num+(index===0?'小时':'人')}arrow="horizontal" onClick={this.showDetails.bind(this,'周月统计',item.name)}>{item.name}</Item>;
                      return <Item key={index} extra={item.num+'人'}arrow="horizontal" onClick={this.showDetails.bind(this,'周月统计',item.name)}>{item.name}</Item>;
                    })
                  }
                </List>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
      <Modal style={{width:'100%'}}
          visible={this.state.modal}
          transparent
          maskClosable={false}
          onClose={this.onClose}
          title={this.state.modalTitle}
          footer={[{ text: '关闭', onPress: () => { this.onClose()} }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: '500px', overflow: 'scroll' }}>
            <Grid data={this.state.detailsData} activeStyle={false} columnNum={3}/>
          </div>
        </Modal>
     </div> 
    )
  }
}
export default Layout;