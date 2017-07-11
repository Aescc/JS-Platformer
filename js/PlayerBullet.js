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
		//
		this.Update = function()
		{
			x += SPEED * dir;
			y += Math.sin( x / 20 ) * 10;
		}
		this.Draw = function()
		{
			gfx.Rect( x,y,WIDTH,HEIGHT,"#3FC" );
		}
		this.SetPos = function( in_x,in_y )
		{
			x = in_x;
			y = in_y;
		}
		this.SetDir = function( in_dir )
		{
			dir = in_dir
		}
	}
}