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
			gfx.Rect( x,y,WIDTH,HEIGHT,"#555" );
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