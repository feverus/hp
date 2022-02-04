import React from 'react'
import { Button, Panel } from 'muicss/react'
import $ from 'jquery'

class Countdown extends React.Component {
	constructor(props) {
		super(props);
		this.GetTimeRemaining = () => {
			if (this.state.endtime > 0) {
				let t = Date.parse(this.state.endtime) - Date.parse(new Date());
				let minutes = Math.floor((t / 1000 / 60) % 60);
				let seconds = Math.floor((t / 1000) % 60);
				return {
					'total': t, 'minutes': minutes, 'seconds': seconds
				};
			} else {
				return {
					'total': 99, 'minutes': 0, 'seconds': 0
				};
			}
		};
		this.updateClock = () => {
			let t = this.GetTimeRemaining();
			this.setState({ 'minutes': ('0' + t.minutes).slice(-2) });
			this.setState({ 'seconds': ('0' + t.seconds).slice(-2) });
			if (t.total <= 0) {
				clearInterval(this.state.timeinterval);
				this.setState({ 'countDone': true });
			}
		};
		this.InitializeClock = () => {
			let c = this.context.tune.countdownSet;
			this.setState({ endtime: new Date(Date.parse(new Date()) + c[0] * 60 * 1000 + c[1] * 1000) });
			this.setState({ display: "show" });
			this.updateClock();
			this.state.timeinterval = setInterval(this.updateClock, 1000);
		};
		this.Reset = () => {
			clearInterval(this.state.timeinterval);
			this.setState({ timeinterval: 0 });
			this.setState({ display: "hidden" });
			this.setState({ minutes: "0" });
			this.setState({ seconds: "0" });
			this.setState({ endtime: "0" });
			this.setState({ countDone: false });
		};
		this.state = {
			display: "hidden",
			countDone: false,
			endtime: 0,
			minutes: 0,
			seconds: 0,
			GetTimeRemaining: this.GetTimeRemaining,
			InitializeClock: this.InitializeClock,
			timeinterval: 0
		};
	}
	render() {
		if (this.state.display == "hidden") {
			return (
				<div className="block">
					<Button className="topicon dice" onClick={() => (this.InitializeClock())}>
						<img src="/hp/icons/sandclock.png" alt="⏳"></img>
					</Button>
				</div>
			);
		}
		if (this.state.display == "show") {
			let st = (this.state.countDone == true) ? " end" : '';
			let m = ""; let s = "";
			if (this.state.minutes == 0) {
				m = " m"; s = " s";
			}
			//для скрытия таймера при запуске
			s = ((this.state.seconds == 0)&(this.state.minutes == 0)) ? " m" : s;
			let fontSize = ($('#minutesText').width() / 2);
			fontSize = (this.state.minutes !== 0) ? (fontSize * 0.9) : fontSize;			
			fontSize = fontSize + 'px';
			
			return (
				<Panel className="countdownpopup">
					<Button variant="fab" onClick={() => (this.Reset())}>
						<img src="/hp/icons/close.png" alt="X"></img>
					</Button>
					<div className={"countdown" + st}>
						<div className="countdown-minutes-circle" style={{ backgroundImage: "conic-gradient(#002940 "+(this.state.minutes * 6)+"deg, transparent 0)" }}>
							<div className="countdown-seconds-circle" style={{ backgroundImage: "conic-gradient(#002940 "+(this.state.seconds * 6)+"deg, transparent 0)" }}>
								<div className={"countdown-number"+m}>
									<span className="minutes countdown-time" id="minutesText" style={{ fontSize: fontSize }}>{this.state.minutes}</span>
									<span className="countdown-text">Минут</span>
								</div>
								<div className={"countdown-number"+s}>
									<span className="seconds countdown-time" id="secondsText" style={{ fontSize: fontSize }}>{this.state.seconds}</span>
									<span className="countdown-text">Секунд</span>
								</div>
							</div>
						</div>
					</div>
					<div className={"countdown-message" + st}>
						Время вышло!
					</div>
				</Panel>
			);
		}
	}
}
export default Countdown;