class Keyboard
{
	constructor()
	{
		var keyMap = [];
		//
		this.Init = function()
		{
			onkeydown = onkeyup = function( e )
			{
				keyMap[e.keyCode] = ( e.type == "keydown" );
			}
		}
		this.KeyDown = function( key )
		{
			if( keyMap[key] )
				return true;
			else
				return false;
		}
	}
}