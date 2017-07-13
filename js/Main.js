// Strings
const version = "v2.0.0";

// Numbers
const gravity = 1;

// Booleans
const isFunny = false;

// Arrays
var plats = [];
var pBullets = [];
var enemies = [];
var nodes = [];

// Objects
var calc = new Calc();
var gfx = new Graphics();
var kbd = new Keyboard();
var ms = new Mouse();
//
var player = new Player( gravity );
var pBar = new PowerBar();

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
	var platC = 0;
	var nodeC = 0;
	for( var i = 0; i < map1.length; ++i )
	{
		for( var j = 0; j < map1[i].length; ++j )
		{
			if( map1[i][j] === 1 )
				plats[platC++] = new Platform( j * 50,i * 50,50,50 ); // ++ must be after platC so plats[0] exists.
			else if( map1[i][j] === 2 )
				nodes[nodeC++] = new SpawnNode( j * 50,i * 50 );
		}
	}
	for( var i = 0; i < 5; ++i )
	{
		enemies[i] = new Enemy( gravity );
		enemies[i].SetRandPos();
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
		while( player.HitTest( "Bot",plats[i].GetPos().x,plats[i].GetPos().y,
			plats[i].GetPos().w,plats[i].GetPos().h ) )
		{
			player.Move( 0,-1 );
			player.Land();
		}
		while( player.HitTest( "Top",plats[i].GetPos().x,plats[i].GetPos().y,
			plats[i].GetPos().w,plats[i].GetPos().h ) )
			player.Move( 0,1 );
		while( player.HitTest( "Left",plats[i].GetPos().x,plats[i].GetPos().y,
			plats[i].GetPos().w,plats[i].GetPos().h ) )
			player.Move( 1,0 );
		while( player.HitTest( "Right",plats[i].GetPos().x,plats[i].GetPos().y,
			plats[i].GetPos().w,plats[i].GetPos().h ) )
			player.Move( -1,0 );
		//
		for( var j = 0; j < enemies.length; ++j )
		{
			while( enemies[j].HitTest( "Bot",plats[i].GetPos().x,plats[i].GetPos().y,
				plats[i].GetPos().w,plats[i].GetPos().h ) )
			{
				enemies[j].Move( 0,-1 );
				enemies[j].Land();
			}
			while( enemies[j].HitTest( "Left",plats[i].GetPos().x,plats[i].GetPos().y,
				plats[i].GetPos().w,plats[i].GetPos().h ) )
				enemies[j].Move( 1,0 );
			while( enemies[j].HitTest( "Right",plats[i].GetPos().x,plats[i].GetPos().y,
				plats[i].GetPos().w,plats[i].GetPos().h ) )
				enemies[j].Move( -1,0 );
		}
	}
	for( var i = 0; i < pBullets.length; ++i )
	{
		pBullets[i].Update();
		for( var j = 0; j < plats.length; ++j )
		{
			if( calc.HitTest( plats[j].GetPos().x,plats[j].GetPos().y,
				plats[j].GetPos().w,plats[j].GetPos().h,
				pBullets[i].GetPos().x,pBullets[i].GetPos().y,
				pBullets[i].GetPos().w,pBullets[i].GetPos().h ) )
				pBullets[i].Dest();
		}
		for( var j = 0; j < enemies.length; ++j )
		{
			if( calc.HitTest( enemies[j].GetPos().x,enemies[j].GetPos().y,
				enemies[j].GetPos().w,enemies[j].GetPos().h,
				pBullets[i].GetPos().x,pBullets[i].GetPos().y,
				pBullets[i].GetPos().w,pBullets[i].GetPos().h ) )
			{
				enemies[j].Hurt( calc.Random( 1,2 ) );
				pBullets[i].Dest();
			}
		}
	}
	for( var i = 0; i < enemies.length; ++i )
	{
		if( IsOnScreen( enemies[i].GetPos().x,enemies[i].GetPos().y,
			enemies[i].GetPos().w,enemies[i].GetPos().h ) )
			enemies[i].Update();
		if( calc.HitTest( player.GetPos().x,player.GetPos().y,
			player.GetPos().w,player.GetPos().h,
			enemies[i].GetPos().x,enemies[i].GetPos().y,
			enemies[i].GetPos().w,enemies[i].GetPos().h ) )
		{
			if( player.GetPos().x > enemies[i].GetPos().x )
				player.Hurt( calc.Random( 10,5 ),1 );
			else
				player.Hurt( calc.Random( 10,5 ),-1 );
			enemies[i].SetRandPos();
		}
	}
}

function Draw()
{
	gfx.Rect( 0,0,gfx.SCREEN_WIDTH,gfx.SCREEN_HEIGHT,"#000" );
	// Draw things here.
	for( var i = 0; i < plats.length; ++i )
		plats[i].Draw();
	for( var i = 0; i < enemies.length; ++i )
		enemies[i].Draw();
	for( var i = 0; i < pBullets.length; ++i )
		pBullets[i].Draw();
	player.Draw();
	pBar.Draw();
}

function MoveAll( xMove,yMove )
{
	for( var i = 0; i < plats.length; ++i )
		plats[i].Move( xMove,yMove );
	for( var i = 0; i < pBullets.length; ++i )
		pBullets[i].Move( xMove,yMove );
	for( var i = 0; i < enemies.length; ++i )
		enemies[i].Move( xMove,yMove );
	for( var i = 0; i < nodes.length; ++i )
		nodes[i].Move( xMove,yMove );
}

function IsOnScreen( objX,objY,objW,objH )
{
	if( objX + objW > 0 && objX < gfx.SCREEN_WIDTH &&
		objY + objH > 0 && objY < gfx.SCREEN_HEIGHT )
		return true;
	else
		return false;
}
