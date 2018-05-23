class MUtil{
	request(param){
		return new Promise( (resolve, reject)=>{
			$.ajax({
				type         : param.type        || 'get',
				url      	 : param.url         || '',
				dataType 	 : param.dataType    || 'json',
				data         : param.data        ||  null,
				success:  res => {
					if(res.status === 0){
						//请求成功
						typeof resolve === 'function' && resolve(res.data, res.msg);

					}else if(res.status === 10){  
					//没有登录状态，强制登录
						this.doLogin();
						
					}else{
						typeof reject === 'function' && reject(res.data || res.msg);
					}
				},
				error: err => {
					typeof reject === 'function' && reject(err.statusText);
				}
			});
		});
		
	}
	//跳转登陆
	doLogin(){
		window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
		
	}

	//获取url参数
	getUrlParam(name){
		//xxx.com?param=123&param1=456
		let queryString = window.location.search.split('?')[1] || ''; 
		let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

		let result = queryString.match(reg);  
		//result:['param=123', '', '123', '&']
		return result ? decodeURIComponent(result[2]) : null;


	}

	//错误提示
	errorTips(errMsg){
		alert(errMsg || '好像哪里不对了~')
	}

	//存储localStorage
	setStorage(name, data){
		let dataType = typeof data;
		if( dataType === 'object'){
			//json类型
			window.localStorage.setItem(name, JSON.stringify(data));
		}else if(['number','string','boolean'].indexOf(dataType) >= 0){
			//基础类型
			window.localStorage.setItem(name, data);
		}else{
			//其他不支持类型
			alert('该类型不支持本地存储');
		}
	}

	//取出localStorage内容
	getStorage(name){
		let data = window.localStorage.getItem(name);
		if(data){
			return JSON.parse(data);
		}else{
			return '';
		}
	}

	//删除localStorage内容
	removeStorage(name){
		window.localStorage.removeItem(name);
	}

}

export default MUtil;