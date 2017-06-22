using System;
using Bridge;
using Bridge.Html5;

namespace MonoGameForBridge
{
    public class App
    {
        public static void Main()
        {
            using (Game1 game = new Game1())
                game.Run();
        }
    }
}