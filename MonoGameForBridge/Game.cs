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
        public bool IsMouseVisible { get; set; }
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
        internal Bridge.Html5.HTMLProgressElement progress;
        public async void Run ()
        {
            Bridge.Html5.Document.Body.AppendChild(new Bridge.Html5.HTMLHeadingElement
            {
                InnerHTML = "Please be patient while the game loads."
            });
            Bridge.Html5.Document.Body.AppendChild(new Bridge.Html5.HTMLBRElement());
            GraphicsDevice.Init();
            Initialize();
            LoadContent();
            Bridge.Html5.Document.Body.AppendChild(progress = new Bridge.Html5.HTMLProgressElement
            {
                Max = Content.images.Count
            });
            await Content.AwaitLoad();
            if (GraphicsDevice.graphicsDeviceManager.IsFullScreen)
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
            else
                Bridge.Html5.Document.Body.InnerHTML = string.Empty;
            var div = Bridge.Html5.Document.CreateElement("div");
            GraphicsDevice.@internal.Style.BackgroundColor = Bridge.Html5.HTMLColor.White;
            Bridge.Html5.Document.DocumentElement.Style.Cursor = IsMouseVisible ? Bridge.Html5.Cursor.Default : Bridge.Html5.Cursor.None;
            div.AppendChild(GraphicsDevice.@internal);
            div.AppendChild(GraphicsDevice.textCanvas);
            Input.Mouse.Init(div);
            Bridge.Html5.Document.Body.AppendChild(div);
            if (GraphicsDevice.graphicsDeviceManager.IsFullScreen)
            {
                if (Browser.IsWebKit)
                    div.ToDynamic().webkitRequestFullScreen();
                else if (Browser.FirefoxVersion > 0)
                    div.ToDynamic().mozRequestFullScreen();
                else if (Browser.IeVersion > 0)
                    div.ToDynamic().msRequestFullScreen();
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
