//Things to tell the player (that are secret from other players):

//RNG Seed
//Role
//Health
//Ammunition
//Gold

//Things to tell the game (selected by the player)

//Randomizer
//Chosen Action
//Dummy

var players = [];

function newPlayer(playerNum)
{
	var randomLetterFromPlayerNum = randomLetterIndexes[playerNum]; //Give each player a distinct random letter
	var roleIndex = charToNum(randomLetterFromPlayerNum);
	var roleName = roles[roleIndex];
	return {
		role: roleName,
		health: 3,
		ammo: 1,
		gold: 0
	}
}

function numToChar(number)
{
	return letterIndexes[number];
}

function charToNum(char)
{
	return letterIndexes.indexOf(char);
}

function generatePlayerString_Out(player)
{
	var randInt = Math.floor(Math.random()*26);
	var randIntChar = letterIndexes[randInt];
	
	//Health: 0 - 3
	//Ammo: 0 - 4
	var healthAmmoNum = player.ammo*5 + player.health + randInt;
	if (healthAmmoNum > 25)
	{
		healthAmmoNum -= 26;
	}
	var healthAmmoChar = numToChar(healthAmmoNum);
	
	//Role: 0-25
	var roleNum = roles.indexOf(player.role) + randInt;
	if (roleNum > 25)
	{
		roleNum -= 26;
	}
	var roleChar = numToChar(roleNum);
	
	//Gold: 0 - 25
	var goldNum = player.gold + randInt;
	if (goldNum > 25)
	{
		goldNum -= 26;
	}
	var goldChar = numToChar(goldNum);
	
	return randIntChar + healthAmmoChar + roleChar + goldChar;
}

function readPlayerString_Out(playerString)
{
	var offsetNum = charToNum(playerString.substring(0, 1));
	
	var healthAmmoNum = charToNum(playerString.substring(1, 2)) - offsetNum;
	if (healthAmmoNum < 0)
	{
		healthAmmoNum += 26;
	}
	var ammo = Math.floor(healthAmmoNum/5);
	var health = healthAmmoNum%5;
	
	var roleNum = charToNum(playerString.substring(2, 3)) - offsetNum;
	if (roleNum < 0)
	{
		roleNum += 26;
	}
	var role = roles[roleNum];
	
	var goldNum = charToNum(playerString.substring(3, 4)) - offsetNum;
	if (goldNum < 0)
	{
		goldNum += 26;
	}
	
	return {
		role: role,
		health: health,
		ammo: ammo,
		gold: goldNum
	};
}