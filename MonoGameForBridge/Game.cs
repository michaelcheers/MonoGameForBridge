using Bridge;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Xna.Framework
{
    public abstract class Game : IDisposable
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
            if (GraphicsDevice.graphicsDeviceManagers.First().IsFullScreen)
            {
                Bridge.Html5.HTMLHeadingElement heading;
                Bridge.Html5.Document.Body.Style.BackgroundColor = "#ffdddd";
                Bridge.Html5.Document.Body.AppendChild(heading = new Bridge.Html5.HTMLHeadingElement
                {
                    InnerHTML = "Loading has completed. This game has requested full screen. Click anywhere to enable it."
                });
                TaskCompletionSource<object> finished = new TaskCompletionSource<object>();
                var oldClick = Bridge.Html5.Document.OnClick;
                Bridge.Html5.Document.OnClick = e => finished.SetResult(null);
                await finished.Task;
                Bridge.Html5.Document.OnClick = oldClick;
                heading.Style.Display = Bridge.Html5.Display.None;
            }
            Bridge.Html5.Document.Body.AppendChild(GraphicsDevice.@internal);
            if (GraphicsDevice.graphicsDeviceManagers.First().IsFullScreen)
            {
                if (Browser.IsWebKit)
                    GraphicsDevice.@internal.ToDynamic().webkitRequestFullScreen();
                else if (Browser.FirefoxVersion > 0)
                    GraphicsDevice.@internal.ToDynamic().mozRequestFullScreen();
                else if (Browser.IeVersion > 0)
                    GraphicsDevice.@internal.ToDynamic().msRequestFullScreen();
                else
                    throw new NotSupportedException("Browser unknown.");
            }
            Bridge.Html5.Global.SetInterval(() => Update(new GameTime()), 1000 / 60);
            Bridge.Html5.Global.RequestAnimationFrame(v => InternalDraw());
        }

        void InternalDraw ()
        {
            GraphicsDevice.Clear(Color.Purple);
            Draw(new GameTime());
            Bridge.Html5.Global.RequestAnimationFrame(v => InternalDraw());
        }

        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: dispose managed state (managed objects).
                }

                // TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
                // TODO: set large fields to null.

                disposedValue = true;
            }
        }

        // TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
        // ~Game() {
        //   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
        //   Dispose(false);
        // }

        // This code added to correctly implement the disposable pattern.
        public void Dispose()
        {
            // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
            Dispose(true);
            // TODO: uncomment the following line if the finalizer is overridden above.
            // GC.SuppressFinalize(this);
        }
        #endregion
    }
}
