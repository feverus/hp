import React from 'react'
import Card from './Card'

class Table extends React.Component {
	constructor(props) {
		super(props);
	}
	renderCard(id) {
		return (
			<Card id={id} />
		);
	}
	render() {
		let st = "table2";
		switch (this.context.players.length) {
			case '1':
			case '3':
			case '5':
			case '7':
				st = "table3"; break;
			default: st = "table2";
		}
		var ps = this.context.players.slice();
		const countplayers = ps.length;
		var players_circle = [];
		for (let i = 0; i < countplayers; i++) {
			players_circle.push(ps.shift());
			ps.reverse();
		}
		return (
			<div className={st}>
				{players_circle.map((player) => (
					<div className="Card animate__animated animate__zoomIn" key={player.id}>{this.renderCard(player.id)}</div>
				))}
			</div>
		);
	}
}
export default Table;