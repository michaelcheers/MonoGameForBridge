using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Xna.Framework.Graphics
{
    public class SpriteFont
    {
        internal SpriteFont (GraphicsDevice graphicsDevice)
        {
            _graphicsDevice = graphicsDevice;
        }
        internal GraphicsDevice _graphicsDevice;
        internal string _name;
        internal double _height;

        public Vector2 MeasureString(string text) => new Vector2
            (
            (float)_graphicsDevice.textContext.MeasureText(text).Width,
            (float)_height
            );
    }
}
