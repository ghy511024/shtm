
### 变量输出
```
var data={a:1}

// 模版
${data.a}
```

### if 判断
```
var data="ss"

// 模版
<c:if test="${data=='ss'&&3>2}">
 <p>hellow world</p>
</c:if>
```

### 循环
```
var list=[1,2,3]

// 模版
<ul>
    <c:forEach items="${list1}" var="item">
        <li>
            <span>${item}</span>
        </li>
    </c:forEach>
</ul>

```