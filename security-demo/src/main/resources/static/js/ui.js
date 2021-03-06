/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ui.js                                              :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: anonymous <anonymous@student.42.fr>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2015/02/28 11:15:42 by anonymous         #+#    #+#             */
/*   Updated: 2015/03/11 09:25:53 by anonymous        ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */


$(function() { 
     var userAgent = window.navigator.userAgent.toLowerCase();
  
     if(/msie 8\.0/i.test(userAgent)){
            $(".contpage").css("min-height",$(window).height()-20)
         }
    // /* radio  checkbox 初始化 */
    $("input:radio:checked,input:checkbox:checked").each(function() {
        $(this).parent().addClass("checked");
    })
    $("input:radio:disabled,input:checkbox:disabled").each(function() {
            $(this).parent().addClass("disabled");
        })
        //checkbox radio  
    $(document).on("mousedown", ".iradio,.icheckbox", function() {
            r_c_add_h(this);
        }).on("mouseup mouseout", ".iradio,.icheckbox", function() {
            r_c_remove_h(this);
        }).on("change propertychange", "input:radio,input:checkbox", function() {
            r_c(this);
        })
        /*placeholder input */
        // 初始化
    $(".input input,  .input textarea").each(function() {
        var a = this;  
        $(a).val() ? $(a).prev(".js-placeholder").hide() : $(a).prev(".js-placeholder").show(); 
    })
     $(".input .select").each(function() {
        var a = this; 
        $(a).children("select").get(0).selectedIndex <= 0 ?
        $(a).prev(".js-placeholder").show() 
        :
        $(a).prev(".js-placeholder").hide();
        
    })
    $(".input input, .input textarea").on("blur click input propertychange ", function() {
        var a = this;
        $(a).val() ? $(a).prev(".js-placeholder").hide() : $(a).prev(".js-placeholder").show();
    })
    $(".input  .select").on("blur click input propertychange change", function() {
        var a = this;
        $(a).children("select").get(0).selectedIndex <= 0 ?
            $(a).prev(".js-placeholder").show() :
            $(a).prev(".js-placeholder").hide();
    })
    $(".btn-switch input:checkbox").each(function(){ 
        $(this).is(":checked")?$(this).addClass("checked"):$(this).removeClass("checked")
    })
    $(".btn-switch input:checkbox").on("change",function(){
        $(this).is(":checked")?$(this).addClass("checked"):$(this).removeClass("checked")
    })
    //type=file
    $(".filegroup .file-btn").click(function(){
        $(this).siblings(".file").click();
    })
    $(".filegroup .file").on("change" ,function(){
        $(this).parents(".filegroup").find(".file-input").val($(this).val());
    })  
    $(".js-placeholder").on("click", function() {
        $(this).next("input,.select select, textarea").focus().click();
        $(this).next(".select select").blur().click();
    });
     $(".js-placeholder").on("mouseenter", function() {
        $(this).next("input,.select select, textarea").hover() ;
    });
    /*placeholder input end*/
    // 左右架构显示隐藏 
    $(".left-box").css("height", $(".left-wap").height() - 32);
    var waph = 32;
    $(".scrollwap").siblings().each(function() {
        waph = waph + $(this).outerHeight();
    })
    if ($(".left-wap") != null && $(".left-wap").length != 0) {
        $(".scrollwap").css("height", $(".left-wap").height() - waph);
    } else if ($(".scrollbarwap") != null && $(".scrollbarwap").length != 0) {
        setTimeout(function() {
            $(".scrollwap").css("height", $("body").height() - waph);

        }, 200);
    }
    // $(".left-wap").resize(function(event) {
    //     var t1 = $(".left-wap").height() - 20;
    //     var t2 = $(".left-wap").height() - 46;
    //     $(".left-box").css("height", t1 + 'px');
    //     $(".scrollwap").css('height', t2 + 'px');
    // });
    // var a = 0 - $(".left-box").outerWidth() + 45;
    var ml = $('.r-con').css("marginLeft");
    $(".i-right-hide").on("click", lefttohide);
    $(".i-left-show").on("click", lefttoshow); 
    function lefttohide(event) {
        var obj = event.target;
        var f = $(obj).parents(".left-box");
        var b = $(obj);
        var c = $(f).parents(".left-wap").siblings(".i-left-show");
        var d = $(f).parents(".left-wap").siblings(".r-con");
        $(f).parents(".left-wap").hide();
        $(d).css({
            "marginLeft": '22px'
        });
        $(".fixed-wrap").each(function() {
            var l = $(this).position().left;
            $(this).children(".js-fixed").css({
                "left": l,
                "right": "10px"
            });
        });

    } 
    function lefttoshow(event) {
        var obj = event.target;
        var f = $(obj).siblings(".left-wap").children(".left-box");
        var b = $(f).find('.i-right-hide');
        var c = $(obj);
        var d = $(c).siblings(".r-con");
        $(d).css({
            "marginLeft": ml
        });
        $(".fixed-wrap").each(function() {
            var l = $(this).position().left;
            $(this).children(".js-fixed").css({
                "left": l,
                "right": "10px"
            });
        });
        $(f).parents(".left-wap").show();
    }
    // 左右架构end
    //标题头显示隐藏
    //
    //
    $(".ibx-con").css("display")=="none" ?
        $(".i-vsh").addClass('i-up-show').removeClass('i-down-hide'):
         $(".i-vsh").removeClass('i-up-show').addClass('i-down-hide');
     
    $(".ibx-h").on("click", function() {
        if($(this).children(".i-vsh").hasClass("disabled")) return;
        if ($(this).children(".i-vsh").hasClass("i-down-hide")) {
            $(this).children(".i-vsh").addClass('i-up-show');
            $(this).children(".i-vsh").removeClass('i-down-hide');
            $(this).next(".ibx-con").hide();
        } else if($(this).children(".i-vsh").hasClass("i-up-show")) {
            $(this).children(".i-vsh").removeClass('i-up-show');
            $(this).children(".i-vsh").addClass('i-down-hide');
            $(this).next(".ibx-con").show();
        }

    });
    //标题头显示隐藏 end
    //error list 显示隐藏 
    $("#syntaxerror-s").on('click', function(event) {
        $(".syntaxerror").toggle();
        $(".syntaxerror").css("display") == "block" ? $(this).text("收起详情") :
            $(this).text("查看详情")
    });

    //table checkbox 全选
    $(document).on("click",".cb-all input:checkbox",function(){    
        var flag = $(this).is(":checked");
        var _tal = $(this).parents("table").first();
        var tableId = $(this).parents(".t-head-fixed").attr("for");
        // _tal= _tal!= $(tableId) && $(tableId)? $(tableId) : _tal;
        _tal=tableId?tableId:_tal;
        $(_tal).find(".cb-tr").each(function() {
            if (flag) {
                $(this).children('input:checkbox').prop("checked", true);
                $(this).children('input:checkbox').change();
                $(this).parents("tr").first().addClass("sel");
            } else {
                $(this).children('input:checkbox').prop("checked", false);
                $(this).children('input:checkbox').change();
                $(this).parents("tr").first().removeClass("sel");
            }
        });

    })
     $(document).on("click",".cb-tr input:checkbox",function(){   
        var _tal = $(this).parents("table").first();
        $(".t-head-fixed").each(function() {
            tableId = $(this).attr("for");
            _tal = "#" + $(_tal).attr("id") === tableId ? this : _tal;
        })
        var cb_all = $(_tal).find(".cb-all");
        var flag = $(this).is(":checked");
        var allflag = true;
        var ntr = $(this).parents("tr");
        var ntrc = $(this).parents(".cb-tr");
        if (flag) {
            $(ntr).addClass("sel");
            var _all = $(this).parents("table").first().find(".cb-tr");
            $(_all).each(function() {
                if (!$(ntrc).is(this) && !$(this).children('input:checkbox').is(":checked")) {
                    allflag = false;
                    return false;
                }
            });
            if (allflag) {
                $(cb_all).children('input:checkbox').prop("checked", true);
                $(cb_all).children('input:checkbox').change();
            }
        } else {
            $(ntr).removeClass("sel");
            $(cb_all).children('input:checkbox').prop("checked", false);
            $(cb_all).children('input:checkbox').change();
        }
    });
    $(document).on("click",".cbx-in-tr",function(event){ 
        if(event.target != $(this).find(".cb-tr").children('input:checkbox')[0]){
            $(this).find(".cb-tr").children('input:checkbox')[0].click();
        }
    });

});

function r_c(obj) {
    var par = $(obj).parent()[0];
    if ($(obj).is(":disabled")) {
        $(par).addClass("disabled");
    } else {
        $(par).removeClass("disabled");
        if ($(obj).is(":checked")) {
            if ($(obj).is("input[type=\"radio\"]")) {
                var name = "input[name=\"" + $(obj).attr("name") + "\"]";
                $(name).parent().removeClass("checked");
            }
            $(par).addClass("checked");
        } else
            $(par).removeClass("checked");
    }
}

//radio checkbox 过渡状态  
function r_c_add_h(obj) {
    if ($(obj).hasClass("checked")) {
        $(obj).addClass("checked-h");
    } else {
        var input = $(obj).children()[0];
        var type = $(input).attr("type");
        $(obj).addClass("i" + type + "-h");
    }
}
//radio checkbox 移除过渡状态
function r_c_remove_h(obj) {
    $(obj).removeClass("iradio-h ");
    $(obj).removeClass("icheckbox-h ");
    $(obj).removeClass("checked-h ");
}
//checkbox radio end  
// fixed
function fixed() { 
    $(window).scrollTop(0);
    $(".js-fixed").each(function(i) { 
        $(this).css("z-index", 200-i);
        if ($(this).parents(".fixed-wrap").length == 0) {
            var h1 = $(this).outerHeight(true) - $(this).children(".t-head-fixed").outerHeight(true);
            $(this).css({
                "left": $(this).position().left,
                "right": "10px"
            });
            $(this).attr("fixed-direction") === "bottom" ?
                $(this).css("bottom", "0") :
                $(this).css({
                    "top": "0",
                    "padding-top": $(this).position().top - $(document).scrollTop()
                });
            $(this).addClass("fixed");
            $(this).wrap("<div class=\"fixed-wrap\" style=\"height:" + h1 + "px\"></div>");
        }
    });
}

function f_h_change() {
    $(".fixed-wrap").each(function() {
        // body...
        var thf = $(this).find(".t-head-fixed");
        var h1 = $(thf) ? $(thf).outerHeight() : 0;
        var h = $(this).find(".js-fixed").outerHeight() - h1 - $(this).position().top;
        $(this).css({
            "height": h + "px"
        });
    })

}

function scroll_tree(tree) {
    var selector = tree;
    $(selector).children().first().css({ "float": "left", "width": "auto" });
    $(selector).css({ "float": "left", "width": "auto" });
};
 //table tbody滚动 

function scroll_table(){
           $(".scroll-tbody")[0].scrollHeight>$(".scroll-tbody")[0].clientHeight? $(".scroll-thead").css({"padding-right":"18px"}): $(".scroll-thead").css({"padding-right":"0"})
        } 
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
  //计算sz-grid 首页table的高度计算
        function tableh(){ 
            $(".table-inner").each(function() {
                var h =$("body").innerHeight()-1; 
                var table_wap= $(this) ; 
                var theadh=$(table_wap).find("tr").first().outerHeight(true);
                var rowh=$(table_wap).find("tr").eq(1).outerHeight(true);
                var nrow = Math.floor((h  -theadh)/rowh);//table 内容的行数 
                var trs=$(table_wap).find("tr").length;
                var th=0;
 
                for(var i=0;i<nrow&&i<trs;i++){
                   th=th+ $(table_wap).find("tr").eq(i).outerHeight(true);
                }
                if(i+1<trs&&$(table_wap).find("tr").eq(i+1).outerHeight(true)+th<=h){
                    th=$(table_wap).find("tr").eq(i+1).outerHeight(true)+th;
                } 
                $(table_wap).css("height",th-1);  
                if(nrow>trs)
                { 
                    var r=Math.floor((h-th)/$(table_wap).find("tr").eq(i-1).outerHeight(true));
                    th=th+r*$(table_wap).find("tr").eq(i-1).outerHeight(true);
                    $(table_wap).parents(".table-wap").css("height",th-2)
                }
            })
        } 
!(function($) {
    // body...
    var a = function(d) {
        this.init("tooltip", d);
    }
    a.prototype = {
        init: function(f, d) {
            this.element = $(d);
            this.type = f;
            $(this.element).on("mouseenter", change(this.enter, this))
            $(this.element).on("mouseleave", change(this.leave, this))
        },
        enter: function(e) {
            var el = e.currentTarget;
            this.element = el;
            var d = $(el).data(this.type);
            if (d !== null) {
                d.show();
            }
        },
        leave: function(e) {
            var el = e.currentTarget;
            this.element = el;
            var d = $(el).data(this.type);
            if (d !== null) {
                d.hide();
            }
        },
        hasContent: function() {
            return this.getTitle()
        },
        getTitle: function() {
            var title, el = this.element,
                title = $(el).attr("data-original-title");
            return title;
        },
        show: function() {
            var _this=this;
            if (this.hasContent()) {
                var html = "<div class=\"tooltip\">" +
                    "<div class=\"tooltip-arrow\"></div>" +
                    "<div class=\"tooltip-inner\">" +
                    this.getTitle() +
                    "</div>" +
                    "</div>";
                $("body").append(html);
                var position = this.getPosition();
                $(".tooltip").css({
                    'left': position.left,
                    "top": position.top,
                    "visibility": "visible"
                })

                $(".tooltip-arrow").css({
                    'left': $(this.element).offset().left + $(this.element).innerWidth() / 2 -  position.left 
                })
            }
        },
        hide: function() {
            $(".tooltip").remove();
        },
        getPosition: function() {
            var x=$(this.element).offset().left + $(this.element).innerWidth() / 2 - $(".tooltip").outerWidth() / 2,
            y=$(this.element).offset().top + $(this.element).innerHeight() + 7; 
            var w=$(".tooltip").width() ,h=$(".tooltip").height(),
            ww=$(window).width() ,  wh=$(window).height();
            x=x<0?0:x;
            x=(x+w>ww?ww-w :x);
            y=y<0?0:y;
            y=y+h>wh?wh-h:y;
            return {
                top:y ,
                left:x 
            }
        }
    }

    function change(func, obj) {
        return function() {
            func.apply(obj, arguments);
        };
    }
    $(function() {
        $("[data-toggle='tooltip']").each(function() {
            $(this).data("tooltip", new a(this));
        })
    });
}(jQuery));
//input div ctrl
!(function($) {
    $(function() {
        $(".div-txt-ctrl").click(function(event) {
            if (event.target != this) {
                return false;
            }
            var x = event.offsetX,
                y = event.offsetY;
            var item = $(".div-txt-ctrl .div-txt-base");

            $(item).each(function(i, a) {
                var t = $(a).position().top;
                var l = $(a).position().left;
                var h = $(a).height();
                if (y <= (t + h + 3) && x <= (l + 3)) {
                    $(a).before($(".div-txt-text"));
                    console.log("re" + i);
                    return false;
                } else if (i === $(item).length - 1) {
                    $(a).after($(".div-txt-text"));
                }
            });
            $(".div-txt-text .js-input").focus();
        });
        $(".div-txt-ctrl").on("keyup keydown", ".js-input", function(event) {

            var txt = $(this).val();
            var tdiv = $(this).siblings();
            $(tdiv).text(txt + "www");
            var w = $(tdiv).width();
            $(".div-txt-text").width(w);
            event.stopPropagation();
        });
        $(".div-txt-ctrl").on("blur", ".js-input", function(event) {
            input_span(this);
        });
        $(".div-txt-ctrl").on("click", ".i-close-l", function(event) {
            $(this).parent(".div-txt-base").remove();
            event.stopPropagation();
        });
        $(".div-txt-ctrl").on("dblclick", ".div-txt-base", function(event) {
            var txt = $(this).children("span").first().text();
            var w = $(this).width() + 9;
            // var html = "<div class=\"div-txt-text\" style=\"width:" + w + "px; \"> <input type=\"text\" value=\"" + txt + "\"> <div class=\"textdiv\"></div></div>"
            // $(".div-txt-text").remove();
            $(".div-txt-text").width(w);
            $(".div-txt-text input").val(txt);
            $(this).after($(".div-txt-text"));
            $(this).remove();
            $(".div-txt-text input").focus();
            event.stopPropagation();

        });

        function input_span(obj) {
            var _this = obj;
            var txt = $(_this).val();
            txt = trim(txt);
            $(".div-txt-text").width(10);
            $(_this).val("");
            if (txt !== "") {
                var html = "<div class=\"div-txt-base\" > <span class=\"s-txt\">" + txt + "</span>  ;<i class=\"i-close-l\"></i></div>";
                $(".div-txt-text").before(html);
            }
        }
    });
}(jQuery));

/* 回到顶部 */
$(function() {
    $(".bt-top").hide();
    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            $(".bt-top").fadeIn(1000);
        } else {
            $(".bt-top").fadeOut(1000);
        }
    });
    $('body,html').animate({
        scrollTop: 0
    }, 1000);
});
