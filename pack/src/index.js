function component() {
  var element = document.createElement('div');


  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());

//使用这种方式去管理 JavaScript 项目会有一些问题：
//
//无法立即体现，脚本的执行依赖于外部扩展库(external library)。
//如果依赖不存在，或者引入顺序错误，应用程序将无法正常运行。
//如果依赖被引入但是并没有使用，浏览器将被迫下载无用代码。
//让我们使用 webpack 来管理这些脚本