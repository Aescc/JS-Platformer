class ExitPath
{
	constructor( in_x,in_y )
	{
		const WIDTH = 50;
		const HEIGHT = 50;
		var x = in_x;
		var y = in_y;
		//
		this.Draw = function()
		{
			gfx.Rect( x,y,WIDTH,HEIGHT,"#A0A" );
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