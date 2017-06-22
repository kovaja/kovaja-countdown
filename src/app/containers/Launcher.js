import React from "react";

export class Launcher extends React.Component{
    constructor(){
        super();
        this.state = {
            hasError: false,
            name: '',
            time: ''
        };
    }
    
    onNameChange(e){
        this.setState({
            name: e.target.value
        });
    }
    
    onTimeChange(e){
        this.setState({
            hasError: false,
            time: e.target.value
        });
    }

    onLaunch(){
        var seconds = this.parseTime(this.state.time);
        if(isNaN(seconds)){
            this.setState({
                hasError: true
            });
            return;
        }

        var time = seconds*1000;
        this.props.start(this.state.name, time);
        this.setState({
            name:'',
            time:''
        });
    }
    
    onKeyUp(e){
        if(e.keyCode === 13){
            this.onLaunch();
        }
    }
    
    parseTime(t){
        if(t === ''){
            return NaN;
        }
        if(!isNaN(t)){
            return t; //return as seconds
        }
        var parts = t.split(/\s+/);
        if(parts.length > 1){
            var value = this.parseTime(parts[0]);
            if(!isNaN(value)){
                return value * this.getTimeUnit(parts[1]);
            }
        }
        if(!isNaN(parseInt(t))){
            return parseInt(t);
        }
        return NaN;
    }
    
    getTimeUnit(str){
        if(str.match(/(sec)/) || str === 's'){
            return 1;
        }
        if(str.match(/(min|minute)/) || str === 'm'){
            return 60;
        }
        if(str.match(/(hrs|hr|hour)/) || str === 'h'){
            return 60*60;
        }
        return 1;
    }

    render(){
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="col-xs-5">
                        <div className="col-xs-4">
                            <label>Name:</label>
                        </div>
                        <div className="col-xs-8">
                            <input onChange={this.onNameChange.bind(this)} value={this.state.name} className="form-control input-sm" type="text" name="counter-name" />
                        </div>
                    </div>
                    <div className="col-xs-5 form-group">
                        <div className={"col-xs-4 " + (this.state.hasError ? "has-error" : "")}>
                            <label className="control-label">Time:</label>
                        </div>
                        <div className={"col-xs-8 " + (this.state.hasError ? "has-error" : "")}>
                            <input onKeyUp={this.onKeyUp.bind(this)} onChange={this.onTimeChange.bind(this)} value={this.state.time} className="form-control" type="text" name="counter-time"/>
                        </div>
                    </div>
                    <div className="col-xs-2">
                        <button onClick={this.onLaunch.bind(this)} className="btn btn-primary btn-md btn-block">
                            Launch
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}