class Player
{
	constructor( in_gravityAcc )
	{
		const WIDTH  = 50;
		const HEIGHT = 50;
		var x = gfx.SCREEN_WIDTH  / 2 - WIDTH  / 2;
		var y = gfx.SCREEN_HEIGHT / 2 - HEIGHT / 2;
		const SPEED = 5;
		var currSpeed = 0;
		var canMove = true;
		var jumping = false;
		const JUMP_POWER = 17;
		var gravity = 0;
		const gravityAcc = in_gravityAcc;
		const OFFSET = WIDTH / 4;
		var shootTimer = 0;
		const SHOOT_MAX = 7;
		var shootDir = 1;
		var currentBullet = 0;
		//
		var Shoot = function()
		{
			shootTimer = 0;
			pBullets[currentBullet]  .SetDir( shootDir );
			pBullets[currentBullet]  .SetPos( x,y + WIDTH / 2 );
			pBullets[currentBullet]  .SetMoveStyle( 1 );
			
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
		//
		this.Update = function()
		{
			++shootTimer;
			if( kbd.KeyDown( 74 ) )
			{
				if( shootTimer > SHOOT_MAX )
					Shoot();
				canMove = false;
			}
			else
				canMove = true;
			
			if( kbd.KeyDown( 65 ) )
			{
				if( !jumping )
					currSpeed = -SPEED;
				shootDir = -1;
			}
			if( kbd.KeyDown( 68 ) && !jumping )
			{
				if( !jumping )
					currSpeed = SPEED;
				shootDir = 1;
			}
			
			if( canMove || jumping )
				x += currSpeed;
			if( !jumping )
				currSpeed *= 0.8;
			if( kbd.KeyDown( 75 ) )
			{
				jumping = true;
				if( gravity > JUMP_POWER ) // Enable multi-jumps.
					gravity = 0;
			}
			gravity += gravityAcc;
			y += gravity;
			if( jumping )
				y -= JUMP_POWER;
			CheckBounds();
		}
		this.Draw = function()
		{
			gfx.Rect( x,y,WIDTH,HEIGHT,"#AFA" );
		}
		this.Move = function( xMove,yMove )
		{
			x += xMove;
			y += yMove;
		}
		this.Land = function()
		{
			gravity = 0;
			jumping = false;
		}
		this.HitTestBot = function( objX,objY,objWidth,objHeight )
		{
			if( x + OFFSET < objX + objWidth && x + WIDTH - OFFSET > objX &&
			y + HEIGHT - OFFSET < objY + objHeight && y + HEIGHT > objY )
				return true;
			else
				return false;
		}
	}
}