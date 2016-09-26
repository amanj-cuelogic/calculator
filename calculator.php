<html>

<head>
    
</head>

<body>
    <?php for($i=0;$i<5;$i++):?>
    <?php $obj = "t[".$i."]"; ?>
        <form Name="calc">
            <table border=10 >
                <tr>
                    <td colspan=4>
                        <input type=text class="disp-screen" Name="display" id="display-<?php echo $i?>" readonly>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type=button value="0" onclick="<?php echo $obj?>.setDisplay(this.value);">
                    </td>
                    <td>
                        <input type=button value="1" onclick="<?php echo $obj?>.setDisplay(this.value);">
                    </td>
                    <td>
                        <input type=button value="2" onclick="<?php echo $obj?>.setDisplay(this.value);">
                    </td>
                    <td>
                        <input type=button value="+" onclick="<?php echo $obj?>.setDisplay(this.value);">
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type=button value="3" onclick="<?php echo $obj?>.setDisplay(this.value);">
                    </td>
                    <td>
                        <input type=button value="4" onclick="<?php echo $obj?>.setDisplay(this.value);">
                    </td>
                    <td>
                        <input type=button value="5" onclick="<?php echo $obj?>.setDisplay(this.value);">
                    </td>
                    <td>
                        <input type=button value="-" onclick="<?php echo $obj?>.setDisplay(this.value);">
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type=button value="6" onclick="<?php echo $obj?>.setDisplay(this.value);">
                    </td>
                    <td>
                        <input type=button value="7" onclick="<?php echo $obj?>.setDisplay(this.value);">
                    </td>
                    <td>
                        <input type=button value="8" onclick="<?php echo $obj?>.setDisplay(this.value);">
                    </td>
                    <td>
                        <input type=button value="*" onclick="<?php echo $obj?>.setDisplay(this.value);">
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type=button value="9" onclick="<?php echo $obj?>.setDisplay(this.value);">
                    </td>
                    <td>
                        <input type=button value="C" onclick="<?php echo $obj?>.resetDisplay();">
                    </td>
                    <td>
                        <input type=button value="=" onclick="<?php echo $obj?>.setDisplay(this.value);">
                    </td>
                    <td>
                        <input type=button value="/" onclick="<?php echo $obj?>.setDisplay(this.value);">
                    </td>
                </tr>
                <tr>
                    <td colspan=4>
                        
                    </td>
                </tr>
            </table>
            <span>Operations List</span>
            <ul name="op-list" id="op-list-<?php echo $i;?>">
                
            </ul>
            
        </form>
    <?php endfor;?>
    
    
</body>
<script type="text/javascript" src="calculator.js"></script>
<script>
    var t = [];
    for(var i=0;i<5;i++){
        t[i] = new Calculator();
        t[i].loadList();    
    }
    
</script>
<style>
    table{
        width: 600px;
        height: 300px;
    }
    .remove{
        margin-left: 100px;
    }
    a{
        color: blue;
        cursor: pointer;
    }
    tr{
        background: gray;
    }
    input{
        width: 100%;
        height: 100%;
        background: gray;
        border: gray;
        font-size: 20px;
    }
    tr .disp-screen{
        background: white;
    }
</style>
</html>