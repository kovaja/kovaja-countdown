import React from 'react';
import { Header } from '../components/Header';
import { StartHint } from '../components/StartHint';
import { Launcher } from './Launcher';
import { Countdown } from '../components/Countdown';

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
        const interval = setInterval(() => {
            this.iterate();
        }, 1000);

        this.setState({ interval });
    }
    iterate() {
        const countdowns = this.state.countdowns;

        for (const countdown in countdowns) {
            if (countdowns.hasOwnProperty(countdown)) {
                this.updateCountdown(countdowns[countdown]);
            }
        }
        this.setState({ countdowns });
    }
    updateCountdown(countdown) {
        if (!countdown.running) {
            return;
        }

        let newTime = countdown.end - new Date();
        newTime = Math.floor(newTime / 1000) * 1000;

        countdown.time = newTime;
        countdown.running = !(newTime <= 0);

    }
    startCountdown(name, time) {
        const countdowns = this.state.countdowns;

        countdowns[Object.keys(countdowns).length] = {
            name: name,
            time: time,
            end: new Date().getTime() + time,
            running: true
        };

        this.setState({ countdowns });
    }
    stopCountdown(id) {
        const countdowns = this.state.countdowns;

        delete countdowns[id];

        this.setState({ countdowns });
    }
    formatTime(t) {
        const d = new Date(t);
        const days = d.getUTCDate() - 1;
        const h = days * 24 + d.getUTCHours();
        const m = d.getMinutes();
        const s = d.getSeconds();

        const hh = h < 10 ? '0' + h : h;
        const mm = m < 10 ? '0' + m : m;
        const ss = s < 10 ? '0' + s : s;

        return hh + ':' + mm + ':' + ss;
    }
    getCountdowns() {
        const cds = [];

        for (const id in this.state.countdowns) {
            if (this.state.countdowns.hasOwnProperty(id)) {
                const cd = this.state.countdowns[id];

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
        const cds = this.getCountdowns();

        return (
            <div className="container">
                <Header />
                <hr />

                <Launcher start={this.startCountdown.bind(this)} />
                {cds.length > 0 ? cds : <StartHint />}
                <hr />

                <h4>TO DO LIST</h4>
                <ul>
                    <li>Countdown radek vetsi a vic cool text</li>
                    <li>Bootstrap full responsibility</li>
                    <li><del>Serazovani countdowns</del></li>
                    <li><del>Validace vstupu do time cisla nebo 1 min 10 hours atd</del></li>
                    <li><del>Dobehnuti countdown</del></li>
                    <li><del>On enter vlozeni</del></li>
                    <li><del>Reakce na moc dlouhy input name</del></li>
                    <li><del>Reakce na spatny input time</del></li>
                    <li><del>Formatovani odpoctu</del></li>
                    <li><del>Musi se udelat jeden pool, ktery bude drzet ty casy a bude volat jeden interval,ty mu jen budes podsovat vic casu nebo mene casu, countdown pak v podstate bude componenta</del></li>
                    <li><del>Oprava hlasky no countdowns na start your countdown here</del></li>
                </ul>

            </div>
        );
    }
}

