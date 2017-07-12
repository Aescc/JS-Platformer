// Strings
const version = "v2.0.0";

// Numbers
const gravity = 1;

// Booleans
const isFunny = false;

// Arrays
var plats = [];
var pBullets = [];

// Objects
var calc = new Calc();
var gfx = new Graphics();
var kbd = new Keyboard();
var ms = new Mouse();
//
var player = new Player( gravity );

window.onload = function()
{
	const fps = 60;
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
	{
		plats[0] = new Platform( 0,gfx.SCREEN_HEIGHT - 50,gfx.SCREEN_WIDTH,50 )
	}
	
	for( var i = 0; i < 10; ++i ) // i must be odd.
		pBullets[i] = new PlayerBullet();
	
	console.log( "JSJ Framework version " + version + " has been loaded successfully!" );
}

function Update()
{
	// Update things here.
	player.Update();
	for( var i = 0; i < plats.length; ++i )
	{
		while( player.HitTestBot( plats[i].GetPos().x,plats[i].GetPos().y,
			plats[i].GetPos().w,plats[i].GetPos().h ) )
		{
			player.Move( 0,-1 );
			player.Land();
		}
	}
	for( var i = 0; i < pBullets.length; ++i )
		pBullets[i].Update();
}

function Draw()
{
	gfx.Rect( 0,0,gfx.SCREEN_WIDTH,gfx.SCREEN_HEIGHT,"#000" );
	// Draw things here.
	for( var i = 0; i < plats.length; ++i )
		plats[i].Draw();
	for( var i = 0; i < pBullets.length; ++i )
		pBullets[i].Draw();
	player.Draw();
}

function MoveAll( xMove,yMove )
{
	for( var i = 0; i < plats.length; ++i )
		plats[i].Move( xMove,yMove );
	for( var i = 0; i < pBullets.length; ++i )
		pBullets[i].Move( xMove,yMove );
}
