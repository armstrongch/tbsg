var letterIndexes = [];

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
		
		var player = readPlayerString_Out(codeString.toUpperCase());
		$('#playerInfo').html("Role: " + player.role + "<br/>Health: " + player.health + "<br/>Ammo: " + player.ammo + "<br/>Gold: " + player.gold);
	}
}