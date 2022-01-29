import React from 'react'
import { Button, Panel } from 'muicss/react'
import { toClipboard } from './get.js'

class Share extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			display: "hidden"
		}		
	}
	render() {
		let url = encodeURIComponent(window.location.protocol + '//' + window.location.hostname +'/'+ window.location.pathname+'?id='+this.context.id);
		let pass = this.context.pass;
		let st=(pass!=="")?"":"hidden";
		if (this.state.display=="hidden") {
			return (
				<div className="block">
					<Button className="topicon" onClick={() => (this.setState({display:"show"}))}>
						<img src="/hp/icons/share.png" alt="✉"></img>
					</Button>
				</div>
		)}
		if (this.state.display=="show") {
			return (
				<Panel className="sharepopup">
					<Button variant="fab" onClick={() => (this.setState({display:"hidden"}))}>
						<img src="/hp/icons/close.png"></img>
					</Button>			
					<div className="links">	
						<div className="mui--text-display1">Поделиться игрой</div>					
						<Button>
							<a href={"https://www.facebook.com/sharer/sharer.php?u="+url} target="_blank">В Facebook</a>
						</Button>
						<Button>
							<a href={"https://vk.com/share.php?url="+url} target="_blank">Во ВКонтакте</a>
						</Button>
						<Button>
							<a href={"https://t.me/share/url?url="+url+"&text="+this.context.tune.gamename} target="_blank">В Telegram</a>
						</Button>
						<Button onClick={()=>toClipboard(decodeURIComponent(url))}>Скопировать ссылку</Button>
						
						<div className={st}>По умолчанию другие игроки могут только просматривать статус игры без возможности редактирования. Чтобы поделиться правом редактирования, воспользуйтесь следующей сылкой:</div>
						<Button onClick={()=>toClipboard(decodeURIComponent(url+'&pass='+pass))}>Скопировать ссылку с паролем</Button>

					</div>
				</Panel>
		)}		
	}
}
export default Share;