/**
 * 打开一个新的window窗口
 * @param url
 * @return
 */
var openWin = null;
function openNewWin(url){
	if(openWin != null){
		openWin.close();
	}
	var iWidth = window.screen.availWidth - 300;
	var iHeight = window.screen.availHeight - 200;
	var iTop = (window.screen.availHeight-30-iHeight)/2;
	var iLeft = (window.screen.availWidth-10-iWidth)/2;
	var winParam = "width=" + iWidth + ", height=" + iHeight + ", top=" + iTop + ", left=" + iLeft + ",scrollbars =yes,resizable=yes";
	openWin=window.open(url,"newOpenWin",winParam); 
}