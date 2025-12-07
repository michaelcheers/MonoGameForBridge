using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bridge.WebGL;

namespace Microsoft.Xna.Framework.Graphics
{
    public class Texture2D
    {
        internal Bridge.Html5.HTMLImageElement @internal;
        internal WebGLTexture _glTexture;
        internal bool _glTextureInitialized;
        public int Width => @internal.NaturalWidth;
        public int Height => @internal.NaturalHeight;
        internal Texture2D(Bridge.Html5.HTMLImageElement @internal)
        {
            this.@internal = @internal;
        }
        internal Texture2D() { }
    }
}
