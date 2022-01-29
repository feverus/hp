import React from 'react'
import { Button, Panel} from 'muicss/react'

class AreYouSure extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		if (!this.props.visible)
			return null;
		let c = this.props.playersCopy;
		let ww = this.context.tune.winway;
		let winners = [];
		let winnersString = '';
		let s = '';
		if (c.length > 0) {
			c.map((player) => {
				s = (((player.hp == this.context.high) & (ww !== "lastalive")) || ((player.hp !== 0) & (ww == "lastalive"))) ? player.name : "";
				if (s !== '') { winners.push(s); };
			});
			winners.map((name, index) => {
				winnersString += (index == winners.length - 1) ? name : name + ', ';
			});
		}
		switch (winners.length) {
			case 0: s = "Ничья"; break;
			case 1: s = "Побеждает:"; break;
			default: s = "Побеждают:";
		}
		return (
			<div className="areyousure">
				<Panel>
					<div className="mui--text-subhead mui--clearfix">{s}</div>
					<div className="mui--clearfix">
						{winnersString}
					</div>
					<div className="mui--text-subhead mui--clearfix">Вы уверены?</div>
					<Button onClick={() => this.props.yesNo(true)}>Да!</Button>
					<Button onClick={() => this.props.yesNo(false)}>Нет</Button>
				</Panel>
			</div>
		);
	}
}
export default AreYouSure;