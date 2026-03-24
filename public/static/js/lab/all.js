// script that is run on all experiment pages
var isIFrame = window.frameElement && window.frameElement.nodeName == "IFRAME";
if(isIFrame){
  $("#foot").remove();
}
