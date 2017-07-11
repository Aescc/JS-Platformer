class Player
{
	constructor( in_gravityAcc )
	{
		const WIDTH  = 50;
		const HEIGHT = 50;
		var x = gfx.SCREEN_WIDTH  / 2 - WIDTH  / 2;
		var y = gfx.SCREEN_HEIGHT / 2 - HEIGHT / 2;
		const SPEED = 5;
		var canJump = false;
		var jumping = false;
		const JUMP_POWER = 17;
		var gravity = 0;
		const gravityAcc = in_gravityAcc;
		const OFFSET = WIDTH / 4;
		var dirLastMoved = 1;
		var shootTimer = 0;
		const SHOOT_MAX = 7;
		var currentBullet = 0;
		//
		this.Update = function()
		{
			if( kbd.KeyDown( 65 ) )
			{
				x -= SPEED;
				dirLastMoved = -1;
			}
			if( kbd.KeyDown( 68 ) )
			{
				x += SPEED;
				dirLastMoved = 1;
			}
			++shootTimer;
			if( kbd.KeyDown( 74 ) && shootTimer > SHOOT_MAX )
			{
				shootTimer = 0;
				pBullets[currentBullet].SetDir( dirLastMoved );
				pBullets[currentBullet].SetPos( x,y );
				if( currentBullet < pBullets.length - 1 )
					++currentBullet;
				else
					currentBullet = 0;
			}
			if( kbd.KeyDown( 75 ) && canJump )
				jumping = true;
			gravity += gravityAcc;
			y += gravity;
			if( jumping )
				y -= JUMP_POWER;
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
			canJump = true;
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