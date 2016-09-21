(function(){
    var val = [];
    var CURRENT = 0;
    var LAST ;
    var operators = ['+','-','*','/','='];
    var result ;
    var OPERATOR = null ;
    var id = 0;
    
    updateDisplay = function(data){
        document.getElementById('display').value = data;
    };
    
    setDisplay = function(digit){    
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
    
    
    calculate = function(operator){
        
        add = function(){
                LAST = parseInt(LAST) + parseInt(CURRENT);
        };
        
        subtract = function(){
                LAST = parseInt(LAST) - parseInt(CURRENT);    
        };
        
        multiply = function(){
                LAST = parseInt(LAST) * parseInt(CURRENT);    
        };
        
        divide = function(){
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
    
    resetVals = function(){
        
        CURRENT = LAST;
        LAST  = '';
        val= [];
    };
    
    resetDisplay = function(){
        resetVals();    
        updateDisplay('');
    };
    
    getStorageData = function(){
        return JSON.parse(localStorage.getItem('oprexpression'));
    };
    
    setStorageData = function(data){
        localStorage.setItem('oprexpression',JSON.stringify(data));
    };
    
    printExpression = function (expr,finalresult) {
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
    
    
    createList = function(exprStorage){
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
    
    showOutput = function(){
        var exprsn_id = this.getAttribute('id');
        var exprStorage = getStorageData();
        CURRENT = exprStorage[exprsn_id].result;
        updateDisplay(exprStorage[exprsn_id].result);
        //document.getElementById('display').value = exprStorage[exprsn_id].result;
    };
    
    
    deleteExprssn = function(){
        var removeId = this.getAttribute('id');
        removeId = removeId.split('-');
        var exprStorage = getStorageData();
        delete exprStorage[removeId[1]];
        setStorageData(exprStorage);
        this.parentNode.remove();
        resetDisplay();
    };
    
    loadList = function(){
        var exprStorage = getStorageData();
        if (Object.keys(exprStorage).length > 0) {
            createList(exprStorage);
        }
    }();
})();
