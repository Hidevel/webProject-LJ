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
	//white - 0, yellow - 1,green - 2,blue - 3,magenta - 4, unownedRoute (black) - 5, unownedTower (grey) - 6
var coloursCD=["#ffffff","#ffff33","#33ff66","#00ccff","#ff66ff","#000000","#cccccc"],
	fieldColoursCD=["none","#ffff99","#66ff99","#00eeff","#ffaaff"],
	towersDOMArray=[ //to select SVG elements
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
	//DOM names of fields
	fieldsDOMArray=[
		"field00", "field01", "field02", "field03", "field04", "field05", 
		"field10", "field11", "field12", "field13", "field14", "field15",
		"field20", "field21", "field22", "field23", "field24", "field25",
		"field30", "field31", "field32", "field33", "field34", "field35",		
		"field40", "field41", "field42", "field43", "field44", "field45",
		"field50", "field51", "field52", "field53", "field54", "field55",
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
		towerOwners;

		
	//FUNCTIONS
	var init,
		randomCDColor,
		initGame,
		keyDown,
		actionValidatorArrows,
		movementCommand,
		selectCommand,
		deselectCommand,
		expandRoute,
		routeIndex,
		constructTower,
		forwardGame,
		forwardConstruction,
		whichFieldsToCheck,
		fieldAquiredCheck,
		updateTimer,
		gameOver;
		
	//DYNAMIC VARIABLES - they change every game
	var isGameOn,
		gameTime,
		timerTick,
		playerColour, //stores player colour
		movementHighlight, //higlights the player's movement
		routesBuildArray, //contains ongoing route building actions
		towersBuildArray, //contains ongoing tower building actions
		currentPosition, //integer
		isCurrentPositionSelected, //boolean, activates different behaviour of arrow buttons
		isBtnSelectFirstPress;//boolean, activates different the behaviour of select button
	
	
	
	//chooses a random color from the coloursCD array
	randomCDColor=function(){
		return Math.floor(Math.random() * 4)+1;
	};
	
	
//initializes the game's welcome screen
init=function() {
	
	//random color index
	var colorIndexName=randomCDColor(),
		colorIndexPlay=(colorIndexName)%4+1,
		colorIndexStats=(colorIndexName+1)%4+1,
		colorIndexExit=(colorIndexName+2)%4+1;	
	
//PlayerName display

	var playerNameBackground=document.getElementById("playerNameBorder");
	playerNameBackground.style.fill=coloursCD[colorIndexName];

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
		btnPart.style.fill=coloursCD[colorIndexPlay];
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
		btnPart.style.fill=coloursCD[colorIndexStats];
	};
	
	btnStats.onmouseout=function(){
		var btnPart=document.getElementById("btnStatsCircle");
		btnPart.style.fill="none";
	};
	

//Exit button set up
	var btnExit=document.getElementById("btnExit");
	
	btnExit.onmouseover=function(){
		var btnPart=document.getElementById("btnExitCircle");
		btnPart.style.fill=coloursCD[colorIndexExit];
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
		
		if(i<49){
			initDOMElements=document.getElementById(towersDOMArray[i]);
			if(!hasClass(initDOMElements,"tower"))addClass(initDOMElements,"tower");
		}
	}
	
	isGameOn=false;
};

//initializes the game
initGame=function(){
	
	//determine the player color - done by server
	playerColour=randomCDColor();
		
	var initDOMElements;
	
	initDOMElements=document.getElementById("playerNameBorderInGame");
	initDOMElements.style.fill=coloursCD[playerColour];
	
	
	//init game related variables
		isCurrentPositionSelected=false;
		isBtnSelectFirstPress=true;
		keyboard={};
		
		//set game timer
		gameTime=60*2;
		//update timer on screen
		updateTimer();
	
	
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
	routesBuildArray=new Array(84); 
	towersBuildArray=new Array(49);
		//init these arrays
		for(var i=0;i<84;i++){
			routeOwners[i]=0;
			routesBuildArray[i]=0;
			if(i<49){
				towerOwners[i]=0;
				towersBuildArray[i]=0;
			}
		}
	
	
	//choose the player base
	if(coloursCD[playerColour]===coloursCD[1]){//yellow
		
		currentPosition=0;
		initDOMElements=document.getElementById(towersDOMArray[currentPosition]);
	}
	else if(coloursCD[playerColour]===coloursCD[2]){//green
		
		currentPosition=42;
		initDOMElements=document.getElementById(towersDOMArray[currentPosition]);
	}
	else if(coloursCD[playerColour]===coloursCD[3]){//blue
		
		currentPosition=6;
		initDOMElements=document.getElementById(towersDOMArray[currentPosition]);
	}
	else if(coloursCD[playerColour]===coloursCD[4]){//magenta
		
		currentPosition=48;
		initDOMElements=document.getElementById(towersDOMArray[currentPosition]);
	}
	initDOMElements.style.stroke=coloursCD[playerColour];//highlight current position
	
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
			
			if(isGameOn)actionValidatorArrows(0);
			
		});
		
		initDOMElements=document.getElementById("btnRightArrow");
		initDOMElements.addEventListener('click', function(){
			
			if(isGameOn)actionValidatorArrows(1);
		});
		
		initDOMElements=document.getElementById("btnDownArrow");
		initDOMElements.addEventListener('click', function(){
			
			if(isGameOn)actionValidatorArrows(2);
		});
		
		initDOMElements=document.getElementById("btnLeftArrow");
		initDOMElements.addEventListener('click', function(){
			
			if(isGameOn)actionValidatorArrows(3);
		});
	
		initDOMElements=document.getElementById("btnSelect");
		initDOMElements.addEventListener('click',function(){
			
			if(isGameOn)selectCommand();
		});
		
	
	
	
	timerTick=setInterval(function(){
		forwardGame();
		//checks for game over
		if(gameTime===0){
			gameOver();
		}
	},1000);
	
	isGameOn=true;
};

	//INGAME FUNCTIONS
	
	/*help for movement
	index:
		- up == 0
		- right == 1
		- down == 2
		- left == 3
	
	*/

	//validates movement and expansion commands
actionValidatorArrows=function(direction){
	//if(existing route)
	if(validMovement[currentPosition][direction]!==0){
		//change behaviour depending on is the currentPosition selected or not
			//the route is in the players possession and the current tower isn't selected --> move the player
		if(routeOwners[routesFromTowers[currentPosition][direction]]===playerColour && !isCurrentPositionSelected) movementCommand(direction);
			//the route isn't in the player's possession and the current tower is selected --> construct a route
		else if(routeOwners[routesFromTowers[currentPosition][direction]]!==playerColour && isCurrentPositionSelected) expandRoute(direction);
	};
};
	
movementCommand=function(direction){
	
	movementHighlight=document.getElementById(towersDOMArray[currentPosition]);
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
	movementHighlight=document.getElementById(towersDOMArray[currentPosition]);
	movementHighlight.style.stroke=coloursCD[playerColour];
};


selectCommand=function(){
	
	var btnSelectCircle=document.getElementById("btnSelectCircle");
	
	//different action on first/second press
	if(isBtnSelectFirstPress){
			
		if(towerOwners[currentPosition]===playerColour){
			isCurrentPositionSelected=true;//make the current position selected
			isBtnSelectFirstPress=false;
			btnSelectCircle.style.fill=coloursCD[playerColour]; //colour the select button to highlight position selection
		}
		else constructTower();
		
	} 
	else{
		deselectCommand();
	} 
};

deselectCommand=function(){
	//second press of select/expansion action deselects the select button
	isCurrentPositionSelected=false;
	isBtnSelectFirstPress=true;
	btnSelectCircle.style.fill=coloursCD[0];
};
	
	//construct a route in the given direction
expandRoute=function(direction){
	
	//get the index of the route
	routeIndex = routesFromTowers[currentPosition][direction];
	
	//construct only if no expansion of that route is started
	if(routesBuildArray[routeIndex]==0){
		//get the route in the document
		var route=document.getElementById(routesDOMArray[routeIndex]);
		
		//routeOwning will happen at the end of transition
			//add the counter to the building tracking array
		routesBuildArray[routeIndex]=1+5;
		
		/*
		2 separate action
			- build a route
			- destroy an enemies route
		*/
		if(routeOwners[routeIndex]==0){
			route.style['stroke-width']="5px";
			route.style.stroke=coloursCD[playerColour];
		}
		else{
			route.style['stroke-width']="1px";
			route.style.stroke=coloursCD[5];
		}
	}
	
	deselectCommand();
};

constructTower=function(){
	
	if(towersBuildArray[currentPosition]==0){
		
		var tower=document.getElementById(towersDOMArray[currentPosition]);
		
		//towerOwning will happen at the end of transition
			//add the counter to the building tracking array
		towersBuildArray[currentPosition]=1+5;
		
		/*
		2 separate action
			- build a tower
			- destroy an enemies tower
		*/
		if(towerOwners[currentPosition]==0){
			tower.style.fill=coloursCD[playerColour];
		}
		else{
			tower.style.stroke=coloursCD[6];
		}
	}
};


forwardGame=function(){
	//decrease gameTime
	gameTime--;
	
	//updates timer
	updateTimer();
	
	//forward constructions
	forwardConstruction(routesBuildArray,true);
	forwardConstruction(towersBuildArray,false);
	
	
};

forwardConstruction=function(buildArray,isRoute){
	
	//look at all currently builded elements
	for(var i=0;i<buildArray.length;i++){
		
		//if 1 --> construction complete
		if(buildArray[i] == 1){
			
			//now the builder owns the structure
			if(isRoute){
				
				//build the route (the builder now owns it)
				routeOwners[i] = playerColour;
				
				//check if a field is got occupied in the process
				if(i<42) {
					
					if(parseInt(i/6) === 0) fieldAquiredCheck(false,false,false,true,(i + i%6 +1));
					else if(parseInt(i/6) === 5) fieldAquiredCheck(true,false,false,false,(i + i%6 +1));
					else fieldAquiredCheck(true,false,false,true,(i + i%6 +1));
				}
				else {
					
					if(i%7 === 0) fieldAquiredCheck(false,true,false,false,(i - 42));
					else if(i%7 === 6) fieldAquiredCheck(true,false,false,false,(i - 42));
					else fieldAquiredCheck(true,true,false,false,(i - 42));
				}
				
			} 
			else{
				
				var towerRow = parseInt(i/7),
					towerColumn = i%7;
				
				//build the tower (the builder now owns it)
				towerOwners[i] = playerColour;
				
				//check if a field is got occupied in the process
					//distinguis between special cases and the general one
					 if(towerRow === 0 					&& towerColumn === 0)					fieldAquiredCheck(true,false,false,false,i);
				else if(towerRow === 0 					&& (towerColumn > 0 && towerColumn < 6))fieldAquiredCheck(true,true,false,false,i);
				else if(towerRow === 0 					&& towerColumn === 6)					fieldAquiredCheck(false,true,false,false,i);
				else if((towerRow > 0 && towerRow < 6) 	&& towerColumn === 6)					fieldAquiredCheck(false,true,true,false,i);
				else if(towerRow === 6 					&& towerColumn === 6)					fieldAquiredCheck(false,false,true,false,i);
				else if(towerRow === 6 					&& (towerColumn > 0 && towerColumn < 6))fieldAquiredCheck(false,false,true,true,i);
				else if(towerRow === 6 					&& towerColumn === 0)					fieldAquiredCheck(false,false,false,true,i);
				else if((towerRow > 0 && towerRow < 6) 	&& towerColumn === 0)					fieldAquiredCheck(true,false,false,true,i);
				else																		fieldAquiredCheck(true,true,true,true,i);
				
			} 
			
			buildArray[i] = 0;//no construction on this route
		}
		else if(buildArray[i]!=0) buildArray[i]--; //forward the construction
	}
};


whichFieldsToCheck=function(isRoute,indexInOwnerArray){
	
	
};

fieldAquiredCheck=function(northWest,northEast,southEast,southWest,towerIndexInOwnerArray){
	
	var towersRow = parseInt(towerIndexInOwnerArray / 7),
		towersColumn = towerIndexInOwnerArray % 7;
	
	/*TEST: DOES FIELD OCCUPATION WORKS?
	if(northWest &&  towerIndexInOwnerArray==8){
		console.log("towerIndexInOwnerArray: "+towerIndexInOwnerArray);
		console.log("towersRow: "+towersRow);
		console.log("towersColumn: "+towersColumn);
		console.log("directions: NW:"+northWest+", NE:"+northEast+", SE:"+southEast+", SW:"+southWest);
		
		console.log("towerOwners[towerIndexInOwnerArray]: "+towerOwners[towerIndexInOwnerArray]);
		console.log("towerOwners[towerIndexInOwnerArray-1]: "+towerOwners[towerIndexInOwnerArray-1]);
		console.log("towerOwners[towerIndexInOwnerArray-7]: "+towerOwners[towerIndexInOwnerArray-7]);
		console.log("towerOwners[towerIndexInOwnerArray-7-1]: "+towerOwners[towerIndexInOwnerArray-7-1]);
		
		console.log("routeOwners[towerIndexInOwnerArray - (towersRow + 1)]: "+routeOwners[towerIndexInOwnerArray - (towersRow + 1)]);
		console.log("routeOwners[towerIndexInOwnerArray - (towersRow + 1)-6]: "+routeOwners[towerIndexInOwnerArray - (towersRow + 1)-6]);
		console.log("routeOwners[42 + ((towersRow - 1) * 7) + towersColumn]: "+routeOwners[42 + ((towersRow - 1) * 7) + towersColumn]);
		console.log("routeOwners[42 + ((towersRow - 1) * 7) + towersColumn - 1]: "+routeOwners[42 + ((towersRow - 1) * 7) + towersColumn-1]);
	}*/
	
	//northWest field from the built tower
	if(northWest &&
			//the player owns the necessary towers
			towerOwners[towerIndexInOwnerArray]			== playerColour &&
			towerOwners[towerIndexInOwnerArray - 1]		== playerColour &&
			towerOwners[towerIndexInOwnerArray - 7]		== playerColour &&
			towerOwners[towerIndexInOwnerArray - 7 - 1]	== playerColour &&
			//and the routes to own the field
			routeOwners[towerIndexInOwnerArray - (towersRow + 1)]		== playerColour &&
			routeOwners[towerIndexInOwnerArray - (towersRow + 1) - 6]	== playerColour &&
			routeOwners[42 + ((towersRow - 1) * 7) + towersColumn]		== playerColour &&
			routeOwners[42 + ((towersRow - 1) * 7) + towersColumn - 1]	== playerColour){
		
		console.log("Field occupied: NW "+fieldsDOMArray[((towersRow - 1) * 6) + towersColumn - 1]);
		var field=document.getElementById(fieldsDOMArray[((towersRow - 1) * 6) + towersColumn - 1]);
		field.style.fill=fieldColoursCD[playerColour];
	}
	//northEast field from the built tower
	if(northEast &&
			towerOwners[towerIndexInOwnerArray]			== playerColour &&
			towerOwners[towerIndexInOwnerArray + 1]		== playerColour &&
			towerOwners[towerIndexInOwnerArray - 7]		== playerColour &&
			towerOwners[(towerIndexInOwnerArray - 7) + 1]	== playerColour &&
			routeOwners[towerIndexInOwnerArray - (towersRow)]		==	playerColour &&
			routeOwners[(towerIndexInOwnerArray - (towersRow)) - 6]	==	playerColour &&
			routeOwners[42 + ((towersRow - 1) * 7) + towersColumn]		==	playerColour &&
			routeOwners[42 + ((towersRow - 1) * 7) + towersColumn + 1]	==	playerColour){
		
		console.log("Field occupied: NE "+fieldsDOMArray[((towersRow - 1) * 6) + towersColumn]);
		var field=document.getElementById(fieldsDOMArray[((towersRow - 1) * 6) + towersColumn]);
		field.style.fill=fieldColoursCD[playerColour];
	}
	//southEast field from the built tower
	if(southEast &&
			towerOwners[towerIndexInOwnerArray]			== playerColour &&
			towerOwners[towerIndexInOwnerArray + 1]		== playerColour &&
			towerOwners[towerIndexInOwnerArray + 7]		== playerColour &&
			towerOwners[(towerIndexInOwnerArray + 7) + 1]	== playerColour &&
			routeOwners[towerIndexInOwnerArray - (towersRow)]		==	playerColour &&
			routeOwners[(towerIndexInOwnerArray - (towersRow)) + 6]	==	playerColour &&
			routeOwners[42 + ((towersRow) * 7) + towersColumn]		==	playerColour &&
			routeOwners[42 + ((towersRow) * 7) + towersColumn + 1]	==	playerColour){
		
		console.log("Field occupied: SE "+fieldsDOMArray[(towersRow * 6) + towersColumn]);
		var field=document.getElementById(fieldsDOMArray[(towersRow * 6) + towersColumn]);
		field.style.fill=fieldColoursCD[playerColour];
	}
	//southWest field from the built tower
	if(southWest &&
			towerOwners[towerIndexInOwnerArray]			== playerColour &&
			towerOwners[towerIndexInOwnerArray - 1]		== playerColour &&
			towerOwners[towerIndexInOwnerArray + 7]		== playerColour &&
			towerOwners[towerIndexInOwnerArray + 7 - 1]	== playerColour &&
			routeOwners[towerIndexInOwnerArray - (towersRow + 1)]		==	playerColour &&
			routeOwners[towerIndexInOwnerArray - (towersRow + 1) + 6]	==	playerColour &&
			routeOwners[42 + ((towersRow) * 7) + towersColumn]		==	playerColour &&
			routeOwners[42 + ((towersRow) * 7) + towersColumn - 1]	==	playerColour){
		
		console.log("Field occupied: SW "+fieldsDOMArray[(towersRow * 6) + towersColumn-1]);
		var field=document.getElementById(fieldsDOMArray[(towersRow * 6) + towersColumn - 1]);
		field.style.fill=fieldColoursCD[playerColour];
	}
};

updateTimer=function(){
	//update timer on screen
	var timer=document.getElementById("txtContentTimer");
	
	//construct the diisplayed time
	var time="",minutes=String(parseInt(gameTime/60)),seconds=String(gameTime%60);
	
	if(minutes<10) time+="0"+minutes;
	else  time+=minutes;
	
	time+=":"
	
	if(seconds<10) time+="0"+seconds;
	else  time+= seconds;
	
	timer.innerHTML=time;
};

gameOver=function(){
	
	isGameOn=false;
	
	clearInterval(timerTick);
	
	//reset the board
		//hide unnecessary elements
	var afterGame=document.getElementById("inGame");
		afterGame.style.display="none";
		afterGame=document.getElementById("territoryFields");
		afterGame.style.display="none";
		afterGame=document.getElementById("routes");
		afterGame.style.display="none";
		afterGame=document.getElementById("basesAndTowers");
		afterGame.style.display="none";
		
		//reset the board colours
	for(var i=0;i<84;i++){
		afterGame=document.getElementById(routesDOMArray[i]);
		afterGame.style['stroke-width']="1px";
		afterGame.style.stroke=coloursCD[5];
		if(i<49){
			afterGame=document.getElementById(towersDOMArray[i]);
			afterGame.style.fill=coloursCD[6];
			afterGame.style.stroke=coloursCD[5];
		}
		if(i<36){
			afterGame=document.getElementById(fieldsDOMArray[i]);
			afterGame.style.fill=fieldColoursCD[0];
		}
		
		if(i===0) afterGame.style.fill=coloursCD[1];
		if(i===6) afterGame.style.fill=coloursCD[3];
		if(i===42) afterGame.style.fill=coloursCD[2];
		if(i===48) afterGame.style.fill=coloursCD[4];
	}
};

keyDown=function(event){
	if(isGameOn){
		if (event.keyCode==37) { //left arrow key
		actionValidatorArrows(3);
		}
		if (event.keyCode==39) { //right arrow key		
			actionValidatorArrows(1);
		}	
		if (event.keyCode==38){ // up arrow key	
			actionValidatorArrows(0);
		}
		if (event.keyCode==40){ // down arrow key
			actionValidatorArrows(2);
		}
		if(event.keyCode==32){//space key
			selectCommand();
		}
	}
};

document.addEventListener('keydown', keyDown);