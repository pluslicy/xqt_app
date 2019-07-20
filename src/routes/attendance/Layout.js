import React from 'react';
import {NavBar,Tabs,Grid,Button, List,SegmentedControl } from 'antd-mobile';
import { Chart,Geom,Axis,Tooltip,Coord,Guide } from 'bizcharts';
import DataSet from "@antv/data-set";
const Item = List.Item;
class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // 统计选项卡
      tabs:[
        { title: '实时统计'},
        { title: '周月统计'},
      ],
      //实时统计考勤分类人数
      checkTypeData:[{
        num:2,
        name:'未打卡'
      },{
        num:4,
        name:'迟到'
      },{
        num:8,
        name:'外勤'
      },{
        num:10,
        name:'未激活'
      }],
      // 默认周月显示的选中状态  周/月
      timeType:'周',
      timeValue:new Date(Date.now()),
      // 周月统计
      weekMonthData:[{
        name:'平均工时',
        num:5.4,
      },{
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
      },{
        name:'外勤',
        num:0,
      },{
        name:'加班',
        num:0,
      }],
    };
  }
  // 点击了tab键，向后台发送请求
  tabClick = (tab, index)=>{
    if(index===1){
      this.setState({
        timeType:'week'
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
  }
  render(){
    const { DataView } = DataSet;
    const { Html } = Guide;
    const data = [
      {
        item: "实到人数",
        count: 42
      },{
        item: "未到人数",
        count: 7
      }
    ];
    const dv = new DataView();
    dv.source(data).transform({
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
    return (
     <div className="check-tab">
       <NavBar leftContent=""> 考勤信息 </NavBar>
       <div className="check-tab-div">
        <Tabs tabs={this.state.tabs}
          initialPage={1}
          onTabClick={this.tabClick} 
        >
          {/* 实时统计 */}
          <div className="time-statics-div" style={{backgroundColor: '#fff',paddingTop:'50px',paddingBottom:'50px' }}>
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
                    html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;line-height:3em;&quot;>打卡人数/实到人数<br><span style=&quot;color:#008AE6;font-size:2.5em;&quot;>41/49</span></div>"
                    alignX="middle"
                    alignY="middle"
                  />
                  {/* <br><span style=&quot;color:#008AE6;font-size:1em;line-height:3em;&quot;>打卡明细&gt;&gt;</span> */}
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
                {/* <Button type={this.state.timeType==='week'?'primary':'ghost'} size="small" style={{width:'4em'}} inline onClick={this.timeTypeChange.bind(this,'week')}>周</Button>
                <Button type={this.state.timeType==='month'?'primary':'ghost'} size="small" style={{width:'4em',marginLeft:'5px'}} inline onClick={this.timeTypeChange.bind(this,'month')}>月</Button> */}
                <SegmentedControl values={['周', '月']} onValueChange={this.timeTypeChange}
                style={{ height: '40px'}} />
              </div>
              <div>
                {/* 日期选择器 */}
                {/* <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
                  <DatePicker
                    mode="month"
                    title="Select Date"
                    extra="Optional"
                    value={this.state.timeValue}
                    onChange={date => this.setState({ timeValue:date })}
                  ><List.Item arrow="horizontal">Datetime</List.Item></DatePicker>
                 
                </List> */}
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
                      return <Item key={index} extra={item.num+(index===0?'小时':'人')}arrow="horizontal" onClick={this.showDetails.bind(this,'周月统计',item.name)}>{item.name}</Item>;
                    })
                  }
                </List>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
     </div> 
    )
  }
}
export default Layout;