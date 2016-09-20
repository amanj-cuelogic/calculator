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
                if (typeof LAST == 'number') {
                    val.push(CURRENT);
                    result = calculate(OPERATOR);
                    printExpression(val,result);
                }
            }else{
                val.push(CURRENT);
                val.push(digit);
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
        var storageData = localStorage.getItem('oprexpression');
        if (storageData) {
            opexprsn = JSON.parse(storageData);
            this.id = Object.keys(opexprsn).length+1;
        }else{
            this.id++;
        }
        opexprsn[this.id] = {'exprn':opexpr,'result':finalresult};
        localStorage.setItem('oprexpression',JSON.stringify(opexprsn));
        val = [];
        CURRENT = 0;
        LAST = '';
        var obj = {};
        obj[1] = opexprsn[this.id];
        createList(obj);
        
    };
    
    
    
    
    
    setDisplay();
}

showOutput = function(){
        var exprsn_id = this.getAttribute('id');
        var exprStorage = localStorage.getItem('oprexpression');
        exprStorage = JSON.parse(exprStorage);
        CURRENT = exprStorage[exprsn_id].result;
        document.getElementById('display').value = exprStorage[exprsn_id].result;
        
};

deleteExprssn = function(){
    var removeId = this.getAttribute('id');
    
    removeId = removeId.split('-');
    var exprStorage = localStorage.getItem('oprexpression');
    exprStorage = JSON.parse(exprStorage);
    delete exprStorage[removeId[1]];
    exprStorage = JSON.stringify(exprStorage);
    localStorage.setItem('oprexpression',exprStorage);
    this.parentNode.remove();
    
}

function createList(exprStorage){
    for(var keys in exprStorage){
      if(exprStorage.hasOwnProperty(keys)){
            var ul = document.getElementById('op-list');
            var li = document.createElement('li');
            var liexprnString = document.createElement('span');
            var removeString = document.createElement('span');
            liexprnString.appendChild(document.createTextNode(exprStorage[keys].exprn));
            removeString.appendChild(document.createTextNode("Remove"));
            liexprnString.setAttribute("id",keys);
            removeString.setAttribute("id",'r-'+keys);
            removeString.setAttribute("class",'remove');
            liexprnString.onclick = showOutput;
            removeString.onclick = deleteExprssn;
            li.appendChild(liexprnString);
            li.appendChild(removeString);
            ul.appendChild(li);
            this.id++;
        }  
    }
}

window.onload = function(){
    var exprStorage = localStorage.getItem('oprexpression');
    exprStorage = JSON.parse(exprStorage);
    createList(exprStorage);
    
};

