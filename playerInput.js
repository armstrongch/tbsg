var letterIndexes = [];
var currentPlayer;

function indexLetters()
{
	var letterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for (let i = 0; i < letterString.length; i++)
	{
		letterIndexes.push(letterString.substring(i, i+1));
	}
}

function validInput(inputString)
{
	var letters = /^[A-Za-z]+$/;
	
	if ((inputString.length != 4) 
		|| (!inputString.match(letters)))
	{
		$('#enterCodeInput').val("");
		$('#invalidP').html("Code should be four letters with no spaces!");
		return false;
	}
	else
	{
		return true;
	}
}

function submitCode()
{
	indexLetters();
	var codeString = $('#enterCodeInput').val();
	if (validInput(codeString))
	{
		$('#inputTurn').addClass('invisible');
		$('#turnDiv').removeClass('invisible');
		
		currentPlayer = readPlayerString_Out(codeString.toUpperCase());
		$('#playerInfo').html("Role: " + currentPlayer.role + "<br/>Health: " + currentPlayer.health + "<br/>Ammo: " + currentPlayer.ammo + "<br/>Gold: " + currentPlayer.gold);
		
		setupActionNames();
		showActions();
	}
}

function showActions()
{
	var actionHTML = "";
	for (let i = 0; i < actionNames.length; i++)
	{
		if (actionNames[i].substring(0,4) == "Move")
		{
			var destination = actionNames[i].substring(4);
			actionHTML += "<p>"
			actionHTML += "<button onclick='generateActionCode(" + actionNames[i] + ")'> Travel to " + destination + "</button>:";
			actionHTML += "Travel to " + destination;
			actionHTML += "</p>"
		}
		else
		{
			var action = actions[actionNames[i]];
			if ((currentPlayer.ammo > 0) || (!action.CostsAmmo))
			{
				actionHTML += "<p>"
				actionHTML += "<button onclick='generateActionCode(\"" + actionNames[i] + "\")'>" + action.Name + "</button>:";
				actionHTML += action.Description;
				actionHTML += "</p>"
			}
		}
	}
	$('#actionDiv').html(actionHTML);
}

function generateTurnString_Out(actionName)
{
	var playerActionString = "";
	var randIntSum = 0;
	var randInt;
	var randIntChar;
	
	for (let i = 0; i < 3; i++)
	{
		randInt = Math.floor(Math.random()*26);
		randIntSum += randInt;
		randIntChar = letterIndexes[randInt];
		playerActionString += randIntChar;
	}
	
	var actionNum = actionNames.indexOf(actionName) + randIntSum;
	while (actionNum > 25)
	{
		actionNum -= 26;
	}
	var actionChar = numToChar(actionNum);
	
	playerActionString += actionChar;
	
	return playerActionString;
}

function readTurnString_Out(turnString)
{
	var offsetNum = 0;
	for (let i = 0; i < 3; i++)
	{
		var randIntChar = turnString.substring(i, i+1);
		offsetNum += charToNum(randIntChar);
	}
	
	var actionChar = turnString.substring(3, 4);
	var actionInt = charToNum(actionChar) - offsetNum;
	while (actionInt < 0)
	{
		actionInt += 26;
	}
	
	return actionNames[actionInt];
}

function generateActionCode(actionName)
{
	$('#turnDiv').addClass('invisible');
	$('#turnOverDiv').removeClass('invisible');
$('#turnOverDiv').html("<p>Turn Code: " + generateTurnString_Out(actionName) + "</p><p><button onclick='reload()'>Next Turn</button></p>");
}

function reload()
{
	location.reload();
}