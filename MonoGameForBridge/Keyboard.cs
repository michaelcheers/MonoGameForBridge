// MonoGame - Copyright (C) The MonoGame Team
// This file is subject to the terms and conditions defined in
// file 'LICENSE.txt', which is part of this source code package.

using System;
using System.Linq;

namespace Microsoft.Xna.Framework.Input
{
    /// <summary>
    /// Allows getting keystrokes from keyboard.
    /// </summary>
	public static class Keyboard
	{
        static System.Collections.Generic.HashSet<int> keys;
        static Keyboard ()
        {
            keys = new System.Collections.Generic.HashSet<int>();
            Bridge.Html5.Document.AddEventListener(Bridge.Html5.EventType.KeyDown, e =>
                keys.Add(e.ToDynamic().keyCode));
            Bridge.Html5.Document.AddEventListener(Bridge.Html5.EventType.KeyUp, e =>
            {
                if (!keys.Remove(e.ToDynamic().keyCode))
                    Bridge.Script.Write("console.log(\"Key: \" + {0} + \" key up called with no key down.\")", (Keys)(int)(e.ToDynamic().keyCode));
            });
        }
        /// <summary>
        /// Returns the current keyboard state.
        /// </summary>
        /// <returns>Current keyboard state.</returns>
		public static KeyboardState GetState() => new KeyboardState(keys.Cast<Keys>().ToArray());
	}
}
