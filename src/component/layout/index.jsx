import React from 'react';
import './theme.css';
import TopNAV from 'component/top-nav/index.jsx';
import SideNAV from 'component/side-nav/index.jsx';


class Layout extends React.Component{
	constructor(props){
		super(props);

	}

	render(){
		return (
			<div id="wrapper">
				<TopNAV />
				<SideNAV />	
				{this.props.children}
			</div>

		)
	}
}

export default Layout;