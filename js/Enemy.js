class Enemy
{
	constructor( in_gravityAcc )
	{
		var x = gfx.SCREEN_WIDTH  * 100;
		var y = gfx.SCREEN_HEIGHT * 100;
		const WIDTH = 60;
		const HEIGHT = 60;
		var gravity = 0;
		const GRAVITY_ACC = in_gravityAcc;
		var aiMoveDir = calc.Random( -1,1 );
		var aiMoveTimer = 0;
		const AI_MOVE_MAX = 20;
		var hp = 10;
		const HP_MAX = hp;
		const OFFSET = WIDTH / 4;
		//
		this.Update = function()
		{
			gravity += GRAVITY_ACC;
			y += gravity;
			x += aiMoveDir;
			if( aiMoveTimer > AI_MOVE_MAX )
			{
				aiMoveTimer = 0;
				aiMoveDir = calc.Random( -1,1 );
			}
			else
				++aiMoveTimer;
			if( hp < 1 )
			{
				player.AddPower( 10 );
				hp = HP_MAX;
				this.SetRandPos();
			}
		}
		this.Draw = function()
		{
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
			const randPos = calc.Random( 0,nodes.length - 1 );
			x = nodes[randPos].GetPos().x;
			y = nodes[randPos].GetPos().y;
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