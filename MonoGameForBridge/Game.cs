using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Xna.Framework
{
    public abstract class Game
    {
        public ContentManager Content { get; set; }
        public GraphicsDevice GraphicsDevice { get; set; }
        public Game ()
        {
            GraphicsDevice = new GraphicsDevice(this); 
            Content = new ContentManager
            {
                @internal = this
            };
        }
        protected virtual void Initialize() { }
        protected virtual void LoadContent() { }
        protected virtual void UnloadContent() { }
        protected virtual void Draw(GameTime gameTime) { }
        protected virtual void Update(GameTime gameTime) { }
        public async void Run ()
        {
            GraphicsDevice.Init();
            Initialize();
            LoadContent();
            await Content.AwaitLoad();
            Bridge.Html5.Document.Body.AppendChild(GraphicsDevice.@internal);
            Bridge.Html5.Global.SetInterval(() => Update(new GameTime()), 1000 / 60);
            Bridge.Html5.Global.RequestAnimationFrame(v => Draw(new GameTime()));
        }
    }
}
