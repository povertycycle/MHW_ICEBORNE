var BODY = document.getElementById("")
var DROP_DOWN_MENU = document.getElementById("dropDownMenu");
var DIV_WEAPON_LIST = document.getElementById("weaponList");
var DIV_MONSTER_LIST = document.getElementById("monsterList");
var DIV_ITEM_LIST = document.getElementById("itemList");
var WEAPON_LIST_DISPLAY = document.getElementById("weaponListDisplay");
var DISPLAY_DETAILS = document.getElementById("displayDetails");
var WEAPON_PROPERTIES = document.getElementById("weaponProperties");
var WEAPON_IMAGE = document.getElementById("weaponImage");
var WEAPON_NAME = document.getElementById("weaponName");
var WEAPON_ICON = document.getElementById("weaponIcon");
var WEAPON_RARITY = document.getElementById("weaponRarity");
var WEAPON_ATTACK = document.getElementById("weaponAttack");
var WEAPON_SHARPNESS = document.getElementById("weaponSharpness");
var WEAPON_AFFINITY = document.getElementById("weaponAffinity");
var WEAPON_ELEMENT = document.getElementById("weaponAElement");
var WEAPON_SLOT = document.getElementById("weaponSlot");
var WEAPON_ELDERSEAL = document.getElementById("weaponElderseal");
var WEAPON_DEFENCE = document.getElementById("weaponDefence");
var DIV_SHARPNESS = document.getElementById("sharpness");

var DROP_DOWN_TAB_HEIGHT = 25;
var DROP_DOWN_MENU_WIDTH = 150;
var DROP_DOWN_MENU_HEIGHT = 40;
var BORDER_RADIUS = 1;
var GAP_WIDTH = 5;
var SMALL_ICON = 25;
var ICON_GAP = 75;
var ICON_GAP_HEIGHT = 45;
var PROPERTIES_WIDTH = 200;
var PROPERTIES_HEIGHT;
var WEAPON_NAME_HEIGHT = 25;
var TEXT_SIZE = 14;
var PROPERTIES_SECTION_HEIGHT = 20;

var DEFAULT_BACKGROUND_COLOR = "#191919";
var WEAPON_LIST_PATH = "static/weapons/weapons.json";

var WEAPON_TYPES = 
[
    "great-sword",
    "long-sword",
    "sword-and-shield",
    "dual-blades",
    "hammer",
    "hunting-horn",
    "lance",
    "gunlance", 
    "switch-axe",
    "charge-blade",
    "insect-glaive",
    "light-bowgun",
    "heavy-bowgun",
    "bow"
]

var WEAPON_LIST = 
{
    "great-sword": [],
    "long-sword": [],
    "sword-and-shield": [],
    "dual-blades": [],
    "hammer": [],
    "hunting-horn": [],
    "lance": [],
    "gunlance": [], 
    "switch-axe": [],
    "charge-blade": [],
    "insect-glaive": [],
    "light-bowgun": [],
    "heavy-bowgun": [],
    "bow": []
};

var RARITY_COLOR = 
{
    1: "white",
    2: "white",
    3: "yellow",
    4: "green",
    5: "light blue",
    6: "blue",
    7: "purple",
    8: "orange"
}