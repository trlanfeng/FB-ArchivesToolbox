//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//              *  HTML在线编辑器功能代码                                               //
//              *  编写：Java Leung 由孤月蓝风修改于 2013-09-28                         //
//              *  Copyright @ GDCIC 2000-2012                                          //
//              *  你若需移用该程序的一部分或全部代码，请保留编写者信息                 //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////
SEP_PADDING = 5
HANDLE_PADDING = 7

var YBtnClick = false; 
var YMouseIn = false;

var yToolbars = new Array();  

var Format = "Normal"; 
var CssFile=""; 

var YInitialized = false;

function document.onreadystatechange() {
  if (YInitialized) return;
  YInitialized = true;

  var i, s, curr;

  for (i=0; i<document.body.all.length; i++) {
    curr=document.body.all[i];
    if (curr.className == "yToolbar") {
      if (! InitTB(curr)) {
        alert("Toolbar: " + curr.id + " failed to initialize. Status: false");
      }
      yToolbars[yToolbars.length] = curr;
    }
  }

  DoLayout(); //排列toolbars
  window.onresize = DoLayout;
  initEditor("On",hidd.innerHTML);
  Composition.document.body.style.fontSize="14px";
  Composition.focus();
}

// 初始化 toolbar button
function InitBtn(btn,bchk,BtnProp) {
  btn.onmousemove = BtnMouseMove;
  btn.onmouseover = YCancelEvent;
  btn.onmouseout = BtnMouseOut;
  btn.onmousedown = BtnMouseDown;
  btn.onmouseup = BtnMouseUp;
  btn.ondragstart = YCancelEvent;
  btn.onselectstart = YCancelEvent;
  btn.YINITIALIZED = true;
  btn.YCHECK = bchk;
  btn.Prop = BtnProp;
  return true;
}

//初始化 toolbar. 
function InitTB(y) {

  y.TBWidth = 0;
    
  if (! PopulateTB(y)) return false;
  
  y.style.posWidth = y.TBWidth;
  
  return true;
}


function YCancelEvent() {
  event.returnValue=false;
  event.cancelBubble=true;
  return false;
}

function BtnMouseMove() {
  if (YMouseIn) return true;
  var brtn;
  if (event.srcElement.tagName != "IMG") {
      brtn = false;
  }else{ 
      brtn = true;
      YMouseIn = true;
      var image = event.srcElement;
      var element = image.parentElement; //btn

      switch (image.className) {
          case "Ico": 
              if (event.button == 1) {
                  if (YBtnClick) {
                      element.className = "BtnMouseOverDown";  
                      image.className = "IcoDown";
                  }else{
                      element.className = "BtnMouseOverUp";
                  }
              }else{
                  element.className = "BtnMouseOverUp";
              }
              break;
           case "IcoDown":
               if (event.button == 1) {
                   if (YBtnClick) {
                       element.className = "BtnMouseOverDown";  
                       image.className = "IcoDownPressed";
                   }else{
                       element.className = "BtnMouseOverDown";
                   }
               }else{
                   element.className = "BtnMouseOverDown";
               }
               break;
           case "IcoArrow":
               if (event.button == 1) {
                   if (YBtnClick) {
                       element.className = "BtnArrowOverDown";  
                       image.className = "IcoArrowDown";
                   }else{
                      element.className = "BtnArrowOverUp";
                   }
               }else{
                   element.className = "BtnArrowOverUp";
               }
               break;
           case "IcoArrowDown":
               //保持
               break;
           default:
               alert("未定义属性!");
        }
  }
  event.cancelBubble = true;
  return brtn;
}

function BtnMouseOver() {
  var brtn;
  if (event.srcElement.tagName != "IMG") {
      brtn = false;
  }else{ 
      brtn = true;
      var image = event.srcElement;
      var element = image.parentElement;
  
      if (image.className == "Ico") {
          if (event.button == 1) {

              if (YBtnClick) {
                 element.className = "BtnMouseOverDown";  
                 image.className = "IcoDownPressed";
              }else{
                 element.className = "BtnMouseOverUp";
              }
          }else{
              element.className = "BtnMouseOverUp";
          }
      }else if (image.className == "IcoDown") {
          element.className = "BtnMouseOverDown";
      }
  }
  event.cancelBubble = true;
  return brtn;
}

function BtnMouseOut() {
  var brtn;
  if (event.srcElement.tagName != "IMG") { 
      brtn = false;
  }else{ 
      brtn = true;
      YMouseIn = false;
      var image = event.srcElement;
      var element = image.parentElement;
      //yRaisedElement = null; 
      switch (image.className) {
          case "Ico": 
              element.className = "Btn";  
              break;
           case "IcoDown":
                 if (YBtnClick) {
                    element.className = "Btn";  
                    image.className = "Ico";
                 }else{
                    element.className = "BtnDown";
                 }
              break;
           case "IcoDownPressed": 
              element.className = "BtnDown";  
              image.className = "IcoDown";    
              break;
           case "IcoArrow":
               element.className = "BtnArrow";  
               break;
           case "IcoArrowDown":
               if (YBtnClick) {
                    element.className = "BtnArrow";  
                    image.className = "IcoArrow";
                 }else{
                    //保持
                 }
               break;
           default:
               alert("未定义属性!");
        }
  }
  event.cancelBubble = true;
  return brtn;
}

function BtnMouseDown() {
  var brtn;
  if (event.srcElement.tagName != "IMG") { 
      brtn = false;
  }else{ 
      brtn = true;
      var image = event.srcElement;
      var element = image.parentElement;
      switch (image.className) {
          case "Ico": 
             if (event.button == 1) {
                YBtnClick = true;
                element.className = "BtnMouseOverDown";  
                image.className = "IcoDown";
             }else{
                 //按其它键时保持状态
             }
             break;
          case "IcoDown":
             if (event.button == 1) {
                YBtnClick = true;
                image.className = "IcoDownPressed";
             }else{
                //按其它键时保持状态
             }
             break;
          case "IcoArrow":
             if (event.button == 1) {
                YBtnClick = true;
                element.className = "BtnArrowOverDown";  
                image.className = "IcoArrowDown";
             }else{
             } 
             break;
          case "IcoArrowDown":
             //按其它键时保持状态
             break;
          default:
              alert("未定义属性!");
      }
  }
  event.cancelBubble = true;
  return brtn;
}

function BtnMouseUp() {
  var brtn;
  if (event.srcElement.tagName != "IMG") { 
      brtn = false;
  }else{ 
      brtn = true;
      var image = event.srcElement;
      var element = image.parentElement;

  // if (element.YUSERONCLICK) eval(element.YUSERONCLICK + "anonymous()"); 
      switch (image.className) {
          case "Ico": 
             break;
          case "IcoDown":
             if (event.button == 1) {
                if (YBtnClick) {
                   YBtnClick = false;
                   if (element.YCHECK) {
                       //可Check型Btn保持按下时状态
                   }else{
                      element.className = "BtnMouseOverUp"; 
                      image.className = "Ico";
                   }
                }else{
                    //保持状态
                }
             }else{
             }
             break;
          case "IcoDownPressed":
              YBtnClick = false;
              element.className = "BtnMouseOverUp"; 
              image.className = "Ico"; 
              break;
           case "IcoArrow":
              //维持不变  
              break;
           case "IcoArrowDown":
              if (event.button == 1) {
                 if (YBtnClick) {
                    YBtnClick = false;
                    if (element.YCHECK) {
                    }else{
                       element.className = "BtnArrowOverUp"; 
                       image.className = "IcoArrow";
                    }
                 }else{
                 }
              }else{
              }
              break;
           default:
              alert("未定义属性!");
        }
  }

  return brtn;
}

//预处理初始化Btn
function PreInitBtn(y,element,bchk,BtnProp){
      if (element.YINITIALIZED == null) {
	     if (! InitBtn(element,bchk,BtnProp)) {
	        alert("Problem initializing:" + element.id);
	        return false;
	     }
      }
      
      element.style.posLeft = y.TBWidth;
//    y.TBWidth += element.offsetWidth + 1;
      y.TBWidth += element.offsetWidth
      return true;
}

function PopulateTB(y) {
  var i, elements, element;

  elements = y.children;
  for (i=0; i<elements.length; i++) {
    element = elements[i];
    if (element.tagName == "SCRIPT" || element.tagName == "!") continue;
    
    switch (element.className) {
    case "Btn": 
	  if (! PreInitBtn(y,element,false,0)) return false;
      break;

    case "BtnDown":
	  if (! PreInitBtn(y,element,true,0)) return false;
      break;

    case "Btnorgl":
      element.className = "Btn";
	  if (! PreInitBtn(y,element,true,0)) return false;
      break;

    case "BtnArrow":
	  if (! PreInitBtn(y,element,false,1)) return false;
      break;
      
    case "TBGen":
      element.style.posLeft = y.TBWidth;
      y.TBWidth += element.offsetWidth + 1;
      break;
      
    case "TBSep":
      element.style.posLeft = y.TBWidth + 2;
      y.TBWidth += SEP_PADDING;
      break;
      
    case "TBHandle":
      element.style.posLeft = 2;
      y.TBWidth += HANDLE_PADDING;
      break;
      
    default:
      alert("Invalid class: " + element.className + " on Element: " + element.id + " <" + element.tagName + ">");
      return false;
    }
  }

  y.TBWidth += 1;
  return true;
}

function LayoutTBs() {
  var RelTop = 0;
  var NumTBs = yToolbars.length;

  if (NumTBs == 0) return RelTop;

  var i;
  var TB;
  var ScrWid = (document.body.offsetWidth) - 6;
  var TotalLen = ScrWid;
  for (i = 0 ; i < NumTBs ; i++) {
    TB = yToolbars[i];
    if (TB.TBWidth > TotalLen) TotalLen = TB.TBWidth;
  }

  var PrevTB;
  var LastStart = 0;
  var LastWid, CurrWid;

  TB = yToolbars[0];
  TB.style.posTop = 0;
  TB.style.posLeft = 0;

  var Start = TB.TBWidth;
  for (i = 1 ; i < yToolbars.length ; i++) {
    PrevTB = TB;
    TB = yToolbars[i];
    CurrWid = TB.TBWidth;

    if ((Start + CurrWid) > ScrWid) { 
      Start = 0;
      LastWid = TotalLen - LastStart;
    }
    else { 
      LastWid = PrevTB.TBWidth;
      RelTop -= TB.offsetHeight;
    }
      
    TB.style.posTop = RelTop;
    TB.style.posLeft = Start;
    PrevTB.style.width = LastWid; //对齐toolbars

    LastStart = Start;
    Start += CurrWid;
  } 

  TB.style.width = TotalLen - LastStart;
  
  //处理toolbars移位后其他元素的页面位置
  i--;
  TB = yToolbars[i];

  LayoutOthers( TB,RelTop );
  return RelTop;
}

function LayoutOthers( Elem,TopValue ) {
  var Ind = Elem.sourceIndex;
  var A = Elem.document.all;
  var item;

  for (i in A) {
    item = A.item(i);
    if (! item) continue;
    if (! item.style) continue;
    if (item.sourceIndex <= Ind) continue;
    if (item.style.position == "absolute") continue;
    item.style.posTop = TopValue;
  }
}

function DoLayout() {
  var r = LayoutTBs();
  fixSize(r);
}

function fixSize(opt)
{  var Edtor = document.all.Composition
   var CpOrglHgt = Edtor.offsetHeight;
   Edtor.style.height = Math.max(document.body.offsetHeight - Edtor.offsetTop - 60, 0);
   var Idistance = Edtor.offsetHeight - CpOrglHgt;
   opt = opt / 2; 
   LayoutOthers( Edtor,Idistance + opt );
}

function format(what,opt,opt2) {
  var tmp = 0;
  Composition.focus(); 
  var sel = Composition.document.selection;
  if( what==null ) {showAbout();return true;}
  if(Format=="Preview") return false;
  if (opt2!=null)  //opt2为null则'Html、'Normal'状态下均允许使用
      if (Format=='Html') return false;
  switch( opt2 )
     {// case null:

       case 0:
          break;
       case 1: //forecolor
          opt = SelectColor(what,opt);
          what = 'forecolor';
          break;
       case 2: //backcolor
          opt = SelectColor(what,opt); 
          what = 'backcolor';
          break;
       case 3: //CreateLink
          opt = createLink(sel); 
          if (opt==null) return false;
          if (sel.type=="None") {
             what = null;
             opt = "<A target=\"_blank\" HREF=\""+opt+"\">"+opt+"</A>";
          }else{
             what = 'CreateLink';
          }
          break;
       case 4: //InsertImage
          opt = createImage(sel); 
          if (opt==null) return false;
             what = 'InsertImage';
          break;
       case 5: //Addtable
          opt = addTable(); 
          if (opt==null) return false;
          what = null;
          break;
       case 6: //粘贴标签
          what = null;
          tmp = 1;
          break;
       default: //null & others

     }
  if (what==null){
      if (! pasteHTML(sel,opt,tmp)) return false;
  }else{ 
      if (opt==null) Composition.document.execCommand(what);
      else Composition.document.execCommand(what,false,opt);
  }        

  Composition.focus();

  return true;

}

function pasteHTML(sel,opt,prop) //直接paste内容
{
	//Composition.focus();
    if (sel.type == 'Control') return false;
	var controlR=sel.createRange();
    if (prop==0){
       
    }else if (prop==1) { //paste mark
         opt = preMarkHtml(opt,controlR.text);	
	     if (opt==null) return false;
    }
    controlR.pasteHTML(opt);
    //controlR.select();
    return true;			
}

function preMarkHtml(Mark,seltext)
{
	if (Mark==''&&Mark==null) return null;
	var strHTML;
	//Composition.focus();
	var A=Mark.split(" ");
	if (Mark=="hr")
	   strHTML="<hr>";
	else
	   strHTML = "<" + Mark + ">" + seltext + "</" + A[0] + ">"; 
    return strHTML;			
}

function doSelectClick(str,Svalue,MarkNum) {
    if( Svalue =='' ) return;0
    format(str,Svalue,MarkNum);
}

function doFormat(what,para,Mark) {
   //if(Format!="Preview") 
     // if (Format=='Normal')
       //  Composition.document.execCommand(what,false,'');
         Composition.document.execCommand(what,para);
      //else
        // pasteMark(Mark);   
}

function setMode(newMode) {
  bTextMode = newMode;
  var cont;
  if (bTextMode) {
    cleanHtml();

    cont=Composition.document.body.innerHTML;
    Composition.document.body.innerText=cont;
  } else {
    cont=Composition.document.body.innerText;
    Composition.document.body.innerHTML=cont;
  }
  
  Composition.focus();
}

function getEl(sTag,start) {
  while ((start!=null) && (start.tagName!=sTag)) start = start.parentElement;
  return start;
}

function createLink(sel) {
var str = "http:\/\/";

if (sel.type == 'Control') {
   var controlR = sel.createRange();
   if (controlR.length==1){ 
      var oObject = controlR.item(0);
      switch( oObject.tagName ){
          case 'IMG':
             str = oObject.src;
             break;
          case 'TABLE':
             break;
          case 'HR':
             break;
          default:
    
      }
   }
}else{
  var isA = getEl("A",sel.createRange().parentElement());
  str = isA ? isA.href : "";
}
  str=prompt("请输入链接(如：http://www.ddsea.com):链接前必须有‘http://’", str);

  if ((str!=null) && (str!="http://")) {
      return str;
  }

  return null;
}
function createImage(sel) {
var str = "http:\/\/";
if (sel.type == 'Control') {
   var controlR = sel.createRange();
   if (controlR.length==1){ 
      var oObject = controlR.item(0);
      switch( oObject.tagName ){
          case 'IMG':
             str = oObject.src;
             break;
          case 'TABLE':
             break;
          case 'HR':
             break;
          default:
      }
   }
}else{
  var isA = getEl("A",sel.createRange().parentElement());
  str = isA ? isA.href : "http:\/\/";
}

  str=window.showModalDialog("select.PIC",str,"dialogWidth=320px;dialogHeight=200px;status=0");

  if ((str!=null) && (str!="/")) {
      return str;
  }

  return null;
}

function insertImage() {
  if (!validateMode()) return;
  var isA = getEl("A",Composition.document.selection.createRange().parentElement());
  var str=prompt("请输入图片位置 (e.g. /images/logo.png):", isA ? isA.href : "http:\/\/");

  if ((str!=null) && (str!="/")) {
    if (Composition.document.selection.type=="None") {
      var sel=Composition.document.selection.createRange();
      sel.pasteHTML("<img src=\""+str+"\">");
      sel.select();
    }
    else format("CreateImage",str);
  }
  else Composition.focus();
}

function SelectColor(id,Curr) {
 var c = id.style.backgroundColor;
 if (! Curr)
     c=window.showModalDialog("Select.Color",c,"dialogWidth=420px;dialogHeight=340px;status=0");

  if (c && c!="") {
     if (! Curr) id.style.backgroundColor=c;
     return c;
  }
  return '#ffffff';
}

function backColor(id,Curr) {
 var c;
  if (Curr) {
     c=id.style.backgroundColor;
 }else{
     c=window.showModalDialog("Select.Color",id.style.backgroundColor,"dialogWidth=420px;dialogHeight=340px;status=0");
 }
  if (c && c!="") {
     format('backcolor', c);
     if (! Curr) id.style.backgroundColor=c;
  }else{
     Composition.focus();
  }
}
function showAbout() {
   showModalDialog("Copy.Right","","dialogWidth:350px;dialogHeight:320px;status:no;");
}
function addTable()
{
     var ReturnValue=window.showModalDialog("Add.Table","","dialogWidth=310px;dialogHeight=150px;status=0");
	  if(ReturnValue && ReturnValue!="") return ReturnValue;

   return null;
}

function selectRange(){
	//edit = Composition.document.selection.createRange();
	//RangeType = Composition.document.selection.type;
}

function cleanHtml() {
  var fonts = Composition.document.body.all.tags("FONT");
  var curr;
  for (var i = fonts.length - 1; i >= 0; i--) {
    curr = fonts[i];
    if (curr.style.backgroundColor == "#ffffff") curr.outerHTML = curr.innerHTML;
  }
}

function getPureHtml() {
  var str = "";
  var paras = Composition.document.body.all.tags("P");
  if (paras.length > 0) {
    for (var i=paras.length-1; i >= 0; i--) str = paras[i].innerHTML + "\n" + str;
  } else {
    str = Composition.document.body.innerHTML;
  }
  return str;
}

function initEditor(Model,StrHTML) {
	Composition.document.designMode=Model;
	Composition.document.open();
	Composition.document.write(StrHTML);
	Composition.document.close();
	if(CssFile!="")
		Composition.document.createStyleSheet(CssFile);
}

function SelectFormat(Status) //更改编辑模式
 {
  swapModes(Status);
  switch(Status)
    { case "Normal":
           Html.style.display="none";
           Preview.style.display="none";
           Normal.style.display="block";
           break;
      case "Html":
           Normal.style.display="none";
           Preview.style.display="none";
           Html.style.display="block";
           break;
           
      default: //"Preview"
           Normal.style.display="none";
           Html.style.display="none";
           Preview.style.display="block";
		   break; 
   }
    return;
 }

function swapModes(Mode) {
    var StrHTML='';	
	switch(Mode){
		case "Normal":
			if (Format == "Html")
				Composition.document.body.innerHTML = Composition.document.body.innerText;
			else
			 {
				StrHTML = Composition.document.body.innerHTML;
				initEditor("On",StrHTML);
			 }
			break;
		case "Html":
			if (Format == "Preview"){
				StrHTML = Composition.document.body.innerHTML;
				initEditor("On",StrHTML);
			}
			Composition.document.body.innerText = Composition.document.body.innerHTML;
			break;
		default: //"Preview"
			if(Format == "Html")
				StrHTML = Composition.document.body.innerText;
			else{
				StrHTML = Composition.document.body.innerHTML;				
			}
            initEditor("Off",StrHTML);
			break;
	}
	Composition.focus();
    Format=Mode;
}