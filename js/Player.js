class Player
{
	constructor( in_GRAVITY_ACC )
	{
		const WIDTH  = 35;
		const HEIGHT = 70;
		var x = gfx.SCREEN_WIDTH  / 2 - WIDTH  / 2;
		var y = gfx.SCREEN_HEIGHT / 2 - HEIGHT / 2;
		const SPEED = 5;
		var currSpeed = 0;
		var canMove = true;
		var jumping = true;
		const JUMP_POWER = 17;
		var gravity = 0;
		const GRAVITY_ACC = in_GRAVITY_ACC;
		const OFFSET = WIDTH / 4; // For smooth hit detection, smaller is more accurate.
		var shootTimer = 0;
		const SHOOT_MAX = 10; // Lower is faster.
		var shootDir = 1;
		var currentBullet = 0;
		var power = 20;
		const POWER_MAX = power;
		var powerAddCounter = 0;
		const POWER_TIME_MAX = 60;
		var hurtVX = 0;
		var hurtVY = 0;
		var stunned = false;
		//
		var Shoot = function()
		{
			if( shootTimer > SHOOT_MAX )
			{
				--power;
				shootTimer = 0;
				pBullets[currentBullet].SetDir( shootDir );
				pBullets[currentBullet].SetPos( x,y + WIDTH / 2 );
				pBullets[currentBullet].SetMoveStyle( 1 );
				
				if( currentBullet < pBullets.length - 1 )
					++currentBullet;
				else
					currentBullet = 0;
				
				pBullets[currentBullet].SetDir( shootDir );
				pBullets[currentBullet].SetPos( x,y );
				pBullets[currentBullet].SetMoveStyle( 0 );
				
				if( currentBullet < pBullets.length - 1 )
					++currentBullet;
				else
					currentBullet = 0;
			}
		}
		var CheckBounds = function()
		{
			while( x < 0 )
				++x;
			while( x + WIDTH > gfx.SCREEN_WIDTH )
				--x;
			while( y < 0 )
				++y;
			while( y + HEIGHT > gfx.SCREEN_HEIGHT )
				--y;
		}
		var MoveScreen = function()
		{
			// TODO: Optimize this, possibly with difference variables.
			const xPos = x + WIDTH  / 2;
			const yPos = y + HEIGHT / 2;
			
			// Lower values will dictate how fast the camera follows you, but make the screen jittery.
			const offset = 15;
			
			var xDiff = xPos - gfx.SCREEN_WIDTH  / 2 - offset / 2;
			var yDiff = yPos - gfx.SCREEN_HEIGHT / 2 - offset / 2;
			// xDiff and yDiff are negative so the screen moves
			//  the opposite direction you do.
			xDiff = -xDiff / offset;
			yDiff = -yDiff / offset;
			MoveAll( xDiff,yDiff );
			x += xDiff;
			y += yDiff;
			
			if( false )
			{
				if( xPos < gfx.SCREEN_WIDTH / 2 )
					MoveAll( 1,0 );
				if( xPos > gfx.SCREEN_WIDTH / 2 )
					MoveAll( -1,0 );
				if( yPos < gfx.SCREEN_HEIGHT / 2 )
					MoveAll( 0,1 );
				if( yPos > gfx.SCREEN_HEIGHT / 2 )
					MoveAll( 0,-1 );
			}
		}
		//
		this.Update = function()
		{
			// TODO: Make shooting and jumping take up the same bar.
			++shootTimer;
			if( kbd.KeyDown( 74 ) && !stunned )
			{
				if( power > 0 )
				{
					canMove = false;
					Shoot();
				}
			}
			else
				canMove = true;
			
			if( kbd.KeyDown( 65 ) && !stunned )
			{
				if( !jumping )
					currSpeed = -SPEED;
				shootDir = -1;
			}
			if( kbd.KeyDown( 68 ) && !stunned )
			{
				if( !jumping )
					currSpeed = SPEED;
				shootDir = 1;
			}
			
			if( canMove || jumping )
				x += currSpeed;
			if( !jumping )
				currSpeed *= 0.8;
			
			if( powerAddCounter > POWER_TIME_MAX && power < POWER_MAX )
			{
				powerAddCounter = 0;
				++power;
			}
			else
				++powerAddCounter;
			
			if( kbd.KeyDown( 75 ) && !stunned )
			{
				jumping = true;
				if( gravity > JUMP_POWER && power > 0 ) // Enable multi-jumps.
				{
					gravity = 0;
					power -= 2;
				}
			}
			
			x += hurtVX;
			y += hurtVY;
			
			pBar.SetFillAmount( power / POWER_MAX * 100 );
			if( gravity < 50 )
				gravity += GRAVITY_ACC;
			y += gravity;
			
			if( jumping )
				y -= JUMP_POWER;
			CheckBounds();
			MoveScreen();
		}
		this.Draw = function()
		{
			gfx.Rect( x,y,WIDTH,HEIGHT,"#AFA" );
		}
		this.Move = function( xMove,yMove )
		{
			x += xMove;
			if( yMove === 0 )
			{
				if( ( xMove < 0 && currSpeed > 0 ) || ( xMove > 0 && currSpeed < 0 ) )
					currSpeed *= -1;
			}
			else
				y += yMove;
		}
		this.Land = function()
		{
			gravity = 0;
			jumping = false;
			hurtVX = hurtVY = 0;
			stunned = false;
		}
		this.AddPower = function( amount )
		{
			power += amount;
		}
		this.Hurt = function( amount,dir )
		{
			power -= amount;
			stunned = true;
			jumping = false;
			gravity = 0;
			// TODO: Tweak these to be perfect.
			hurtVX = calc.Random( 5,7 ) * dir;
			hurtVY = calc.Random( -19,-13 );
		}
		this.HitTest = function( hitDir,objX,objY,objWidth,objHeight )
		{
			if( hitDir === "Top" )
			{
				if( x + OFFSET < objX + objWidth && x + WIDTH - OFFSET > objX &&
					y < objY + objHeight && y + OFFSET > objY )
					return true;
				else
					return false;
			}
			else if( hitDir === "Bot" )
			{
				if( x + OFFSET < objX + objWidth && x + WIDTH - OFFSET > objX &&
					y + HEIGHT - OFFSET < objY + objHeight && y + HEIGHT > objY )
					return true;
				else
					return false;
			}
			else if( hitDir === "Left" )
			{
				if( x < objX + objWidth && x + OFFSET > objX &&
					y + OFFSET < objY + objHeight && y + HEIGHT - OFFSET > objY )
					return true;
				else
					return false;
			}
			else if( hitDir === "Right" )
			{
				if( x + WIDTH - OFFSET < objX + objWidth && x + WIDTH > objX &&
					y + OFFSET < objY + objHeight && y + HEIGHT - OFFSET > objY )
					return true;
				else
					return false;
			}
		}
		this.GetPos = function()
		{
			return {
				x:	x,
				y:	y,
				w:	WIDTH,
				h:	HEIGHT
			}
		}
	}
}