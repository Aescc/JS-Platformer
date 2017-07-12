class PowerBar
{
	constructor()
	{
		var x = 10;
		var y = 10;
		const WIDTH = 200;
		const HEIGHT = 10;
		var fillAmount = 100; // Kind of a percent.
		const FILL_MAX = fillAmount;
		//
		this.Draw = function()
		{
			gfx.Rect( x,y,WIDTH,HEIGHT,"#333" );
			gfx.Rect( x,y,fillAmount / 100 * WIDTH,HEIGHT,"#FF0" );
		}
		this.SetFillAmount = function( amount ) // Takes x out of 100.
		{
			fillAmount = amount;
		}
	}
}