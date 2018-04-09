//作者：杨杰
String.prototype.trim = function() {
    return Trim(this);
}
String.prototype.ltrim = function() {
    return LTrim(this);
}
String.prototype.rtrim = function() {
    return RTrim(this);
}

//�˴���b����
function LTrim(str) {
    var i;
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) != " " && str.charAt(i) != " ") break;
    }
    str = str.substring(i, str.length);
    return str;
}

function RTrim(str) {
    var i;
    for (i = str.length - 1; i >= 0; i--) {
        if (str.charAt(i) != " " && str.charAt(i) != " ") break;
    }
    str = str.substring(0, i + 1);
    return str;
}
function Trim(str) {
    return LTrim(RTrim(str));
}
/** 
**json对象数据设置到表单域中 
*/
function jsonObjectToForm(form, jsonObject) {
    for (i = 0, max = form.elements.length; i < max; i++) {
        e = form.elements[i];
        eName = e.name;
        if (eName.indexOf('.') > 0) {
            dotIndex = eName.indexOf('.');
            parentName = eName.substring(0, dotIndex);
            childName = eName.substring(dotIndex + 1);
            //迭代判断eName，组装成json数据结构 
            eValue = iterValueFromJsonObject(jsonObject, parentName, childName);
        } else {
            eValue = jsonObject[eName];
        }
        if (eValue && eValue != "undefined" && eValue != "null") {
            switch (e.type) {
            case 'checkbox':
            case 'radio':
                if (e.value == eValue) {
                    e.checked = true;
                }
                break;
            case 'hidden':
            case 'password':
                e.value = '';
                break;
            case 'textarea':
            case 'text':
                e.value = eValue;
                break;
            case 'select-one':
            case 'select-multiple':
                for (j = 0; j < e.options.length; j++) {
                    op = e.options[j];
                    //alert("eName : " + eName + "; op value : " + op.value + "; eValue : " + eValue); 
                    if (op.value == eValue) {
                        op.selected = true;
                    }
                }
                break;
            case 'button':
            case 'file':
            case 'image':
            case 'reset':
            case 'submit':
            default:
            }
        }
    }
}

/** 
* json数组读写有两种方式 
* 1: a.bs[0].id 
* 2: a["bs"][0]["id"] 
* 把表单转换成json数据格式 
*/

function formToJsonObject(form) {
    var jsonObject = {};
    for (i = 0, max = form.elements.length; i < max; i++) {
        e = form.elements[i];
        em = new Array();
        if (e.type == 'select-multiple') {
            for (j = 0; j < e.options.length; j++) {
                op = e.options[j];
                if (op.selected) {
                    em[em.length] = op.value;
                }
            }
        }
        switch (e.type) {
        case 'checkbox':
        case 'radio':
            if (!e.checked) {
                break;
            }
        case 'hidden':
        case 'password':
        case 'select-one':
        case 'select-multiple':
        case 'textarea':
        case 'text':
            eName = e.name;
            if (e.type == 'select-multiple') {
                eValue = em;
            } else {
                eValue = e.value.replace(new RegExp('(["\\\\])', 'g'), '\\$1');
            }
            //判断是否是对象类型数据 
            if (eName.indexOf('.') > 0) {
                dotIndex = eName.indexOf('.');
                parentName = eName.substring(0, dotIndex);
                childName = eName.substring(dotIndex + 1);
                //迭代判断eName，组装成json数据结构 
                iterJsonObject(jsonObject, parentName, childName, eValue);
            } else {
                jsonObject[eName] = eValue;
            }
            break;
        case 'button':
        case 'file':
        case 'image':
        case 'reset':
        case 'submit':
        default:
        }
    }
    return jsonObject;
}

/** 
* 把表单元素迭代转换成json数据 
*/
function iterJsonObject(jsonObject, parentName, childName, eValue) {
    //pArrayIndex用于判断元素是否是数组标示 
    pArrayIndex = parentName.indexOf('[');
    //判断是否集合数据，不是则只是对象属性 
    if (pArrayIndex < 0) {
        var child = jsonObject[parentName];
        if (!child) {
            jsonObject[parentName] = {};
        }
        dotIndex = childName.indexOf('.');
        if (dotIndex > 0) {
            iterJsonObject(jsonObject[parentName], childName.substring(0, dotIndex), childName.substring(dotIndex + 1), eValue);
        } else {
            jsonObject[parentName][childName] = eValue;
        }
    } else {
        pArray = jsonObject[parentName.substring(0, pArrayIndex)];
        //若不存在js数组，则初始化一个数组类型 
        if (!pArray) {
            jsonObject[parentName.substring(0, pArrayIndex)] = new Array();
        }
        //取得集合下标，并判断对应下标是否存在js对象 
        arrayIndex = parentName.substring(pArrayIndex + 1, parentName.length - 1);
        var c = jsonObject[parentName.substring(0, pArrayIndex)][arrayIndex];
        if (!c) {
            jsonObject[parentName.substring(0, pArrayIndex)][arrayIndex] = {};
        }
        dotIndex = childName.indexOf('.');
        if (dotIndex > 0) {
            iterJsonObject(jsonObject[parentName.substring(0, pArrayIndex)][arrayIndex], childName.substring(0, dotIndex), childName.substring(dotIndex + 1), eValue);
        } else {
            jsonObject[parentName.substring(0, pArrayIndex)][arrayIndex][childName] = eValue;
        }
    }
}

/** 
* 迭代json数据对象设置到表单域中 
*/
function iterValueFromJsonObject(jsonObject, parentName, childName) {
    //pArrayIndex用于判断元素是否是数组标示 
    pArrayIndex = parentName.indexOf('[');
    //判断是否集合数据，不是则只是对象属性 
    if (pArrayIndex < 0) {
        dotIndex = childName.indexOf('.');
        if (dotIndex > 0) {
            return iterValueFromJsonObject(jsonObject[parentName], childName.substring(0, dotIndex), childName.substring(dotIndex + 1));
        } else {
            return jsonObject[parentName][childName]
        }
    } else {
        pArray = jsonObject[parentName.substring(0, pArrayIndex)];
        //取得集合下标，并判断对应下标是否存在js对象 
        arrayIndex = parentName.substring(pArrayIndex + 1, parentName.length - 1);
        var c = jsonObject[parentName.substring(0, pArrayIndex)][arrayIndex];
        dotIndex = childName.indexOf('.');
        if (dotIndex > 0) {
            return iterValueFromJsonObject(jsonObject[parentName.substring(0, pArrayIndex)][arrayIndex], childName.substring(0, dotIndex), childName.substring(dotIndex + 1));
        } else {
            return jsonObject[parentName.substring(0, pArrayIndex)][arrayIndex][childName]
        }
    }
}

function jsonToString(obj) {
    switch (obj.constructor) {
    case Object:
        var str = "{";
        for (var o in obj) {
            str += "\"" + o + "\":" + jsonToString(obj[o]) + ",";
        }
        if (str.substr(str.length - 1) == ",") str = str.substr(0, str.length - 1);
        return str + "}";
        break;
    case Array:
        var str = "[";
        for (var o in obj) {
        	if(obj[o] == undefined || obj[o] == "undefined"){
        		continue;
        	}else if((typeof obj[o]) == "function"){
        		continue;
        	}
            str += jsonToString(obj[o]) + ",";
        }
        if (str.substr(str.length - 1) == ",") str = str.substr(0, str.length - 1);
        return str + "]";
        break;
    case Boolean:
        return "\"" + obj.toString() + "\"";
        break;
    case Date:
        return "\"" + obj.toString() + "\"";
        break;
    case Function:
        break;
    case Number:
        return "\"" + obj.toString() + "\"";
        break;
    case String:

        return "\"" + obj.toString() + "\"";
        break;
    }

}

Array.prototype.remove = function(obj) {
    for (var i = 0; i < this.length; i++) {
        var temp = this[i];
        if (!isNaN(obj)) {
            temp = i;
        }
        if (temp == obj || jsonToString(temp) == jsonToString(obj)) {
            for (var j = i; j < this.length; j++) {
                this[j] = this[j + 1];
            }
            this.length = this.length - 1;
        }
    }
}

 function isChina(s){    
     	var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;    
    	if(!patrn.exec(s)){    
        	return false;    
     	}   
     	else{    
         	return true;    
     	}    
    } 

String.prototype.isIP = function() {
    var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;
    if (reSpaceCheck.test(this)) {
        this.match(reSpaceCheck);
        if (RegExp.$1 <= 255 && RegExp.$1 >= 0 && RegExp.$2 <= 255 && RegExp.$2 >= 0 && RegExp.$3 <= 255 && RegExp.$3 >= 0 && RegExp.$4 <= 255 && RegExp.$4 >= 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function isNumber(s) {
    var regu = "^[0-9]+$";
    var re = new RegExp(regu);
    if (s.search(re) != -1) {
        return true;
    } else {
        return false;
    }
}

function checkEmail(strEmail) {
    //var emailReg = /^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/;  
    var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    if (emailReg.test(strEmail)) {
        return true;
    } else {
        alert("您输入的Email地址格式不正确！");
        return false;
    }
};

/* 
用途：校验ip地址的格式  
输入：strIP：ip地址  
返回：如果通过验证返回true,否则返回false；  
*/
function isIP(strIP) {
    if (isNull(strIP)) {
        return false;
    }
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式  
    if (re.test(strIP)) {
        if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
            return true;
        }
    }
    return false;
};

/*  
用途：检查输入手机号码是否正确  
输入：strMobile：字符串  
返回：如果通过验证返回true,否则返回false  
*/
function checkMobile(strMobile) {
    var regu = /^[1][3][0-9]{9}$/;
    var re = new RegExp(regu);
    if (re.test(strMobile)) {
        return true;
    } else {
        return false;
    }
};

/*  
用途：检查输入的电话号码格式是否正确  
输入：strPhone：字符串  
返回：如果通过验证返回true,否则返回false  
*/
function checkPhone(strPhone) {
    var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
    var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/;
    var prompt = "您输入的电话号码不正确!"
    if (strPhone.length > 9) {
        if (phoneRegWithArea.test(strPhone)) {
            return true;
        } else {
            alert(prompt);
            return false;
        }
    } else {
        if (phoneRegNoArea.test(strPhone)) {
            return true;
        } else {
            alert(prompt);
            return false;
        }
    }
};

/*  
用途：检查输入字符串是否为空或者全部都是空格  
输入：str  
返回：如果全是空返回true,否则返回false  
*/
function isNull(str) {
    if (str == "") {
        return true;
    }
    var regu = "^[ ]+$";
    var re = new RegExp(regu);
    return re.test(str);
};

/*  
用途：检查输入对象的值是否符合整数格式  
输入：str 输入的字符串  
返回：如果通过验证返回true,否则返回false  
*/
function isInteger(str) {
    var regu = /^[-]{0,1}[0-9]{1,}$/;
    return regu.test(str);
};

/*  
用途：检查输入字符串是否符合正整数格式  
输入：s：字符串  
返回：如果通过验证返回true,否则返回false  
*/
function isNumber(s) {
    var regu = "^[0-9]+$";
    var re = new RegExp(regu);
    if (s.search(re) != -1) {
        return true;
    } else {
        return false;
    }
};

/*  
用途：检查输入字符串是否是带小数的数字格式,可以是负数  
输入：str：字符串  
返回：如果通过验证返回true,否则返回false  
*/

function isDecimal(str) {
    if (isInteger(str)) {
        return true;
    }
    var re = /^[-]{0,1}(\d+)[\.]+(\d+)$/;
    if (re.test(str)) {
        if (RegExp.$1 == 0 && RegExp.$2 == 0) {
            return false;
        }
        return true;
    } else {
        return false;
    }
};

/*  
用途：检查输入对象的值是否符合端口号格式  
输入：str 输入的字符串  
返回：如果通过验证返回true,否则返回false  
*/

function isPort(str) {
    return (isNumber(str) && str < 65536);
};

/*  
用途：检查输入字符串是否符合金额格式,格式定义为带小数的正数，小数点后最多三位  
输入：s：字符串  
返回：如果通过验证返回true,否则返回false  
*/
function isMoney(s) {
    var regu = "^[0-9]+[\.][0-9]{0,3}$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
};

/*  
用途：检查输入字符串是否只由英文字母和数字和下划线组成  
输入：s：字符串  
返回：如果通过验证返回true,否则返回false  
*/
function isNumberOr_Letter(s) {
    //判断是否是数字或字母  
    var regu = "^[0-9a-zA-Z\_]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
};

/*  
用途：检查输入字符串是否只由英文字母和数字组成  
输入：s：字符串  
返回：如果通过验证返回true,否则返回false  
*/
function isNumberOrLetter(s) {
    //判断是否是数字或字母  
    var regu = "^[0-9a-zA-Z]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
};

/*  
用途：检查输入字符串是否只由汉字、字母、数字组成  
输入：s：字符串  
返回：如果通过验证返回true,否则返回false  
*/
function isChinaOrNumbOrLett(s) {
    //判断是否是汉字、字母、数字组成  
    var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
    var re = new RegExp(regu);
    if (re.test(s)) {
        return true;
    } else {
        return false;
    }
};

/*  
用途：判断是否是日期  
输入：date：日期；fmt：日期格式  
返回：如果通过验证返回true,否则返回false  
*/
function isDate(date, fmt) {
    if (fmt == null) {
        fmt = "yyyyMMdd";
    }
    var yIndex = fmt.indexOf("yyyy");
    if (yIndex == -1) {
        return false;
    }
    var year = date.substring(yIndex, yIndex + 4);
    var mIndex = fmt.indexOf("MM");
    if (mIndex == -1) {
        return false;
    }
    var month = date.substring(mIndex, mIndex + 2);
    var dIndex = fmt.indexOf("dd");
    if (dIndex == -1) {
        return false;
    }
    var day = date.substring(dIndex, dIndex + 2);
    if (!isNumber(year) || year > "2100" || year < "1900") {
        return false;
    }
    if (!isNumber(month) || month > "12" || month < "01") {
        return false;
    }
    if (day > getMaxDay(year, month) || day < "01") {
        return false;
    }
    return true;
};
function getMaxDay(year, month) {
    if (month == 4 || month == 6 || month == 9 || month == 11) {
        return "30";
    }
    if (month == 2) {
        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
            return "29";
        } else {
            return "28";
        }
        return "31";;
    }
};

/*  
用途：字符1是否以字符串2结束  
输入：str1：字符串；str2：被包含的字符串  
返回：如果通过验证返回true,否则返回false  
*/
function isLastMatch(str1, str2) {
    var index = str1.lastIndexOf(str2);
    if (str1.length == index + str2.length) {
        return true;
    }
    return false;
};

/*  
用途：字符1是否以字符串2开始  
输入：str1：字符串；str2：被包含的字符串  
返回：如果通过验证返回true,否则返回false  
*/
function isFirstMatch(str1, str2) {
    var index = str1.indexOf(str2);
    if (index == 0) {
        return true;
    }
    return false;
};

/*  
用途：字符1是包含字符串2  
输入：str1：字符串；str2：被包含的字符串  
返回：如果通过验证返回true,否则返回false  
*/
function isMatch(str1, str2) {
    var index = str1.indexOf(str2);
    if (index == -1) {
        return false;
    }
    return true;
};

/*  
用途：检查输入的起止日期是否正确，规则为两个日期的格式正确，且结束如期>=起始日期  
输入：startDate：起始日期，字符串; endDate：结束如期，字符串  
返回：如果通过验证返回true,否则返回false  
*/
function checkTwoDate(startDate, endDate) {
    if (!isDate(startDate)) {
        alert("起始日期不正确!");
        return false;
    } else if (!isDate(endDate)) {
        alert("终止日期不正确!");
        return false;
    } else if (startDate > endDate) {
        alert("起始日期不能大于终止日期!");
        return false;
    }
    return true;
};

/*  
用途：检查复选框被选中的数目  
输入：checkboxID：字符串  
返回：返回该复选框中被选中的数目  
*/
function checkSelect(checkboxID) {
    var check = 0;
    var i = 0;
    if (document.all(checkboxID).length > 0) {
        for (i = 0; i < document.all(checkboxID).length; i++) {
            if (document.all(checkboxID).item(i).checked) {
                check += 1;
            }
        }
    } else {
        if (document.all(checkboxID).checked) {
            check = 1;
        }
    }
    return check;
}

function getTotalBytes(varField) {
    if (varField == null) {
        return - 1;
    }
    var totalCount = 0;
    for (i = 0; i < varField.value.length; i++) {
        if (varField.value.charCodeAt(i) > 127) {
            totalCount += 2;
        } else {
            totalCount++;
        }
    }
    return totalCount;
}

function getFirstSelectedValue(checkboxID) {
    var value = null;
    var i = 0;
    if (document.all(checkboxID).length > 0) {
        for (i = 0; i < document.all(checkboxID).length; i++) {
            if (document.all(checkboxID).item(i).checked) {
                value = document.all(checkboxID).item(i).value;
                break;
            }
        }
    } else {
        if (document.all(checkboxID).checked) {
            value = document.all(checkboxID).value;
        }
    }
    return value;
}

function getFirstSelectedIndex(checkboxID) {
    var value = -2;
    var i = 0;
    if (document.all(checkboxID).length > 0) {
        for (i = 0; i < document.all(checkboxID).length; i++) {
            if (document.all(checkboxID).item(i).checked) {
                value = i;
                break;
            }
        }
    } else {
        if (document.all(checkboxID).checked) {
            value = -1;
        }
    }
    return value;
}

function selectAll(checkboxID, status) {
    if (document.all(checkboxID) == null) {
        return;
    }
    if (document.all(checkboxID).length > 0) {
        for (i = 0; i < document.all(checkboxID).length; i++) {
            document.all(checkboxID).item(i).checked = status;
        }
    } else {
        document.all(checkboxID).checked = status;
    }
}

function selectInverse(checkboxID) {
    if (document.all(checkboxID) == null) {
        return;
    }
    if (document.all(checkboxID).length > 0) {
        for (i = 0; i < document.all(checkboxID).length; i++) {
            document.all(checkboxID).item(i).checked = !document.all(checkboxID).item(i).checked;
        }
    } else {
        document.all(checkboxID).checked = !document.all(checkboxID).checked;
    }
}
function checkDate(value) {
    if (value == '') {
        return true;
    }
    if (value.length != 8 || !isNumber(value)) {
        return false;
    }
    var year = value.substring(0, 4);
    if (year > "2100" || year < "1900") {
        return false;
    }
    var month = value.substring(4, 6);
    if (month > "12" || month < "01") {
        return false;
    }
    var day = value.substring(6, 8);
    if (day > getMaxDay(year, month) || day < "01") {
        return false;
    }
    return true;
};

/*  
用途：检查输入的起止日期是否正确，规则为两个日期的格式正确或都为空且结束日期>=起始日期  
输入：startDate：起始日期，字符串; endDate： 结束日期，字符串  
返回：如果通过验证返回true,否则返回false  
*/
function checkPeriod(startDate, endDate) {
    if (!checkDate(startDate)) {
        alert("起始日期不正确!");
        return false;
    } else if (!checkDate(endDate)) {
        alert("终止日期不正确!");
        return false;
    } else if (startDate > endDate) {
        alert("起始日期不能大于终止日期!");
        return false;
    }
    return true;
};

