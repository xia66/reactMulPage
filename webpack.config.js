const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//导入生成html文件的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin") //独立打包css文件插件

//向外暴露一个配置对象，commonjs规范（因为webpack是基于node构建）
//webpack默认只能打包处理.js后缀的文件，像.jpg .vue等文件无法主动处理，所以需要配置第三方loader
module.exports = {
    mode: 'development', //development  production ( 生产环境会将代码压缩 )
    //在webpack4中有一大特性是约定大于配置，默认打包入口路径是'src/index.js'，打包输出路径是'dist/main.js'
    /*
    //单页面配置如下
    entry: path.resolve(__dirname, 'src/Root.jsx'),

    output: {
        path: __dirname + "/build",
        filename: "bundle.js"
    },*/
    //多页面配置如下，另外需要html-webpack-plugin插件配置才能真正生成多个html文件
    entry: {
        root: path.resolve(__dirname, 'src/RootMul.jsx'),
        home: path.resolve(__dirname, 'src/containers/Home/index.jsx'),
        test: path.resolve(__dirname, 'src/containers/Test/index.jsx'),
        user: path.resolve(__dirname, 'src/containers/User/index.jsx')
    },
    output: {
        path: __dirname + "/build",
        filename: "scripts/[name]-[hash].js",
        chunkFilename: 'scripts/[name]-[hash].chunk.js',
    },
    //解析配置，简化引入文件书写
    resolve:{
    // 解析模块请求的选项
    // （不适用于对 loader 解析）
        // 使用的扩展名
        extensions:['*', '.js','.jsx'],//自动解析的后缀名
        alias:{
            // 模块别名列表
            $Static:path.resolve(__dirname,'src/static/'),
            $Pubilc:path.resolve(__dirname,'src/public/'),
            $Containers:path.resolve(__dirname,'src/containers/'),
            $Components:path.resolve(__dirname,'src/components/'),
        }
    },

    plugins: [
        //模板插件，单页面配置如下
        /*new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.tmpl.html'),//模板文件
            filename: 'index.html'//生成文件名
        }),*/
        //模板插件，多页面配置如下
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.tmpl.html'),
            chunks: ['root'],
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.tmpl.html'),
            chunks: ['home'],
            filename: 'home/index.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.tmpl.html'),
            chunks: ['test'],
            filename: 'test/index.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.tmpl.html'),
            chunks: ['user'],
            filename: 'user/index.html'
        }),
        
        //单独打包css,单页面配置如下
        /*
        new MiniCssExtractPlugin({//选项与htmlPlugin类似
            filename: "index.css"
        }),*/
        //单独打包css，多页面配置如下,每个css都单独打包，这样页面不会报引用同一个css的错误
        new MiniCssExtractPlugin({//选项与htmlPlugin类似
            filename: "style/[name].css",
            chunkFilename: "[id].css"
        }),

        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "window.jQuery":"jquery"
        }),
        new webpack.optimize.SplitChunksPlugin({
            chunks: "all",
            minSize: 20000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: true
        })
    ],

    module: {//第三方loader
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/ // 在使用babel-loader时候一定要加上exclude,排除node_modules文件夹 
            },
            //开启eslint
            // {
            //     test: /\.(js|jsx)$/,
            //     use: 'eslint-loader',
            //     exclude: /node_modules/ 
            // },
            {   //css/less打包
                test: /\.(css|less)$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                /*Loader必须严格按照这个顺序，不然会报错。解析顺序是从右到左*/
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer"), /*在这里添加*/
                                require('postcss-px2rem')({remUnit: 12}),
                                require('postcss-flexbugs-fixes'),

                            ]
                        }
                    },
                    "less-loader"
                ]

            },
            {   //防止antd冲突的配置
                test: /\.css$/,
                exclude: /(src)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test:/\.(png|jpg|gif|svg)$/,
                use:[{
                        loader:'url-loader',
                        options:{ // 这里的options选项参数可以定义多大的图片转换为base64
                            name: '[name].[ext]',
                            limit:50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
                            outputPath:'images' //定义输出的图片文件夹
                        }
                    },
                    {   //压缩图片要在file-loader之后使用
                        loader:'image-webpack-loader',
                        options:{
                            bypassOnDebug: true
                        }
                    }
                ]
            }
        ]
    },

    devtool: "cheap-source-map"
}
