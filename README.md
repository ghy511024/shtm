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


### normal
```
var data={a:1,b:{x1:1},c:{key:"x1"}}

 =========xx.shtm============
 
<span>normal:${a}</span>
<span>static propertity:${b.x1}</span>
<span>custom propertity:${b[c.key]}</span>
```

### if 
```
var data={
    test1:false,
    test2:true,
    test3:1
    test4:2
    }
 =========xx.shtm============

<c:if test="${!test1&&test2&&test3>0||(test4+1)==3}">
 <p>hello shtm</p>
</c:if>
```

### forEach
```
var data={
    list:[{name:"lilei"}],
    list1:{key1,"value1",key2:"value2"},
    list2:"key1,key2,key3"
    }

    =========xx.shtm============

    <c:forEach items="${list}" var="item">
        <span>
            <span>arrItem：${item}</span>
        </span>
    </c:forEach>

    <c:forEach items="${list1}" var="item">
         <span>
             <span>map forEach：${item.key}:${item.value}</span>
         </span>
    </c:forEach>

    <c:forEach items="${list2}" var="item">
          <span>
             <span>string forEach： ${item}</span>
          </span>
    </c:forEach>

```

### nesting
```
var data={
        list:[
            {name:"lilei",list2:[1,2,3]},
            {name:"hanmeimei",list2:[4,5,6]}
        ]
    }
 =========xx.shtm============
    <c:forEach items="${list}" var="item">
          <p>name:${item.name}</p>
          <c:forEach items="${item.list2}" var="val">
                <span>${val}</span>
           </c:forEach>
    </c:forEach>

```

### include

```
├─common
│  └─header.shtm
└─page
    ├─page1.shtm
    ├─child.shtm


page1.shtm

<c:include page="../common/header.shtm"></c:include>
<div class="main">
    <c:include page="child.shtm"></c:include>
</div>

```