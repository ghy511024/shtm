
### 变量输出
```
var data={a:1,b:{x1:1},c:{key:"x1"}}

// 模版
// 普通变量
<span>${a}</span>
// 属性读取
<span>${b.x1}</span>
// 组合属性读取
<span>${b[c.key]}</span>
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
<c:if test="${!test1&&test2&&test3>0||(test4+1)=3}">
 <p>hello world</p>
</c:if>
```

### 循环
```
var data={
    list:[{name:"李雷"}],
    list2:{key1,"value1",key2:"value2"},
    list3:"key1,key2,key3"
    }

// 模版
    <p>数组list 输出</p>
    <c:forEach items="${list}" var="item">
        <span>
            <span>${item}</span>
        </span>
    </c:forEach>
    <p>map 遍历输出</p>
    <c:forEach items="${list1}" var="item">
         <span>
             <span>${item.key}:${item.value}</span>
         </span>
    </c:forEach>
    <p>字符串 循环输出，（暂且只支持逗号分割的字符串）</p>
    <c:forEach items="${list3}" var="item">
          <span>
             <span>${item}</span>
          </span>
    </c:forEach>

```

### 嵌套
```
var data={
        list:[
            {name:"李雷",list2:[1,2,3]},
            {name:"韩梅梅",list2:[4,5,6]}
        ]
    }

// 模版
<ul>
    <c:forEach items="${list}" var="item">
          <p>name:${item.name}</p>
          <c:forEach items="${item.list2}" var="val">
                <span>val</span>
           </c:forEach>
    </c:forEach>
</ul>

```