import {Component} from 'react'

const months = ['January', 'February', 'March', 'April', 'May', 
'June', 'July', 'August', 'September', 'October', 'November', 'December']

const selectColor = '#448AFF'
const highlightColor = '#C8E6C9'
const background = '#FFFFFF'

class MonthPicker extends Component{
    constructor(props){
        super(props)
        this.state={
            selected: props.selected,
            highlighted: props.highlighted
        }
    }

    componentWillReceiveProps(props){
        this.setState(props)
    }

    handleSelect(n){
        if(n == this.state.selected)
            n = null
        
        if(this.props.handleSelect)
            this.props.handleSelect(n)
        else
            this.setState({selected: n})
    }

    renderMonths(){
        return months.map((mnth, i) => {
            let color = (i == this.state.selected) ? 
                (this.props.selectColor || selectColor) : (this.state.highlighted.includes(i) ? 
                highlightColor : color)
            return <div key={i} onClick={e => this.handleSelect(i)} style={{
                cursor: 'pointer',
                textAlign: 'center',
                margin: '2px 0',
                borderRadius: 4,
                fontSize: 24, 
                padding: '4px 4px', 
                border: 'none',
                backgroundColor: color
            }}>{mnth}</div>
        })
    }

    render(){
        return(
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'stretch',
                backgroundColor: background,
                padding: '8px 12px',
                borderRadius: 1,
                color: '#212121'
            }}>
                {this.renderMonths()}
            </div>
        )
    }
}

export default MonthPicker