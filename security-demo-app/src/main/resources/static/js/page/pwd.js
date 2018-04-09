 !(function(w, $, SVG) {
     var mctopology = function(dom, opt) {
         this.contain = dom;
         this.init(opt);
         return this;
     };
     mctopology.prototype = {

         children: {
             rnode: null,
             nodes: []

         },
         groupLayout: [], 
         init: function(data) {
             //初始化数据   
             var _this = this;
             _this.exp_flag = data.exp_flag||false;
             _this.setData(data);
         },

         render: function() {
             //渲染页面
             var _this = this; 
             if (SVG.supported) {
                var $nodata=$(_this.contain).find(".nodada");
             
                 var nodes = _this.children.nodes;
                 var l = nodes.length,
                     n = 0;

                 if (l > 30) {
                     nodes.splice(29, l - 30);
                     l = 30;
                 }
                 if (l <= 13) {
                     if (l > 0) n = parseInt(l / 7);
                 } else {
                     n = 2;
                 }

                 var r = 0;
                 if (l == 0) {
                     r = 160;
                     n = -1;
                 } else r = (n * 110 + 270);
                if(_this.children.rNode){
                     if(!_this.draw)
                        _this.draw = SVG(_this.contain.attr('id'));
                    else{
                        _this.draw.clear();
                    }
                    _this.draw.size($(_this.contain).width()-20>r * 2?$(_this.contain).width()-20:r * 2, r * 2).style({ "overflow": "visible", "margin": "0 auto" });
                    if(_this.children.rNode) _this.groupLayout.push(new groupLayout(0, _this.children.rNode));
                }
                if(l==0 &&_this.exp_flag ){
                    if($nodata.length<=0)
                      $nodata= $(_this.contain).append("<div class='nodada'>无异常</div>");
                    else
                        $nodata.show();
                    
                }
                else{
                   $nodata.length>0&&$nodata.hide();
                    for (var i = 0; i <= n; i++) {
                         layout = new groupLayout(i + 1, nodes.slice(7 * i + 1.5 * i * (i - 1), 7 * (i + 1) + 1.5 * i * (i + 1)));
                         layout.draw(_this.draw);
                         _this.groupLayout.push(layout);
                     }
                }
                 
                 for (i = 0; i < _this.groupLayout.length; i++) {

                     _this.groupLayout[i].drawChild(_this.draw);
                 }
                 return this;
             } else {
                 return this;
             }

         },
         findNodeById: function(id) {},
         findMessageById: function(id) {

         },
         getNodes: function() {
                return this.children.nodes&&this.children.nodes.length>0?this.children.nodes:null; 
         },

         getRNodes: function() {

             return this.children.rnode;
         }, 
         addNode: function(data) {
             var _this = this;
             if (isArray(data)) {
                if(data.length>0)
                 for (var n in data) {
                     var no = new sNode(data[n]);
                     // no.postion(Math.floor((l + n) * w + 30), 30);
                     _this.children.nodes.push(no);
                 }
             } else {
                 _this.children.nodes.push(new sNode(data));
             }
         },
         addRNode: function(data) {
             var _this = this;
             var l = _this.children.nodes.length;
             if (isArray(data)) {
                 _this.children.rNode = new rNode(data[data.length - 1]);

             } else {
                 _this.children.rNode = new rNode(data);
             }
         },
         remove:function(data){
             var _this = this;
            _this.children.rnode=[] ;
            _this.children.nodes=[] ;
            _this.groupLayout=[]
            return this;
            
         },
         setData:function(data){
             var _this = this;
             for (var a in data) {
                 var edata = data[a];
                 if(edata&&JSON.stringify(edata) != "{}")
                     switch (a) {
                         case "nodes":
                          
                              _this.addNode(edata);
                             break;
                         case "rNode":
                             _this.addRNode(edata);
                             break;
                     }
             }
            return this;
         }
     };
     var groupLayout = function(index, nodes) {
         this.index = 0;
         this.children = {
             nodes: []

         };
         this.init(index, nodes);
     };
     groupLayout.prototype = {

         init: function(index, nodes) {
             var _this = this;
             if (isArray(nodes)) {

                 for (var n in nodes)
                     _this.children.nodes.push(nodes[n]);
             } else {
                 _this.children.nodes.push(nodes);
             }
             _this.index = index;
             _this.r = (index - 1) * 110 + 160;
         },
         draw: function(draw) {
             var _this = this;
             if (_this.index != 0) {
                 var d = (_this.index - 1) * 3 + 4;
                 circle = draw.circle(_this.r * 2).center(draw.cx(), draw.cy()).stroke({ 'width': d, 'color': '#0088e7', 'opacity': 0.28 }).fill({ "opacity": 0 }).style({ 'stroke-linecap': "round", 'stroke-dasharray': '0,' + parseInt(d * 3), "stroke-dashoffset": 10 });
             }
             var l = _this.children.nodes.length;
             for (var n in _this.children.nodes) {
                 var node = _this.children.nodes[n];
                 // node.postion(draw.cx(), draw.cy());
                 if (_this.index !== 0) {
                     node.setposition(draw.cx(), draw.cy() - _this.r);
                     var deg = (360 / (l) * n + _this.index * 10 + 360) % 360;
                     node.setRotate(deg);
                 }
             }

         },
         drawChild: function(draw) {
             var _this = this;
             for (var n in _this.children.nodes) {
                 var node = _this.children.nodes[n];
                 node.draw(draw);
             }
         }
     }
     var node = function(data) {
         this.init(data);
     };
     node.prototype = {
         elementType: "node",
         detail: null,
         rotate: 0,
         init: function(data) {


         },
         setposition: function(x, y) {
             var _this = this;
             _this.x = x;
             _this.y = y;
         },
         draw: function(draw) {



         },
         drawText: function(draw) {


         },
         drawTextLimit:function(draw,cx,cy){
             var _this = this; 
             var texts=_this.text.split("\n");
             var tag=false;
              text=texts[0];
              var group=draw.group();
              if(texts.length>1){
                text+=" ...";
                tag=true;
              }
              var  txt = draw.text(text).font({
                 family: 'Microsoft Yahei',
                 size: 12,
                 leading: '1.5' 
             }).fill({
                 color: _this.color
             }); 
             var w=_this.r*2+40;
             if(txt.length()>w){
                tag=true;
              var n= (txt.length()-w+20 )/7; 
              txt.text(text.slice(0,text.length-n)+"...");
             }
             txt.center( cx, cy ).dx(0).dy(_this.r +  12 * 1.5 / 2); 
             group.add(txt)  ; 
             if(tag){ 
                group.on("mouseenter",function(){
                     var hoverText=draw.group();
                     var  txt1 = draw.text(_this.text).font({
                     family: 'Microsoft Yahei',
                     size: 12,
                     leading: '1.5'
                     //   ,
                     // anchor:   'middle'
                     }).fill({
                         color: _this.color
                     }); 
                     var w1 = 0,  w2, l = txt1.lines().length();
                     if (l > 1) {
                         for (var i = 0; i < l; i++) {
                             w2 = txt1.lines().get(i).length();
                             w1 < w2 && (w1 = w2);
                         }
                         for (i = 0; i < l; i++) {
                             w2 = txt1.lines().get(i).length();
                             txt1.lines().get(i).dx((w1 - w2) / 2);
                         }
                     } else {
                         w1 = txt1.length();
                    }
                    txt1.center( cx, cy ).dx(0).dy(_this.r +l*9 +6);  
                    hoverText.add(draw.rect(w1+20,l*18+20).fill({"color":"#fff"}).stroke({"color":"#e6e6e6","width":"1px"}).center(cx,cy).dy(_this.r+10+l*9 ))  ;
                    hoverText.add(txt1); 
                    draw.add( hoverText); 
                    hoverText.on("mouseleave",function(){ 
                        hoverText.remove();
                    });
                }); 
              }   
              return group.add(txt);
         },
         hover: function(draw, x, y) {

         },
         drawDetail: function(draw, x, y) {
             //更多hover 

         },
         setRotate: function(deg) {

             var _this = this;
             _this.rotate = deg;


         }

     };
     var rNode = function(data) {
         this.mdata = null;

         this.init(data);
     };
     rNode.prototype.elementType = "rNode";
     rNode.prototype = new node();
     rNode.prototype.init = function(data) {
         var _this = this;
         _this.r = 46;
         _this.borderWidth = "3px";
         _this.color = "#0088e7";
         _this.img = data.img;
         _this.bg = '#2ba7fc';
         _this.strokeColor = '#0088e7';
         _this.text = data.text;
         _this.mdata = data.mdata;
     };
     rNode.prototype.draw = function(draw) {
         var _this = this;
         var group = draw.group();
         var bggroup = draw.group();
         bggroup.add(draw.circle(_this.r * 2 + 12).fill("#d1ecfe").stroke({ width: _this.borderWidth, color: _this.strokeColor }).center(draw.cx(), draw.cy()));
         bggroup.add(draw.circle(_this.r * 2).fill(_this.bg).stroke({ width: _this.borderWidth, color: _this.strokeColor }).center(draw.cx(), draw.cy()));
         if (_this.img) {
             var img = draw.image(_this.img, 60, 60).center(bggroup.cx(), bggroup.cy());
             bggroup.add(img);
         }
         group.add(bggroup);
         if (_this.text.length > 0) {
             group.add(_this.drawText(draw, bggroup.cx(), bggroup.cy()));
         }
     };
     rNode.prototype.drawText = function(draw, cx, cy) {
         var _this = this;
            return _this.drawTextLimit(draw,cx,cy); 
         // var txt = draw.text(_this.text).font({
         //     family: 'Microsoft Yahei',
         //     size: 16,
         //     leading: '1.6'
         // }).fill({
         //     color: _this.color
         // });
         // var w = 0,  w1, l = txt.lines().length();
         // if (l > 1) {
         //     for (var i = 0; i < l; i++) {
         //         w1 = txt.lines().get(i).length();
         //         w < w1 && (w = w1);
         //     }
         //     for (i = 0; i < l; i++) {
         //         w1 = txt.lines().get(i).length();
         //         txt.lines().get(i).dx((w - w1) / 2);
         //     }
         // } else {
         //     w = txt.length();
         // }
         // txt.center(cx, cy).dy(_this.r + l * 12 * 1.5 / 2);
         // return txt;

     };

     var sNode = function(data) {
         this.dropData = null;
         this.dropGroup = null;
         this.dropenter = false;
         this.dropMoreClick = null;
         this.mdata = null;
         this.init(data);
     };
     sNode.prototype = new node();
     sNode.prototype.elementType = "sNode";
     sNode.prototype.init = function(data) {
         var _this = this;
         _this.r = 33;
         _this.borderWidth = "6px";
         _this.color = "#0088e7";
         _this.rotate = '0';
         _this.text = data.text || "";
         _this.innerText = data.innerText || "";
         _this.img = data.img;
         _this.status = data.status || "0";
         _this.mdata = data.mdata;
     };
     sNode.prototype.getColor = function() {
         var _this = this;
         switch (_this.status + '') {
             case '1':
                 _this.bg = "#1ebede";
                 _this.borderColor = "#b9f3ff";
                 _this.selectBg = "#1ebede";
                 _this.selectBorderColor = "#1ebede";
                 break;
             case '0':
                 _this.bg = "#42d4a0";
                 _this.borderColor = "#bff3e1";
                 _this.selectBg = "#42d4a0";
                 _this.selectBorderColor = "#42d4a0";
                 break;
             case '2':
                 _this.bg = "#7c93f7";
                 _this.borderColor = "#c9d3fd";
                 _this.selectBg = "#7c93f7";
                 _this.selectBorderColor = "#7c93f7";
                 break;
             case '3':
                 _this.bg = "#fc7a8c";
                 _this.borderColor = "#f7d0d5";
                 _this.selectBg = "#fc7a8c";
                 _this.selectBorderColor = "#fc7a8c";
                 break;
             default:
                 _this.bg = "#42d4a0";
                 _this.borderColor = "#bff3e1";
                 _this.selectBg = "#42d4a0";
                 _this.selectBorderColor = "#42d4a0";
         }
     };
     sNode.prototype.drawText = function(draw,cx,cy) {

         var _this = this;
         return _this.drawTextLimit(draw,cx,cy); 
        
        // var  txt = draw.text(_this.text).font({
        //      family: 'Microsoft Yahei',
        //      size: 12,
        //      leading: '1.5'
        //      //   ,
        //      // anchor:   'middle'
        //  }).fill({
        //      color: _this.color
        //  });

        //      var w = 0,  w1, l = txt.lines().length();
        //      if (l > 1) {
        //          for (var i = 0; i < l; i++) {
        //              w1 = txt.lines().get(i).length();
        //              w < w1 && (w = w1);
        //          }
        //          for (i = 0; i < l; i++) {
        //              w1 = txt.lines().get(i).length();
        //              txt.lines().get(i).dx((w - w1) / 2);
        //          }
        //      } else {
        //          w = txt.length();
        //      }
        //      txt.center( cx, cy ).dx(0).dy(_this.r + l * 12 * 1.5 / 2);

        //  return txt;

     };
   
     sNode.prototype.drawInnerText = function(draw) {
         var _this = this;
         var l = _this.innerText.length;
         var fontsize = 24;
         switch (l + "") {
             case '1':
             case '2':
                 fontsize = 32;
                 break;
             case '3':
             case '4':
                 fontsize = 24;
                 break;
             default:
                 fontsize = 14;
                 break;
         }
         var text = draw.text(_this.innerText).font({
             family: 'Microsoft Yahei',
             size: fontsize,
             leading: '1'
         }).fill({
             color: '#fff'
         });



         return text;

     };

     sNode.prototype.select = function() {
         var _this = this;
         var group = _this.bggroup;
         group.children()[0].stroke({ "color": _this.selectBorderColor }).fill(_this.selectBg);

     }
     sNode.prototype.draw = function(draw) {
         var _this = this;
         _this.draw = draw;
         _this.getColor();
         var bggroup = draw.group(),
           nodegroup = draw.group();
         bggroup.add(draw.circle(_this.r * 2).fill(_this.bg).stroke({ "color": _this.borderColor, width: _this.borderWidth }).center(_this.x, _this.y).rotate(_this.rotate, draw.cx(), draw.cy()));
         var group = draw.group().style({ "position": "relative", cursor: 'default', "z-index": "99" });
         nodegroup.add(bggroup);
         if (_this.text.length > 0) { 
             group.add(_this.drawText(draw,bggroup.cx(), bggroup.cy()));
         }
         if (_this.innerText.length > 0) {
             var text = _this.drawInnerText(draw).center(bggroup.cx(), bggroup.cy());
             // if (_this.img) text.hide();
             nodegroup.add(text);
             _this.innerTextId = text.id();
         }
         if (_this.img) {
             var img = draw.image(_this.img, 35, 35).center(bggroup.cx(), bggroup.cy());
             nodegroup.add(img);
             _this.imgId = img.id();
             if(_this.innerText.length > 0)
             {
                img.opacity(0.3);
                 // group.on("mouseleave", function() {
                 //     SVG.get(_this.innerTextId).hide();
                 //     SVG.get(_this.imgId).show();

                 // }).on("mouseenter", function() {
                 //     SVG.get(_this.imgId).hide();
                 //     SVG.get(_this.innerTextId).show();
                 // }).style({ cursor: 'pointer' });
            }
         }
         group.add(nodegroup);
         _this.bggroup = bggroup;
         _this.nodegroup=nodegroup;
         _this.group = group;

     };

     sNode.prototype.hover = function(fun) {
         var _this = this;
         var group = _this.nodegroup;
         _this.timeout = 0;
         group.on("mouseleave", function() {
             //_this.dropHide();
             _this.timeout = setTimeout(function() {
                 !_this.dropenter && _this.dropHide();
             }, 100);
         }).on("mouseenter", function() {
             _this.timeout && clearTimeout(_this.timeout);
             fun && fun.call(_this);
             _this.dropGroup && _this.dropGroup.show();
         }).style({ cursor: 'pointer' });

     };
     sNode.prototype.setDropData = function(data) {
         this.dropData = data;
         return this;

     };
     sNode.prototype.onDraopMoreClick = function(fun) {
         var _this = this;
         this.moretext && this.moretext.on("click", function() {
             fun && fun.call(_this);
         });
     };
     sNode.prototype.dropDraw = function() {
         var _this = this,
             draw = _this.draw,
             bggroup = _this.bggroup;
         if (this.dropData && !_this.dropGroup) {
             var group = _this.group;
             var dropGroup = draw.group();
             var group1 = draw.group();
             var h = 0,
                 w = 242,
                 j = 0;
             for (var i in this.dropData) {
                 if (i == "more") {
                     var moretext = draw.text("更多").fill("#333").font({ family: 'Microsoft Yahei', size: 14, anchor: 'middle', leading: '1 ' }).move(0, 11 + h).cx(w / 2).style({ "cursor": "pointer" });
                     group1.add(moretext);
                     _this.moretext = moretext;
                 } else {
                     group1.add(draw.circle(20).fill("#68b12b").move(10, 11 + h));
                     group1.add(draw.text(i).fill("#fff").font({ family: 'Microsoft Yahei', size: 12, anchor: 'middle', leading: '1 ' }).move(20, 11 + h + 2));
                     var txt = draw.text(this.dropData[i]).fill("#333").font({ family: 'Microsoft Yahei', size: 14, anchor: 'left', leading: '1 ' }).move(40, 11 + h);
                     if (txt.length() + 50 > w) {
                         txt.text(this.dropData[i].slice(0, (w - 50) / 10) + "...");
                     }
                     group1.add(txt);
                 }
                 group1.add(draw.line(0, h + .5, w, h + .5).stroke({ "width": "1px", color: "#e6e6e6" }));
                 h += 42;
             }
             dropGroup.add(group.rect(w, h).fill("#fff").stroke({ "color": "#e7e7e7", "width": "1px" }));
             var cx = bggroup.cx(),
                 cy = bggroup.cy(),
                 dx = 0,
                 dy = 0;
             var sw = $(draw.node).parent().width() - $(draw.node).offset().left,
                 sh = draw.height();
             if (cx + w + _this.r > sw) {
                 dx = -w / 2 - _this.r - 10;
             } else {
                 dx = w / 2 + _this.r + 10;
             }
             if (cy - (h / 2) < 0) {
                 dy = -cy + h / 2 + 10;
             } else if (cy + h / 2 > sh) {
                 dy = sh - cy - h / 2 - 10;
             }
             dropGroup.add(group1).center(cx, cy).dx(dx).dy(dy);
             _this.dropGroup = dropGroup;
         } else if (_this.dropGroup) {
             _this.dropGroup.show();
         }
         _this.dropGroup.on("mouseenter", function() {
             _this.timeout && clearTimeout(_this.timeout);
             _this.dropenter = true;
             _this.dropGroup.show();
         }).on("mouseleave", function() {
             _this.dropenter = false;
             _this.dropGroup.hide();
         });
     };
     sNode.prototype.dropHide = function() {
         var _this = this;
         if (_this.dropGroup) {
             _this.dropGroup.hide();
         }
     }

     function isArray(o) {
         return Object.prototype.toString.call(o) === '[object Array]';
     }
     $.fn.extend({
         mctopology: function(opt) {
             return this.length !== 0 ? new mctopology(this, opt) : undefined;
         }
     });
 })(window, jQuery, SVG);