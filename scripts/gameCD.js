//TO_DO

//Add timer - setInterval
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

//VARIABLES
	//CONSTANTS
var colorsCD=["#ffffff","#ffff33","#33ff66","#00ccff","#ff66ff"], //unowned - 0, yellow - 1,green - 2,blue - 3,magenta - 4
	currentPositionDOMArray=[ //to select SVG elements
			"tower00",
			"tower01",
			"tower02",
			"tower03",
			"tower04",
			"tower05",
			"tower06",
				"tower10",
				"tower11",
				"tower12",
				"tower13",
				"tower14",
				"tower15",
				"tower16",
			"tower20",
			"tower21",
			"tower22",
			"tower23",
			"tower24",
			"tower25",
			"tower26",
				"tower30",
				"tower31",
				"tower32",
				"tower33",
				"tower34",
				"tower35",
				"tower36",
			"tower40",
			"tower41",
			"tower42",
			"tower43",
			"tower44",
			"tower45",
			"tower46",
				"tower50",
				"tower51",
				"tower52",
				"tower53",
				"tower54",
				"tower55",
				"tower56",
			"tower60",
			"tower61",
			"tower62",
			"tower63",
			"tower64",
			"tower65",
			"tower66",
		],
	//DOM names of routes
	routesDOMArray=[
		"routeH00",		"routeH01",		"routeH02",		"routeH03",		"routeH04",		"routeH05",
		"routeH10",		"routeH11",		"routeH12",		"routeH13",		"routeH14",		"routeH15",
		"routeH20",		"routeH21",		"routeH22",		"routeH23",		"routeH24",		"routeH25",
		"routeH30",		"routeH31",		"routeH32",		"routeH33",		"routeH34",		"routeH35",
		"routeH40",		"routeH41",		"routeH42",		"routeH43",		"routeH44",		"routeH45",
		"routeH50",		"routeH51",		"routeH52",		"routeH53",		"routeH54",		"routeH55",
		"routeH60",		"routeH61",		"routeH62",		"routeH63",		"routeH64",		"routeH65",
		
		"routeV00",		"routeV01",		"routeV02",		"routeV03",		"routeV04",		"routeV05",		"routeV06",
		"routeV10",		"routeV11",		"routeV12",		"routeV13",		"routeV14",		"routeV15",		"routeV16",
		"routeV20",		"routeV21",		"routeV22",		"routeV23",		"routeV24",		"routeV25",		"routeV26",
		"routeV30",		"routeV31",		"routeV32",		"routeV33",		"routeV34",		"routeV35",		"routeV36",
		"routeV40",		"routeV41",		"routeV42",		"routeV43",		"routeV44",		"routeV45",		"routeV46",
		"routeV50",		"routeV51",		"routeV52",		"routeV53",		"routeV54",		"routeV55",		"routeV56"
	],
		//array of possible movements from each tower(=circle)
			/*	index:
				- up == 0
				- right == 1
				- down == 2
				- left == 3
				
				value:
				- invalid direction == 0
				- valid direction == 1
			*/
		validMovement=[
			[0,1,1,0],[0,1,1,1],[0,1,1,1],[0,1,1,1],[0,1,1,1],[0,1,1,1],[0,0,1,1],
			[1,1,1,0],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,0,1,1],
			[1,1,1,0],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,0,1,1],
			[1,1,1,0],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,0,1,1],
			[1,1,1,0],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,0,1,1],
			[1,1,1,0],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,0,1,1],
			[1,1,0,0],[1,1,0,1],[1,1,0,1],[1,1,0,1],[1,1,0,1],[1,1,0,1],[1,0,0,1]
		],
		/*
		which element from the routesDOMArray should be modified
				- contains indicies of routesDOMArray elements
				- 84 == non-existent/invalid route
		*/
		/*
		select the correct route
			- horizontal: route's row index * 6 + route's column index (valid indexes: 0-41) Wlzae
			- vertical: 42 + route's row index * 7 + route's column index (valid indexes: 42-83)
		*/
		routesFromTowers=[
			[84,0,42,84],[84,1,43,0],[84,2,44,1],[84,3,45,2],[84,4,46,3],[84,5,47,4],[84,84,48,5],
			[42,6,49,84],[43,7,50,6],[44,8,51,7],[45,9,52,8],[46,10,53,9],[47,11,54,10],[48,84,55,11],
			[49,12,56,84],[50,13,57,12],[51,14,58,13],[52,15,59,14],[53,16,60,15],[54,17,61,16],[55,84,62,17],
			[56,18,63,84],[57,19,64,18],[58,20,65,19],[59,21,66,20],[60,22,67,21],[61,23,68,22],[62,84,69,23],
			[63,24,70,84],[64,25,71,24],[65,26,72,25],[66,27,73,26],[67,28,74,27],[68,29,75,28],[69,84,76,29],
			[70,30,77,84],[71,31,78,30],[72,32,79,31],[73,33,80,32],[74,34,81,33],[75,35,82,34],[76,84,83,35],
			[77,36,84,84],[78,37,84,36],[79,38,84,37],[80,39,84,38],[81,40,84,39],[82,41,84,40],[83,84,84,41]
		];
		
	
	
	var routeOwners,
		verticalRouteOwners,
		horizontalRouteOwners,
		towerOwners;

		
	//FUNCTIONS
	var init,
		randomCDColor,
		initGame,
		keyDown,
		movementCommand,
		selectCommand,
		expandRoute,
		constructTower;
		
	//DYNAMIC VARIABLES - they change every game
	var playerColour, //stores player colour
		movementHighlight, //
		routesBuildArray, //contains ongoing route building actions
		towersBuildArray, //contains ongoing tower building actions
		currentPosition, //integer
		isCurrentPositionSelected, //boolean, activates different behaviour of arrow buttons
		isBtnSelectFirstPress;//boolean, activates different the behaviour of select button
	
	
	
	//chooses a random color from the colorsCD array
	randomCDColor=function(){
		return Math.floor(Math.random() * 4)+1;
	}
	
	
//initializes the game's welcome screen
init=function() {
	
	//random color index
	var colorIndexName=randomCDColor(),
		colorIndexPlay=(colorIndexName)%4+1,
		colorIndexStats=(colorIndexName+1)%4+1,
		colorIndexExit=(colorIndexName+2)%4+1;	
	
//PlayerName display

	var playerNameBackground=document.getElementById("playerNameBorder");
	playerNameBackground.style.fill=colorsCD[colorIndexName];

//Play button set up
	var btnPlay=document.getElementById("btnPlay");
	btnPlay.onclick=function(){
		var prepareInGame=document.getElementById("inGame");
		prepareInGame.style.display="inline";
		prepareInGame=document.getElementById("territoryFields");
		prepareInGame.style.display="inline";
		prepareInGame=document.getElementById("routes");
		prepareInGame.style.display="inline";
		prepareInGame=document.getElementById("basesAndTowers");
		prepareInGame.style.display="inline";
		
		//calls initGame
		initGame();
	};
	
	btnPlay.onmouseover=function(){
		var btnPart=document.getElementById("btnPlayCircle");
		btnPart.style.fill=colorsCD[colorIndexPlay];
	};
	
	btnPlay.onmouseout=function(){
		var btnPart=document.getElementById("btnPlayCircle");
		btnPart.style.fill="none";
	};

//Statistics button set up	
	var btnStats=document.getElementById("btnStats");
	btnStats.onclick=function(){
	};
	
	btnStats.onmouseover=function(){
		var btnPart=document.getElementById("btnStatsCircle");
		btnPart.style.fill=colorsCD[colorIndexStats];
	};
	
	btnStats.onmouseout=function(){
		var btnPart=document.getElementById("btnStatsCircle");
		btnPart.style.fill="none";
	};
	

//Exit button set up
	var btnExit=document.getElementById("btnExit");
	btnExit.onclick=function(){
		 window.location ="play.html";
	};
	
	btnExit.onmouseover=function(){
		var btnPart=document.getElementById("btnExitCircle");
		btnPart.style.fill=colorsCD[colorIndexExit];
	};
	
	btnExit.onmouseout=function(){
		var btnPart=document.getElementById("btnExitCircle");
		btnPart.style.fill="none";
	};
	
	
	//add .route css class to route elements
	
		/*source: plainjs.com
		Enables class manipulation (check,add,remove)
		*/
		var hasClass, addClass, removeClass;

		if ('classList' in document.documentElement) {
			hasClass = function (el, className) { return el.classList.contains(className); };
			addClass = function (el, className) { el.classList.add(className); };
			removeClass = function (el, className) { el.classList.remove(className); };
		} else {
			hasClass = function (el, className) {
				return new RegExp('\\b'+ className+'\\b').test(el.className);
			};
			addClass = function (el, className) {
				if (!hasClass(el, className)) { el.className += ' ' + className; }
			};
			removeClass = function (el, className) {
				el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
			};
		}
	for(var i=0;i<84;i++){
		initDOMElements=document.getElementById(routesDOMArray[i]);
		if(!hasClass(initDOMElements,"route"))addClass(initDOMElements,"route");
	}
};

//initializes the game
initGame=function(){
	
	//determine the player color - done by server
	playerColour=1; //TESTING SOLUTIONS
		
	var initDOMElements;
	
	initDOMElements=document.getElementById("playerNameBorderInGame");
	initDOMElements.style.fill=colorsCD[playerColour];
	
	//occupied terrorities aka. who owns what?
		/*- content: owner of the field
			- defined by the color of the player
			- values:	
				- yellow - 1
				- green - 2
				- blue - 3
				- magenta - 4
		*/
	routeOwners=new Array(84);
	towerOwners=new Array(49);
		//init these arrays
		for(var i=0;i<84;i++){
			routeOwners[i]=playerColour;//TESTING!!!!!!!!!!!!!!!!!!!!!!!!!
			if(i<49) towerOwners[i]=0;
		}
	
	//init 
	routesBuildArray=new Array(84); 
	towersBuildArray=new Array(49);
	
	
	//init game related variables
	isCurrentPositionSelected=false;
	isBtnSelectFirstPress=true;
	keyboard={};
	
	//choose the player base
	if(colorsCD[playerColour]===colorsCD[1]){//yellow
		
		currentPosition=0;
		initDOMElements=document.getElementById(currentPositionDOMArray[currentPosition]);
	}
	else if(colorsCD[playerColour]===colorsCD[2]){//green
		
		currentPosition=42;
		initDOMElements=document.getElementById(currentPositionDOMArray[currentPosition]);
	}
	else if(colorsCD[playerColour]===colorsCD[3]){//blue
		
		currentPosition=6;
		initDOMElements=document.getElementById(currentPositionDOMArray[currentPosition]);
	}
	else if(colorsCD[playerColour]===colorsCD[4]){//magenta
		
		currentPosition=48;
		initDOMElements=document.getElementById(currentPositionDOMArray[currentPosition]);
	}
	initDOMElements.style.stroke=colorsCD[playerColour];//highlight current position
	
	towerOwners[currentPosition]=playerColour;//the player owns its base
	
	//init ControlPanel
		//movement buttons
		//array of possible movements from each tower(=circle)
	/*	index:
		- up == 0
		- right == 1
		- down == 2
		- left == 3
		
		value:
		- invalid direction == 0
		- valid direction == 1
	*/	
		initDOMElements=document.getElementById("btnUpArrow");
		initDOMElements.addEventListener('click', function(){
			//if(existing route and it's in the players possession)
			if(validMovement[currentPosition][0]!==0 && routeOwners[routesFromTowers[currentPosition][0]]===playerColour){
				//change behaviour depending on is the currentPosition selected or not
				if(isCurrentPositionSelected) console.log("upsel");
				else movementCommand(0);
			};
		});
		
		initDOMElements=document.getElementById("btnRightArrow");
		initDOMElements.addEventListener('click', function(){
			if(validMovement[currentPosition][1]!==0 && routeOwners[routesFromTowers[currentPosition][1]]==playerColour) movementCommand(1);
		});
		
		initDOMElements=document.getElementById("btnDownArrow");
		initDOMElements.addEventListener('click', function(){
			if(validMovement[currentPosition][2]!==0 && routeOwners[routesFromTowers[currentPosition][2]]==playerColour) movementCommand(2);
		});
		
		initDOMElements=document.getElementById("btnLeftArrow");
		initDOMElements.addEventListener('click', function(){
			if(validMovement[currentPosition][3]!==0 && routeOwners[routesFromTowers[currentPosition][3]]==playerColour) movementCommand(3);
		});
	
		initDOMElements=document.getElementById("btnSelect");
		initDOMElements.addEventListener('click',function(){
			selectCommand();
		});
}

	//INGAME FUNCTIONS
	
	/*help for movement
	index:
		- up == 0
		- right == 1
		- down == 2
		- left == 3
	
	*/
movementCommand=function(direction){
	
	movementHighlight=document.getElementById(currentPositionDOMArray[currentPosition]);
	movementHighlight.style.stroke="#000000";
	
	switch(direction){
		case 0:
		currentPosition-=7;
		break;
		case 1:
		currentPosition++;
		break;
		case 2:
		currentPosition+=7;
		break;
		case 3:
		currentPosition--;
		break;
	}
	movementHighlight=document.getElementById(currentPositionDOMArray[currentPosition]);
	movementHighlight.style.stroke=colorsCD[playerColour];
}

selectCommand=function(){
	
	var btnSelectCircle=document.getElementById("btnSelectCircle");
	
	//different action on first/second press
	if(isBtnSelectFirstPress){
		isCurrentPositionSelected=true;//make the current position selected
		isBtnSelectFirstPress=false;
		btnSelectCircle.style.fill=colorsCD[playerColour]; //colour the select button to highlight position selection
	} 
	else{
		isCurrentPositionSelected=false;
		isBtnSelectFirstPress=true;
		btnSelectCircle.style.fill=colorsCD[0];//second press of select is deselect
	} 
}

	//construct a route in the given direction
expandRoute=function(direction){
	
	
	switch(direction){
		case 0:
		;
		break;
		case 1:
		;
		break;
		case 2:
		;
		break;
		case 3:
		;
		break;
	}
}

constructTower=function(){
	
}


keyDown=function(event){
	if (event.keyCode==37) { //left arrow key
		if(validMovement[currentPosition][3]!==0 && routeOwners[routesFromTowers[currentPosition][3]]==playerColour) movementCommand(3);
	}
	if (event.keyCode==39) { //right arrow key		
		if(validMovement[currentPosition][1]!==0 && routeOwners[routesFromTowers[currentPosition][1]]==playerColour) movementCommand(1);
	}	
	if (event.keyCode==38){ // up arrow key	
		if(validMovement[currentPosition][0]!==0 && routeOwners[routesFromTowers[currentPosition][0]]==playerColour) movementCommand(0);
	}
	if (event.keyCode==40){ // down arrow key
		if(validMovement[currentPosition][2]!==0 && routeOwners[routesFromTowers[currentPosition][2]]==playerColour) movementCommand(2);
	}
}
document.addEventListener('keydown', keyDown);