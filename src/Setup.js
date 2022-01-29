import React from 'react'
import { Button, Panel, Input, Radio } from 'muicss/react'
import ColorPicker from './ColorPicker';

class Setup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			preset: 0,
			gamename: "Новая игра", starthp: 5, maxhp: 10, winway: "lastalive", diceOne0: 1, diceOne1: 6, diceAll0: 1, diceAll1: 6, countdownSet0: 0, countdownSet1: 0,
		};
	}
	renderPlayer(id) {
		let c = this.context.players.slice();
		let colors = ["#4060ff", "#7020ff", "#d02020", "#ee6060", "#ff6020", "#ffc0b0", "#fff040", "#fff080", "#05d00d", "#7ad080", "#03b0f0", "#80d0f0", "#0040ff", "#a080ff", "#ff30ff", "#ffb0ff", "#707070", "#e0e0e0", "#705040", "#10ffff"];
		return (
			<div className="mui--clearfix">
				<Input className="mui--pull-left" type="text" id="name" label="Имя игрока или команды" defaultValue={c[id].name}
					onChange={() => (this.context.ChangePlayerName(id, this.target.value))} />
				<ColorPicker id={id} color={colors[id*2]}/>
			</div>
		);
	}
	onChangePreset(ev) {
		this.context.LoadPresets(ev.target.value);
		this.setState({ preset: ev.target.value });
	}
	//костыли для классов из фреймворка
	onChangeWinway(ev) { this.setState({ winway: ev.target.value }); this.context.tune.winway = ev.target.value; }
	onChangeGamename(ev) { this.setState({ gamename: ev.target.value }); this.context.tune.gamename = ev.target.value; }
	onChangeStarthp(ev) { this.setState({ starthp: ev.target.value }); this.context.tune.starthp = ev.target.value; }
	onChangeMaxhp(ev) { this.setState({ maxhp: ev.target.value }); this.context.tune.maxhp = ev.target.value; }
	onChangeDiceOne0(ev) {
		if (+ev.target.value > ev.target.max) { ev.target.value = ev.target.max; };
		this.setState({ diceOne0: ev.target.value }); this.context.tune.diceOne[0] = ev.target.value;
	}
	onChangeDiceOne1(ev) { this.setState({ diceOne1: ev.target.value }); this.context.tune.diceOne[1] = ev.target.value; }
	onChangediceAll0(ev) {
		if (+ev.target.value > ev.target.max) { ev.target.value = ev.target.max; };
		this.setState({ diceAll0: ev.target.value }); this.context.tune.diceAll[0] = ev.target.value;
	}
	onChangediceAll1(ev) { this.setState({ diceAll1: ev.target.value }); this.context.tune.diceAll[1] = ev.target.value; }
	onChangeCountdownSet0(ev) {
		if (+ev.target.value > ev.target.max) { ev.target.value = ev.target.max; };
		this.setState({ countdownSet0: ev.target.value }); this.context.tune.countdownSet[0] = ev.target.value;
	}
	onChangeCountdownSet1(ev) {
		if (+ev.target.value > ev.target.max) { ev.target.value = ev.target.max; };
		this.setState({ countdownSet1: ev.target.value }); this.context.tune.countdownSet[1] = ev.target.value;
	}

	renderPresets() {
		return (
			<div className="mui--clearfix">
				<div className="mui--text-subhead mui--clearfix">Выбрать предварительную настройку для игры:</div>
				<div className="mui-select mui--pull-left">
					<select name="presets" value={this.state.preset} onChange={this.onChangePreset.bind(this)}>
						{this.context.presets.name.map((name, id) => (
							<option value={id} key={id}>{name}</option>
						))}
					</select>
				</div>
			</div>
		);
	}
	renderUniquename(id) {
		return (
			<Input className="mui--pull-left" type="text" id={"Uname" + id} defaultValue={this.context.tune.uniquename[id]}
				onChange={() => (this.context.ChangeUniquename(id, this.target.value))} />
		);
	}
	renderCommonname(id) {
		return (
			<Input className="mui--pull-left" type="text" id={"Cname" + id} defaultValue={this.context.tune.commonname[id]}
				onChange={() => (this.context.ChangeCommonname(id, this.target.value))} />
		);
	}
	render() {
		console.log("Setup");

		let tune = this.context.tune;
		return (
			<Panel className="mui--text-dark-secondary mui--z2">
				<div className="mui--text-headline">Настройка параметров новой игры:</div>

				<Panel>
					{this.context.players.map((player)=> (
						<div className="newplayer" key={player.id}>
						{this.renderPlayer(player.id)}
						</div>
					))}							
					{this.context.AddPlayer()}
					{this.context.RemovePlayer()}
				</Panel>

				<Panel>
					{this.renderPresets()}
				</Panel>

				<Panel>
					<Input type="text" id="gamename" label="Название игры" value={tune.gamename} onChange={this.onChangeGamename.bind(this)}/>
					
					<Radio id="lastalive" name="winway" label="В раунде побеждает последний выживший" value="lastalive"
						checked={this.context.tune.winway === 'lastalive'} onChange={this.onChangeWinway.bind(this)}/>
					<Radio id="firstmax" name="winway" label="В раунде побеждает первый набравший максимум" value="firstmax"
						checked={this.context.tune.winway === 'firstmax'} onChange={this.onChangeWinway.bind(this)}/>
					<Radio id="anytime" name="winway" label="Побеждает набравший максимум очков в конце раунда" value="anytime"
						checked={this.context.tune.winway === 'anytime'} onChange={this.onChangeWinway.bind(this)}/>

					<Input type="number" id="starthp" label="Стартовое значение очков в раунде" value={tune.starthp} onChange={this.onChangeStarthp.bind(this)}/>
					<Input type="number" id="maxhp" label="Максимальное значение очков в раунде" value={tune.maxhp} onChange={this.onChangeMaxhp.bind(this)}/>
				</Panel>
				
				<Panel>
					<div className="mui--text-subhead mui--clearfix">Уникальные статусы (например, самая длинная дорога на карте):</div>
					{this.context.tune.uniquename.map((u,id)=> (
						<div className="mui--clearfix newuniquename" key={id}>{this.renderUniquename(id)}</div>
					))}
					<div className="mui--clearfix">
						{this.context.AddUniquename()}
						{this.context.RemoveUniquename()}
					</div>
					<div className="mui--text-subhead mui--clearfix">Обычные статусы (например, находится в тюрьме):</div>
					{this.context.tune.commonname.map((u,id)=> (
						<div className="mui--clearfix newcommonname" key={id}>{this.renderCommonname(id)}</div>
					))}
					<div className="mui--clearfix">
						{this.context.AddCommonname()}
						{this.context.RemoveCommonname()}	
					</div>
				</Panel>

				<Panel>
					<div className="diceset">
						<div className="mui--clearfix">	
							<div className="mui--text-subhead mui--clearfix">Настройка одинарного броска костей:</div>
							<Input className="mui--pull-left" type="number" maxLength="2" min="1" max="10"
								id="name" label="Бросков костей" value={tune.diceOne[0]} onChange={this.onChangeDiceOne0.bind(this)} />
							<div className="mui-select mui--pull-left">
								<select name="diceoneedge" value={tune.diceOne[1]} onChange={this.onChangeDiceOne1.bind(this)}>
									<option value="2">2</option><option value="4">4</option><option value="6">6</option><option value="8">8</option><option value="10">10</option><option value="12">12</option><option value="20">20</option><option value="30">30</option>
								</select>
								<label>Граней</label>
							</div>
						</div>
					</div>	
					<div className="diceset">
						<div className="mui--clearfix">	
							<div className="mui--text-subhead mui--clearfix">Настройка общего броска костей всеми игроками:</div>
							<Input className="mui--pull-left" type="number" maxLength="2" min="1" max="10"
								id="name" label="Бросков костей" value={tune.diceAll[0]} onChange={this.onChangediceAll0.bind(this)} />
							<div className="mui-select mui--pull-left">
								<select name="diceoneedge" value={tune.diceAll[1]} onChange={this.onChangediceAll1.bind(this)}>
									<option value="2">2</option><option value="4">4</option><option value="6">6</option><option value="8">8</option><option value="10">10</option><option value="12">12</option><option value="20">20</option><option value="30">30</option>
								</select>
								<label>Граней</label>
							</div>
						</div>
					</div>
				</Panel>
				<Panel>
					<div className="countdownset">
						<div className="mui--clearfix">	
							<div className="mui--text-subhead mui--clearfix">Настройка таймера:</div>
							<Input className="mui--pull-left" type="number" maxLength="2" min="0" max="59"
								id="name" label="Минут" value={tune.countdownSet[0]} onChange={this.onChangeCountdownSet0.bind(this)} />
							<Input className="mui--pull-left" type="number" maxLength="2" min="0" max="59"
								id="name" label="Секунд" value={tune.countdownSet[1]} onChange={this.onChangeCountdownSet1.bind(this)} />
						</div>
					</div>					
				</Panel>
				<Panel className="startgame">
					<Button className="start" onClick={()=>this.context.Startgame()}>Начать игру</Button>
				</Panel>
			</Panel>
		);
	}
}
export default Setup;
