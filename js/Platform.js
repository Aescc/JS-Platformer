class Platform
{
	constructor( in_x,in_y,in_width,in_height )
	{
		var x = in_x;
		var y = in_y;
		const WIDTH = in_width;
		const HEIGHT = in_height;
		//
		this.Draw = function()
		{
			if( IsOnScreen( x,y,WIDTH,HEIGHT ) )
				gfx.Rect( x,y,WIDTH,HEIGHT,"#555" );
		}
		this.Move = function( xMove,yMove )
		{
			x += xMove;
			y += yMove;
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