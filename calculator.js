var Calculator = (function(){
    var priv = {};
    var id = 0;
    var operation_map = {'+' : Add,'-' : Subtract,'*' : Multiply, '/' : Divide};
    
    function Add() {
        
    }
    
    Add.prototype.perform = function(curr_obj){
        curr_obj.LAST = parseInt(curr_obj.LAST) + parseInt(curr_obj.CURRENT);
        return curr_obj.LAST;
    };
    
    function Subtract() {
        
    }
    
    Subtract.prototype.perform = function(curr_obj){
        curr_obj.LAST = parseInt(curr_obj.LAST) - parseInt(curr_obj.CURRENT);
        return curr_obj.LAST;
    };
    
    function Multiply() {
        
    }
    
    Multiply.prototype.perform = function(curr_obj){
        curr_obj.LAST = parseInt(curr_obj.LAST) * parseInt(curr_obj.CURRENT);
        return curr_obj.LAST;
    };
    
    function Divide() {
        
    }
    
    Divide.prototype.perform = function(curr_obj){
        curr_obj.LAST = parseInt(curr_obj.LAST) / parseInt(curr_obj.CURRENT);
        return curr_obj.LAST;
    };
    
    
    
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
        
        if (priv[this.id].operators.indexOf(digit) != -1) {
            if (digit == "=") {
                    if (typeof priv[this.id].LAST == 'number') {
                        priv[this.id].val.push(priv[this.id].CURRENT);
                        priv[this.id].result = new operation_map[priv[this.id].OPERATOR]().perform(priv[this.id]);
                        
                    }else{
                        priv[this.id].LAST = parseInt(priv[this.id].CURRENT);
                        priv[this.id].CURRENT = 0;
                    }
                    priv[this.id].OPERATOR = digit;
                    priv[this.id].CURRENT = '';
                    //console.log(priv[this.id]);
                    this.printExpression(priv[this.id].val,priv[this.id].result);
                
            }else{
                priv[this.id].val.push(priv[this.id].CURRENT);
                priv[this.id].val.push(digit);
                if (typeof priv[this.id].LAST == 'number') {
                    if (priv[this.id].OPERATOR != digit && priv[this.id].OPERATOR !== null) {
                        priv[this.id].result = new operation_map[priv[this.id].OPERATOR]().perform(priv[this.id]);
                        
                    }else{
                        priv[this.id].result = new operation_map[digit]().perform(priv[this.id]);
                        
                    }
                }else{
                    priv[this.id].LAST = parseInt(priv[this.id].CURRENT);
                    priv[this.id].result = priv[this.id].LAST;
                    
                }
                
                priv[this.id].CURRENT = '';
                priv[this.id].OPERATOR = digit;
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
        if(typeof storageData[this.id] != 'object'){
            storageData[this.id] = {};
        }
        storageData[this.id][priv[this.id].id] = {'exprn':opexpr,'result':finalresult};
        this.setStorageData(storageData);
        this.resetVals();
        var obj = {};
        obj[priv[this.id].id] = storageData[this.id][priv[this.id].id];
        this.createList(obj);
        
    };
    
    
    CalculatorConstructor.prototype.createList = function(exprStorage){
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
                liexprnString.onclick = (function(a,b){
                        return function(){
                                var exprsn_id = b.getAttribute('id');    
                                var exprStorage = a.getStorageData();
                                priv[a.id].CURRENT = exprStorage[a.id][exprsn_id].result;
                                a.updateDisplay(priv[a.id].CURRENT);
                            };
                    })(this,liexprnString);
                removeString.onclick = (function(a,b){
                        return function(){
                                var removeId = b.getAttribute('id');
                                removeId = removeId.split('-');
                                var exprStorage = a.getStorageData();
                                delete exprStorage[a.id][removeId[1]];
                                a.setStorageData(exprStorage);
                                b.parentNode.remove();
                                a.resetDisplay();
                            };
                    })(this,removeString);
                li.appendChild(liexprnString);
                li.appendChild(removeString);
                ul.appendChild(li);
            }  
        }
    };
    
    CalculatorConstructor.prototype.loadList = function (){
        var exprStorage = this.getStorageData();
        if (typeof exprStorage[this.id] == 'object' && Object.keys(exprStorage).length > 0) {
            this.createList(exprStorage[this.id]);
        }
    };
    
    
    return CalculatorConstructor;
}());
