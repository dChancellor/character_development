//Wish List: 
//Make Sidebar hide if clicking same element as the one loaded on sidebar?
//Encumberance Sidebar shows list of items listed by descending weight
//Add additional effects from exhaustion to other fields (minus to saving throws / death / etc)

// Defining all sidebar activating classes under one variable ------->
// var elecl = document.getElementsByClassName('js-open-rip'); 


var IdFromHTML; // Variable for different ID Outputs from click
var SidebarClasses = '.js-open-rip'; //Variable for divs that open sidebar
var HealthChangeClasses = 'heal';
var AbilityScoreShorthandDefinitions = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];
var SkillShorthandDefinitions = ["acrobatics", "animalhandling", "arcana", "deception", "history", "insight", "intimidation", "investigation", "medicine", "nature", "perception", "performance", "persuasion", "religion", "sleightofhand", "stealth", "survival"]
var CharID = 3;

function TEMPcharacterSelector(buttonCharacterSelector){
	CharID = buttonCharacterSelector;
	buildCharacter();
}

// Initial Functions Upon Loading
window.onload=function(){	
	buildCharacter();	
	document.body.addEventListener('click', toggleNav); // Listener to toggle sidebar	
}
// Build Character Stat Variables
function buildCharacter() {
	abilityScoreModifierCalculator(); //Build Ability Score Modifiers
	speedCalculator(); // Add "Speed" to Currently loaded Character ID Array
	xpToLevelCalculator();
	proficiencyCalculator(); // Proficiency Bonus / Level Calculator
	inspirationLoader(); //Is Character Inspired Checkbox Function
	encumberanceCalculator();	
	savingThrowCalculator();
	loadCharacter();	
}
// Calculate Modifiers off of Character Stat Array
function abilityScoreModifierCalculator(){
	characterList[CharID].AbilityScoreModifiers = [];
	for(i=0; i < characterList[CharID].StatLine.length; i++){		
		switch(characterList[CharID].StatLine[i]) {
			case 1:
				characterList[CharID].AbilityScoreModifiers[i] = (-5);
				break;
			case 2:
			case 3:
				characterList[CharID].AbilityScoreModifiers[i] = (-4);
				break;
			case 4:
			case 5:				
				characterList[CharID].AbilityScoreModifiers[i] = (-3);
				break;		
			case 6:
			case 7:
				characterList[CharID].AbilityScoreModifiers[i] = (-2);
				break;		
			case 8:
			case 9:
				characterList[CharID].AbilityScoreModifiers[i] = (-1);
				break;		
			case 10:
			case 11:
				characterList[CharID].AbilityScoreModifiers[i] = (0);
				break;		
			case 12:
			case 13:
				characterList[CharID].AbilityScoreModifiers[i] = "+" + (1);
				break;		
			case 14:
			case 15:
				characterList[CharID].AbilityScoreModifiers[i] = "+" + (2);
				break;
			case 16:
			case 17:
				characterList[CharID].AbilityScoreModifiers[i] = "+" + (3);
				break;
			case 18:
			case 19:
				characterList[CharID].AbilityScoreModifiers[i] = "+" + (4);
				break;
			case 20:
			case 21:
				characterList[CharID].AbilityScoreModifiers[i] = "+" + (5);
				break;
			case 22:
			case 23:
				characterList[CharID].AbilityScoreModifiers[i] = "+" + (6);
				break;
			case 24:
			case 25:
				characterList[CharID].AbilityScoreModifiers[i] = "+" + (7);
				break;
			case 26:
			case 27:
				characterList[CharID].AbilityScoreModifiers[i] = "+" + (8);
				break;
			case 28:
			case 29:
				characterList[CharID].AbilityScoreModifiers[i] = "+" + (9);
				break;
			case 30:
				characterList[CharID].AbilityScoreModifiers[i] = "+" + (10);
				break;			
		}
	}
}
function abilityScoreModifierLoader(){
	for(i=0; i<AbilityScoreShorthandDefinitions.length; i++){		
		document.getElementById(AbilityScoreShorthandDefinitions[i] + "-statbox-modifier-score").innerHTML = characterList[CharID].AbilityScoreModifiers[i];			
		document.getElementById(AbilityScoreShorthandDefinitions[i]+ "-statbox-rawscore").innerHTML = characterList[CharID].StatLine[i];
	}
}
function speedCalculator(){	
	characterList[CharID].Speed = races[characterList[CharID].Race].Speed;
}
function speedLoader(){
	document.getElementById("speed-statbox-score").innerHTML = characterList[CharID].Speed;
}
// Calculate Current Level From XP Total
function xpToLevelCalculator(){
	var i = characterList[CharID].CurrentXP;
	characterList[CharID].Level = i >=355000 ? 20 : i >= 305000 ? 19 : i >= 265000 ? 18 : i >= 225000 ? 17 : i >=195000 ? 16 : i >= 165000 ? 15 : i >= 140000 ? 14 : i >= 120000 ? 13 : i >= 100000 ? 12 : i >= 85000 ? 11 : i >= 64000 ? 10 : i >= 48000 ? 9 : i >= 34000 ? 8 : i >= 23000 ? 7 : i >= 14000 ? 6 : i >= 6500 ? 5 : i >= 2700 ? 4 : i >= 900 ? 3 : i >= 300 ? 2 : i >= 0 ? 1 : "Your Level Calc is Fucked Up";	
}
// Calculate Proficiency Bonus By Level
function proficiencyCalculator() {
	switch(characterList[CharID].Level){
		case 1:
		case 2:
		case 3:
		case 4:
			characterList[CharID].ProficiencyBonus = 2;
			break;
		case 5:
		case 6:
		case 7:
		case 8:
			characterList[CharID].ProficiencyBonus = 3;
			break;
		case 9:
		case 10:
		case 11:
		case 12:
			characterList[CharID].ProficiencyBonus = 4;
			break;
		case 13:
		case 14:
		case 15:
		case 16:
			characterList[CharID].ProficiencyBonus = 5;
			break;
		case 17:
		case 18:
		case 19:
		case 20:
			characterList[CharID].ProficiencyBonus = 6;
			break;
		
	}
}
function proficiencyLoader(){
	document.getElementById("proficiency-statbox-score").innerHTML = "+" + characterList[CharID].ProficiencyBonus;
}
//Does Character Have Inspiration Checkbox Function
function inspirationLoader() {
	if (characterList[CharID].Inspiration === "yes"){
		document.getElementById("inspiration-statbox-checkyes").style.backgroundColor  = "#b5b5b5";
	}else{
		document.getElementById("inspiration-statbox-checkyes").style.backgroundColor  = "transparent";
		
	}
}
// Calculating Health Functions
function healthCalculator(HealthOrDamage){
	characterList[CharID].CurrentHealth = characterList[CharID].CurrentHealth * 1; //Converting Character's Current Health to Variable
	var healthChange = document.getElementById("health-input").value * 1; //Converting Input String to Variable
	if (HealthOrDamage === "heal"){		
		characterList[CharID].CurrentHealth = characterList[CharID].CurrentHealth + healthChange;
	} else if (HealthOrDamage === "damage"){
		if (healthChange > characterList[CharID].TempHealth){
			healthChange = healthChange - characterList[CharID].TempHealth;
			characterList[CharID].TempHealth = 0;
			characterList[CharID].CurrentHealth = characterList[CharID].CurrentHealth - healthChange;			
		} else {
			characterList[CharID].TempHealth = characterList[CharID].TempHealth - healthChange;
		}		
	}
	// Setting Max and Min Health Values
	if (characterList[CharID].CurrentHealth > characterList[CharID].MaxHealth) {
		characterList[CharID].CurrentHealth = characterList[CharID].MaxHealth;
	} else if (characterList[CharID].CurrentHealth < 0) {
		characterList[CharID].CurrentHealth = 0;
	}
	document.getElementById("health-input").value = ""; //Resetting Input Field to Empty
	healthLoader();
}
function tempHealthCalculator(){
	characterList[CharID].TempHealth = (document.getElementById("health-statbox-temphp-input").value);
	healthLoader();
}
// Load Health Counters
function healthLoader() {
	document.getElementById("health-statbox-currenthp").innerHTML = characterList[CharID].CurrentHealth;
	document.getElementById("health-statbox-maxhp").innerHTML = characterList[CharID].MaxHealth;
	// Danger Health Color Change
	if ((characterList[CharID].CurrentHealth / characterList[CharID].MaxHealth) < .25){
		document.getElementById("health-statbox-currenthp").style.color = "red";
	}else{
		document.getElementById("health-statbox-currenthp").style.color = "#242528";
	}
	// Hide Temp HP if at 0
	if (characterList[CharID].TempHealth > 0) {
		document.getElementById("health-statbox-temphp-input").value = characterList[CharID].TempHealth;
	} else {
		document.getElementById("health-statbox-temphp-input").value = '';
	}
}
// Calculate Exhaustion Level from Buttons and then run negative detriments
function exhaustionCalculator(ExhaustionButton){
	characterList[CharID].ExhaustionLevel = characterList[CharID].ExhaustionLevel * 1; //Converting String to Variable
	if ((ExhaustionButton === "add") && (characterList[CharID].ExhaustionLevel < 6)) {
		characterList[CharID].ExhaustionLevel = characterList[CharID].ExhaustionLevel + 1;
	} else if ((ExhaustionButton === "subtract") && (characterList[CharID].ExhaustionLevel > 0)) {
		characterList[CharID].ExhaustionLevel = characterList[CharID].ExhaustionLevel - 1;
	}
	exhaustionLoader();
}
// Change Exhaustion Bar Fill
function exhaustionLoader () {
	switch(characterList[CharID].ExhaustionLevel){
		case 0:
			document.getElementById("exhaustion-bar-full").style.width = "0%";
			break;
		case 1:
			document.getElementById("exhaustion-bar-full").style.width = "16.6%";
			break;
		case 2:
			document.getElementById("exhaustion-bar-full").style.width = "33.3%";
			break;
		case 3:
			document.getElementById("exhaustion-bar-full").style.width = "50%";
			break;
		case 4:
			document.getElementById("exhaustion-bar-full").style.width = "66.6%";
			break;
		case 5:
			document.getElementById("exhaustion-bar-full").style.width = "83.3%";
			break;
		case 6:
			document.getElementById("exhaustion-bar-full").style.width = "100%";
			break;
	}
}
// Calculate Encumberance from CurrentItems
function encumberanceCalculator (){
	characterList[CharID].MaxWeight = 15 * characterList[CharID].StatLine[0];
	characterList[CharID].CurrentItemWeight = 0;
	for(i=0; i<(Object.keys(characterList[CharID].CurrentItems).length); i++){
		characterList[CharID].CurrentItems[i].Weight = characterList[CharID].CurrentItems[i].Weight * 1;
		characterList[CharID].CurrentItemWeight = characterList[CharID].CurrentItemWeight + characterList[CharID].CurrentItems[i].Weight;
	}
	encumberanceLoader();
}
// Change Encumberance Bar Fill
function encumberanceLoader (){
	var encumberanceTotal = characterList[CharID].CurrentItemWeight / characterList[CharID].MaxWeight;
	if (encumberanceTotal < 1){
		document.getElementById("encumberance-bar-full").style.width = encumberanceTotal * 100 + '%';
	} else {
		document.getElementById("encumberance-bar-full").style.width = 100 + '%';
	}
}
function savingThrowCalculator(){
	characterList[CharID].SavingThrows = [];
	for(i=0; i < characterList[CharID].StatLine.length; i++){		
		characterList[CharID].SavingThrows[i] = characterList[CharID].AbilityScoreModifiers[i];
	}
}
function savingThrowLoader(){
	for(i=0; i < AbilityScoreShorthandDefinitions.length; i++){		
		document.getElementById("savingthrows-" + AbilityScoreShorthandDefinitions[i] + "-modifier").innerHTML = characterList[CharID].SavingThrows[i];
	}
}
function sensesLoader(){
	document.getElementById("senses-perception-modifier").innerHTML = 10 + (document.getElementById("skills-perception-bonus").innerHTML * 1);
	document.getElementById("senses-investigation-modifier").innerHTML = 10 + (document.getElementById("skills-investigation-bonus").innerHTML * 1);
	document.getElementById("senses-insight-modifier").innerHTML = 10 + (document.getElementById("skills-insight-bonus").innerHTML * 1);
}
function skillLoader(){
	for(i=0; i<SkillShorthandDefinitions.length; i++){
		var modifier = document.getElementById("skills-" + SkillShorthandDefinitions[i] + "-mod").innerHTML;
		switch(modifier){
			case "str":
				document.getElementById("skills-" + SkillShorthandDefinitions[i] + "-bonus").innerHTML = characterList[CharID].AbilityScoreModifiers[0];				
				break;
			case "dex":
				document.getElementById("skills-" + SkillShorthandDefinitions[i] + "-bonus").innerHTML = characterList[CharID].AbilityScoreModifiers[1];
				break;
			case "con":
				document.getElementById("skills-" + SkillShorthandDefinitions[i] + "-bonus").innerHTML = characterList[CharID].AbilityScoreModifiers[2];
				break;
			case "int":
				document.getElementById("skills-" + SkillShorthandDefinitions[i] + "-bonus").innerHTML = characterList[CharID].AbilityScoreModifiers[3];
				break;
			case "wis":
				document.getElementById("skills-" + SkillShorthandDefinitions[i] + "-bonus").innerHTML = characterList[CharID].AbilityScoreModifiers[4];
				break;
			case "cha":
				document.getElementById("skills-" + SkillShorthandDefinitions[i] + "-bonus").innerHTML = characterList[CharID].AbilityScoreModifiers[5];
				break;
		}
	}
}
// Display Character Information in Fields
function loadCharacter() {		
	abilityScoreModifierLoader();
	speedLoader();
	proficiencyLoader();
	healthLoader();
	exhaustionLoader();
	encumberanceLoader();
	savingThrowLoader();	
	skillLoader();
	sensesLoader();
}
// Opening and Closing Sidebar
function toggleNav(ClickEvent) {
	var ClickEventId = event.target.id;
	if (!event.target.matches(SidebarClasses)) {
		document.getElementById("rip-title").style.color = "rgba(0, 0, 0, 0)"; //Text transparent during transition
		document.getElementById("rip-content").style.color = "rgba(0, 0, 0, 0)"; //Text transparent during transition
		document.getElementById("js-rip").style.width = "0";
	}else{
		document.getElementById("rip-title").style.color = "black"; //Show text after transition
		document.getElementById("rip-content").style.color = "black"; //Show text after transition
		document.getElementById("js-rip").style.width = "300px";			
		loadSidebarInfo(ClickEventId);
	}
}
// Choose and Display Sidebar Information
function loadSidebarInfo(ClickEventId){
	for (j=0; j<Object.keys(sidebarInfo).length;j++){	
		var h = ClickEventId.includes(sidebarInfo[j].sidebarID);		
		if (h === true){			
			document.getElementById("rip-title").innerHTML = sidebarInfo[j].FullStatName;
			document.getElementById("rip-content").innerHTML = sidebarInfo[j].content;
			break;
		}
	}
}








function roleplayMenuSelect(roleplaySelect){
	let roleplayTitles = ["character", "items", "spells", "notes"];
	for (i=0; i < roleplayTitles.length; i++){
		if(roleplaySelect === roleplayTitles[i]) {
			document.getElementById("roleplay-"+[roleplaySelect]+"-window").className = "active-inner-window roleplay-inner-window";
			document.getElementById("roleplay-"+[roleplaySelect]+"-menu").className = "roleplay-menu-buttons active-roleplay-topmenu font-internal-title";
		} else {
			document.getElementById("roleplay-"+[roleplayTitles[i]]+"-window").className = "inactive-inner-window roleplay-inner-window";
			document.getElementById("roleplay-"+[roleplayTitles[i]]+"-menu").className = "roleplay-menu-buttons inactive-roleplay-topmenu font-internal-title";
		}
	}
}

function roleplayMeatyWindowSelect(roleplayMeatySelect){
	let roleplayMeatyTitles = ["classfeatures", "racialfeatures", "feats", "background", "characteristics", "appearance", "equipment", "randomitems", "currency", "organizations", "allies", "enemies", "other"];
	for (i=0; i < roleplayMeatyTitles.length; i++){
		if(roleplayMeatySelect === roleplayMeatyTitles[i]) {
			document.getElementById("roleplay-"+[roleplayMeatySelect]+"-window").className = "active-meatywindow";
		} else {
			document.getElementById("roleplay-"+[roleplayMeatyTitles[i]]+"-window").className = "inactive-meatywindow";
		}
	}
}


function swapRightColumn(){
	if(document.getElementById('TEMP-combat-changer').checked == true){
		document.getElementById('roleplay-container').className = "unactive-rightwindow mainpanes-containers mainpanes-rightcolumn-containers";
		document.getElementById('combat-container').className = "active-rightwindow mainpanes-containers mainpanes-rightcolumn-containers";
	} else {
		document.getElementById('roleplay-container').className = "active-rightwindow mainpanes-containers mainpanes-rightcolumn-containers";
		document.getElementById('combat-container').className = "unactive-rightwindow mainpanes-containers mainpanes-rightcolumn-containers";
	}
}






