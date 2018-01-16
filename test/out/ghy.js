
var fn = function (data, option) {
    with (data || {}) {
        var ForEachIpml = option.ForEachIpml;
        var out = option.out;
        var pageNodes = option.pageNodes;
        service (n)
        function service (parent) {
out.print("<html>\r\n<head>\r\n\r\n</head>\r\n<body>\r\n<h1>");
out.print (title);
out.print("</h1>\r\n\r\n");
if(_meth_if_1(n.list[4])){return}
if(_meth_if_1(n.list[6])){return}
out.print("\r\n<h3>for 循环，多重嵌套</h3>\r\n<ul>\r\n    ");
if(_meth_forEach_1(n.list[8])){return}
out.print("\r\n</ul>\r\n\r\n<h3>for 循环 map</h3>\r\n");
if(_meth_forEach_1(n.list[10])){return}
out.print("\r\n\r\n<h3>map 混合使用</h3>\r\n");
if(_meth_forEach_1(n.list[12])){return}
out.print("\r\n\r\n<h3>include 外部页面</h3>\r\n<p>与handbares 不同，无需设置额外的模版跟路径，即可直接在模版使用</p>\r\n</body>\r\n</html>");}  
          }
};
// 开始输出函数体
function _meth_if_1(n){
 var foreachTag = new ForEachIpml ();
 var foreachTag = new ForEachIpml ();
  try {
foreachTag.setItems (list);

out.print("<p>show if_test1</p>\r\n");
// 开始输出函数体
function _meth_if_1(n){
 var foreachTag = new ForEachIpml ();
 var foreachTag = new ForEachIpml ();
  try {
foreachTag.setItems (list);

out.print("<p>两个都显示</p>\r\n");
// 开始输出函数体
function _meth_forEach_1(n){
 var foreachTag = new ForEachIpml ();
 var foreachTag = new ForEachIpml ();
  try {
foreachTag.setItems (list);

out.print("<li>\r\n            <p>");
out.print (item.name);
out.print("</p>\r\n            <ol>\r\n                ");
if(_meth_forEach_1(n.list[4])){return}
out.print("\r\n            </ol>\r\n        </li>\r\n    ");
// 开始输出函数体
function _meth_forEach_1(n){
 var foreachTag = new ForEachIpml ();
 var foreachTag = new ForEachIpml ();
  try {
foreachTag.setItems (list);

out.print("<li>\r\n                        ");
out.print (li);
out.print("\r\n                    </li>\r\n                ");
// 开始输出函数体
function _meth_forEach_1(n){
 var foreachTag = new ForEachIpml ();
 var foreachTag = new ForEachIpml ();
  try {
foreachTag.setItems (list);

out.print("<p><span>");
out.print (item.key);
out.print(":</span><span>");
out.print (item.value);
out.print("</span></p>\r\n");
// 开始输出函数体
function _meth_forEach_1(n){
 var foreachTag = new ForEachIpml ();
 var foreachTag = new ForEachIpml ();
  try {
foreachTag.setItems (list);

out.print("<p><span>");
out.print (item);
out.print(":</span><span>");
out.print (nameMap[item]);
out.print("</span></p>\r\n");}
