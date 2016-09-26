var Calculator = (function(){
    var priv = {};
    var id = 0;
    var operation_map = {'+' : 'add','-' : 'subtract','*' : 'multiply', '/' : 'divide'};
    
    function CalculatorConstructor() {
        this.id = id++;
        priv[this.id] = {};
        priv[this.id].val = [];
        priv[this.id].CURRENT = '';
        priv[this.id].LAST = '';
        priv[this.id].operators = ['+','-','*','/','='];
        priv[this.id].result = '';
        priv[this.id].OPERATOR = null;
        priv[this.id].id = 0;
        
    
        this.getStorageData = function(){
            console.log(localStorage.getItem('oprexpression-'+this.id));
            return localStorage.getItem('oprexpression-'+this.id)?JSON.parse(localStorage.getItem('oprexpression-'+this.id)):{};
        };
    
        this.setStorageData = function(data = {}){
            localStorage.setItem('oprexpression-'+this.id,JSON.stringify(data));
        };
        
        
    }
    
    CalculatorConstructor.prototype.updateDisplay = function(data){
        document.getElementById("display").value = data;
    };
    
    CalculatorConstructor.prototype.setDisplay = function(digit){
        var operation;
        if (priv[this.id].operators.indexOf(digit) != -1) {
            if (digit == "=") {
                if (typeof priv[this.id].LAST == "number") {
                    priv[this.id].val.push(priv[this.id].CURRENT);
                    if (typeof priv[this.id].LAST == 'number') {
                        priv[this.id].result = operation_map[digit]();
                    }else{
                        priv[this.id].LAST = parseInt(priv[this.id].CURRENT);  
                    }
                    priv[this.id].OPERATOR = digit;
                    priv[this.id].CURRENT = '';
                    //console.log(priv[this.id]);
                    this.printExpression(priv[this.id].val,priv[this.id].result);
                }else{
                    priv[this.id].CURRENT = 0;
                }
            }else{
                priv[this.id].val.push(priv[this.id].CURRENT);
                priv[this.id].val.push(digit);
                if (priv[this.id].OPERATOR != digit && priv[this.id].OPERATOR !== null) {
                    priv[this.id].result = operation_map[priv[this.id].OPERATOR]();
                    priv[this.id].OPERATOR = digit;
                }else{
                    operation = operation_map[digit];
                    priv[this.id].result = this.operation();
                }
            }
            
            this.updateDisplay(priv[this.id].result);
        }else{
            if (priv[this.id].CURRENT != '') {
                priv[this.id].CURRENT = priv[this.id].CURRENT + digit;
            }else{
                priv[this.id].CURRENT = digit;
            }
            this.updateDisplay(priv[this.id].CURRENT);
        }
    };
    
    CalculatorConstructor.prototype.calculate = function(operator){
        
        //var add = function(curr_obj){
        //        curr_obj.LAST = parseInt(curr_obj.LAST) + parseInt(curr_obj.CURRENT);
        //};
        //
        //var subtract = function(curr_obj){
        //        curr_obj.LAST = parseInt(curr_obj.LAST) - parseInt(curr_obj.CURRENT);    
        //};
        //
        //var multiply = function(curr_obj){
        //        curr_obj.LAST = parseInt(curr_obj.LAST) * parseInt(curr_obj.CURRENT);    
        //};
        //
        //var divide = function(curr_obj){
        //        curr_obj.LAST = parseInt(curr_obj.LAST) / parseInt(curr_obj.CURRENT);    
        //};
        //
        //if (typeof priv[this.id].LAST == 'number') {
        //    switch (operator) {
        //        case '+':
        //            add(priv[this.id]);
        //            break;
        //        case '-':
        //            subtract(priv[this.id]);
        //            break;
        //        
        //        case '*':
        //            multiply(priv[this.id]);
        //            break;
        //        case '/':
        //            divide(priv[this.id]);
        //            break;
        //        
        //        case 'default' :
        //            throw new Error('Operation not Specified');
        //    }
        //}else{
        //    priv[this.id].LAST = parseInt(priv[this.id].CURRENT);  
        //}
        //
        //priv[this.id].OPERATOR = operator;
        //priv[this.id].CURRENT = '';
        //return priv[this.id].LAST;
    };
    
    CalculatorConstructor.prototype.resetVals = function(){
        
        priv[this.id].CURRENT = '';
        priv[this.id].LAST  = '';
        priv[this.id].val= [];
    };
    
    CalculatorConstructor.prototype.resetDisplay = function(){
        this.resetVals();    
        this.updateDisplay('');
    };
    
    CalculatorConstructor.prototype.printExpression = function (expr,finalresult) {
        var opexpr = expr.join('');
        opexpr += '='+finalresult;
        var storageData = this.getStorageData();
        console.log(storageData); 
        if (typeof storageData[this.id] == 'object' && Object.keys(storageData[this.id]).length > 0) {
            priv[this.id].id = Object.keys(storageData[this.id]).length+1;
        }else{
            priv[this.id].id++;
        }
        console.log(typeof storageData[this.id]);
        if(typeof storageData[this.id] != 'object'){
            storageData[this.id] = {};
        }
        storageData[this.id][priv[this.id].id] = {'exprn':opexpr,'result':finalresult};
        this.setStorageData(storageData);
        //console.log(this.getStorageData()); 
        this.resetVals();
        var obj = {};
        obj[priv[this.id].id] = storageData[this.id][priv[this.id].id]
        this.createList(obj);
        
    };
    
    
    CalculatorConstructor.prototype.createList = function(exprStorage){
        var self = this;
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
                liexprnString.onclick = this.showOutput.bind(this);
                removeString.onclick = this.deleteExprssn.bind(this);
                li.appendChild(liexprnString);
                li.appendChild(removeString);
                ul.appendChild(li);
            }  
        }
    };
    
    CalculatorConstructor.prototype.showOutput = function(){
        
        var exprsn_id = "2";
        var exprStorage = this.getStorageData();
        priv[this.id].CURRENT = exprStorage[this.id][exprsn_id].result;
        this.updateDisplay(priv[this.id].CURRENT);
        //document.getElementById('display  ').value = exprStorage[exprsn_id].result;
    };
    
    
    CalculatorConstructor.prototype.deleteExprssn = function(){
        var removeId = "r-1";
        removeId = removeId.split('-');
        var exprStorage = this.getStorageData();
        delete exprStorage[this.id][removeId[1]];
        this.setStorageData(exprStorage);
        this.parentNode.remove();
        this.resetDisplay();
    };
    
    CalculatorConstructor.prototype.loadList = function (){
        var exprStorage = this.getStorageData();
        if (typeof exprStorage[this.id] == 'object' && Object.keys(exprStorage).length > 0) {
            this.createList(exprStorage[this.id]);
        }
    };
    
    
    return CalculatorConstructor;
}());
//localStorage.clear();