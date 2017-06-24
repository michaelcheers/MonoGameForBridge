using Bridge;
using Bridge.Html5;
using Newtonsoft.Json;
using System;

namespace Test
{
    public class Program
    {
        public static void Main()
        {
            using (Game1 game = new Game1()) game.Run();
        }
    }
}