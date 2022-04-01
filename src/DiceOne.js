import React from 'react'
import { Button } from 'muicss/react'

class DiceOne extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: "hidden",
			dice: 0
		};
	}

	clickAny() {
		console.log('this.context.update '+this.context.update);
		console.log(this.context);
		this.context.PauseUpdate((this.context.update==="on")?true:false);
		let s = (this.state.display==="show")?"hidden":"show";
		let dice = this.context.tune.diceOne[0] * (Math.floor(Math.random() * this.context.tune.diceOne[1]) + 1);
		this.setState({ display: s, dice:dice});
	}

	render() {
		if (this.state.display == "hidden") {
			return (
				<div className="block dice">
					<Button className="topicon dice" onClick={() => (this.clickAny())}>
						<img src="/hp/icons/diceone.png"></img>
					</Button>
				</div>
			);
		}
		if (this.state.display == "show") {			
			return (
				<div className="block dice">
					<Button variant="fab" onClick={() => (this.clickAny())}>
						<img src="/hp/icons/close.png" alt="X"></img>
					</Button>
					<Button className="topicon dicedropped" onClick={() => (this.clickAny())}>
						{this.state.dice}
					</Button>
				</div>
			);
		}
	}
}
export default DiceOne;