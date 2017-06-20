using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Xna.Framework.Graphics
{
    public class Texture2D
    {
        internal Bridge.Html5.HTMLImageElement @internal;
        internal Texture2D(Bridge.Html5.HTMLImageElement @internal)
        {
            this.@internal = @internal;
        }
        internal Texture2D() { }
    }
}
