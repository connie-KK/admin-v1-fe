import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component{
	//构造函数
	constructor(props){
		super(props);
		console.log("这里是constructor");
		this.state = {
			data: "old data"
		}
	}

	//组件将要加载
	componentWillMount(){
		console.log("componentWillMount");
	}

	//组件加载完成
	componentDidMount(){
		console.log("componentDidMount");
	}

	//将要接受父组件传来的props
	componentWillReceiveProps(){
		console.log("componentWillReceiveProps");
	}

	//子组件是否应该更新
	shouldComponentUpdate(){
		console.log("shouldComponentUpdate");
		return true;
	}

	//组件将要更新
	componentWillUpdate(){
		console.log("componentWillUpdate");
	}

	//组件更新完成
	componentDidUpdate(){
		console.log("componentDidUpdate");
	}

	handleClick(){
		console.log("更新数据");
		this.setState({
				data: "new data"		
			}
		)
	}
	//渲染
	render(){
		console.log("render");
		
		return (
			<div>
				<div>App</div>
				<button onClick={this.handleClick.bind(this)}>{this.state.data}</button>
			</div>
		)
	}
}

ReactDOM.render(
	<App/>,
  
  document.getElementById('app')
);