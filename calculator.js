var calculator = (function(){
    var val = [];
    var CURRENT = 0;
    var LAST ;
    var operators = ['+','-','*','/','='];
    var result = '' ;
    var OPERATOR = null ;
    var id = 0;
    
    updateDisplay = function(data){
        document.getElementById('display').value = data;
    };
    
    var setDisplay = function(digit){    
        if (operators.indexOf(digit) != -1) {
            if (digit == '=') {
                if (typeof LAST == 'number') {
                    val.push(CURRENT);
                    result = calculate(OPERATOR);
                    printExpression(val,result);
                }else{
                    CURRENT = 0;
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
            
            updateDisplay(result);
            
        }else{
            if (CURRENT.length > 0) {
                CURRENT = CURRENT + digit;
            }else{
                CURRENT = digit;
            }
            updateDisplay(CURRENT);
        } 
    };
    
    
    var calculate = function(operator){
        
        var add = function(){
                LAST = parseInt(LAST) + parseInt(CURRENT);
        };
        
        var subtract = function(){
                LAST = parseInt(LAST) - parseInt(CURRENT);    
        };
        
        var multiply = function(){
                LAST = parseInt(LAST) * parseInt(CURRENT);    
        };
        
        var divide = function(){
                LAST = parseInt(LAST) / parseInt(CURRENT);    
        };
        
        if (typeof LAST == 'number') {
            switch (operator) {
                case '+':
                    add();
                    break;
                case '-':
                    subtract();
                    break;
                
                case '*':
                    multiply();
                    break;
                case '/':
                    divide();
                    break;
                
                case 'default' :
                    throw new Error('Operation not Specified');
            }
        }else{
            LAST = parseInt(CURRENT);  
        }
        
        OPERATOR = operator;
        CURRENT = LAST;
        return CURRENT;
    };
    
    var resetVals = function(){
        
        CURRENT = LAST;
        LAST  = '';
        val= [];
    };
    
    var resetDisplay = function(){
        resetVals();    
        updateDisplay('');
    };
    
    var getStorageData = function(){
        return JSON.parse(localStorage.getItem('oprexpression'));
    };
    
    var setStorageData = function(data){
        localStorage.setItem('oprexpression',JSON.stringify(data));
    };
    
    var printExpression = function (expr,finalresult) {
        var opexpr = expr.join('');
        opexpr += '='+finalresult;
        var storageData = getStorageData();
        if (Object.keys(storageData).length > 0) {
            id = Object.keys(storageData).length+1;
        }else{
            id++;
        }
        
        storageData[id] = {'exprn':opexpr,'result':finalresult};
        setStorageData(storageData);
        resetVals();
        var obj = {};
        obj[id] = storageData[id];
        createList(obj);
        
    };
    
    
    var createList = function(exprStorage){
        for(var keys in exprStorage){
          if(exprStorage.hasOwnProperty(keys)){
                var ul = document.getElementById('op-list');
                var li = document.createElement('li');
                var liexprnString = document.createElement('a');
                var removeString = document.createElement('a');
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
            }  
        }
    };
    
    var showOutput = function(){
        var exprsn_id = this.getAttribute('id');
        var exprStorage = getStorageData();
        CURRENT = exprStorage[exprsn_id].result;
        updateDisplay(exprStorage[exprsn_id].result);
        //document.getElementById('display').value = exprStorage[exprsn_id].result;
    };
    
    
    var deleteExprssn = function(){
        var removeId = this.getAttribute('id');
        removeId = removeId.split('-');
        var exprStorage = getStorageData();
        delete exprStorage[removeId[1]];
        setStorageData(exprStorage);
        this.parentNode.remove();
        resetDisplay();
    };
    
    var loadList = function (){
        var exprStorage = getStorageData();
        if (Object.keys(exprStorage).length > 0) {
            createList(exprStorage);
        }
    };
    
    return {
        setDisplay : setDisplay,
        resetDisplay : resetDisplay,
        loadList : loadList
    };
})();
calculator.loadList();


