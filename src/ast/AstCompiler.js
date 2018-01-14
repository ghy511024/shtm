var esprima = require('esprima');
// console.log(esprima.Syntax,"vvvvvvvvvvvvvvvvvv")
// console.log(esprima.ComputedMemberExpression,"vvvvvvvvvvvvvvvvvv")
class AstCompiler {
    constructor(ctx) {
        this.ctx = ctx;
    }

    excute(program) {

        // let program = 'a>b&&c==0';
        let ast = esprima.parse(program);
        let astBody = ast.body || [];
        let value;
        if (astBody.length > 0) {
            let expression = astBody[0].expression;
            // console.log("express:", JSON.stringify(astBody[0]), JSON.stringify(this.ctx))
            value = this.getvalue(expression, this.ctx);
            // console.log (value)
        }
        return value;
    }

    getvalue(node, ctx) {
        ctx = ctx || this.ctx;
        let type = node.type;
        let value;
        switch (type) {
            case "ThisExpression":
                break;
            case "Identifier":
                value = this.getIdentifier(node, ctx);
                break;
            case "Literal":
                value = this.getLiteral(node);
                break;
            case "ArrayExpression":
                break;
            case "ObjectExpression":
                break;
            case "FunctionExpression":
                break;
            case "ArrowFunctionExpression":
                break;
            case "ClassExpression":
                break;
            case "TaggedTemplateExpression":
                break;
            case "MemberExpression":
                value = this.getMemberExpression(node, ctx);
                break;
            case "Super":
                break;
            case "MetaProperty":
                break;
            case "NewExpression":
                break;
            case "CallExpression":
                break;
            case "UpdateExpression":
                break;
            case "AwaitExpression":
                break;
            case "UnaryExpression":
                break;
            case "BinaryExpression":
                value = this.getBinaryExpression(node, ctx);
                break;
            case "LogicalExpression":
                value = this.getLogicalExpression(node, ctx);
                break;
            case "ConditionalExpression":
                break;
            case "YieldExpression":
                break;
            case "AssignmentExpression":
                break;
            case "BinaryExpression":
                break;
            case "SequenceExpression":
                break;
            default:
                break;
        }
        return value;
    }

    getIdentifier(node, ctx) {
        let idname = node.name;
        // console.log("Identifier", idname, ctx)
        return ctx[idname]
    }

    getLiteral(node) {
        let value = node.value;
        return value;
    }

    getMemberExpression(node, ctx) {
        let object = node.object;
        let property = node.property;
        let computed = node.computed;// 暂时没用到
        let object_val = this.getvalue(object, ctx);

        let property_val = this.getvalue(property, ctx)
        if (computed) {
            let property_val = this.getvalue(property, ctx);
            return object_val[property_val];
        } else {
            let property_val = this.getvalue(property, object_val);
            return property_val;
        }

    }

    getBinaryExpression(node, ctx) {
        let left = node.left;
        let right = node.right;
        let left_val = this.getvalue(left, ctx);
        let right_val = this.getvalue(right, ctx);
        let operator = node.operator;

        let value;
        switch (operator) {
            case "instanceof":
                value = left_val instanceof right_val;
                break;
            case "in":
                value = left_val in right_val;
                break;
            case "+":
                value = left_val + right_val;
                break;
            case "-":
                value = left_val - right_val;
                break;
            case "*":
                value = left_val * right_val;
                break;
            case "/":
                value = left_val / right_val;
                break;
            case "%":
                value = left_val % right_val;
                break;
            case "**":
                value = left_val ** right_val;
                break;
            case "|":
                value = left_val | right_val;
                break;
            case "^":
                value = left_val ^ right_val;
                break;
            case "&":
                value = left_val & right_val;
                break;
            case "<<":
                value = left_val << right_val;
                break;
            case "==":
                value = left_val == right_val;
                break;
            case "!=":
                value = left_val != right_val;
                break;
            case "===":
                value = left_val === right_val;
                break;
            case "!==":
                value = left_val !== right_val;
                break;
            case "<":
                value = left_val < right_val;
                break;
            case "<=":
                value = left_val <= right_val;
                break;
            case ">":
                value = left_val > right_val;
                break;
            case ">=":
                value = left_val >= right_val;
                break;
            case "<<":
                value = left_val << right_val;
                break;
            case ">>":
                value = left_val >> right_val;
                break;
            case ">>>":
                value = left_val >>> right_val;
                break;
            default:
                break;
        }
        // console.log (left_val, right_val, operator, value)
        return value;
    }

    getLogicalExpression(node) {
        let left = node.left;
        let right = node.right;
        let left_val = this.getvalue(left);
        let right_val = this.getvalue(right);
        let operator = node.operator;
        let value;
        switch (operator) {
            case "||":
                value = left_val || right_val;
                break;
            case "&&":
                value = left_val && right_val;
                break;
            default:
                break;
        }
        return value;
    }
}

module.exports = AstCompiler;