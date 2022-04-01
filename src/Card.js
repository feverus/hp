import React from 'react'
import { Button} from 'muicss/react'
import { pxWidth } from './get.js'

class Card extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			st: "start"
		};
	}
	renderUnique(id, nomer) {
		let st = "unique off";
		if (this.context.players[id].unique[nomer] == "1") { st = "unique on"; }
		if (this.context.tune.uniquename[nomer].length > 10) { st = st + " fs12"; }
		if (this.context.tune.uniquename[nomer].length < 4) { st = st + " fs24"; }
		return (
			<Button className={st + this.context.d} onClick={() => this.context.UniqueClick(id, nomer)}>
				{this.context.tune.uniquename[nomer]}
			</Button>
		);
	}
	renderCommon(id, nomer) {
		let st = "common off";
		if (this.context.players[id].common[nomer] == "1") { st = "common on"; }
		if (this.context.tune.commonname[nomer].length > 10) { st = st + " fs12"; }
		if (this.context.tune.commonname[nomer].length < 4) { st = st + " fs24"; }
		return (
			<Button className={st + this.context.d} onClick={() => this.context.CommonClick(id, nomer)}>
				{this.context.tune.commonname[nomer]}
			</Button>
		)
	}
	renderWinsbar(p) {		
		let st2 = "mui--text-headline dice on";
		if (p.dice == -1) { st2 = "mui--text-headline dice off"; }
		let st = this.state.st;
		if (st==="start") {
			st = "mui--text-headline player";
			if (pxWidth(p.name, '24px') > 100) {
				if (pxWidth(p.name, '16px') > 100) { st = st + " fs12"; } else { st = st + " fs16"; }
			}
			this.setState({st:st});
		}
		if (this.context.tune.winway == "anytime") {
			return (
				<div className="winsbar">
					<div className={st}>{p.name}</div>
					<div className="name">Всего<br />очков:</div>
					<div className="mui--text-headline value">{p.points}</div>
					<div className={st2}>{p.dice}</div>
				</div>
			)
		} else {
			return (
				<div className="winsbar">
					<div className={st}>{p.name}</div>
					<div className="name">Побед:</div>
					<div className="mui--text-headline value">{p.wins}</div>
					<div className={st2}>{p.dice}</div>
				</div>
			)
		}
	}
	render() {
		const ps = this.context.players.slice();
		const id = this.props.id;
		const p = ps[this.props.id];
		const tune = this.context.tune;		
		let stDead = ((tune.winway == "lastalive") & (p.hp == 0)) ? "dead" : "";
		let stMinMaxHp = (p.hp == this.context.low) ? "hp low" : "hp";
		stMinMaxHp = (p.hp == this.context.high) ? "hp high" : stMinMaxHp;
		return (
			<div style={{ backgroundImage: 'linear-gradient(180deg, ' + p.color + '11, ' + p.color + ')' }} className={stDead}>
				<div style={{ backgroundColor: p.color }}>
					{this.renderWinsbar(p)}
				</div>
				<div className="mui--text-display1 hpbar">
					<Button variant="fab" className={"remove" + this.context.d} onClick={() => this.context.Hpminus(id)}>
						<img src="/hp/icons/heart-decrease.png" alt="-"/>
					</Button>
					<div className={stMinMaxHp}>{p.hp}</div>
					<Button variant="fab" className={"add" + this.context.d} onClick={() => this.context.Hpplus(id)}>
						<img src="/hp/icons/health-increase.png"  alt="+"/>
					</Button>
				</div>
				<div className="status">
					{p.unique.map((v, nomer) => (<div key={nomer} className={tune.stU}>{this.renderUnique(id, nomer)}</div>))}
				</div>
				<div className="status">
					{p.common.map((v, nomer) => (<div key={nomer} className={tune.stC}>{this.renderCommon(id, nomer)}</div>))}
				</div>
			</div>
		);
	}
}
export default Card;