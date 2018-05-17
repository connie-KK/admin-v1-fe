const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-Webpack-plugin')
const ExtractTextPlugin =require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',
  output: {
    //通过webpack打包的文件存放的路径
	    path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
	    filename: 'js/app.jsx'
  },
  resolve: {
    alias:{
      //加别名，配置路径
        page     : path.resolve(__dirname, 'src/page'),
        component: path.resolve(__dirname, 'src/component')
    }
  },
  module: {
	    rules: [
	      { //react（jsx）的处理
	        test: /\.jsx$/,
	        exclude: /(node_modules)/,
	        use: {
	          loader: 'babel-loader',
	          options: {
	          	  presets: ['env','react']
	          }
	        }
	      },
	      {  //css文件的处理
        	 test: /\.css$/,
        	 use: ExtractTextPlugin.extract({
          		fallback: "style-loader",
          		use: "css-loader"
        	 })
      	  },
      	  {//sass文件的处理
        	 test: /\.scss$/,
        	 use: ExtractTextPlugin.extract({
          		fallback: 'style-loader',
          		use: ['css-loader', 'sass-loader']
        	 })
      	  },
      	  {//图片的配置
        	test: /\.(png|jpg|gif)$/,
          	use: [
  	         	 {
  	          	  loader: 'url-loader',
  	          	  options: {
  	              	limit: 8192,
  	              	name: 'resource/[name].[ext]'
  	            	}
  	          	 }
  	        ]
	        },
  	      {//字标的配置
          	test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
          	use: [
  	         	 {
  	          	  loader: 'url-loader',
  	          	  options: {
  	              	limit: 8192,
  	              	name: 'resource/[name].[ext]'
  	            	}
  	          	 }
  	        ]
  	      }
	    ]
   },
   plugins: [
   		//处理html文件
   		new HtmlWebpackPlugin({
   		   template: './src/index.html',
         favicon: './favicon.ico'
   		}),
   		//独立css文件
   		new ExtractTextPlugin("css/[name].css"),
   		//提出公共模块
   		new webpack.optimize.CommonsChunkPlugin({
   			name : 'common',
   			filename: 'js/base.js'
   		})
   	],
    devServer: {
        port:8080,
        //404找不到页面的时候也可跳转到下面的指定页面
        historyApiFallback: {
          index:'/dist/index.html'
        }
    }
};