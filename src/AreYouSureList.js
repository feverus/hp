import React from 'react'
import { Button, Panel} from 'muicss/react'

class AreYouSureList extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		if (!this.props.visible)
			return null;
		return (
			<div className="areyousure">
				<Panel>
					<div className="mui--text-subhead mui--clearfix">Вы уверены?</div>
					<Button onClick={() => this.props.yesNo(true)}>Да!</Button>
					<Button onClick={() => this.props.yesNo(false)}>Нет</Button>
				</Panel>
			</div>
		);
	}
}
export default AreYouSureList;