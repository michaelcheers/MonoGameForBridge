using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonoGameForBridge
{
    public class Game1 : Game, IDisposable
    {
        GraphicsDeviceManager graphics;
        Texture2D image;
        public Game1 ()
        {
            graphics = new GraphicsDeviceManager(this);
            graphics.PreferredBackBufferWidth = 600;
            graphics.PreferredBackBufferHeight = 600;
        }

        SpriteBatch spriteBatch;

        protected override void LoadContent()
        {
            spriteBatch = new SpriteBatch(GraphicsDevice);
            image = Content.Load<Texture2D>("angel");
            base.LoadContent();
        }

        Vector2 pos = new Vector2(10, 10);

        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.CornflowerBlue);
            spriteBatch.Begin();
            spriteBatch.Draw(image, pos, Color.White);
            spriteBatch.End();
            base.Draw(gameTime);
        }

        protected override void Update(GameTime gameTime)
        {
            var state = Keyboard.GetState();
            if (state.IsKeyDown(Microsoft.Xna.Framework.Input.Keys.Right))
                pos.X++;
            if (state.IsKeyDown(Microsoft.Xna.Framework.Input.Keys.Left))
                pos.X--;
            if (state.IsKeyDown(Microsoft.Xna.Framework.Input.Keys.Down))
                pos.Y++;
            if (state.IsKeyDown(Microsoft.Xna.Framework.Input.Keys.Up))
                pos.Y--;
            base.Update(gameTime);
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
        // ~Game1() {
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
