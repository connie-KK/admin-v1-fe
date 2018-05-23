import  MUtil   from 'util/mm.jsx';
const _mm = new MUtil();

class User{
	//用户登陆
	login(loginInfo){
		return _mm.request({
			type: 'post',
			url: '/manage/user/login.do',
			data:{
				username: loginInfo.username,
				password: loginInfo.password
			}
		});
	}

	//检查登陆接口的数据是不是合法
	checkLoginInfo(loginInfo){
		let username =$.trim(loginInfo.username);
		let password =$.trim(loginInfo.password);

		//判断用户名不为空
		if(typeof username !== 'string' || username.length ===0){
			return {
				status :false,
				msg: '用户名不能为空'
			}
		}

		//判断密码不为空
		if(typeof password !== 'string' || password.length ===0){
			return {
				status :false,
				msg: '密码不能为空'
			}
		}

		return{
			status: true,
			msg: '验证通过'
		}
			
	}

	//退出登录
	logout(){
		return _mm.request({
			type: 'post',
			url: '/user/logout.do',
		});
	}

	//获取用户列表
	getUserList(pageNum){
		return _mm.request({
			type: 'post',
			url: '/manage/user/list.do',
			data: {
				pageNum: pageNum
			}
		});
	}
		
}

export default User;