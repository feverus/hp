import React from 'react'
import { Button } from 'muicss/react'

class DiceOne extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: "hidden"
		};
	}
	render() {
		if (this.state.display == "hidden") {
			return (
				<div className="block dice">
					<Button className="topicon dice" onClick={() => (this.setState({ display: "show" }))}>
						<img src="/hp/icons/diceone.png"></img>
					</Button>
				</div>
			);
		}
		if (this.state.display == "show") {
			let dice = this.context.tune.diceOne[0] * (Math.floor(Math.random() * this.context.tune.diceOne[1]) + 1);
			return (
				<div className="block dice">
					<Button variant="fab" onClick={() => (this.setState({ display: "hidden" }))}>
						<img src="/hp/icons/close.png" alt="X"></img>
					</Button>
					<Button className="topicon dicedropped" onClick={() => (this.setState({ display: "hidden" }))}>
						{dice}
					</Button>
				</div>
			);
		}
	}
}
export default DiceOne;