class Enemy // Is a base for other enemies until extends works.
{
	constructor( in_gravityAcc )
	{
		var x = gfx.SCREEN_WIDTH  * 100;
		var y = gfx.SCREEN_HEIGHT * 100;
		const WIDTH = 60;
		const HEIGHT = 60;
		var gravity = 0;
		const GRAVITY_ACC = in_gravityAcc;
		const OFFSET = WIDTH / 4;
		//
		this.Update = function()
		{
			gravity += GRAVITY_ACC;
			y += gravity;
		}
		this.Draw = function()
		{
			if( IsOnScreen( x,y,WIDTH,HEIGHT ) )
				gfx.Rect( x,y,WIDTH,HEIGHT,"#F63" );
		}
		this.Land = function()
		{
			gravity = 0;
		}
		this.Move = function( xMove,yMove )
		{
			x += xMove;
			y += yMove;
		}
		this.SetRandPos = function()
		{
			do
			{
				const randPos = calc.Random( 0,nodes.length - 1 );
				x = nodes[randPos].GetPos().x;
				y = nodes[randPos].GetPos().y;
			} while( IsOnScreen( x,y,WIDTH,HEIGHT ) );
		}
		this.Hurt = function( amount )
		{
			hp -= amount;
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
		this.HitTest = function( hitDir,objX,objY,objWidth,objHeight )
		{
			if( hitDir === "Top" )
			{
				if( x + OFFSET < objX + objWidth && x + WIDTH - OFFSET > objX &&
					y < objY + objHeight && y + OFFSET > objY )
					return true;
				else
					return false;
			}
			else if( hitDir === "Bot" )
			{
				if( x + OFFSET < objX + objWidth && x + WIDTH - OFFSET > objX &&
					y + HEIGHT - OFFSET < objY + objHeight && y + HEIGHT > objY )
					return true;
				else
					return false;
			}
			else if( hitDir === "Left" )
			{
				if( x < objX + objWidth && x + OFFSET > objX &&
					y + OFFSET < objY + objHeight && y + HEIGHT - OFFSET > objY )
					return true;
				else
					return false;
			}
			else if( hitDir === "Right" )
			{
				if( x + WIDTH - OFFSET < objX + objWidth && x + WIDTH > objX &&
					y + OFFSET < objY + objHeight && y + HEIGHT - OFFSET > objY )
					return true;
				else
					return false;
			}
		}
	}
}