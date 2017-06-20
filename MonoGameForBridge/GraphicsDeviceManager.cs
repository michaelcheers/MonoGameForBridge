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
        public int PreferredBackBufferWidth  { get; set; }
        public int PreferredBackBufferHeight { get; set; }
        public GraphicsDeviceManager (Game game)
        {

        }
    }
}
