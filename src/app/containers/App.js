import React from 'react';
import {Header} from '../components/Header';
import {StartHint} from '../components/StartHint';
import {Launcher} from './Launcher';
import {Countdown} from '../components/Countdown';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            countdowns: {
                /*99: {
                    name: 'Test',
                    time: 60 * 1000,
                    end: new Date().getTime() + 60 * 1000,
                    running: true
                },
                100: {
                    name: 'Test 2',
                    time: 11 * 1000,
                    end: new Date().getTime() + 11 * 1000,
                    running: true
                }*/
            }
        };
    }
    componentDidMount() {
        this.start();
    }
    start() {
        var interval = setInterval(() => {
            this.iterate();
        }, 1000);
        this.setState({interval: interval});
    }
    iterate() {
        var cds = this.state.countdowns;
        for (var c in cds) {
            if (cds.hasOwnProperty(c)) {
                this.updateCountdown(cds[c]);
            }
        }
        this.setState({countdowns: cds});
    }
    updateCountdown(c) {
        if (c.running) {
            var newTime = c.end - new Date();
            newTime = Math.floor(newTime / 1000) * 1000;
            c.time = newTime;
            c.running = !(newTime <= 0);
        }
    }
    startCountdown(name, time) {
        var cds = this.state.countdowns;
        cds[Object.keys(cds).length] = {
            name: name,
            time: time,
            end: new Date().getTime() + time,
            running: true
        };
        this.setState({
            countdowns: cds
        });
    }
    stopCountdown(id) {
        var cds = this.state.countdowns;
        delete cds[id];
        this.setState({countdowns: cds});
    }
    formatTime(t) {
        /*var dayUnit = 24*60*60;
         var hourUnit = 60*60;
         var minUnit = 60;*/

        var d = new Date(t);
        var days = d.getUTCDate() - 1;
        var h = days * 24 + d.getUTCHours();
        var m = d.getMinutes();
        var s = d.getSeconds();

        /*var dayUnit = 24*60*60;
         var hourUnit = 60*60;
         var minUnit = 60;
         t = t / 1000;
         var days = t / dayUnit >= 1 ? Math.floor(t / dayUnit) : 0;
         t = t - days*dayUnit;
         var h = t / hourUnit >= 1 ? (days*24 + Math.floor(t / hourUnit)) : 0;
         t = t - h * hourUnit;
         var m = t / minUnit >= 1 ? Math.floor(t / minUnit) : 0;
         var s = t - m*minUnit;*/
        var hh = h < 10 ? '0' + h : h;
        var mm = m < 10 ? '0' + m : m;
        var ss = s < 10 ? '0' + s : s;
        return hh + ':' + mm + ':' + ss;
    }
    getCountdowns() {
        var cds = [];
        for (var id in this.state.countdowns) {
            if (this.state.countdowns.hasOwnProperty(id)) {
                var cd = this.state.countdowns[id];
                cds.push(
                        <Countdown 
                            key={id}
                            id={id}
                            timestamp={cd.time}
                            name={cd.name}
                            time={this.formatTime(cd.time)}
                            stop={this.stopCountdown.bind(this)}
                            running={cd.running}
                            />
                        );
            }
        }
        cds.sort((a, b) => {
            return a.props.timestamp - b.props.timestamp;
        });
        return cds;
    }

    render() {
        var cds = this.getCountdowns();
        return (
                <div className="container">
                    <Header />
                    <hr/>
                    <Launcher start={this.startCountdown.bind(this)}/>
                    {cds.length > 0 ? cds : <StartHint />}
                    <hr/>
                    <h4>TO DO LIST</h4>
                    <p>Countdown radek vetsi a vic cool text</p>
                    <p>Bootstrap full responsibility</p>
                    <p>
                        <del>Serazovani countdowns</del>,
                        <del>Validace vstupu do time cisla nebo 1 min 10 hours atd</del>,
                        <del>Dobehnuti countdown</del>,
                        <del>On enter vlozeni</del>,
                        <del>Reakce na moc dlouhy input name</del>,
                        <del>Reakce na spatny input time</del>,
                        <del>Formatovani odpoctu</del>,
                        <del>Musi se udelat jeden pool, ktery bude drzet ty casy a bude volat jeden interval,
                            ty mu jen budes podsovat vic casu nebo mene casu, countdown pak v podstate bude componenta</del>,
                        <del>Oprava hlasky no countdowns na start your countdown here</del>,
                    </p>
                </div>
                );
    }
}

