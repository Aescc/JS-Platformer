class Mouse
{
	constructor()
	{
		var x = 0;
		var y = 0;
		var isDown = false;
		//
		this.Init = function( canvas )
		{
			canvas.addEventListener( 'mousedown',function()
			{
				isDown = true;
			} );
			canvas.addEventListener( 'mouseup',function()
			{
				isDown = false;
			} );
			canvas.addEventListener( 'mousemove',function( e )
			{
				const rect = canvas.getBoundingClientRect();
				const root = document.documentElement;
				x = e.clientX - rect.left - root.scrollLeft;
				y = e.clientY - rect.top - root.scrollTop;
			} );
		}
		this.pos = function()
		{
			return {
				x:	x,
				y:	y
			};
		}
		this.isDown = function()
		{
			return isDown;
		}
	}
}