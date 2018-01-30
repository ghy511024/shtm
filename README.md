
### 变量输出
```
var data={a:1,b:{x1:1},c:{key:"x1"}}

// 模版
<span>普通变量:${a}</span>
<span>属性读取:${b.x1}</span>
<span>组合属性读取:${b[c.key]}</span>
```

### if 判断
```
var data={
    test1:false,
    test2:true,
    test3:1
    test4:2
    }

// 模版
<c:if test="${!test1&&test2&&test3>0||(test4+1)==3}">
 <p>hello shtm</p>
</c:if>
```

### 循环
```
var data={
    list:[{name:"李雷"}],
    list1:{key1,"value1",key2:"value2"},
    list2:"key1,key2,key3"
    }

// 模版
    <c:forEach items="${list}" var="item">
        <span>
            <span>数组list：${item}</span>
        </span>
    </c:forEach>

    <c:forEach items="${list1}" var="item">
         <span>
             <span>map遍历：${item.key}:${item.value}</span>
         </span>
    </c:forEach>

    <c:forEach items="${list2}" var="item">
          <span>
             <span>字符串 循环输出： ${item}</span>
          </span>
    </c:forEach>

```
* 字符串目前只支持逗号分隔的字符串遍历

### 嵌套
```
var data={
        list:[
            {name:"李雷",list2:[1,2,3]},
            {name:"韩梅梅",list2:[4,5,6]}
        ]
    }

// 模版

    <c:forEach items="${list}" var="item">
          <p>name:${item.name}</p>
          <c:forEach items="${item.list2}" var="val">
                <span>${val}</span>
           </c:forEach>
    </c:forEach>

```

### 引用外部模板

```
├─common
│  └─header.shtm
├─page1.shtm
├─child.shtm


//page1.shtm

<c:include page="../common/header.shtm"></c:include>

<div class="main">
<c:include page="child.shtm"></c:include>
</div>

```