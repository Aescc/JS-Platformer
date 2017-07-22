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
		var canJump = false;
		var jumping = false;
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
		var stunCounter = 0;
		const STUN_MAX = 100; // How long you stay on the ground after being hit.
		var showingKey = false;
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
		}
		//
		this.Update = function()
		{
			++shootTimer;
			if( !stunned )
			{
				if( kbd.KeyDown( 74 ) )
				{
					if( power > 0 )
					{
						canMove = false;
						Shoot();
					}
				}
				else
					canMove = true;
				
				if( kbd.KeyDown( 65 ) || kbd.KeyDown( 37 ) )
				{
					shootDir = -1;
					if( !jumping )
						currSpeed = -SPEED;
				}
				if( kbd.KeyDown( 68 ) || kbd.KeyDown( 39 ) )
				{
					shootDir = 1;
					if( !jumping )
						currSpeed = SPEED;
				}
			
				if( kbd.KeyDown( 75 ) && canJump )
				{
					jumping = true;
					if( gravity > JUMP_POWER && power > 0 ) // Enable multi-jumps.
					{
						gravity = 0;
						power -= 2;
					}
				}
			}
			else
			{
				if( stunCounter > STUN_MAX )
				{
					stunCounter = 0;
					stunned = false;
				}
				else
					++stunCounter;
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
			
			x += hurtVX;
			y += hurtVY;
			
			pBar.SetFillAmount( power / POWER_MAX * 100 );
			
			if( gravity < 50 )
				gravity += GRAVITY_ACC;
			
			y += gravity;
			
			if( jumping )
				y -= JUMP_POWER;
			
			if( power < 1 )
			{
				power = POWER_MAX;
				stunned = false;
				hurtVX = hurtVY = 0;
				MapTransition();
			}
			
			CheckBounds();
			MoveScreen();
		}
		this.Draw = function()
		{
			if( !stunned )
			{
				gfx.Rect( x,y,WIDTH,HEIGHT,"#AFA" );
				if( showingKey )
					gfx.Circle( x + WIDTH / 2,y - HEIGHT / 3,WIDTH / 3,"#FA0" );
			}
			else
				gfx.Rect( x - WIDTH / 2,y + HEIGHT / 2,HEIGHT,WIDTH,"#AFA" );
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
			canJump = true;
			hurtVX = hurtVY = 0;
		}
		this.Fall = function()
		{
			canJump = false;
			jumping = false;
			gravity = 0;
		}
		this.AddPower = function( amount )
		{
			power += amount;
		}
		this.Hurt = function( amount,dir )
		{
			if( !stunned )
			{
				power -= amount;
				stunned = true;
				jumping = false;
				gravity = 0;
				// TODO: Tweak these to be perfect.
				if( dir !== 0 )
				{
					hurtVX = calc.Random( 5,7 ) * dir;
					hurtVY = calc.Random( -19,-13 );
				}
			}
		}
		this.ShowKey = function( willShow )
		{
			showingKey = willShow;
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