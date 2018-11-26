module.exports={
  /*
  单行代码块要使用空格分隔
  */
  "extends":"airbnb",
  "rules":{
        "comma-dangle": ["error","never"],  //要求对象或数组使用尾随逗号
        "linebreak-style": [0 ,"error", "windows"], //环境为windows
        "indent": ["error", 4], // 缩进使用4个空格
        "react/jsx-indent": ["error", 4], // 缩进使用4个空格
        "quotes": 0,
        "jsx-quotes": 0, // 引号问题不报错
        "react/prop-types": 0,
        "semi": 0 //分号问题不报错
  }
}
