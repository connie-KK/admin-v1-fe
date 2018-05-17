import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route,Link,Switch}  from 'react-router-dom';


class A extends React.Component{
	constructor(props){
		super(props);

	}
	render(){
		return(
			<div>
				Component A
				<Switch>
                    <Route exact path={`${this.props.match.path}`}  render={(route)=>{
                    		return <div>当前是不带参数的组件A</div>
                    	}
                    }  />
					<Route path={`${this.props.match.path}/:id`}  render={(route)=>{
							return <div>当前是带参数的组件A,参数是: {this.props.match.params.id}</div>
						}
                     }  />

				</Switch>
			</div>
        )
	}
}

class B extends React.Component{
	constructor(props){
		super(props);

	}
	render(){
		return  <div>Component B</div>
	}
}

class Wrapper extends React.Component{
	constructor(props){
		super(props);

	}
	render(){
		return (
				<div>
                    <Link to="/a">组件A</Link>
					<br/>
                    <Link to="/a/123">带参数的组件A</Link>
					<br/>
					<Link to="/b">组件B</Link>
					{this.props.children}
				</div>
			)
	};
}


ReactDOM.render(
	<Router>
		<Wrapper>
            <Route path="/a"  component={A}  />
            <Route path="/a/:id"  component={A}  />
			<Route path="/b"  component={B}  />
		</Wrapper>
	</Router>,

  document.getElementById('app')
);