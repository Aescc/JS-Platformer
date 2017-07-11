// Strings
const version = "v2.0.0";

// Numbers
const gravity = 1;

// Booleans
const isFunny = false;

// Arrays
var groundMap = [];

// Objects
var calc = new Calc();
var gfx = new Graphics();
var kbd = new Keyboard();
var ms = new Mouse();
//
var player = new Player( gravity );

window.onload = function()
{
	const fps = 30;
	setInterval( function()
	{
		Update();
		Draw();
	},1000 / fps );
	Init();
};

function Init()
{
	// Initialize things here.
	kbd.Init();
	ms.Init( gfx.canvas );
	gfx.SetSmoothing( true ); // Set false for pixel art.
	document.getElementsByTagName( "title" )[0].innerHTML = "JSJ Framework " + version;
	
	for( var i = 0; i < gfx.SCREEN_HEIGHT / 50; ++i )
	{
		groundMap[i] = [];
		for( var j = 0; j < gfx.SCREEN_WIDTH / 50; ++j )
		{
			groundMap[i][j] = calc.Random( 0,1 );
		}
	}
	
	console.log( "JSJ Framework version " + version + " has been loaded successfully!" );
}

function Update()
{
	// Update things here.
	player.Update();
	// for( var i = 0; i < plats.length; ++i )
	{
		
	}
}

function Draw()
{
	gfx.Rect( 0,0,gfx.SCREEN_WIDTH,gfx.SCREEN_HEIGHT,"#000" );
	// Draw things here.
	player.Draw();
}
