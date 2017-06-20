using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Xna.Framework;
//using Microsoft.Xna.Framework.Audio;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;
//using Microsoft.Xna.Framework.Media;

namespace Farie_Alchemy
{
    enum MythicalItem
    {
        carrot, cake, rabbit, duck, pony, unicorn, dragon, star, Jackpot, moon, earth, sun, angel, wish, god, Empty, Count
    }
    enum Position
    {
        /// <summary>
        /// eg. rabbit, cake
        /// </summary>
        normal,
        /// <summary>
        /// eg. rabbit
        /// cake
        /// </summary>
        down,
        /// <summary>
        /// eg. cake, rabbit
        /// </summary>
        left,
        /// <summary>
        /// eg. cake
        /// rabbit
        /// </summary>
        up,
        Count,
    }
    //class Button
    //{
    //    public delegate MouseState MouseStateGet();
    //    Rectangle rect;
    //    SpriteFont font;
    //    string text;
    //    public void Draw (SpriteBatch batch)
    //    {
    //        batch.DrawString(font, text, rect.Center, color);
    //    }
    //    public void Update (MouseStateGet mouseState = null)
    //    {
    //        if (mouseState == null) mouseState = Mouse.GetState;
    //         Update(mouseState());
    //    }
    //    public void Update (MouseState state)
    //    {

    //    }
    //    public Button (string text, SpriteFont font)
    //    {

    //    }
    //}
    /// <summary>
    /// This is the main type for your game
    /// </summary>
    public class Game1 : Microsoft.Xna.Framework.Game
    {
        GraphicsDeviceManager graphics;
        SpriteBatch spriteBatch;
        int points = 0;
        SpriteFont pointForm;
        Dictionary<MythicalItem, Texture2D> items;
        //SoundEffectInstance instance;
        MythicalItem item1;
        MythicalItem item2;
        Random rnd;
        MythicalItem[,] board;
        bool jackpot;

        public Game1()
        {
            graphics = new GraphicsDeviceManager(this);
            Content.RootDirectory = "Content";
            graphics.PreferredBackBufferHeight = 768;
            graphics.PreferredBackBufferWidth = 1000;
            graphics.IsFullScreen = true;
        }

        /// <summary>
        /// Allows the game to perform any initialization it needs to before starting to run.
        /// This is where it can query for any required services and load any non-graphic
        /// related content.  Calling base.Initialize will enumerate through any components
        /// and initialize them as well.
        /// </summary>
        protected override void Initialize()
        {
            // TODO: Add your initialization logic here

            board = new MythicalItem[9, 8];
            for (int x = 0; x < board.GetLength(0);x++ )
            {
                for (int y = 0; y < board.GetLength(1); y++)
                {
                    board[x,y] = MythicalItem.Empty;
                }
            }
            rnd = new Random();
            item1 = (MythicalItem)0;
            item2 = (MythicalItem)0;
            specialColor = Color.Turquoise;
            foreach (MythicalItem item in Enum.GetValues(typeof(MythicalItem)))
            {
                pointsGiven.Add(item, (int)Math.Pow(3, (int)item));
            }

            base.Initialize();
        }

        /// <summary>
        /// LoadContent will be called once per game and is the place to load
        /// all of your content.
        /// </summary>
        protected override void LoadContent()
        {
            // Create a new SpriteBatch, which can be used to draw textures.
            spriteBatch = new SpriteBatch(GraphicsDevice);

            // TODO: use this.Content to load your game content here
            items = new Dictionary<MythicalItem, Texture2D>((int)MythicalItem.Count);
            items.Add(MythicalItem.cake, Content.Load<Texture2D>("cake"));
            items.Add(MythicalItem.carrot, Content.Load<Texture2D>("carrot"));
            items.Add(MythicalItem.pony, Content.Load<Texture2D>("horse"));
            items.Add(MythicalItem.duck, Content.Load<Texture2D>("duck")); 
            items.Add(MythicalItem.rabbit, Content.Load<Texture2D>("rabbit"));
            items.Add(MythicalItem.star, Content.Load<Texture2D>("star"));
            items.Add(MythicalItem.unicorn, Content.Load<Texture2D>("unicorn"));
            items.Add(MythicalItem.dragon, Content.Load<Texture2D>("dragon"));
            items.Add(MythicalItem.Jackpot, Content.Load<Texture2D>("gold"));
            items.Add(MythicalItem.moon, Content.Load<Texture2D>("moon"));
            items.Add(MythicalItem.earth, Content.Load<Texture2D>("earth"));
            items.Add(MythicalItem.sun, Content.Load<Texture2D>("sun"));
            items.Add(MythicalItem.god, Content.Load<Texture2D>("god"));
            items.Add(MythicalItem.wish, Content.Load<Texture2D>("wish"));
            items.Add(MythicalItem.angel, Content.Load<Texture2D>("angel"));
            items.Add(MythicalItem.Empty, null);
            black = Content.Load<Texture2D>("black");
            //bgEffect = Content.Load<SoundEffect>("song");
            pointForm = Content.Load<SpriteFont>("Points");
            //instance = bgEffect.CreateInstance();
            //instance.IsLooped = true;
        }

        /// <summary>
        /// UnloadContent will be called once per game and is the place to unload
        /// all content.
        /// </summary>
        protected override void UnloadContent()
        {
            // TODO: Unload any non ContentManager content here
        }

        public bool OrPressed (GamePadState gState, KeyboardState state, params object[] keysOrButtons)
        {
            foreach (var o in keysOrButtons)
            {
                if (o is Microsoft.Xna.Framework.Input.Keys)
                {
                    if (state.IsKeyDown((Microsoft.Xna.Framework.Input.Keys)o) && oldState.IsKeyUp((Microsoft.Xna.Framework.Input.Keys)o))
                        return true;
                }
                else if (o is Buttons)
                {
                    if (gState.IsButtonDown((Buttons)o) && oldGPadState.IsButtonUp((Buttons)o))
                        return true;
                }
            }
            return false;
        }

        public void ApplyGravity (int x)
        {
            int emptySpaces = 0;
            for (int y = board.GetLength(1) - 1; y >= 0; y--)
            {
                if (board[x, y] == MythicalItem.Empty) emptySpaces++;
                else
                {
                    if (emptySpaces != 0)
                    {
                        board[x, y + emptySpaces] = board[x, y];
                        board[x, y] = MythicalItem.Empty;
                    }
                }
            }
        }

        public void BoardUpdate ()
        {
            for (int x = 0; x < board.GetLength(0); x++)
            {
                for (int y = 0; y < board.GetLength(1); y++)
                {
                    MythicalItem current = board[x, y];
                    if (current != MythicalItem.Empty)
                    {
                        MythicalItem up = MythicalItem.Empty;
                        if (y != 0)
                            up = board[x, y - 1];
                        MythicalItem down = MythicalItem.Empty;
                        if (y != board.GetLength(1) - 1)
                            down = board[x, y + 1];
                        MythicalItem left = MythicalItem.Empty;
                        if (x != 0)
                            left = board[x - 1, y];
                        MythicalItem right = MythicalItem.Empty;
                        if (x != board.GetLength(0) - 1)
                            right = board[x + 1, y];
                        List<KeyValuePair<int, int>> matches = new List<KeyValuePair<int,int>>(4);
                        if (up == current) matches.Add(new KeyValuePair<int, int>(x, y - 1));
                        if (down == current) matches.Add(new KeyValuePair<int, int>(x, y + 1));
                        if (left == current) matches.Add(new KeyValuePair<int, int>(x - 1, y));
                        if (right == current) matches.Add(new KeyValuePair<int, int>(x + 1, y));
                        if (matches.Count >= 2)
                        {
                            if (current == (MythicalItem)((int)(MythicalItem.Count) - 2)) jackpot = true;
                            foreach (KeyValuePair<int, int> match in matches)
                            {
                                board[match.Key, match.Value] = MythicalItem.Empty;
                            }
                            if (current == topAloud) topAloud++;
                            board[x, y]++;
                            if (x != 0)
                                ApplyGravity(x - 1);
                            ApplyGravity(x);
                            if (x != board.GetLength(0) - 1)
                            ApplyGravity(x + 1);
                        }
                    }
                }
            }
        }

        MythicalItem topAloud = (MythicalItem)0;
        bool controlled = false;
        bool highScoreList = false;
        string name = "";

        /// <summary>
        /// Allows the game to run logic such as updating the world,
        /// checking for collisions, gathering input, and playing audio.
        /// </summary>
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        protected override void Update(GameTime gameTime)
        {
            //if (instance.State != SoundState.Playing && !controlled)
            //{
            //    instance.Play();
            //    controlled = true;
            //}
            // Allows the game to exit
            if (GamePad.GetState(PlayerIndex.One).Buttons.Back == ButtonState.Pressed)
                Environment.Exit(0x0);
            if (Keyboard.GetState().IsKeyDown(Microsoft.Xna.Framework.Input.Keys.Escape))
                Environment.Exit(0x0);

            // TODO: Add your update logic here

            KeyboardState state = Keyboard.GetState();
            GamePadState gState = GamePad.GetState(PlayerIndex.One);
            if (jackpot)
            {
                if (OrPressed(gState, state, Microsoft.Xna.Framework.Input.Keys.Enter, Buttons.LeftStick)) jackpot = false;
                base.Update(gameTime);
                return;
            }
            else if (highScoreList)
            {
                if (OrPressed(gState, state, Microsoft.Xna.Framework.Input.Keys.H, Buttons.RightThumbstickDown)) highScoreList = false;
            }
            else if (OrPressed(gState, state, Microsoft.Xna.Framework.Input.Keys.Up, Buttons.Y, Buttons.LeftThumbstickUp, Buttons.DPadUp))
            {
                position++;
                position = (Position)((int)position % (int)Position.Count);
            }
            else if (OrPressed(gState, state, Microsoft.Xna.Framework.Input.Keys.Right, Buttons.LeftThumbstickRight, Buttons.B, Buttons.DPadRight))
            {
                if (vectorPosition != board.GetLength(0) - 2)
                    vectorPosition++;
            }
            else if (OrPressed(gState, state, Microsoft.Xna.Framework.Input.Keys.A, Buttons.LeftTrigger))
            {
                if (vectorPosition > 1)
                    vectorPosition -= 2;
                else if (vectorPosition != 0)
                    vectorPosition--;
            }
            else if (OrPressed(gState, state, Microsoft.Xna.Framework.Input.Keys.D, Buttons.RightTrigger))
            {
                if (vectorPosition < board.GetLength(0) - 3)
                    vectorPosition += 2;
                else if (vectorPosition != board.GetLength(0) - 2)
                    vectorPosition++;
            }
            else if (OrPressed(gState, state, Microsoft.Xna.Framework.Input.Keys.Left, Buttons.LeftThumbstickLeft, Buttons.X, Buttons.DPadLeft))
            {
                if (vectorPosition != 0)
                vectorPosition--;
            }
            else if (OrPressed(gState, state, Microsoft.Xna.Framework.Input.Keys.RightShift, Buttons.RightShoulder, Buttons.RightStick))
            {
                position += 2;
                position = (Position)((int)position % (int)Position.Count);
            }
            else if (OrPressed(gState, state, Microsoft.Xna.Framework.Input.Keys.LeftShift, Buttons.LeftShoulder, Buttons.LeftStick))
            {
                position--;
                if ((int)position == -1)
                    position = (Position)(((int)Position.Count) - 1);
            }
            else if (OrPressed(gState, state, Microsoft.Xna.Framework.Input.Keys.H, Buttons.RightThumbstickDown))
            {
                highScoreList = true;
            }
            else if (OrPressed(gState, state, Microsoft.Xna.Framework.Input.Keys.Down, Buttons.LeftThumbstickDown, Buttons.A, Buttons.DPadDown))
            {
                switch (position)
                {
                    case Position.down:
                        {
                            bool lost = true;
                            for (int y = board.GetLength(1) - 1; y > 0; y--)
                            {
                                if (board[vectorPosition, y] == MythicalItem.Empty)
                                {
                                    board[vectorPosition, y] = item2;
                                    board[vectorPosition, y - 1] = item1;
                                    lost = false;
                                    break;
                                }
                            }
                            if (lost)
                                this.lost = true;
                            break;
                        }
                    case Position.normal:
                        {
                            bool firstFail = true;
                            bool secondFail = true;
                            for (int y = board.GetLength(1) - 1; y >= 0; y--)
                            {
                                if ((board[vectorPosition, y] == MythicalItem.Empty) && firstFail)
                                {
                                    board[vectorPosition, y] = item1;
                                    firstFail = false;
                                }
                                if (board[vectorPosition + 1, y] == MythicalItem.Empty && secondFail)
                                {
                                    board[vectorPosition + 1, y] = item2;
                                    secondFail = false;
                                }
                            }
                            if (firstFail || secondFail)
                            {
                                this.lost = true;
                            }
                            break;
                        }
                    case Position.left:
                        {
                            bool firstFail = true;
                            bool secondFail = true;
                            for (int y = board.GetLength(1) - 1; y >= 0; y--)
                            {
                                if ((board[vectorPosition, y] == MythicalItem.Empty) && firstFail)
                                {
                                    board[vectorPosition, y] = item2;
                                    firstFail = false;
                                }
                                if (board[vectorPosition + 1, y] == MythicalItem.Empty && secondFail)
                                {
                                    board[vectorPosition + 1, y] = item1;
                                    secondFail = false;
                                }
                            }
                            if (firstFail || secondFail)
                            {
                                this.lost = true;
                            }
                            break;
                        }
                    case Position.up:
                        {
                            bool lost = true;
                            for (int y = board.GetLength(1) - 1; y > 0; y--)
                            {
                                if (board[vectorPosition, y] == MythicalItem.Empty)
                                {
                                    board[vectorPosition, y] = item1;
                                    board[vectorPosition, y - 1] = item2;
                                    lost = false;
                                    break;
                                }
                            }
                            if (lost)
                                this.lost = true;
                            break;
                        }
                }
                item1 = next.Key;
                item2 = next.Value;
                if (topAloud == (MythicalItem)0)
                {
                    next = new KeyValuePair<MythicalItem,MythicalItem>((MythicalItem)0, (MythicalItem)0);
                }
                else if (topAloud == MythicalItem.Empty)
                {
                    next = new KeyValuePair<MythicalItem,MythicalItem>(
                    (MythicalItem)rnd.Next((int)topAloud),
                    (MythicalItem)rnd.Next((int)topAloud)
                    );
                }
                else
                {
                    next = new KeyValuePair<MythicalItem,MythicalItem>(
                    (MythicalItem)rnd.Next(((int)topAloud) + 1),
                    (MythicalItem)rnd.Next(((int)topAloud) + 1)
                    );
                }
            }
            oldState = state;
            oldGPadState = gState;
            BoardUpdate();
            points = 0;
            foreach (MythicalItem item in board)
            {
                if (item != MythicalItem.Empty)
                    points += pointsGiven[item];
            }
            base.Update(gameTime);
        }
        Dictionary<MythicalItem, int> pointsGiven = new Dictionary<MythicalItem,int>(10);
        Texture2D black;
        /*
         * postions:
         */
        Color specialColor;
        const int position1X = 0;
        const int position1Y = 100;
        const int position2X = 50;
        const int position2Y = position1Y;
        const int position3X = position1X;
        const int position3Y = 150;
        const int position4X = position2X;
        const int position4Y = position3Y;
        //
        //

        KeyValuePair<MythicalItem, MythicalItem> next;
        KeyboardState oldState;
        GamePadState oldGPadState;
        Position position = Position.normal;
        //SoundEffect bgEffect;
        /// <summary>
        /// The X of the elements drawn. Drawn on the screen position x positionTimes.
        /// </summary>
        int vectorPosition = 1;
        bool lost = false;
        const int positionTimes = 50;
        /// <summary>
        /// This is called when the game should draw itself.
        /// </summary>
        /// <param name="gameTime">Provides a snapshot of timing values.</param>
        protected override void Draw(GameTime gameTime)
        {
            GraphicsDevice.Clear(Color.White);

            // TODO: Add your drawing code here

            spriteBatch.Begin();
            if (jackpot)
            {
                const string jackpotString = "You won a jackpot. Xbox use Left Stick to click. Keyboard use enter.";
                spriteBatch.DrawString(pointForm, jackpotString, new Vector2(GraphicsDevice.Viewport.Width / 2, 50) - (pointForm.MeasureString(jackpotString) / 2), Color.Black);
            }
            else
            {
                string pointsText = "Points: " + points;
                if (this.lost) pointsText = "You lost. Press " + (GamePad.GetState(PlayerIndex.One).IsConnected ? "Back on the Xbox controller" : "Esc on the keyboard") + " to exit. You had " + points + " points.";
                spriteBatch.DrawString(pointForm, pointsText, new Vector2(GraphicsDevice.Viewport.Width / 2, 50) - (pointForm.MeasureString(pointsText) / 2), Color.Black);
                if (!lost)
                {
                    Vector2 positionToDrawAt1 = default(Vector2);
                    Vector2 positionToDrawAt2 = default(Vector2);
                    Color i2 = Color.White;
                    Color i1 = Color.White;
                    switch (position)
                    {
                        case Position.normal:
                            {
                                positionToDrawAt1 = new Vector2(position1X, position1Y);
                                positionToDrawAt2 = new Vector2(position2X, position2Y);
                                if (vectorPosition == board.GetLength(0) - 2)
                                    i2 = specialColor;
                                break;
                            }
                        case Position.left:
                            {
                                positionToDrawAt1 = new Vector2(position2X, position2Y);
                                positionToDrawAt2 = new Vector2(position1X, position1Y);
                                if (vectorPosition == board.GetLength(0) - 2)
                                    i1 = specialColor;
                                break;
                            }
                        case Position.down:
                            {
                                positionToDrawAt1 = new Vector2(position1X, position1Y);
                                positionToDrawAt2 = new Vector2(position3X, position3Y);
                                break;
                            }
                        case Position.up:
                            {
                                positionToDrawAt1 = new Vector2(position3X, position3Y);
                                positionToDrawAt2 = new Vector2(position1X, position1Y);
                                break;
                            }
                    }
                    positionToDrawAt1.X += vectorPosition * positionTimes;
                    positionToDrawAt2.X += vectorPosition * positionTimes;
                    if (items[item1] != null)
                    spriteBatch.Draw(items[item1], positionToDrawAt1, i1);
                    if (items[item2] != null)
                    spriteBatch.Draw(items[item2], positionToDrawAt2, i2);
                    for (int x = 0; x < board.GetLength(0); x++)
                    {
                        for (int y = 0; y < board.GetLength(1); y++)
                        {
                            if (items[board[x, y]] != null)
                                if (x == board.GetLength(0) - 1)
                                    spriteBatch.Draw(items[board[x, y]], new Vector2(x * 50, y * 50 + 250), specialColor);
                                else
                                    spriteBatch.Draw(items[board[x, y]], new Vector2(x * 50, y * 50 + 250));
                        }
                    }
                    for (int y = 0; y < board.GetLength(1); y++)
                    {
                        spriteBatch.Draw(black, new Rectangle(board.GetLength(0) * 50, y * 50 + 250, 32, 32));
                    }
                        spriteBatch.Draw(items[next.Key  ], new Rectangle((board.GetLength(0) + 4) * 50, 250, 32, 32));
                        spriteBatch.Draw(items[next.Value], new Rectangle((board.GetLength(0) + 5) * 50, 250, 32, 32));
                    for (int y = 0, enumIndex = (int)topAloud; enumIndex >= 0; y++, enumIndex--)
                    {
                        if ((MythicalItem)enumIndex == MythicalItem.Empty)
                        {
                            y--; continue;
                        }
                        if (items[(MythicalItem)enumIndex] != null)
                        {
                            spriteBatch.Draw(items[(MythicalItem)enumIndex], new Rectangle((board.GetLength(0) + 1) * 50, y * 50 + 250, 32, 32));
                            spriteBatch.DrawString(pointForm, Convert.ToString(pointsGiven[(MythicalItem)enumIndex]), new Vector2((board.GetLength(0) + 2) * 50, y * 50 + 250), Color.Black);                     
                        }
                    }
                    for (int x = 0; x < board.GetLength(0); x++)
                    {
                        spriteBatch.Draw(black, new Rectangle(x * 50, (board.GetLength(1) * 50) + 250, 32, 32));
                    }
                }
                else
                {
                    string nameText = "Name: " + name;
                    spriteBatch.DrawString(pointForm, nameText, new Vector2(GraphicsDevice.Viewport.Width / 2, 100 + pointForm.MeasureString(pointsText).Y) - (pointForm.MeasureString(nameText) / 2), Color.Black);
                }
            }
            spriteBatch.End();

            base.Draw(gameTime);
        }
    }
}
    static class Static
    {
        public static void Draw(this SpriteBatch spriteBatch, Texture2D texture, Vector2 position)
        {
            spriteBatch.Draw(texture, position, Color.White);
        }
        public static void Draw(this SpriteBatch spriteBatch, Texture2D texture, Rectangle rect)
        {
            spriteBatch.Draw(texture, rect, Color.White);
        }
    }
