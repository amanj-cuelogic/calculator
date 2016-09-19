{
    var val = [];
    
    var CURRENT = 0;
    var LAST = '';
    var operators = ['+','-','*','/','='];
    var result = 0;
    var OPERATOR = null ;
    var OPSTRING ;
    //localStorage.setItem('opexpression');
    var id = 0;
    var opexprsn = {};
    

function addtoDisplay(digit) {

    
    
    setDisplay = function(){    
        if (operators.indexOf(digit) != -1) {
            if (digit == '=') {
                val.push(CURRENT);
                result = calculate(OPERATOR);
                printExpression(val,result);
                this.id++;
            }else{
                val.push(CURRENT);
                val.push(digit);
                console.log(OPERATOR);
                if (OPERATOR != digit && OPERATOR !== null) {
                    result = calculate(OPERATOR);
                    OPERATOR = digit;
                }else{
                    result = calculate(digit);    
                }
                
            }
            
            OPSTRING += digit;
            document.getElementById('display').value = result;
        }else if(digit == 'C'){
            CURRENT = 0;
            LAST  = '';
            
            document.getElementById('display').value = '';
        }else{
            if (CURRENT.length > 0) {
                CURRENT = CURRENT + digit;
                OPSTRING += digit;
                document.getElementById('display').value = CURRENT;
            }else{
                CURRENT = digit;
                OPSTRING = CURRENT;
                document.getElementById('display').value = CURRENT;
            }    
        }
        
        
    };
    
    calculate = function(operator){
        switch (operator) {
            case '+':
                if (typeof LAST == 'number') {
                    LAST = parseInt(LAST) + parseInt(CURRENT);
                    
                }else{
                    LAST = parseInt(CURRENT);    
                }
                OPERATOR = operator;
                CURRENT = LAST;
                break;
            case '-':
                if (typeof LAST == 'number') {
                    LAST = parseInt(LAST) - parseInt(CURRENT);    
                }else{
                    LAST = parseInt(CURRENT);    
                }
                OPERATOR = operator;
                CURRENT = LAST;
                break;
            
            case '*':
                if (typeof LAST == 'number') {
                    LAST = parseInt(LAST) * parseInt(CURRENT);    
                }else{
                    LAST = parseInt(CURRENT);    
                }
                OPERATOR = operator;
                CURRENT = LAST;
                break;
            case '/':
                if (typeof LAST == 'number') {
                    LAST = parseInt(LAST) / parseInt(CURRENT);    
                }else{
                    LAST = parseInt(CURRENT);    
                }
                OPERATOR = operator;
                CURRENT = LAST;
                break;
            
            case 'default' :
                throw new Error('Operation not Specified');
                
        }
        
        return CURRENT;
    };
    
    printExpression = function (expr,finalresult) {
        var opexpr = expr.join('');
        opexpr += '='+finalresult;
        opexprsn[this.id] = {'exprn':opexpr,'result':finalresult};
        val = [];
        CURRENT = 0;
        LAST = '';
        localStorage.setItem('opexpression',JSON.stringify(opexprsn));
        console.log(localStorage);
        var ul = document.getElementById('op-list');
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(opexpr));
        li.onclick = showOutput;
        ul.appendChild(li);
        
    };
    
    showOutput = function(){
        var storageData = localStorage.getItem('opexpression');
        storageData = JSON.parse(storageData);
        console.log(storageData);
        document.getElementById('display').value = storageData[this.id].result;
        val = [];
    };
    
    
    
    setDisplay();
}
window.onload = function(){
    var exprStorage = localStorage.getItem('opexpression');
    exprStorage = JSON.parse(exprStorage);
    
    for(var keys in exprStorage){
      if(exprStorage.hasOwnProperty(keys)){
            var ul = document.getElementById('op-list');
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(exprStorage[keys].exprn));
            //li.onclick = showOutput;
            ul.appendChild(li);
            this.id++;
        }  
    }
    
};
};
