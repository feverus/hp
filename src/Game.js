import React from 'react'
import Table from "./Table"
import { Button } from 'muicss/react'

class Game extends React.Component {
	constructor(props) {
		super(props);		
	}	
	
	render() {
		console.log('game');
		let stEndRaund=(this.context.tune.winway==="anytime")?"":" hidden";
		if (this.context.error) {
			return <div>Error: {this.context.error.message}</div>;
		} else if (!this.context.isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<div className="game">			
					<Table />					
					<div className="bottom-button">
						<Button className={"hpminusAll remove"+this.context.d} onClick={() => this.context.HpminusAll()}>Минус всем</Button>
						<Button className={"hpplusAll add"+this.context.d} onClick={() => this.context.HpplusAll()}>Плюс всем</Button>
						<Button className={"endRaund start"+this.context.d+stEndRaund} onClick={() => this.context.EndRaund(true)}>Завершить раунд</Button>	
					</div>
				</div>
	)}}
}
export default Game;