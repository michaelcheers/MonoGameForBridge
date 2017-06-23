using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Canvas = Bridge.Html5.HTMLCanvasElement;
using Context = Bridge.WebGL.WebGLRenderingContext;

namespace Microsoft.Xna.Framework.Graphics
{
    public class GraphicsDevice
    {
        internal Canvas @internal;
        internal Canvas textCanvas;
        internal Bridge.Html5.CanvasRenderingContext2D textContext;
        internal Game game;
        public GraphicsDeviceManager graphicsDeviceManager;

        internal GraphicsDevice (Game game)
        {
            this.game = game;
        }

        internal Context context;

        internal void Init ()
        {
            string loc = graphicsDeviceManager.IsFullScreen ? ((Bridge.Html5.Window.Screen.Width - graphicsDeviceManager.PreferredBackBufferWidth) / 2) + "px" : "0px";
            @internal = new Canvas
            {
                Width = graphicsDeviceManager.PreferredBackBufferWidth,
                Height = graphicsDeviceManager.PreferredBackBufferHeight
            };
            @internal.Style.Position = Bridge.Html5.Position.Absolute;
            @internal.Style.Left = loc;
            @internal.Style.Top = "0px";
            textCanvas = new Canvas
            {
                Width = graphicsDeviceManager.PreferredBackBufferWidth,
                Height = graphicsDeviceManager.PreferredBackBufferHeight
            };
            textCanvas.Style.Position = Bridge.Html5.Position.Absolute;
            textCanvas.Style.Left = loc;
            textCanvas.Style.Top = "0px";
            Viewport = new Viewport(new Rectangle(0, 0, graphicsDeviceManager.PreferredBackBufferWidth, graphicsDeviceManager.PreferredBackBufferHeight));
            context = @internal.GetContext(Bridge.Html5.CanvasTypes.CanvasContextWebGLType.WebGL).As<Context>();
            textContext = textCanvas.GetContext(Bridge.Html5.CanvasTypes.CanvasContext2DType.CanvasRenderingContext2D);
        }

        public void Clear (Color color)
        {
            context.ClearColor(color.R / 255d, color.G / 255d, color.B / 255d, color.A / 255d);
            context.Clear(context.COLOR_BUFFER_BIT);
        }

        public Viewport Viewport { get; private set; }
    }
}
