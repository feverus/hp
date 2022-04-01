import React from 'react'
import { Button } from 'muicss/react'

class DiceOne extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: "hidden"
		};
	}

	clickAny() {
		console.log('this.context.nextUpdate '+this.context.nextUpdate);
		console.log(this.context);
		if (this.context.players[0].dice === -1) {
			this.context.PauseUpdate((this.context.nextUpdate!==false)?true:false);	
		}
		let s = (this.state.display==="show")?"hidden":"show";
		this.setState({ display: s});
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
			let dice = this.context.tune.diceOne[0] * (Math.floor(Math.random() * this.context.tune.diceOne[1]) + 1);
			return (
				<div className="block dice">
					<Button variant="fab" onClick={() => (this.clickAny())}>
						<img src="/hp/icons/close.png" alt="X"></img>
					</Button>
					<Button className="topicon dicedropped" onClick={() => (this.clickAny())}>
						{dice}
					</Button>
				</div>
			);
		}
	}
}
export default DiceOne;