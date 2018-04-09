(function initLoadingDiv(){
    if($("#loadingBg").length==0){
        $(document.body)
            .append('<div id="loadingBg" style="display:none;width:100%;height:100%;position:fixed;top:0;left:0;background-position:center;background-repeat: no-repeat;background-attachment: fixed;background-color:black;z-index:1000;opacity:0.1;filter: progid:DXImageTransform.Microsoft.Alpha(opacity=10);-ms-filter:progid:DXImageTransform.Microsoft.Alpha(opacity=10)"></div>')
            .append('<div id="loading" style="display:none;width:100%;position:fixed;top:48%;left:0;right:0;bottom:0;z-index:999;text-align:center">'
            +'<img id="loadingImg" src="'+getRootPath()+'/images/loading.gif">'
            +'<div id="loadingText" style="margin-top:5px;">数据加载中，请稍后</div>'
            +'</div>');
    }
}());

function showLoading(){
    $("#loadingBg").show();
    $("#loading").show();
    $("#loadingText").html("数据加载中，请稍后");
}

function showLoading(text){
    $("#loadingBg").show();
    $("#loading").show();
    $("#loadingText").html(text);
}

function hideLoading(){
    $("#loadingBg").hide();
    $("#loading").hide();
}
/**
 * 获取项目根路径
 * @returns
 */
function getRootPath(){
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}