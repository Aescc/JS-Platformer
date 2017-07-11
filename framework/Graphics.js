class Graphics
{
	constructor()
	{
		this.canvas = document.getElementById( 'gc' );
		const context = this.canvas.getContext( '2d' );
		this.SCREEN_WIDTH = this.canvas.width;
		this.SCREEN_HEIGHT = this.canvas.height;
		//
		this.Circle = function( x,y,size,color )
		{
			context.fillStyle = color;
			context.beginPath();
			context.arc( x,y,size,0,2 * Math.PI );
			context.fill();
		}
		this.Draw = function( x,y,image )
		{
			context.drawImage( image,x,y );
		}
		this.Line = function( x0,y0,x1,y1,color,size )
		{
			context.beginPath();
			context.moveTo( x0,y0 );
			context.lineTo( x1,y1 );
			context.strokeStyle = color;
			context.lineWidth = size;
			context.stroke();
		}
		this.SetSmoothing = function( willSmooth )
		{
			context.imageSmoothingEnabled = willSmooth;
			context.webkitImageSmoothingEnabled = willSmooth;
			context.mozImageSmoothingEnabled = willSmooth;
		}
		this.Rect = function( x,y,width,height,color,alpha = 1.0 )
		{
			context.globalAlpha = alpha;
			context.fillStyle = color;
			context.fillRect( x,y,width,height );
			context.globalAlpha = 1.0;
		}
		this.Write = function( x,y,message,color,font = "20PX Arial" )
		{
			context.fillStyle = color;
			context.font = font;
			context.fillText( message,x,y );
		}
	}
}