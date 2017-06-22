import React from "react";

export class StartHint extends React.Component{
    render(){
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="hint">
                        <div className="text">Start your countdown here</div>
                        <div id="arrow"></div>
                    </div>
                </div>
            </div>
        );
    }
}