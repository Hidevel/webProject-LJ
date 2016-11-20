var colorsCD=["#ffff33","#33ff66","#00ccff","#ff66ff"];

function randomCDColor(){
	return Math.floor(Math.random() * 4);
}


function init() {
    
	
//Exit button set up
	var btnExit=document.getElementById("btnExit");
	btnExit.onclick=function(){
		 window.location ="play.html";
	};
	
	var colorIndex=randomCDColor();
	
	btnExit.onmouseover=function(){
		var btnPart=document.getElementById("btnExitCircle");
		btnPart.style.fill=colorsCD[colorIndex];
	}
	
	btnExit.onmouseout=function(){
		var btnPart=document.getElementById("btnExitCircle");
		btnPart.style.fill="#ffffff";
	}

//Add timer, C and E points
//One group out of control panel
//Play new game button set up
/*
	1.) board, controlpanel visible (display=hidden --> display:normal)
	2.) player in place (one of 4 colours)
	3.) controlpanel color set
	4.) 1,1 production = true
	5.) start on base
	
	Game move with buttons only
	Select + arrow =expansion in arrow direction
	Select already reached point = construction
*/
};