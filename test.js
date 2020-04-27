function testPlayerStrings()
{
	var stopLoop = false;
	for (let g = 0; g < 26; g++)
	{
		if (stopLoop) {break;}
		for (let r = 0; r < roles.length; r++)
		{
			if (stopLoop) {break;}
			for (let h = 0; h < 4; h++)
			{
				if (stopLoop) {break;}
				for (let a = 0; a < 5; a++)
				{
					if (stopLoop) {break;}
					
					var player_in = {health: h, ammo: a, role: roles[r], gold: g};
					var playerString = generatePlayerString_Out(player_in);
					var player_out = readPlayerString_Out(playerString);
					if ((player_out.health != player_in.health) 
						|| (player_out.ammo != player_in.ammo)
						|| (player_out.role != player_in.role)
						|| (player_out.gold != player_in.gold))
					{
						console.log("IN/OUT: " + player_in.health + " / " + player_out.health + ", " + player_in.ammo + " / " + player_out.ammo + ", " + player_in.role + " / " + player_out.role + ", " + player_in.gold + " / " + player_out.gold);
						stopLoop = true;
					}
				}
			}
		}
	}
}

function testPlayerString()
{
	var player_in = {health: 0, ammo: 0, role: "RoleTwentySix", gold: 0};
	var playerString = generatePlayerString_Out(player_in);
	readPlayerString_Out(playerString);
}