class PlayerBullet
{
	constructor()
	{
		var x = gfx.SCREEN_WIDTH  * 100;
		var y = gfx.SCREEN_HEIGHT * 100;
		const WIDTH  = 15;
		const HEIGHT = 15;
		const SPEED = 10;
		var dir = 1;
		var moveStyle = 0; // 0 or 1
		var destTimer = 0;
		const DEST_TIME_MAX = 25;
		//
		this.Update = function()
		{
			x += SPEED * dir;
			if( moveStyle )
				y += Math.sin( x / 20 ) * 8;
			else
				y -= Math.sin( x / 20 ) * 8;
			++destTimer;
			if( destTimer > DEST_TIME_MAX )
				this.SetPos( gfx.SCREEN_WIDTH * 100,gfx.SCREEN_HEIGHT * 100 );
		}
		this.Draw = function()
		{
			gfx.Rect( x,y,WIDTH,HEIGHT,"#3FC" );
		}
		this.Move = function( xMove,yMove )
		{
			x += xMove;
			y += yMove;
		}
		this.SetPos = function( in_x,in_y )
		{
			x = in_x;
			y = in_y;
			destTimer = 0;
		}
		this.SetDir = function( in_dir )
		{
			dir = in_dir
		}
		this.SetMoveStyle = function( in_moveStyle )
		{
			moveStyle = in_moveStyle;
		}
	}
}