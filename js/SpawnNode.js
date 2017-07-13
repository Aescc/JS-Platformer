class SpawnNode
{
	constructor( in_x,in_y )
	{
		var x = in_x;
		var y = in_y;
		//
		this.Move = function( xMove,yMove )
		{
			x += xMove;
			y += yMove;
		}
		this.GetPos = function()
		{
			return {
				x:	x,
				y:	y
			}
		}
	}
}