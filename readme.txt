/components/   # 项目组件（用于路由组件内引用的可复用组件） 
/containers/   # 路由组件（页面维度）
/models/       # 数据模型（可以理解为store，用于存储数据与方法）
/services/     # 数据接口（处理前台页面的ajax请求，转发到后台）
/static/	   # 静态资源，全局样式文件以及图片
/utils/        # 工具函数（工具库，存储通用函数与配置参数）
router.js      # 路由配置（定义路由与对应的路由组件）
单页面和多页面区别在于webpack.config.js的entry配置，多页面就配置多个入口，
而且多页面的index.jsx都需要  ReactDOM.render((<页面名/>), document.getElementById('root'))