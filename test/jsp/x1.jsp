<jsp:include page="x2.jsp"></jsp:include>
<p>文本1</p>
<c:forEach items="${list1}" var="item"></c:forEach>
<c:if test="${5>3&&list1!=null||num1=='1'}">
    <P>if 语句生效了333</P>
</c:if>



