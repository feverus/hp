import React from 'react'
import AreYouSureList from './AreYouSureList'
import { Button, Panel } from 'muicss/react'

class List extends React.Component {
	constructor(props) {
		super(props);
		this.yesNo = (v) => {
			this.setState({ "yes": v, "ask": false });
		};
		this.state = {
			gameNomer: 0,
			toDeleteNomer: 0,
			yes: false,
			ask: false,
			yesNo: this.yesNo
		};
	}
	selectGame(game, nomer) {
		this.setState({ "gameNomer": nomer });
	}

	deleteGame(nomer) {
		console.log('удаляем игру');
		const c = this.props.savedGames[nomer];
		let xhr = new XMLHttpRequest();
		xhr.open("POST", "php/jsonsave.php?filename=" + c[0] + "&pass=" + c[2] + "&delete", false);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send();
		if (xhr.responseText.indexOf('Error') === -1) {
			this.props.savedGames.splice(nomer, 1);
			this.setState({ "gameNomer": 0, "yes": false });
		} else {
			console.log(xhr.responseText);
		}
	}

	render() {
		let s = this.props.savedGames;
		let showNewGameBtn = "";
		let showNewGameText = " hidden";
		if (s.length > 25) {
			showNewGameBtn = "hidden"; showNewGameText = "";
		}
		if (this.state.yes) {
			this.deleteGame(this.state.toDeleteNomer);
		}
		return (
			<Panel className="mui--text-dark-secondary mui--z2 list">
				<div className={"mui--text-body1" + showNewGameText}>У вас слишком много сохраненных игр. Удалите старые, чтобы получить возможность создавать новых.</div>
				<Button className={showNewGameBtn} onClick={() => this.context.GoSetup()}>Новая игра</Button>
				<div className="mui--text-headline">Выбрать сохраненную игру:</div>
				<Panel className="mui--text-dark-secondary mui--z2 list savedgames">
					{s.map((game, nomer) => (
						<div className="mui--clearfix" key={nomer}>
							<Button className={(nomer === this.state.gameNomer) ? 'select on' : 'select off'}
								onClick={() => this.selectGame(game, nomer)}>{game[1]}</Button>
							<Button className="delete"
								onClick={() => this.setState({ "ask": true, "toDeleteNomer": nomer })}><img alt="Удалить" src="/hp/icons/delete.png"></img>
							</Button>
						</div>
					))}
					<AreYouSureList visible={this.state.ask} yesNo={this.yesNo} />
				</Panel>
				<Button onClick={() => this.context.GoGame(this.state.gameNomer)}>Загрузить</Button>
			</Panel>
		);
	}
}
export default List;