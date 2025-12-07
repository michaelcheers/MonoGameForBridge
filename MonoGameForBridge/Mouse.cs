using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Xna.Framework.Input
{
    public class Mouse
    {
        [Flags]
        private enum Buttons
        {
            Left = 1,
            Right = 2,
            Middle = 4,
            X1 = 8,
            X2 = 0x10
        }
        static Buttons bt;
        static Point c;
        internal static void Init (Bridge.Html5.HTMLElement element)
        {
            element.OnMouseDown = UpdateMouse;
            element.OnMouseUp = UpdateMouse;
            element.OnMouseMove = UpdateMouse;
        }
        internal static void UpdateMouse (Bridge.Html5.MouseEvent element)
        {
            bt = (Buttons)element.Buttons;
            c = new Point(element.LayerX, element.LayerY);
        }
        static ButtonState If(Buttons button) => bt.HasFlag(button) ? ButtonState.Pressed : ButtonState.Released;
        public static MouseState GetState () =>
            new MouseState(c.X, c.Y, 0, If(Buttons.Left), If(Buttons.Middle), If(Buttons.Right), If(Buttons.X1), If(Buttons.X2));

        public static void SetPosition(int x, int y)
        {
            // Browser doesn't allow programmatic mouse position changes
            // This is a stub for compatibility
            c = new Point(x, y);
        }
    }
}
