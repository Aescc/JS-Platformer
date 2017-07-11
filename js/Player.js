class Player
{
	constructor( in_gravityAcc )
	{
		const WIDTH  = 50;
		const HEIGHT = 50;
		var x = gfx.SCREEN_WIDTH  / 2 - WIDTH  / 2;
		var y = gfx.SCREEN_HEIGHT / 2 - HEIGHT / 2;
		var gravity = 0;
		const gravityAcc = in_gravityAcc;
		//
		this.Update = function()
		{
			gravity += gravityAcc;
			y += gravity;
		}
		this.Draw = function()
		{
			gfx.Rect( x,y,WIDTH,HEIGHT,"#AFA" );
		}
		this.HitTestBot = function( objX,objy,objWidth,objHeight )
		{
			if( x + OFFSET < objX + objWidth && x + WIDTH - OFFSET > objX &&
			y + HEIGHT - OFFSET < objY + objHeight && y + HEIGHT > objY )
				return true;
			else
				return false;
		}
	}
}