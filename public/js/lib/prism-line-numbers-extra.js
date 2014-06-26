Prism.hooks.add("extra-highligth",function(text){
  var linesNum = (1 + text.split('\n').length);
  var lineNumbersWrapper;
  var lines = new Array(linesNum);
  lines = lines.join('<span></span>');
  lineNumbersWrapper = document.createElement('span');
  lineNumbersWrapper.className = 'line-numbers-rows';
  lineNumbersWrapper.innerHTML = lines;
  return lineNumbersWrapper.outerHTML;
})