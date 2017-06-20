// MonoGame - Copyright (C) The MonoGame Team
// This file is subject to the terms and conditions defined in
// file 'LICENSE.txt', which is part of this source code package.

using System;

namespace Microsoft.Xna.Framework.Input
{
    /// <summary>
    /// Allows getting keystrokes from keyboard.
    /// </summary>
	public static class Keyboard
	{
        static System.Collections.Generic.List<int> keys;
        static Keyboard ()
        {
            keys = new System.Collections.Generic.List<int>();
            Bridge.Html5.Document.AddEventListener(Bridge.Html5.EventType.KeyDown, e =>
                keys.Add(e.ToDynamic().keyCode));
            Bridge.Html5.Document.AddEventListener(Bridge.Html5.EventType.KeyUp, e =>
            {
                while (keys.Remove(e.ToDynamic().keyCode)) ;
            });
        }
        /// <summary>
        /// Returns the current keyboard state.
        /// </summary>
        /// <returns>Current keyboard state.</returns>
		public static KeyboardState GetState()
		{
            KeyboardState state = new KeyboardState();
            return state;
		}
	}
}
