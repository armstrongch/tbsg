var letterIndexes = [];
var randomLetterIndexes = [];

function loadSetup()
{
	$('#numPlayersInput').val(2);
	randomlyIndexLetters();
	setupActionNames();
}

function randomlyIndexLetters()
{
	var letterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for (let i = 0; i < letterString.length; i++)
	{
		letterIndexes.push(letterString.substring(i, i+1));
		randomLetterIndexes.push(letterString.substring(i, i+1));
	}
	shuffle(randomLetterIndexes);
}

function setupGame()
{
	$('#setupDiv').addClass('invisible');
	$('#playernamesDiv').removeClass('invisible');
		
	var numPlayers = $('#numPlayersInput').val();
	var numPlayersHTML = "";
	for (let i = 0; i < numPlayers; i++)
	{
		numPlayersHTML += "<label for='p" + i + "Name'>Player " + i + " Name: </label>";
		numPlayersHTML += "<input type='text' name='p" + i + "Name' id='p" + i + "nameInput'></input>";
		numPlayersHTML += "<br/>";
		players.push(["Player " + i, newPlayer(i), "Forest"]);
	}
	$('#playernamesDiv').html(numPlayersHTML + $('#playernamesDiv').html());
	for (let i = 0; i < numPlayers; i++)
	{
		$('#p' + i + 'nameInput').val(players[i][0]);
	}
}

function setupNames()
{
	for (let i = 0; i < players.length; i++)
	{
		players[i][0] = $('#p' + i + 'nameInput').val();
	}
	$('#playernamesDiv').addClass('invisible');
	$('#gameStatusDiv').removeClass('invisible');
	$('#gameTurnDiv').removeClass('invisible');
	setupTurn();
}

function printStatus()
{
	var statusHTML = "";
	for (let i = 0; i < locationNames.length; i++)
	{
		statusHTML += "<strong>" + locationNames[i] + ":</strong><br/>";
		statusHTML += locationDescriptions[i] + "<br/>";
		statusHTML += "Occupants: ";
		var occupants = [];
		for (let j = 0; j < players.length; j++)
		{
			if (players[j][2] == locationNames[i])
			{
				occupants.push(players[j][0]);
			}
		}
		if (occupants.length == 0)
		{
			statusHTML += "None";
		}
		else
		{
			for (let j = 0; j < occupants.length; j++)
			{
				statusHTML += occupants[j];
				if (j < occupants.length - 1)
				{
					statusHTML += ", ";
				}
			}
		}
		statusHTML += "<br/><br/>";
	}
	$('#gameStatusDiv').html(statusHTML);
}

function setupTurn()
{
	var turnHTML = "";
	for (let i = 0; i < players.length; i++)
	{
		var playerCode = generatePlayerString_Out(players[i][1]);
		turnHTML += "<label for='p" + i + "TurnCode'>" + players[i][0] + " - " + playerCode + " </label>";
		turnHTML += "<input type='text' name='p" + i + "TurnCode' id='p" + i + "TurnCodeInput'></input>";
		turnHTML += "<br/>";
	}
	turnHTML += "<button id='submitTurnButton' onclick='submitTurn()'>Submit</button><p style='color:red' id='invalidP'></p>";
	$('#gameTurnDiv').html(turnHTML);
	printStatus();
}

function submitTurn()
{
	var allCodesValid = true;
	var turns = [];
	for (let i = 0; i < players.length; i++)
	{
		allCodesValid = validInput($('#p' + i + 'TurnCodeInput').val());
		if (allCodesValid)
		{
			turns.push({playerIndex: i, actionName: readTurnString_Out($('#p' + i + 'TurnCodeInput').val())});
		}
	}
	if (allCodesValid)
	{
		var resltsHTML = "";
		for (let i = 0; i < actionNames.length; i++)
		{
			for (let j = 0; j < turns.length; j++)
			{
				if (turns[j].actionName == actionNames[i])
				{
					resltsHTML += "<p>" + takeAction(turns[j]) + "</p>";
				}
			}
		}
		$('#gameStatusDiv').html("");
		$('#gameTurnDiv').html(resltsHTML);
	}
}

function takeAction(turnArrayEntry)
{
	return players[turnArrayEntry.playerIndex][0] + " took an action.";
}

//From: https://javascript.info/task/shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}