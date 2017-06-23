using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Xna.Framework.Input
{
    public class Mouse
    {
        static bool _down;
        static Point c;
        internal static void InitMouse (Bridge.Html5.HTMLElement element)
        {
            element.OnMouseDown = e => _down = true;
            element.OnMouseUp = e => _down = false;
            element.OnMouseMove = e => c = new Point(e.LayerX, e.LayerY);
        }
        public static MouseState GetState () =>
            new MouseState(c.X, c.Y, 0, _down ? ButtonState.Pressed : ButtonState.Released, ButtonState.Released, ButtonState.Released, ButtonState.Released, ButtonState.Released);
    }
}
