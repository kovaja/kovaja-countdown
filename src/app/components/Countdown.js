import React from "react";

export class Countdown extends React.Component {
    render() {
        return (
            <div className={"row " + (this.props.running ? "" : "done")}>
                <div className="col-xs-12">
                    <div className="col-xs-5">
                        <div className="col-xs-12">
                            <label
                              className="name"
                              title={this.props.name}
                            >
                                {this.props.name}
                            </label>
                        </div>
                    </div>
                    <div className="col-xs-5">
                        <div className="col-xs-12">
                            <span>{this.props.time}</span>
                        </div>
                    </div>
                    <div className="col-xs-2">
                        <button
                            className="btn btn-danger btn-xs btn-block"
                            onClick={() => { this.props.stop(this.props.id) }}
                        >
                            {this.props.running ? "Stop" : "Remove"}
                        </button>
                    </div>
                </div>
            </div>
        );
    };
};