// Strings
const version = "v2.0.0";

// Numbers
const gravity = 1;
var totalMoveX = 0;
var totalMoveY = 0;
var currMap = 1;

// Booleans
const isFunny = false;

// Arrays
var plats = [];
var pBullets = [];
var runners = [];
var nodes = [];
var exits = [];

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
	
	currMap = calc.Random( 0,maps.length - 1 );
	
	var platC = 0;
	var nodeC = 0;
	var exitC = 0;
	for( var i = 0; i < maps[currMap].length; ++i )
	{
		for( var j = 0; j < maps[currMap][i].length; ++j )
		{
			if( maps[currMap][i][j] === 1 )
				plats[platC++] = new Platform( j * 50,i * 50,50,50 ); // ++ must be after platC so plats[0] exists.
			else if( maps[currMap][i][j] === 2 )
				nodes[nodeC++] = new SpawnNode( j * 50,i * 50 );
			else if( maps[currMap][i][j] === 3 )
				exits[exitC++] = new ExitPath( j * 50,i * 50 );
		}
	}
	for( var i = 0; i < 5; ++i )
	{
		runners[i] = new Runner( gravity );
		runners[i].SetRandPos();
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
		{
			player.Move( 0,1 );
			player.Fall();
		}
			
		while( player.HitTest( "Left",plats[i].GetPos().x,plats[i].GetPos().y,
			plats[i].GetPos().w,plats[i].GetPos().h ) )
			player.Move( 1,0 );
			
		while( player.HitTest( "Right",plats[i].GetPos().x,plats[i].GetPos().y,
			plats[i].GetPos().w,plats[i].GetPos().h ) )
			player.Move( -1,0 );
		//
		for( var j = 0; j < runners.length; ++j )
		{
			while( runners[j].HitTest( "Bot",plats[i].GetPos().x,plats[i].GetPos().y,
				plats[i].GetPos().w,plats[i].GetPos().h ) )
			{
				runners[j].Move( 0,-1 );
				runners[j].Land();
			}
			while( runners[j].HitTest( "Left",plats[i].GetPos().x,plats[i].GetPos().y,
				plats[i].GetPos().w,plats[i].GetPos().h ) )
				runners[j].Move( 1,0 );
			while( runners[j].HitTest( "Right",plats[i].GetPos().x,plats[i].GetPos().y,
				plats[i].GetPos().w,plats[i].GetPos().h ) )
				runners[j].Move( -1,0 );
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
		for( var j = 0; j < runners.length; ++j )
		{
			if( calc.HitTest( runners[j].GetPos().x,runners[j].GetPos().y,
				runners[j].GetPos().w,runners[j].GetPos().h,
				pBullets[i].GetPos().x,pBullets[i].GetPos().y,
				pBullets[i].GetPos().w,pBullets[i].GetPos().h ) )
			{
				runners[j].Hurt( calc.Random( 1,2 ) );
				pBullets[i].Dest();
			}
		}
	}
	for( var i = 0; i < runners.length; ++i )
	{
		if( IsOnScreen( runners[i].GetPos().x,runners[i].GetPos().y,
			runners[i].GetPos().w,runners[i].GetPos().h ) )
			runners[i].Update();
		if( calc.HitTest( player.GetPos().x,player.GetPos().y,
			player.GetPos().w,player.GetPos().h,
			runners[i].GetPos().x,runners[i].GetPos().y,
			runners[i].GetPos().w,runners[i].GetPos().h ) )
		{
			if( player.GetPos().x > runners[i].GetPos().x )
				player.Hurt( calc.Random( 10,5 ),1 );
			else
				player.Hurt( calc.Random( 10,5 ),-1 );
			// runners[i].SetRandPos();
		}
		for( var j = 0; j < runners.length; ++j )
		{
			if( calc.HitTest( runners[i].GetPos().x,runners[i].GetPos().y,
				runners[i].GetPos().w,runners[i].GetPos().h,
				runners[j].GetPos().x,runners[j].GetPos().y,
				runners[j].GetPos().w,runners[j].GetPos().h ) )
				var hahaha = false; // runners[j].SetRandPos();
		}
	}
	player.ShowKey( false );
	for( var i = 0; i < exits.length; ++i )
	{
		if( calc.HitTest( player.GetPos().x,player.GetPos().y,
			player.GetPos().w,player.GetPos().h,
			exits[i].GetPos().x,exits[i].GetPos().y,
			exits[i].GetPos().w,exits[i].GetPos().h ) )
			{
				player.ShowKey( true );
				if( kbd.KeyDown( 69 ) )
					MapTransition();
			}
	}
}

function Draw()
{
	gfx.Rect( 0,0,gfx.SCREEN_WIDTH,gfx.SCREEN_HEIGHT,"#000" );
	// Draw things here.
	for( var i = 0; i < plats.length; ++i )
		plats[i].Draw();
	for( var i = 0; i < exits.length; ++i )
		exits[i].Draw();
	for( var i = 0; i < runners.length; ++i )
		runners[i].Draw();
	for( var i = 0; i < pBullets.length; ++i )
		pBullets[i].Draw();
	player.Draw();
	pBar.Draw();
}

function MoveAll( xMove,yMove )
{
	totalMoveX += xMove;
	totalMoveY += yMove;
	for( var i = 0; i < plats.length; ++i )
		plats[i].Move( xMove,yMove );
	for( var i = 0; i < pBullets.length; ++i )
		pBullets[i].Move( xMove,yMove );
	for( var i = 0; i < runners.length; ++i )
		runners[i].Move( xMove,yMove );
	for( var i = 0; i < nodes.length; ++i )
		nodes[i].Move( xMove,yMove );
	for( var i = 0; i < exits.length; ++i )
		exits[i].Move( xMove,yMove );
}

function IsOnScreen( objX,objY,objW,objH )
{
	if( objX + objW > 0 && objX < gfx.SCREEN_WIDTH &&
		objY + objH > 0 && objY < gfx.SCREEN_HEIGHT )
		return true;
	else
		return false;
}

function MapTransition()
{
	MoveAll( -totalMoveX,-totalMoveY );
	do
	{
		randMap = calc.Random( 0,maps.length - 1 );
	} while( randMap === currMap );
	Init();
}
