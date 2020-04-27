var initialActionNames = //In Prioritized Order
[
	"Duck",
	"Defend",
	"ShootGold",
	"ShootHealth",
	"SlapGold",
	"SlapHealth",
	"StealGold",
	"StealAmmo",
	"LocationAction"
];

var actionNames = [];

function setupActionNames()
{
	for (let i = 0; i < initialActionNames.length; i++)
	{
		actionNames.push(initialActionNames[i]);
	}
	for (let i = 0; i < locationNames.length; i++)
	{
		actionNames.push("Move" + locationNames[i]);
	}
}

var actions =
{
	Duck: {
		Name: "Duck and Hide",
		Description: "Avoid getting Shot or Slapped.",
		CostsAmmo: false
	},
	Defend: {
		Name: "Self-Defense",
		Description: "Slap any Player who tries to Rob you (Deals 1 Damage)",
		CostsAmmo: false
	},
	ShootGold: {
		Name: "Shoot the Rich",
		Description: "Shoot the Player in your Location with MOST Gold (Costs 1 Ammo, Deals 2 Damage)",
		CostsAmmo: true
	},
	ShootHealth: {
		Name: "Shoot the Weak",
		Description: "Shoot the Player in your Location with LEAST Health (Costs 1 Ammo, Deals 2 Damage)",
		CostsAmmo: true
	},
	SlapGold: {
		Name: "Slap the Rich",
		Description: "Slap the Player in your Location with MOST Gold (Deals 1 Damage)",
		CostsAmmo: false
	},
	SlapHealth: {
		Name: "Slap the Weak",
		Description: "Slap the Player in your Location with LEAST Health (Deals 1 Damage)",
		CostsAmmo: false
	},
	StealGold: {
		Name: "Steal Gold",
		Description: "Steal 1 Gold from ALL Players in your Location",
		CostsAmmo: false
	},
	StealAmmo: {
		Name: "Steal Bullets",
		Description: "Steal 1 Ammo from ALL Players in your Location",
		CostsAmmo: false
	},
	LocationAction: {
		Name: "Location Action",
		Description: "Take the Action specific to your current Location",
		CostsAmmo: false
	},
}