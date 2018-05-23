import  React   from 'react';
import  MUtil   from 'util/mm.jsx';
import  User    from 'service/user-service.jsx';


import  './index.scss';

const _mm = new MUtil();
const _user = new User();

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			redirect: _mm.getUrlParam('redirect') || ''
		}
	}
	componentWillMount(){
		document.title = '登陆 - MMAL ADMIN'
	} 

	//当用户名密码发生改变
	onInputChange(e){
		let inputName = e.target.name,
		    inputValue = e.target.value;
		
		this.setState({
			[inputName]: inputValue
		})
	}
	onKeyUp(e){
		if(e.keyCode === 13){
			this.onSubmit(e);
		}
	}

	//提交表单
	onSubmit(e){
		let loginInfo = {
			username: this.state.username,
			password: this.state.password
		};
		let checkResult = _user.checkLoginInfo(loginInfo);

			//验证通过
		if(checkResult.status === true){ 
			_user.login(loginInfo).then((res) => {
				_mm.setStorage('userInfo', res);
				this.props.history.push(this.state.redirect);
			},(errMsg) => {
				_mm.errorTips(errMsg);
			})
		}else{ //验证不通过
			_mm.errorTips(checkResult.msg);
		}

		
	}
	
	render(){
		return (
			<div className="col-md-4 col-md-offset-4">
				<div className="panel panel-default login-panel">
				    <div className="panel-heading">欢迎登陆 - MMAL管理系统</div>
				    	<div className="panel-body">
				      		<div>
							    <div className="form-group">
							    	<input type="text" 
							    		name="username"
							    		className="form-control"  
							    		placeholder="请输入用户名" 
							    		onKeyUp={e => this.onKeyUp(e)}
							    		onChange={e => this.onInputChange(e) }/>
							    </div>
							    <div className="form-group">
							    	<input type="password" 
							    		name="password"
							    		className="form-control"  
							    		onKeyUp={e => this.onKeyUp(e) }
							    		placeholder="请输入密码" 
							    		onChange={e => this.onInputChange(e) }/>
							    </div>
							    <button className="btn btn-lg btn-block btn-primary" 
							    	onClick={e => this.onSubmit(e) }>
							    	登陆
							    </button>
							</div>
				 		</div>
				</div>
			</div>
		);
	}
}

export default Login;