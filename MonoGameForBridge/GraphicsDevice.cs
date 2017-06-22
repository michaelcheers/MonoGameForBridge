using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Canvas = Bridge.Html5.HTMLCanvasElement;

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

        internal void Init ()
        {
            var first = graphicsDeviceManagers.First();
            @internal = new Canvas
            {
                Width = first.PreferredBackBufferWidth,
                Height = first.PreferredBackBufferHeight
            };
        }
    }
}
