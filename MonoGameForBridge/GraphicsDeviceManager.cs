using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Xna.Framework
{
    public class GraphicsDeviceManager
    {
        internal Game @internal;
        public bool IsFullScreen { get; set; }
        public int PreferredBackBufferWidth { get; set; } = 800;
        public int PreferredBackBufferHeight { get; set; } = 600;
        public GraphicsDeviceManager (Game game)
        {
            (@internal = game).GraphicsDevice.graphicsDeviceManager = this;
        }
    }
}
