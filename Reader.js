import React from 'react'
import nlp from 'compromise'
import TextareaAutosize from 'react-autosize-textarea';

var debug = true

function arrToElm(arr, title){
    return [
        <h3>{title}</h3>,
        arr.map(x => {
            if(debug)
                x = nlp(x).out('terms')
                    .map(term => term.text + ": " + term.tags.join(' '))
                    .map(text => <p style={{margin: 0}}>{text}</p>)
            return <p>{x}</p>
        })
    ]
}

class Reader extends React.Component{
    constructor(props){
        super(props)
    }

    read(text){
        if(Date.now() - this.lastRead < 500){
            if(!this.waitingRead){
                setTimeout(() => {
                    if(this.waitingRead){
                        var text = this.waitingRead
                        this.waitingRead = null
                        this.read(text)
                    }
                }, 500)
            }
            this.waitingRead = text
            return
        }
        this.waitingRead = false

        this.lastRead = Date.now()

        var doc = nlp(text)

        var things = doc.match('#Adjective? #Noun')
            .not('#Pronoun').not('#Date').not('#Place').out('array')

        var places = doc.places().out('array')
        var dates = doc.dates().out('array')

        var out = []
        if(dates.length)
            out.push(arrToElm(dates, 'Dates'))
        if(places.length)
            out.push(arrToElm(places, 'Places'))
        if(things.length)
            out.push(arrToElm(things, "Things"))

        if(this.props.onDebug)
            this.props.onDebug(out)

        if(this.props.onParsed)
            this.props.onParsed({things: things, places: places, raw: text})
    }

    render(){
        return (
            <TextareaAutosize
                placeholder={this.props.placeholder}
                style={{
                    resize: 'none',
                    fontSize:26, 
                    padding: '2px 8px', 
                    border: 0, 
                    margin: '10px 5px', 
                    alignSelf: 'stretch'
                }} onChange={e => this.read(e.target.value)} />
        )
    }
}

export default Reader