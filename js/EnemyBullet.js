class EnemyBullet
{
	constructor( in_gravityAcc )
	{
		var x = gfx.SCREEN_WIDTH  * 100;
		var y = gfx.SCREEN_HEIGHT * 100;
		const WIDTH  = 15;
		const HEIGHT = 15;
		const GRAVITY_ACC = in_gravityAcc;
		var gravity = 0;
		var speed = 0;
		//
		this.Update = function()
		{
			gravity += GRAVITY_ACC;
			y += gravity;
			x += speed;
			y -= Math.abs( speed * 2 );
		}
		this.Draw = function()
		{
			gfx.Rect( x,y,WIDTH,HEIGHT,"#F21" );
		}
		this.SetPos = function( newX,newY,newSpeed )
		{
			x = newX;
			y = newY;
			speed = newSpeed;
			gravity = 0;
		}
		this.Move = function( xMove,yMove )
		{
			x += xMove;
			y += yMove;
		}
		this.Dest = function()
		{
			x = 9999;
			y = 9999;
		}
		this.GetUsable = function()
		{
			if( IsOnScreen( x,y,WIDTH,HEIGHT ) )
				return false;
			else
				return true;
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