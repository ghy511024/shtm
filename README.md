[![Build Status](https://travis-ci.org/ghy511024/shtm.svg?branch=master)](https://travis-ci.org/ghy511024/shtm)
[![Coverage Status](https://coveralls.io/repos/github/ghy511024/shtm/badge.svg?branch=master)](https://coveralls.io/github/ghy511024/shtm?branch=master)


shtm.js
=============

A node template engine based on Java JSTL
----

## Install

```
npm install shtm
```
## Use in express

* set engine

Using shtm as the default view engine requires just one line of code in your app setup. This will render .shtm files when res.render is called.

```
app.set ('views', path.join (__dirname, 'views'));
app.set('view engine', 'shtm');
```

To use a different extension (i.e. html) for your template files:

```
app.set ('views', path.join (__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('shtm').__express);
```

* use engine
 
```
app.get('/home', function (req, res) {
  res.render('home', { title: 'Hello shtm!'});
});

```
The template (i.e. home.shtm)

```
├─views
│   └─home.shtm
└─package.json
```
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>shtm</title>
</head>
<body>
    message:${title}
</body>
</html>

```


## Normal
```
var data={a:1,b:{x1:1},c:{key:"x1"}}
```

 ```
<span>${a}</span>
<span>${b.x1}</span>
<span>${b[c.key]}</span>
```

## If 

* app.js

```

app.get('/home', function (req, res) {
  res.render('home', { test1: true, test2: false, test3: 1 });
});

```
* home.shtm

```
<c:if test="${test1}">t1</c:if>                 //true
<c:if test="${test2}">t2</c:if>                 //false
<c:if test="${test1&&test2}">t3</c:if>          //false
<c:if test="${test1||test2}">t4</c:if>          //true
<c:if test="${test3}">t5</c:if>                 //false
<c:if test="${'xixihaha'}">t6</c:if>            //false
<c:if test="${'xixihaha'.length>0}">t7</c:if>   //true
```

## ForEach
```

 app.get('/home', function (req, res) {
    var data = {
            list: [{name: "lilei"},{name: "hanmeimei"}],
            maps: {key1, "value1", key2: "value2"},
            str: "key1,key2,key3"
        }
     res.render('home', data);
});
    
```
* foreach arraylist 

```
    <c:forEach items="${list}" var="item">
        <span>
            <span>arrItem：${item}</span>
        </span>
    </c:forEach>
```
* foreach map 

```
    <c:forEach items="${maps}" var="item">
         <span>
             <span>map forEach：${item.key}:${item.value}</span>
         </span>
    </c:forEach>
```
* foreach string
```
    <c:forEach items="${str}" var="item">
          <span>
             <span>string forEach： ${item}</span>
          </span>
    </c:forEach>

```
* foreach "begin && end && index"
```
<ul>
    <c:forEach  begin="0" end="3" index="index">
        <li>${index}</li>       
    </c:forEach>
<ul>

==================out============
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
</ul>
```

## Foreach nesting
```

 app.get('/home', function (req, res) {
    var data={
        list:[
            {name:"lilei",list2:[1,2,3]},
            {name:"hanmeimei",list2:[4,5,6]}
        ]
     }
    res.render('home', data);
});
    
```
* home.shtm

```
    <c:forEach items="${list}" var="item">
          <p>name:${item.name}</p>
          <c:forEach items="${item.list2}" var="val">
                <span>${val}</span>
           </c:forEach>
    </c:forEach>

```

## include

```
├─common
│  └─header.shtm
└─page
    ├─page1.shtm
    ├─child.shtm

```

* page1.shtm

```
<c:include page="../common/header.shtm"></c:include>

<div class="main">
    <c:include page="child.shtm"></c:include>
</div>

```