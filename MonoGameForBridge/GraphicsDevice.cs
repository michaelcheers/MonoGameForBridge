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
        internal Game game;
        public List<GraphicsDeviceManager> graphicsDeviceManagers = new List<GraphicsDeviceManager>();

        internal GraphicsDevice (Game game)
        {
            this.game = game;
        }

        internal Context context;

        internal void Init ()
        {
            var first = graphicsDeviceManagers.First();
            @internal = new Canvas
            {
                Width = first.PreferredBackBufferWidth,
                Height = first.PreferredBackBufferHeight
            };
            Input.Mouse.InitMouse(@internal);
            Viewport = new Viewport(new Rectangle(0, 0, first.PreferredBackBufferWidth, first.PreferredBackBufferHeight));
            context = @internal.GetContext(Bridge.Html5.CanvasTypes.CanvasContextWebGLType.WebGL).As<Context>();
        }

        public void Clear (Color color)
        {
            context.ClearColor(color.R / 255d, color.G / 255d, color.B / 255d, color.A / 255d);
            context.Clear(context.COLOR_BUFFER_BIT);
        }

        public Viewport Viewport { get; private set; }
    }
}
