import React from 'react'
import Game from './Game'
import Share from './Share'
import DiceOne from './DiceOne'
import Countdown from './Countdown'
import Card from './Card'
import Table from "./Table"
import Setup from "./Setup"
import AreYouSure from "./AreYouSure"
import List from "./List"
import ColorPicker from './ColorPicker'
import { Appbar, Button, Container } from 'muicss/react'
import { findLongestWord, $_GET, nameGen} from './get.js'

const MainContext = React.createContext();

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.Startgame = () => {
			let c = this.state;
			c.mode = "game";
			c.pass = "pass";
			c.isLoaded = true;
			c.players.forEach((p, id) => {
				c.players[id].hp = c.tune.starthp;
				c.players[id].common = c.tune.commonname.map(() => 0);
				c.players[id].unique = c.tune.uniquename.map(() => 0);
			})
			this.setState(c);			
		}
		this.EndRaund = (btnPressed = false) => {
			let c = this.playersCopy;
			let t = this.state.tune;
			let winner = false;
			let alives = 0;
			//anytime - просто суммируем очки
			if ((btnPressed == true) & (t.winway == "anytime")) {
				c.forEach((p, id) => {
					c[id].points = +c[id].points + c[id].hp;
				})
				winner = true;
			}
			//firstmax - побеждает первый набравший максимум (или несколько набравших)
			//ищем победителей и добавляем им одну победу
			if (t.winway == "firstmax") {
				c.forEach((p, id) => {
					if (c[id].hp == t.maxhp) {
						c[id].wins = +c[id].wins + 1;
						winner = true;
					}
				})
			}
			//lastalive - побеждает последний оставшийся в живых (или никто)
			if (t.winway == "lastalive") {
				//считаем живых
				c.forEach((p, id) => {
					if (c[id].hp > 0) {
						alives++;
					}
				})
				//остался только один - победитель или все проиграли			
				if (alives < 2) {
					winner = true;
					c.forEach((p, id) => {
						if (c[id].hp > 0) {
							c[id].wins = +c[id].wins + 1;
						}
					})
				}
			}
			this.playersCopy=c;
			this.LowHighCalculate();
			//если нет победителя, то сразу обновляем hp
			if (!winner) {
				this.setState({ "players": c });
			} else {
				//если найдены победители, просим подтверждения
				this.setState({ "ask": true });
			}
		}
		//изменения hp, которые могут привести к концу раунда
		this.Hpminus = (id) => {
			this.PauseUpdate(true);
			let c = JSON.parse(JSON.stringify(this.state.players));
			if (c[id].hp > 0) {
				c[id].hp = +c[id].hp - 1;
				this.playersCopy = c;
			}
			this.EndRaund();
		}
		this.Hpplus = (id) => {
			this.PauseUpdate(true);
			let c = JSON.parse(JSON.stringify(this.state.players));
			if (c[id].hp < this.state.tune.maxhp) {
				c[id].hp = +c[id].hp + 1;
				this.playersCopy = c;
			}
			this.EndRaund();
		}
		this.HpminusAll = () => {
			this.PauseUpdate(true);
			let c = JSON.parse(JSON.stringify(this.state.players));
			c.forEach((p, id) => {
				if (c[id].hp > 0) {
					c[id].hp = +c[id].hp - 1;
				}
			});
			this.playersCopy = c;
			this.EndRaund();
		}
		this.HpplusAll = () => {
			this.PauseUpdate(true);
			let c = JSON.parse(JSON.stringify(this.state.players));
			let maxhp = this.state.tune.maxhp;
			c.forEach((p, id) => {
				if (c[id].hp < maxhp) {
					c[id].hp = +c[id].hp + 1;
					this.playersCopy = c;
				}
			})
			this.playersCopy = c;
			this.EndRaund();
		}
		//
		this.UniqueClick = (id, nomer) => {
			this.PauseUpdate(true);
			let c = this.state.players;
			c.forEach((p, id) => {
				p.unique[nomer] = 0;
			})
			c[id].unique[nomer] = 1;
			this.setState({ "players": c });
		}
		this.CommonClick = (id, nomer) => {
			this.PauseUpdate(true);
			let c = this.state.players;
			c[id].common[nomer] = (c[id].common[nomer] == 1) ? 0 : 1;
			this.setState({ "players": c });
		}
		//блок функций для setup
		//игроки:
		this.ChangePlayerName = (id, newName) => {
			let c = this.state.players; c[id].name = newName; this.setState({ "players": c });
		}
		this.AddPlayer = () => {
			let colors = ["#4060ff", "#7020ff", "#d02020", "#ee6060", "#ff6020", "#ffc0b0", "#fff040", "#fff080", "#05d00d", "#7ad080", "#03b0f0", "#80d0f0", "#0040ff", "#a080ff", "#ff30ff", "#ffb0ff", "#707070", "#e0e0e0", "#705040", "#10ffff"];
			if (this.state.players.length < 8) {
				return (
					<Button variant="raised" className="mui--pull-left add" onClick={() => 
						(this.setState(prevState => ({ players: [...prevState.players, { id: this.state.players.length, name: nameGen(), wins: 0, points: 0, hp: 0, color: colors[this.state.players.length*2], unique: [], common: [] }] })))}>
						Добавить</Button>
			)}
		}
		this.RemovePlayer = () => {
			if (this.state.players.length > 2) {
				return (
					<Button variant="raised" className="mui--pull-right remove" onClick={() => this.setState(this.state.players.splice(-1, 1))}>
						Удалить</Button>
			)}
		}
		//уникальные состояния
		this.ChangeUniquename = (id, newName) => {
			let c = this.state.tune; c.uniquename[id] = newName; this.setState({ "tune": c });
		}
		this.AU = () => {
			let c = this.state.tune; c.uniquename = [...c.uniquename, '👑']; this.setState(c);
		}
		this.AddUniquename = () => {
			if ((this.state.tune.uniquename.length + this.state.tune.commonname.length) < 10) {
				return (
					<Button variant="raised" className="mui--pull-left add" onClick={() => (this.AU())}>
						Добавить</Button>
				)
			}
		}
		this.RU = () => {
			let c = this.state.tune; c.uniquename.splice(-1, 1); this.setState(c);
		};
		this.RemoveUniquename = () => {
			if (this.state.tune.uniquename.length > 0) {
				return (
					<Button variant="raised" className="mui--pull-right remove" onClick={() => (this.RU())}>
						Удалить </Button>
			)}
		}
		//обычные состояния
		this.ChangeCommonname = (id, newName) => {
			let c = this.state.tune; c.commonname[id] = newName; this.setState({ "tune": c });
		}
		this.AC = () => {
			let c = this.state.tune; c.commonname = [...c.commonname, '✔']; this.setState({ "tune": c });
		}
		this.AddCommonname = () => {
			if ((this.state.tune.uniquename.length + this.state.tune.commonname.length) < 10) {
				return (
					<Button variant="raised" className="mui--pull-left add" onClick={() => (this.AC())}>
						Добавить</Button>
			)}
		}
		this.RC = () => {
			let c = this.state.tune; c.commonname.splice(-1, 1); this.setState(c);
		}
		this.RemoveCommonname = () => {
			if (this.state.tune.commonname.length > 0) {
				return (
					<Button variant="raised" className="mui--pull-right remove" onClick={() => (this.RC())}>
						Удалить </Button>
			)}
		}
		//все игроки кидают кости
		this.DropDiceAll = () => {
			this.PauseUpdate(true);
			let c = this.state.players;
			if (c[0].dice !== -1) {
				c.forEach((p, id) => {
					p.dice = +0 - 1;
				});
			} else {
				c.forEach((p, id) => {
					p.dice = this.state.tune.diceAll[0] * (Math.floor(Math.random() * this.state.tune.diceAll[1]) + 1);
				})
			}
			this.setState({ players: c});
		}
		//загрузка и сохранение данных
		this.LoadJSON = () => {
			this.PauseUpdate(true);
			let id = this.state.id;
			let updated = false;
			let fileNotFound = false;
			let url="/hp/php/jsonload.php?filename=" + id;
			console.log('JSON ');
			if (id !== "start") {
				console.log('запрашиваем JSON ' + id);
				if (this.state.testmode) { url="/hp/test/test.json" }
				let xhr = new XMLHttpRequest();
				xhr.open("GET", url, false);
				xhr.setRequestHeader("Cache-Control", "no-cache, no-store, max-age=0");
				xhr.send();
				let result = JSON.parse(xhr.response);
				console.log('version: local ' + this.state.version + ', server: ' + result.version);
				if ((result.a !== '0') & (result.a !== '404')) {
					if ((+0+this.state.version) < (+0+result.version)) {
						console.log('синхронизация');
						updated = true;
						this.playersCopy = JSON.parse(JSON.stringify(result.players));

						//обновляем стили после загрузки новых данных
						let stU = 'w100';
						let stC = 'w100';
						let arrU = result.tune.uniquename;
						let arrC = result.tune.commonname;
						let tune = result.tune;
						let d = '';
						if (arrU.length > 0) {
							switch (arrU.length) {
								case 2: case 4: stU = 'w50'; break;
								case 3: case 5: case 6: case 9: stU = 'w33'; break;
								case 8: case 10: case 7: stU = 'w25'; break;
							}
							if ((arrU.sort((a, b) => (b.length - a.length))[0].length > 15) ||
								(findLongestWord(arrU.join(' ')) > 6)) { stU = 'w100'; }
								tune.stU = stU;
						}
						if (arrC.length > 0) {
							switch (arrC.length) {
								case 2: case 4: stC = 'w50'; break;
								case 3: case 5: case 6: case 9: stC = 'w33'; break;
								case 8: case 10: case 7: stC = 'w25'; break;
							}
							if ((arrC.sort((a, b) => (b.length - a.length))[0].length > 15) ||
								(findLongestWord(arrC.join(' ')) > 6)) { stC = 'w100'; }
								tune.stC = stC;				
						}
						if ((this.state.pass == '') & ($_GET('id') !== false)) {
							d = " disabled";
						}

						this.setState(prevState => ({ players: result.players, tune: tune, isLoaded: true, d:d, version: result.version }));
						this.LowHighCalculate();
					}
				}
				if ((result.a == '404')) {
					this.setState({isLoaded: true,error:"error 404",id: "start",mode: "setup"});
				}
			} else {
				console.log('start');
				var date = new Date();
				var month = +1+date.getMonth();
				id = date.getDate() + '' + month + '' + date.getFullYear() + '-' + Math.floor(Math.random() * (1000000));
				this.setState({
					id: id,
					isLoaded: true
				})
			}		
			this.PauseUpdate(false);	
		}
		this.LoadJSONrepeat = () => {
			if ((!this.state.testmode) & (this.state.update==="on")) {
				this.LoadJSON();
			}
		}
		this.SendJSON = () => {	
			console.log('отправляем JSON на сервер '+this.state.id);
			let xhr = new XMLHttpRequest();
			let ver = + 1 + this.state.version; //если данные успешно сохранятся, обновим локальную версию
			xhr.open("POST", "/hp/php/jsonsave.php?filename=" + this.state.id + "&pass=" + this.state.pass + "&version=" + ver, false);
			xhr.setRequestHeader("Content-Type", "application/json");
			var data = JSON.stringify({ "players": this.state.players, "tune": this.state.tune });
			xhr.send(data);
			if (xhr.responseText.indexOf('Error') == -1) {
				if (this.state.pass!==xhr.responseText) {
					this.setState({ pass: xhr.responseText, version: ver});
				}
			} else {
				console.log(xhr.responseText);
			}
		}
		//выбор игры в списке сохраненных
		this.SelectGame = (id) => {
			let c = this.state; c.id = id; this.setState(c);
		}
		//новая игра из окна выбора сохраненных
		this.GoSetup = () => {
			let c = this.state; c.mode = "setup"; this.setState(c);
		}
		//загрузка выбранной игры
		this.GoGame = (nomer) => {
			let c = this.state;
			c.id = c.savedGames[nomer][0]; c.pass = c.savedGames[nomer][2]; c.version = 0; c.mode = "game"; c.isLoaded=false;
			this.setState(c);
		}
		//сброс игры и выход в Setup
		this.LeaveGame = () => {
			this.PauseUpdate(true);
			this.setState({
				mode: "setup",
				id: "start",
				pass: "",
				error: null,
				isLoaded: false,
				d: "",
				savedGames: [],
				tune: { gamename: "Новая игра", starthp: 5, maxhp: 10, winway: "lastalive", uniquename: [], commonname: [], diceOne: [1, 6], diceAll: [1, 6], countdownSet: [1, 0], stU: "", stC: "" },
				players: [{ id: 0, name: nameGen(), wins: 0, points: 0, hp: 0, dice: -1, color: "#4060ff", unique: [], common: [] },
				{ id: 1, name: nameGen(), wins: 0, points: 0, hp: 0, dice: -1, color: "#d02020", unique: [], common: [] }],
			})
		}
		//загрузка настроек игры из файла пресетов
		this.LoadPresets = (id) => {
			console.log(this.state.presets.file[id]);
			fetch("/hp/presets/" + this.state.presets.file[id] + ".json", { cache: "no-store" })
				.then(result => result.json())
				.then((result) => {
					this.setState({ tune: result.tune });
				})
		}

		this.yesNo = (v) => {
			this.setState({ "yes": v, "ask": false });
		}
		//ищем максимальное и минимальное значение hp
		this.LowHighCalculate = () => {
			let low = this.state.tune.maxhp;
			let high = 0;
			let minHP = (this.state.tune.winway == "lastalive") ? 0 : -1; //в режиме игры "последний выживший" ноль не учитывается при определении минимального hp
			this.playersCopy.map((player) => { low = ((player.hp < low) & (player.hp > minHP)) ? player.hp : low; });
			this.playersCopy.map((player) => { high = (player.hp > high) ? player.hp : high; });
			if (low == high) { low = -1; high = -1; }
			this.setState({ low: low, high: high });
		}
		this.ChangeColor = (id, color) => {
			let c=this.state;	
			c.players[id].color=color;
			this.setState(c);
		}
		this.PauseUpdate = (f) => {
			if (f) {
				clearTimeout(this.nextUpdate); this.nextUpdate = false;
				console.log('STOP update');
				this.setState({update: "off"});
			} else {
				this.nextUpdate = setTimeout(this.LoadJSONrepeat, 2000);
				console.log('START update');
				this.setState({update: "on"});
			}			
		}
		this.playersCopy = [];
		this.nextUpdate = false;

		this.state = {	
			update: "off",
			testmode: false,
			mode: "setup",
			id: "start",
			pass: "",
			version: 0,
			low: -1,
			high: -1,
			error: null,
			isLoaded: false,
			d: "",
			yes: false,
			ask: false,
			
			tune: {
				gamename: "Новая игра",
				starthp: 5,
				maxhp: 10,
				winway: "lastalive",
				uniquename: [],
				commonname: [],
				diceOne: [1, 6],
				diceAll: [1, 6],
				countdownSet: [1, 0],
				stU: "",
				stC: ""
			},
			players: [{ id: 0, name: nameGen(), wins: 0, points: 0, hp: 0, dice: -1, color: "#4060ff", unique: [], common: [] },
					{ id: 1, name: nameGen(), wins: 0, points: 0, hp: 0, dice: -1, color: "#d02020", unique: [], common: [] }],
			presets: {
				name: [],
				file: []
			},
			savedGames: [],
			Startgame: this.Startgame,
			Hpminus: this.Hpminus,
			Hpplus: this.Hpplus,
			HpminusAll: this.HpminusAll,
			HpplusAll: this.HpplusAll,
			UniqueClick: this.UniqueClick,
			CommonClick: this.CommonClick,
			EndRaund: this.EndRaund,
			ChangePlayerName: this.ChangePlayerName,
			AddPlayer: this.AddPlayer,
			RemovePlayer: this.RemovePlayer,
			ChangeUniquename: this.ChangeUniquename,
			AddUniquename: this.AddUniquename,
			RemoveUniquename: this.RemoveUniquename,
			ChangeCommonname: this.ChangeCommonname,
			AddCommonname: this.AddCommonname,
			RemoveCommonname: this.RemoveCommonname,
			SelectGame: this.SelectGame,
			GoSetup: this.GoSetup,
			GoGame: this.GoGame,
			DropDiceAll: this.DropDiceAll,
			LeaveGame: this.LeaveGame,
			yesNo: this.yesNo,
			LoadPresets: this.LoadPresets,
			LowHighCalculate: this.LoadPresets,
			ChangeColor: this.ChangeColor,
			LoadJSON: this.LoadJSON,
			LoadJSONrepeat: this.LoadJSONrepeat,
			SendJSON: this.SendJSON,
			PauseUpdate: this.PauseUpdate
		}
	}

	render() {
		//тестовый режим для отладки на локальном сервере
		if ($_GET('testmode')!==false) {this.setState({testmode: true});}
		//если передан id открываем сразу игру		
		const id = $_GET('id');
		if ((this.state.id == "start") & (id !== false)) {			
			const pass = $_GET('pass');
			if (pass !== false) {
				this.setState({ mode: "game", id: id, pass: pass });
			} else {
				this.setState({ mode: "game", id: id });
			}
		}
		if ((this.state.id == "start") & (this.state.savedGames.length == 0)) {
			var date = new Date();
			var month = +1+date.getMonth();
			let id = date.getDate() + '' + month + '' + date.getFullYear() + '-' + Math.floor(Math.random() * (1000000));
			//проверяем куки при запуске		
			if (document.cookie.length > 0) {
				let cookies = document.cookie.split(';');
				for (let i = 0, len = cookies.length; i < len; i++) {
					let cookie = cookies[i].split('=');
					let params = decodeURIComponent(cookie[1].trim()).split(/\|/);
					let newcookie = [cookie[0].trim(), params[0].split('+').join(' '), params[1], params[2]];
					let checkhp = newcookie[0].split('|');
					if ((checkhp[0] == 'hpcookie') & (params.length>1)) {
						newcookie[0] = checkhp[1];
						this.state.savedGames.push(newcookie);
					}
				}
				if (this.state.savedGames.length > 0) {
					this.setState({ mode: "list" });
				}
			}
			//загружаем пресеты
			fetch("/hp/presets/_list.json", { cache: "no-store" })				
				.then(result => result.json())
				.then((result) => {
					this.setState({ id:id, presets: result });
				})
		}
		if (this.state.mode == "game") {
			if (!this.state.isLoaded) {
				this.LoadJSON();				
			}	
			//при согласии мастера завершаем раунд
			if (this.state.yes) {
				let c = this.playersCopy;
				let t = this.state.tune;
				c.forEach((p, id) => {
					c[id].hp = +t.starthp;
					c[id].unique = t.uniquename.map(() => 0);
					c[id].common = t.commonname.map(() => 0);
				});
				this.setState({ "players": c, "yes": false });
			}
			if ((this.state.pass !== '') & (this.state.update==="off") & (this.nextUpdate===false) & (this.state.ask === false) & (this.state.isLoaded===true)) {
				console.log('Автозапуск');
				this.SendJSON();
				this.PauseUpdate(false);
			}			

			let diceAllSrc = "/hp/icons/diceall.png";
			if (this.state.players[0].dice !== -1) { diceAllSrc = "/hp/icons/diceclear.png"; }
			return (
				<MainContext.Provider value={this.state}>
					<Appbar>
						<div className="mui--text-headline block">{this.state.tune.gamename}</div>
						<div className="block">
							<div className="block">
								<Button className="topicon" onClick={() => (this.LeaveGame())}>
									<img src="/hp/icons/exit.png" alt="🚪"></img>
								</Button>
							</div>
							<DiceOne />
							<div className="block">
								<Button className="topicon" onClick={() => (this.DropDiceAll())}>
									<img src={diceAllSrc} alt="🎲"></img>
								</Button>
							</div>
							<Countdown />
							<Share />
						</div>
					</Appbar>
					<Container>
						<Game id={this.state.id} />
						<AreYouSure visible={this.state.ask} yesNo={this.yesNo} playersCopy={this.playersCopy}/>
					</Container>
				</MainContext.Provider>
			);
		}
		//настройка новой игры
		if (this.state.mode == "setup") {
			return (
				<MainContext.Provider value={this.state}>
					<Appbar></Appbar>
					<Container><Setup /></Container>
				</MainContext.Provider>
			);
		}
		//выводим список игр из кук
		if (this.state.mode == "list") {
			return (
				<MainContext.Provider value={this.state}>
					<Appbar></Appbar>
					<List savedGames={this.state.savedGames} />
				</MainContext.Provider>
			);
		}
	}
}
export default Main;


Share.contextType = MainContext;
DiceOne.contextType = MainContext;
Countdown.contextType = MainContext;
Card.contextType = MainContext;
Table.contextType = MainContext;
Game.contextType = MainContext;
Setup.contextType = MainContext;
AreYouSure.contextType = MainContext;
List.contextType = MainContext;
Game.contextType = MainContext;
ColorPicker.contextType = MainContext;