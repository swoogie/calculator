

class Calculator{
    constructor(lastOpText, curOpText) {
        this.lastOpText = lastOpText;
        this.curOpText = curOpText;
        this.clear();
    }

    clear(){
        this.curOp = '';
        this.lastOp = '';
        this.fun = null;
    }

    delete(){
        this.curOp = this.lastOp.toString().slice(0, -1)
    }

    appendNumber(num){
        if (this.curOp.includes('.') && num === '.'){
            return;
        }
        this.curOp = this.curOp.toString() + num.toString;
    }

    selectFun(fun){
        if(this.curOp === '') {
            this.calculate()
        }
        this.fun = fun;
        this.lastOp = this.curOp;
        this.curOp = '';
    }

    calculate(){
        let equal;
        const cur = parseFloat(this.curOp);
        const last = parseFloat(this.lastOp);
        if (isNaN(last) || isNaN(cur)){
            return;
        }
        switch(this.fun){
            case '+':
                equal = last + cur;
                break;
            case '-':
                equal = last - cur;
                break;
            case '*':
                equal = last * cur;
                break;
            case '/':
                equal = last / cur;
                break;
            case '^':
                equal = Math.pow(last, cur);
                break;
            case 'x√':
                equal = Math.pow(last, 1/cur);
                break;
            default:
                return;
        }
        this.curOp = equal;
        this.fun = null;
        this.lastOp = '';
    }

    selectFunSingle(fun){
        this.fun = fun;
        if(this.curOp === ''){
            return;
        }
        else{
            this.funSingle();
        }
    }

    funSingle(){
        let equal;
        const cur = parseFloat(this.curOp)
        if (isNaN(cur)){
            return;
        }
        switch(this.fun){
            case 'sin':
                equal = Math.sin(cur);
                break;
            case 'cos':
                equal = Math.cos(cur);
                break;
            case 'tan':
                equal = Math.tan(cur);
                break;
            case '√':
                equal = Math.sqrt(cur);
                break;
            default:
                return;
        }
        this.curOp = equal;
        this.fun = null;
    }

    update(){
        this.curOpText.innerText = this.curOp;
        if (this.fun != null){
            this.lastOpText.innerText = this.lastOp + this.fun;
        }
        else{
            lastOpText = '';
        }
    }
}

const numButton = document.querySelectorAll(".numBtn");
const funButton = document.querySelectorAll(".funBtn");
const funSingle = document.querySelectorAll(".funSingle");
const eqlButton = document.querySelector(".equal");
const clrButton = document.querySelector(".clear");
const delButton = document.querySelector(".delete");
const lastOpText = doument.querySelector(".lastOp");
const curOpText = document.querySelector(".curOp");

const calculator = new Calculator(lastOpText, curOpText);

numButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.update();
    })
})

funButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectFun(button.innerText);
        calculator.update();
    })
})

funSingle.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectFunSingle(button.innerText);
        calculator.update();
    })
})

eqlButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clrButton.addEventListener('click', button => {
    calculator.clear();
    calculator.update();
})

delButton.addEventListener('click', button => {
    calculator.delete();
    calculator.update();
})

