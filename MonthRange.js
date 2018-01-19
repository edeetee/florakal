import {Component} from 'react'
import MonthPicker from './MonthPicker'

class MonthRange extends Component{
    constructor(props){
        super(props)
        this.state = {
            from: props.from,
            to: props.to,
            highlighted: []
        }
    }

    componentWillReceiveProps(props){
        this.setState({from: props.from, to: props.to, 
            highlighted: this.getHighlighted(props.from, props.to)})
    }

    handleUpdate(from, to){
        if(this.props.handleUpdate) 
            this.props.handleUpdate(from, to)
        else
            this.setState({from: from, to: to,
                highlighted: this.getHighlighted(from, to)})

    }

    getHighlighted(from, to){
        if(from == null && to == null)
            return []
        else if(to == null)
            return [from]
        else if(from == null)
            return []
        else if(from-to == 0)
            return Array.from(new Array(12), (x, i) => i)

        var highlighted = []
        while(from != to){
            highlighted.push(from)
            from = (from+1)%12
        }
        highlighted.push(to)

        return highlighted
    }

    render(){
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
                <MonthPicker 
                    handleSelect={n => this.handleUpdate(n, this.state.to)} 
                    selected={this.state.from} 
                    highlighted={this.state.highlighted}/>
                <div style={{width: 30}} />
                <MonthPicker 
                    handleSelect={n => this.handleUpdate(this.state.from, n)} 
                    selected={this.state.to} 
                    highlighted={this.state.highlighted} />
            </div>
        )
    }
}

export default MonthRange