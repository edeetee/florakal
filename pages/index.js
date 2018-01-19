import React, {Component} from 'react'
import {Calendar, DateRange} from 'react-date-range'
import Reader from '../Reader'
import MonthPicker from '../MonthPicker'
import MonthRange from '../MonthRange'
import chrono from 'chrono-node'

//https://www.materialpalette.com/green/blue

var centerize={
  display: 'flex',  
  justifyContent: 'space-around',
  alignItems: 'center',
  flexDirection: 'row',
  minHeight: '100vh',
  backgroundColor: '#388e3c'
}

var app = { 
  display: 'flex',  
  justifyContent: 'center',
  flexShrink: 0,
  alignItems: 'center',
  flexDirection: 'column',
  boxShadow: '13px 10px 50px -30px',
  minWidth: 400,
  maxWidth: 500,
  padding: 10,
  backgroundColor: 'hsl(0, 0%, 95%)',
  borderRadius: 3
}

export default class Index extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      debugText: '',
      date: Date.now().toString(),
      from: null,
      to: null
    }
  }

  parsed(info){
    var parsed = chrono.parse(info.raw)
    console.log(parsed)
    if(parsed.length == 0)
      this.setState({from: null, to: null})
    else {
      this.setState({
        from: parsed[0].start.knownValues.month-1,
        to: parsed[0].end ? parsed[0].end.knownValues.month-1 :
          parsed[1] ? parsed[1].start.knownValues.month-1 : null
      })
    }
  }

  render(){
    return (
      <div style={centerize}>
        <div>{this.state.debug}</div>
        <div style={app}>
          <Reader placeholder='What, when, where?' 
            onParsed={this.parsed.bind(this)} 
            onDebug={val => {
              this.setState({debug: val})
              this.forceUpdate()
            }}/>
          <MonthRange handleUpdate={(from, to) => this.setState({from:from, to:to})}
            from={this.state.from} to={this.state.to}/>
        </div>
        <div style={{visibility: 'hidden'}}>{this.state.debug}</div>
      </div>
    )
  }
}