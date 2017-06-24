using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test
{
    public class Game1 : Game
    {
        GraphicsDeviceManager graphics;
        public Game1 ()
        {
            Content.RootDirectory = "";
            graphics = new GraphicsDeviceManager(this);
            graphics.PreferredBackBufferWidth = 1366;
            graphics.PreferredBackBufferHeight = 768;
            graphics.IsFullScreen = true;
            IsMouseVisible = true;
        }

        protected override void Initialize()
        {
            base.Initialize();
        }

        Texture2D angel;
        SpriteBatch spriteBatch;

        protected override void LoadContent()
        {
            spriteBatch = new SpriteBatch(GraphicsDevice);
            angel = Content.Load<Texture2D>("angel");
            base.LoadContent();
        }

        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.LightPink);
            spriteBatch.Begin();
            spriteBatch.Draw(angel, new Vector2(500 + frames * 2, 500), null, Color.OrangeRed, (float)(frames * 0.05), new Vector2(16, 16), new Vector2(0.5f, 1) * 4, 0, 0);
            spriteBatch.End();
            base.Draw(gameTime);
        }

        int frames;

        protected override void Update(GameTime gameTime)
        {
            frames++;
            base.Update(gameTime);
        }
    }
}
