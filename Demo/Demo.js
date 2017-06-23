/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.0.0-beta3
 */
Bridge.assembly("Demo", function ($asm, globals) {
    "use strict";

    /** @namespace Farie_Alchemy */

    /**
     * This is the main type for your game
     *
     * @public
     * @class Farie_Alchemy.Game1
     * @augments Microsoft.Xna.Framework.Game
     */
    Bridge.define("Farie_Alchemy.Game1", {
        inherits: [Microsoft.Xna.Framework.Game],
        statics: {
            fields: {
                position1X: 0,
                position1Y: 0,
                position2X: 0,
                position2Y: 0,
                position3X: 0,
                position3Y: 0,
                position4X: 0,
                position4Y: 0,
                positionTimes: 0
            },
            ctors: {
                init: function () {
                    this.position1X = 0;
                    this.position1Y = 100;
                    this.position2X = 50;
                    this.position2Y = Farie_Alchemy.Game1.position1Y;
                    this.position3X = Farie_Alchemy.Game1.position1X;
                    this.position3Y = 150;
                    this.position4X = Farie_Alchemy.Game1.position2X;
                    this.position4Y = Farie_Alchemy.Game1.position3Y;
                    this.positionTimes = 50;
                }
            }
        },
        fields: {
            graphics: null,
            spriteBatch: null,
            points: 0,
            items: null,
            item1: 0,
            item2: 0,
            rnd: null,
            board: null,
            jackpot: false,
            topAloud: 0,
            controlled: false,
            highScoreList: false,
            name: null,
            pointsGiven: null,
            black: null,
            specialColor: null,
            next: null,
            oldState: null,
            oldGPadState: null,
            position: 0,
            /**
             * The X of the elements drawn. Drawn on the screen position x positionTimes.
             *
             * @instance
             * @private
             * @memberof Farie_Alchemy.Game1
             * @default 1
             * @type number
             */
            vectorPosition: 0,
            lost: false
        },
        ctors: {
            init: function () {
                this.specialColor = new Microsoft.Xna.Framework.Color();
                this.next = new (System.Collections.Generic.KeyValuePair$2(Farie_Alchemy.MythicalItem,Farie_Alchemy.MythicalItem))();
                this.oldState = new Microsoft.Xna.Framework.Input.KeyboardState();
                this.oldGPadState = new Microsoft.Xna.Framework.Input.GamePadState();
                this.points = 0;
                this.topAloud = 0;
                this.controlled = false;
                this.highScoreList = false;
                this.name = "";
                this.pointsGiven = new (System.Collections.Generic.Dictionary$2(Farie_Alchemy.MythicalItem, System.Int32))();
                this.position = Farie_Alchemy.Position.normal;
                this.vectorPosition = 1;
                this.lost = false;
            },
            ctor: function () {
                this.$initialize();
                Microsoft.Xna.Framework.Game.ctor.call(this);
                this.graphics = new Microsoft.Xna.Framework.GraphicsDeviceManager(this);
                this.Content.RootDirectory = "Content";
                this.graphics.PreferredBackBufferHeight = 768;
                this.graphics.PreferredBackBufferWidth = 1000;
                this.graphics.IsFullScreen = true;
            }
        },
        methods: {
            /**
             * Allows the game to perform any initialization it needs to before starting to run.
             This is where it can query for any required services and load any non-graphic
             related content.  Calling base.Initialize will enumerate through any components
             and initialize them as well.
             *
             * @instance
             * @protected
             * @override
             * @this Farie_Alchemy.Game1
             * @memberof Farie_Alchemy.Game1
             * @return  {void}
             */
            Initialize: function () {
                var $t;
                // TODO: Add your initialization logic here

                this.board = System.Array.create(0, null, Farie_Alchemy.MythicalItem, 9, 8);
                for (var x = 0; x < System.Array.getLength(this.board, 0); x = (x + 1) | 0) {
                    for (var y = 0; y < System.Array.getLength(this.board, 1); y = (y + 1) | 0) {
                        this.board.set([x, y], Farie_Alchemy.MythicalItem.Empty);
                    }
                }
                this.rnd = new System.Random.ctor();
                this.item1 = 0;
                this.item2 = 0;
                this.specialColor = Microsoft.Xna.Framework.Color.Turquoise.$clone();
                $t = Bridge.getEnumerator(System.Enum.getValues(Farie_Alchemy.MythicalItem));
                try {
                    while ($t.moveNext()) {
                        var item = Bridge.cast($t.Current, Farie_Alchemy.MythicalItem);
                        this.pointsGiven.add(item, Bridge.Int.clip32(Math.pow(3, item)));
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }
                Microsoft.Xna.Framework.Game.prototype.Initialize.call(this);
            },
            /**
             * LoadContent will be called once per game and is the place to load
             all of your content.
             *
             * @instance
             * @protected
             * @override
             * @this Farie_Alchemy.Game1
             * @memberof Farie_Alchemy.Game1
             * @return  {void}
             */
            LoadContent: function () {
                // Create a new SpriteBatch, which can be used to draw textures.
                this.spriteBatch = new Microsoft.Xna.Framework.Graphics.SpriteBatch(this.GraphicsDevice);

                // TODO: use this.Content to load your game content here
                this.items = new (System.Collections.Generic.Dictionary$2(Farie_Alchemy.MythicalItem, Microsoft.Xna.Framework.Graphics.Texture2D))();
                this.items.add(Farie_Alchemy.MythicalItem.cake, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "cake"));
                this.items.add(Farie_Alchemy.MythicalItem.carrot, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "carrot"));
                this.items.add(Farie_Alchemy.MythicalItem.pony, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "horse"));
                this.items.add(Farie_Alchemy.MythicalItem.duck, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "duck"));
                this.items.add(Farie_Alchemy.MythicalItem.rabbit, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "rabbit"));
                this.items.add(Farie_Alchemy.MythicalItem.star, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "star"));
                this.items.add(Farie_Alchemy.MythicalItem.unicorn, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "unicorn"));
                this.items.add(Farie_Alchemy.MythicalItem.dragon, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "dragon"));
                this.items.add(Farie_Alchemy.MythicalItem.Jackpot, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "gold"));
                this.items.add(Farie_Alchemy.MythicalItem.moon, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "moon"));
                this.items.add(Farie_Alchemy.MythicalItem.earth, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "earth"));
                this.items.add(Farie_Alchemy.MythicalItem.sun, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "sun"));
                this.items.add(Farie_Alchemy.MythicalItem.god, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "god"));
                this.items.add(Farie_Alchemy.MythicalItem.wish, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "wish"));
                this.items.add(Farie_Alchemy.MythicalItem.angel, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "angel"));
                this.items.add(Farie_Alchemy.MythicalItem.Empty, null);
                this.black = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "black");
                //bgEffect = Content.Load<SoundEffect>("song");
                //pointForm = Content.Load<SpriteFont>("Points");
                //instance = bgEffect.CreateInstance();
                //instance.IsLooped = true;
            },
            /**
             * UnloadContent will be called once per game and is the place to unload
             all content.
             *
             * @instance
             * @protected
             * @override
             * @this Farie_Alchemy.Game1
             * @memberof Farie_Alchemy.Game1
             * @return  {void}
             */
            UnloadContent: function () {
                // TODO: Unload any non ContentManager content here
            },
            OrPressed: function (gState, state, keysOrButtons) {
                var $t;
                if (keysOrButtons === void 0) { keysOrButtons = []; }
                $t = Bridge.getEnumerator(keysOrButtons);
                try {
                    while ($t.moveNext()) {
                        var o = $t.Current;
                        if (Bridge.is(o, System.Int32)) {
                            if (state.IsKeyDown(System.Nullable.getValue(Bridge.cast(Bridge.unbox(o), System.Int32))) && this.oldState.IsKeyUp(System.Nullable.getValue(Bridge.cast(Bridge.unbox(o), System.Int32)))) {
                                return true;
                            }
                        } else if (Bridge.is(o, System.Int32)) {
                            if (gState.IsButtonDown(System.Nullable.getValue(Bridge.cast(Bridge.unbox(o), System.Int32))) && this.oldGPadState.IsButtonUp(System.Nullable.getValue(Bridge.cast(Bridge.unbox(o), System.Int32)))) {
                                return true;
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }return false;
            },
            ApplyGravity: function (x) {
                var emptySpaces = 0;
                for (var y = (System.Array.getLength(this.board, 1) - 1) | 0; y >= 0; y = (y - 1) | 0) {
                    if (this.board.get([x, y]) === Farie_Alchemy.MythicalItem.Empty) {
                        emptySpaces = (emptySpaces + 1) | 0;
                    } else {
                        if (emptySpaces !== 0) {
                            this.board.set([x, ((y + emptySpaces) | 0)], this.board.get([x, y]));
                            this.board.set([x, y], Farie_Alchemy.MythicalItem.Empty);
                        }
                    }
                }
            },
            BoardUpdate: function () {
                var $t;
                for (var x = 0; x < System.Array.getLength(this.board, 0); x = (x + 1) | 0) {
                    for (var y = 0; y < System.Array.getLength(this.board, 1); y = (y + 1) | 0) {
                        var current = this.board.get([x, y]);
                        if (current !== Farie_Alchemy.MythicalItem.Empty) {
                            var up = Farie_Alchemy.MythicalItem.Empty;
                            if (y !== 0) {
                                up = this.board.get([x, ((y - 1) | 0)]);
                            }
                            var down = Farie_Alchemy.MythicalItem.Empty;
                            if (y !== ((System.Array.getLength(this.board, 1) - 1) | 0)) {
                                down = this.board.get([x, ((y + 1) | 0)]);
                            }
                            var left = Farie_Alchemy.MythicalItem.Empty;
                            if (x !== 0) {
                                left = this.board.get([((x - 1) | 0), y]);
                            }
                            var right = Farie_Alchemy.MythicalItem.Empty;
                            if (x !== ((System.Array.getLength(this.board, 0) - 1) | 0)) {
                                right = this.board.get([((x + 1) | 0), y]);
                            }
                            var matches = new (System.Collections.Generic.List$1(System.Collections.Generic.KeyValuePair$2(System.Int32,System.Int32)))(4);
                            if (up === current) {
                                matches.add(new (System.Collections.Generic.KeyValuePair$2(System.Int32,System.Int32))(x, ((y - 1) | 0)));
                            }
                            if (down === current) {
                                matches.add(new (System.Collections.Generic.KeyValuePair$2(System.Int32,System.Int32))(x, ((y + 1) | 0)));
                            }
                            if (left === current) {
                                matches.add(new (System.Collections.Generic.KeyValuePair$2(System.Int32,System.Int32))(((x - 1) | 0), y));
                            }
                            if (right === current) {
                                matches.add(new (System.Collections.Generic.KeyValuePair$2(System.Int32,System.Int32))(((x + 1) | 0), y));
                            }
                            if (matches.Count >= 2) {
                                if (current === 14) {
                                    this.jackpot = true;
                                }
                                $t = Bridge.getEnumerator(matches);
                                try {
                                    while ($t.moveNext()) {
                                        var match = $t.Current;
                                        this.board.set([match.key, match.value], Farie_Alchemy.MythicalItem.Empty);
                                    }
                                } finally {
                                    if (Bridge.is($t, System.IDisposable)) {
                                        $t.System$IDisposable$dispose();
                                    }
                                }if (current === this.topAloud) {
                                    this.topAloud = (this.topAloud + 1) | 0;
                                }
                                this.board.set([x, y], (this.board.get([x, y]) + 1) | 0);
                                if (x !== 0) {
                                    this.ApplyGravity(((x - 1) | 0));
                                }
                                this.ApplyGravity(x);
                                if (x !== ((System.Array.getLength(this.board, 0) - 1) | 0)) {
                                    this.ApplyGravity(((x + 1) | 0));
                                }
                            }
                        }
                    }
                }
            },
            /**
             * Allows the game to run logic such as updating the world,
             checking for collisions, gathering input, and playing audio.
             *
             * @instance
             * @protected
             * @override
             * @this Farie_Alchemy.Game1
             * @memberof Farie_Alchemy.Game1
             * @param   {Microsoft.Xna.Framework.GameTime}    gameTime    Provides a snapshot of timing values.
             * @return  {void}
             */
            Update: function (gameTime) {
                var $t;
                //if (instance.State != SoundState.Playing && !controlled)
                //{
                //    instance.Play();
                //    controlled = true;
                //}
                // Allows the game to exit
                if (Microsoft.Xna.Framework.Input.GamePad.GetState(Microsoft.Xna.Framework.PlayerIndex.One).Buttons.Back === Microsoft.Xna.Framework.Input.ButtonState.Pressed) {
                    System.Environment.exit(0);
                }
                if (Microsoft.Xna.Framework.Input.Keyboard.GetState().IsKeyDown(Microsoft.Xna.Framework.Input.Keys.Escape)) {
                    System.Environment.exit(0);
                }

                // TODO: Add your update logic here

                var state = Microsoft.Xna.Framework.Input.Keyboard.GetState();
                var gState = Microsoft.Xna.Framework.Input.GamePad.GetState(Microsoft.Xna.Framework.PlayerIndex.One);
                if (this.jackpot) {
                    if (this.OrPressed(gState.$clone(), state.$clone(), [Bridge.box(Microsoft.Xna.Framework.Input.Keys.Enter, Microsoft.Xna.Framework.Input.Keys, $box_.Microsoft.Xna.Framework.Input.Keys.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.LeftStick, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString)])) {
                        this.jackpot = false;
                    }
                    Microsoft.Xna.Framework.Game.prototype.Update.call(this, gameTime);
                    return;
                } else if (this.highScoreList) {
                    if (this.OrPressed(gState.$clone(), state.$clone(), [Bridge.box(Microsoft.Xna.Framework.Input.Keys.H, Microsoft.Xna.Framework.Input.Keys, $box_.Microsoft.Xna.Framework.Input.Keys.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.RightThumbstickDown, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString)])) {
                        this.highScoreList = false;
                    }
                } else if (this.OrPressed(gState.$clone(), state.$clone(), [Bridge.box(Microsoft.Xna.Framework.Input.Keys.Up, Microsoft.Xna.Framework.Input.Keys, $box_.Microsoft.Xna.Framework.Input.Keys.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.Y, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.LeftThumbstickUp, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.DPadUp, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString)])) {
                    this.position = (this.position + 1) | 0;
                    this.position = this.position % Farie_Alchemy.Position.Count;
                } else if (this.OrPressed(gState.$clone(), state.$clone(), [Bridge.box(Microsoft.Xna.Framework.Input.Keys.Right, Microsoft.Xna.Framework.Input.Keys, $box_.Microsoft.Xna.Framework.Input.Keys.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.LeftThumbstickRight, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.B, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.DPadRight, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString)])) {
                    if (this.vectorPosition !== ((System.Array.getLength(this.board, 0) - 2) | 0)) {
                        this.vectorPosition = (this.vectorPosition + 1) | 0;
                    }
                } else if (this.OrPressed(gState.$clone(), state.$clone(), [Bridge.box(Microsoft.Xna.Framework.Input.Keys.A, Microsoft.Xna.Framework.Input.Keys, $box_.Microsoft.Xna.Framework.Input.Keys.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.LeftTrigger, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString)])) {
                    if (this.vectorPosition > 1) {
                        this.vectorPosition = (this.vectorPosition - 2) | 0;
                    } else {
                        if (this.vectorPosition !== 0) {
                            this.vectorPosition = (this.vectorPosition - 1) | 0;
                        }
                    }
                } else if (this.OrPressed(gState.$clone(), state.$clone(), [Bridge.box(Microsoft.Xna.Framework.Input.Keys.D, Microsoft.Xna.Framework.Input.Keys, $box_.Microsoft.Xna.Framework.Input.Keys.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.RightTrigger, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString)])) {
                    if (this.vectorPosition < ((System.Array.getLength(this.board, 0) - 3) | 0)) {
                        this.vectorPosition = (this.vectorPosition + 2) | 0;
                    } else {
                        if (this.vectorPosition !== ((System.Array.getLength(this.board, 0) - 2) | 0)) {
                            this.vectorPosition = (this.vectorPosition + 1) | 0;
                        }
                    }
                } else if (this.OrPressed(gState.$clone(), state.$clone(), [Bridge.box(Microsoft.Xna.Framework.Input.Keys.Left, Microsoft.Xna.Framework.Input.Keys, $box_.Microsoft.Xna.Framework.Input.Keys.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.LeftThumbstickLeft, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.X, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.DPadLeft, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString)])) {
                    if (this.vectorPosition !== 0) {
                        this.vectorPosition = (this.vectorPosition - 1) | 0;
                    }
                } else if (this.OrPressed(gState.$clone(), state.$clone(), [Bridge.box(Microsoft.Xna.Framework.Input.Keys.RightShift, Microsoft.Xna.Framework.Input.Keys, $box_.Microsoft.Xna.Framework.Input.Keys.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.RightShoulder, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.RightStick, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString)])) {
                    this.position += 2;
                    this.position = this.position % Farie_Alchemy.Position.Count;
                } else if (this.OrPressed(gState.$clone(), state.$clone(), [Bridge.box(Microsoft.Xna.Framework.Input.Keys.LeftShift, Microsoft.Xna.Framework.Input.Keys, $box_.Microsoft.Xna.Framework.Input.Keys.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.LeftShoulder, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.LeftStick, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString)])) {
                    this.position = (this.position - 1) | 0;
                    if (this.position === -1) {
                        this.position = 3;
                    }
                } else if (this.OrPressed(gState.$clone(), state.$clone(), [Bridge.box(Microsoft.Xna.Framework.Input.Keys.H, Microsoft.Xna.Framework.Input.Keys, $box_.Microsoft.Xna.Framework.Input.Keys.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.RightThumbstickDown, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString)])) {
                    this.highScoreList = true;
                } else if (this.OrPressed(gState.$clone(), state.$clone(), [Bridge.box(Microsoft.Xna.Framework.Input.Keys.Down, Microsoft.Xna.Framework.Input.Keys, $box_.Microsoft.Xna.Framework.Input.Keys.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.LeftThumbstickDown, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.A, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString), Bridge.box(Microsoft.Xna.Framework.Input.Buttons.DPadDown, Microsoft.Xna.Framework.Input.Buttons, $box_.Microsoft.Xna.Framework.Input.Buttons.toString)])) {
                    switch (this.position) {
                        case Farie_Alchemy.Position.down: 
                            {
                                var lost = true;
                                for (var y = (System.Array.getLength(this.board, 1) - 1) | 0; y > 0; y = (y - 1) | 0) {
                                    if (this.board.get([this.vectorPosition, y]) === Farie_Alchemy.MythicalItem.Empty) {
                                        this.board.set([this.vectorPosition, y], this.item2);
                                        this.board.set([this.vectorPosition, ((y - 1) | 0)], this.item1);
                                        lost = false;
                                        break;
                                    }
                                }
                                if (lost) {
                                    this.lost = true;
                                }
                                break;
                            }
                        case Farie_Alchemy.Position.normal: 
                            {
                                var firstFail = true;
                                var secondFail = true;
                                for (var y1 = (System.Array.getLength(this.board, 1) - 1) | 0; y1 >= 0; y1 = (y1 - 1) | 0) {
                                    if ((this.board.get([this.vectorPosition, y1]) === Farie_Alchemy.MythicalItem.Empty) && firstFail) {
                                        this.board.set([this.vectorPosition, y1], this.item1);
                                        firstFail = false;
                                    }
                                    if (this.board.get([((this.vectorPosition + 1) | 0), y1]) === Farie_Alchemy.MythicalItem.Empty && secondFail) {
                                        this.board.set([((this.vectorPosition + 1) | 0), y1], this.item2);
                                        secondFail = false;
                                    }
                                }
                                if (firstFail || secondFail) {
                                    this.lost = true;
                                }
                                break;
                            }
                        case Farie_Alchemy.Position.left: 
                            {
                                var firstFail1 = true;
                                var secondFail1 = true;
                                for (var y2 = (System.Array.getLength(this.board, 1) - 1) | 0; y2 >= 0; y2 = (y2 - 1) | 0) {
                                    if ((this.board.get([this.vectorPosition, y2]) === Farie_Alchemy.MythicalItem.Empty) && firstFail1) {
                                        this.board.set([this.vectorPosition, y2], this.item2);
                                        firstFail1 = false;
                                    }
                                    if (this.board.get([((this.vectorPosition + 1) | 0), y2]) === Farie_Alchemy.MythicalItem.Empty && secondFail1) {
                                        this.board.set([((this.vectorPosition + 1) | 0), y2], this.item1);
                                        secondFail1 = false;
                                    }
                                }
                                if (firstFail1 || secondFail1) {
                                    this.lost = true;
                                }
                                break;
                            }
                        case Farie_Alchemy.Position.up: 
                            {
                                var lost1 = true;
                                for (var y3 = (System.Array.getLength(this.board, 1) - 1) | 0; y3 > 0; y3 = (y3 - 1) | 0) {
                                    if (this.board.get([this.vectorPosition, y3]) === Farie_Alchemy.MythicalItem.Empty) {
                                        this.board.set([this.vectorPosition, y3], this.item1);
                                        this.board.set([this.vectorPosition, ((y3 - 1) | 0)], this.item2);
                                        lost1 = false;
                                        break;
                                    }
                                }
                                if (lost1) {
                                    this.lost = true;
                                }
                                break;
                            }
                    }
                    this.item1 = this.next.key;
                    this.item2 = this.next.value;
                    if (this.topAloud === 0) {
                        this.next = new (System.Collections.Generic.KeyValuePair$2(Farie_Alchemy.MythicalItem,Farie_Alchemy.MythicalItem))(0, 0);
                    } else if (this.topAloud === Farie_Alchemy.MythicalItem.Empty) {
                        this.next = new (System.Collections.Generic.KeyValuePair$2(Farie_Alchemy.MythicalItem,Farie_Alchemy.MythicalItem))(this.rnd.next$1(this.topAloud), this.rnd.next$1(this.topAloud));
                    } else {
                        this.next = new (System.Collections.Generic.KeyValuePair$2(Farie_Alchemy.MythicalItem,Farie_Alchemy.MythicalItem))(this.rnd.next$1(((this.topAloud + 1) | 0)), this.rnd.next$1(((this.topAloud + 1) | 0)));
                    }
                }
                this.oldState = state.$clone();
                this.oldGPadState = gState.$clone();
                this.BoardUpdate();
                this.points = 0;
                $t = Bridge.getEnumerator(this.board);
                try {
                    while ($t.moveNext()) {
                        var item = $t.Current;
                        if (item !== Farie_Alchemy.MythicalItem.Empty) {
                            this.points = (this.points + this.pointsGiven.get(item)) | 0;
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$dispose();
                    }
                }Microsoft.Xna.Framework.Game.prototype.Update.call(this, gameTime);
            },
            /**
             * This is called when the game should draw itself.
             *
             * @instance
             * @protected
             * @override
             * @this Farie_Alchemy.Game1
             * @memberof Farie_Alchemy.Game1
             * @param   {Microsoft.Xna.Framework.GameTime}    gameTime    Provides a snapshot of timing values.
             * @return  {void}
             */
            Draw: function (gameTime) {
                this.GraphicsDevice.Clear(Microsoft.Xna.Framework.Color.White.$clone());

                // TODO: Add your drawing code here

                this.spriteBatch.Begin();
                if (this.jackpot) {
                    var jackpotString = "You won a jackpot. Xbox use Left Stick to click. Keyboard use enter.";
                    //spriteBatch.DrawString(pointForm, jackpotString, new Vector2(GraphicsDevice.Viewport.Width / 2, 50) - (pointForm.MeasureString(jackpotString) / 2), Color.Black);
                } else {
                    var pointsText = "Points: " + this.points;
                    if (this.lost) {
                        pointsText = System.String.concat("You lost. Press ", (Microsoft.Xna.Framework.Input.GamePad.GetState(Microsoft.Xna.Framework.PlayerIndex.One).IsConnected ? "Back on the Xbox controller" : "Esc on the keyboard"), " to exit. You had ", this.points, " points.");
                    }
                    //spriteBatch.DrawString(pointForm, pointsText, new Vector2(GraphicsDevice.Viewport.Width / 2, 50) - (pointForm.MeasureString(pointsText) / 2), Color.Black);
                    if (!this.lost) {
                        var positionToDrawAt1 = Bridge.getDefaultValue(Microsoft.Xna.Framework.Vector2);
                        var positionToDrawAt2 = Bridge.getDefaultValue(Microsoft.Xna.Framework.Vector2);
                        var i2 = Microsoft.Xna.Framework.Color.White.$clone();
                        var i1 = Microsoft.Xna.Framework.Color.White.$clone();
                        switch (this.position) {
                            case Farie_Alchemy.Position.normal: 
                                {
                                    positionToDrawAt1 = new Microsoft.Xna.Framework.Vector2.$ctor2(Farie_Alchemy.Game1.position1X, Farie_Alchemy.Game1.position1Y);
                                    positionToDrawAt2 = new Microsoft.Xna.Framework.Vector2.$ctor2(Farie_Alchemy.Game1.position2X, Farie_Alchemy.Game1.position2Y);
                                    if (this.vectorPosition === ((System.Array.getLength(this.board, 0) - 2) | 0)) {
                                        i2 = this.specialColor.$clone();
                                    }
                                    break;
                                }
                            case Farie_Alchemy.Position.left: 
                                {
                                    positionToDrawAt1 = new Microsoft.Xna.Framework.Vector2.$ctor2(Farie_Alchemy.Game1.position2X, Farie_Alchemy.Game1.position2Y);
                                    positionToDrawAt2 = new Microsoft.Xna.Framework.Vector2.$ctor2(Farie_Alchemy.Game1.position1X, Farie_Alchemy.Game1.position1Y);
                                    if (this.vectorPosition === ((System.Array.getLength(this.board, 0) - 2) | 0)) {
                                        i1 = this.specialColor.$clone();
                                    }
                                    break;
                                }
                            case Farie_Alchemy.Position.down: 
                                {
                                    positionToDrawAt1 = new Microsoft.Xna.Framework.Vector2.$ctor2(Farie_Alchemy.Game1.position1X, Farie_Alchemy.Game1.position1Y);
                                    positionToDrawAt2 = new Microsoft.Xna.Framework.Vector2.$ctor2(Farie_Alchemy.Game1.position3X, Farie_Alchemy.Game1.position3Y);
                                    break;
                                }
                            case Farie_Alchemy.Position.up: 
                                {
                                    positionToDrawAt1 = new Microsoft.Xna.Framework.Vector2.$ctor2(Farie_Alchemy.Game1.position3X, Farie_Alchemy.Game1.position3Y);
                                    positionToDrawAt2 = new Microsoft.Xna.Framework.Vector2.$ctor2(Farie_Alchemy.Game1.position1X, Farie_Alchemy.Game1.position1Y);
                                    break;
                                }
                        }
                        positionToDrawAt1.X += (this.vectorPosition * Farie_Alchemy.Game1.positionTimes) | 0;
                        positionToDrawAt2.X += (this.vectorPosition * Farie_Alchemy.Game1.positionTimes) | 0;
                        if (this.items.get(this.item1) != null) {
                            this.spriteBatch.Draw$1(this.items.get(this.item1), positionToDrawAt1.$clone(), i1.$clone());
                        }
                        if (this.items.get(this.item2) != null) {
                            this.spriteBatch.Draw$1(this.items.get(this.item2), positionToDrawAt2.$clone(), i2.$clone());
                        }
                        for (var x = 0; x < System.Array.getLength(this.board, 0); x = (x + 1) | 0) {
                            for (var y = 0; y < System.Array.getLength(this.board, 1); y = (y + 1) | 0) {
                                if (this.items.get(this.board.get([x, y])) != null) {
                                    if (x === ((System.Array.getLength(this.board, 0) - 1) | 0)) {
                                        this.spriteBatch.Draw$1(this.items.get(this.board.get([x, y])), new Microsoft.Xna.Framework.Vector2.$ctor2(((x * 50) | 0), ((((y * 50) | 0) + 250) | 0)), this.specialColor.$clone());
                                    } else {
                                        Static.Draw$1(this.spriteBatch, this.items.get(this.board.get([x, y])), new Microsoft.Xna.Framework.Vector2.$ctor2(((x * 50) | 0), ((((y * 50) | 0) + 250) | 0)));
                                    }
                                }
                            }
                        }
                        for (var y1 = 0; y1 < System.Array.getLength(this.board, 1); y1 = (y1 + 1) | 0) {
                            Static.Draw(this.spriteBatch, this.black, new Microsoft.Xna.Framework.Rectangle.$ctor2(((System.Array.getLength(this.board, 0) * 50) | 0), ((((y1 * 50) | 0) + 250) | 0), 32, 32));
                        }
                        Static.Draw(this.spriteBatch, this.items.get(this.next.key), new Microsoft.Xna.Framework.Rectangle.$ctor2((((((System.Array.getLength(this.board, 0) + 4) | 0)) * 50) | 0), 250, 32, 32));
                        Static.Draw(this.spriteBatch, this.items.get(this.next.value), new Microsoft.Xna.Framework.Rectangle.$ctor2((((((System.Array.getLength(this.board, 0) + 5) | 0)) * 50) | 0), 250, 32, 32));
                        for (var y2 = 0, enumIndex = this.topAloud; enumIndex >= 0; y2 = (y2 + 1) | 0, enumIndex = (enumIndex - 1) | 0) {
                            if (enumIndex === Farie_Alchemy.MythicalItem.Empty) {
                                y2 = (y2 - 1) | 0;
                                continue;
                            }
                            if (this.items.get(enumIndex) != null) {
                                Static.Draw(this.spriteBatch, this.items.get(enumIndex), new Microsoft.Xna.Framework.Rectangle.$ctor2((((((System.Array.getLength(this.board, 0) + 1) | 0)) * 50) | 0), ((((y2 * 50) | 0) + 250) | 0), 32, 32));
                                //spriteBatch.DrawString(pointForm, Convert.ToString(pointsGiven[(MythicalItem)enumIndex]), new Vector2((board.GetLength(0) + 2) * 50, y * 50 + 250), Color.Black);                     
                            }
                        }
                        for (var x1 = 0; x1 < System.Array.getLength(this.board, 0); x1 = (x1 + 1) | 0) {
                            Static.Draw(this.spriteBatch, this.black, new Microsoft.Xna.Framework.Rectangle.$ctor2(((x1 * 50) | 0), (((((System.Array.getLength(this.board, 1) * 50) | 0)) + 250) | 0), 32, 32));
                        }
                    } else {
                        var nameText = System.String.concat("Name: ", this.name);
                        //spriteBatch.DrawString(pointForm, nameText, new Vector2(GraphicsDevice.Viewport.Width / 2, 100 + pointForm.MeasureString(pointsText).Y) - (pointForm.MeasureString(nameText) / 2), Color.Black);
                    }
                }
                this.spriteBatch.End();

                Microsoft.Xna.Framework.Game.prototype.Draw.call(this, gameTime);
            }
        }
    });

    Bridge.define("Farie_Alchemy.MythicalItem", {
        $kind: "enum",
        statics: {
            fields: {
                carrot: 0,
                cake: 1,
                rabbit: 2,
                duck: 3,
                pony: 4,
                unicorn: 5,
                dragon: 6,
                star: 7,
                Jackpot: 8,
                moon: 9,
                earth: 10,
                sun: 11,
                angel: 12,
                wish: 13,
                god: 14,
                Empty: 15,
                Count: 16
            }
        }
    });

    Bridge.define("Farie_Alchemy.Position", {
        $kind: "enum",
        statics: {
            fields: {
                /**
                 * eg. rabbit, cake
                 *
                 * @static
                 * @public
                 * @memberof Farie_Alchemy.Position
                 * @constant
                 * @default 0
                 * @type Farie_Alchemy.Position
                 */
                normal: 0,
                /**
                 * eg. rabbit
                 cake
                 *
                 * @static
                 * @public
                 * @memberof Farie_Alchemy.Position
                 * @constant
                 * @default 1
                 * @type Farie_Alchemy.Position
                 */
                down: 1,
                /**
                 * eg. cake, rabbit
                 *
                 * @static
                 * @public
                 * @memberof Farie_Alchemy.Position
                 * @constant
                 * @default 2
                 * @type Farie_Alchemy.Position
                 */
                left: 2,
                /**
                 * eg. cake
                 rabbit
                 *
                 * @static
                 * @public
                 * @memberof Farie_Alchemy.Position
                 * @constant
                 * @default 3
                 * @type Farie_Alchemy.Position
                 */
                up: 3,
                Count: 4
            }
        }
    });

    Bridge.define("Farie_Alchemy.Program", {
        /**
         * The main entry point for the application.
         *
         * @static
         * @private
         * @this Farie_Alchemy.Program
         * @memberof Farie_Alchemy.Program
         * @param   {Array.<string>}    args
         * @return  {void}
         */
        main: function Main (args) {
            var game = new Farie_Alchemy.Game1();
            try {
                game.Run();
            }
            finally {
                if (Bridge.hasValue(game)) {
                    game.System$IDisposable$dispose();
                }
            }
        }
    });

    Bridge.define("Static", {
        statics: {
            methods: {
                Draw$1: function (spriteBatch, texture, position) {
                    spriteBatch.Draw$1(texture, position.$clone(), Microsoft.Xna.Framework.Color.White.$clone());
                },
                Draw: function (spriteBatch, texture, rect) {
                    spriteBatch.Draw(texture, rect.$clone(), Microsoft.Xna.Framework.Color.White.$clone());
                }
            }
        }
    });

    var $box_ = {};

    Bridge.ns("Microsoft.Xna.Framework.Input.Keys", $box_);

    Bridge.apply($box_.Microsoft.Xna.Framework.Input.Keys, {
        toString: function (obj) { return System.Enum.toString(Microsoft.Xna.Framework.Input.Keys, obj); }
    });

    Bridge.ns("Microsoft.Xna.Framework.Input.Buttons", $box_);

    Bridge.apply($box_.Microsoft.Xna.Framework.Input.Buttons, {
        toString: function (obj) { return System.Enum.toString(Microsoft.Xna.Framework.Input.Buttons, obj); }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJHYW1lMS5jcyIsIlByb2dyYW0uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FpYytCQTtzQ0FDQUE7O3NDQUVBQTtzQ0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FuTkNBOzs7O21DQXNNb0JBLDZDQUFlQSw0QkFBYUE7Z0NBb0JwREE7Ozs7Ozs7Z0JBM1hoQkEsZ0JBQVdBLElBQUlBLDhDQUFzQkE7Z0JBQ3JDQTtnQkFDQUE7Z0JBQ0FBO2dCQUNBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQWFBQSxhQUFRQTtnQkFDUkEsS0FBS0EsV0FBV0EsSUFBSUEsdUNBQW1CQTtvQkFFbkNBLEtBQUtBLFdBQVdBLElBQUlBLHVDQUFvQkE7d0JBRXBDQSxnQkFBTUEsR0FBRUEsSUFBS0E7OztnQkFHckJBLFdBQU1BLElBQUlBO2dCQUNWQSxhQUFRQTtnQkFDUkEsYUFBUUE7Z0JBQ1JBLG9CQUFlQTtnQkFDZkEsMEJBQThCQSxzQkFBZUEsQUFBT0E7Ozs7d0JBRWhEQSxxQkFBZ0JBLE1BQU1BLGtCQUFLQSxZQUFZQSxBQUFLQTs7Ozs7OztnQkFHaERBOzs7Ozs7Ozs7Ozs7Ozs7Z0JBVUFBLG1CQUFjQSxJQUFJQSw2Q0FBWUE7OztnQkFHOUJBLGFBQVFBLDZDQUFlQSw0QkFBY0E7Z0JBQ3JDQSxlQUFVQSxpQ0FBbUJBO2dCQUM3QkEsZUFBVUEsbUNBQXFCQTtnQkFDL0JBLGVBQVVBLGlDQUFtQkE7Z0JBQzdCQSxlQUFVQSxpQ0FBbUJBO2dCQUM3QkEsZUFBVUEsbUNBQXFCQTtnQkFDL0JBLGVBQVVBLGlDQUFtQkE7Z0JBQzdCQSxlQUFVQSxvQ0FBc0JBO2dCQUNoQ0EsZUFBVUEsbUNBQXFCQTtnQkFDL0JBLGVBQVVBLG9DQUFzQkE7Z0JBQ2hDQSxlQUFVQSxpQ0FBbUJBO2dCQUM3QkEsZUFBVUEsa0NBQW9CQTtnQkFDOUJBLGVBQVVBLGdDQUFrQkE7Z0JBQzVCQSxlQUFVQSxnQ0FBa0JBO2dCQUM1QkEsZUFBVUEsaUNBQW1CQTtnQkFDN0JBLGVBQVVBLGtDQUFvQkE7Z0JBQzlCQSxlQUFVQSxrQ0FBb0JBO2dCQUM5QkEsYUFBUUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQWdCV0EsUUFBcUJBLE9BQXFCQTs7O2dCQUU3REEsMEJBQWtCQTs7Ozt3QkFFZEEsSUFBSUE7NEJBRUFBLElBQUlBLGdCQUFnQkEscUNBQW9DQSxvQ0FBTUEsc0JBQWlCQSxxQ0FBb0NBO2dDQUMvR0E7OytCQUVIQSxJQUFJQTs0QkFFTEEsSUFBSUEsb0JBQW9CQSxxQ0FBU0Esb0NBQU1BLDZCQUF3QkEscUNBQVNBO2dDQUNwRUE7Ozs7Ozs7O2lCQUdaQTs7b0NBR3NCQTtnQkFFdEJBO2dCQUNBQSxLQUFLQSxRQUFRQSxpREFBd0JBLFFBQVFBO29CQUV6Q0EsSUFBSUEsZ0JBQU1BLEdBQUdBLFFBQU1BO3dCQUFvQkE7O3dCQUduQ0EsSUFBSUE7NEJBRUFBLGdCQUFNQSxHQUFHQSxNQUFJQSxvQkFBZUEsZ0JBQU1BLEdBQUdBOzRCQUNyQ0EsZ0JBQU1BLEdBQUdBLElBQUtBOzs7Ozs7O2dCQVExQkEsS0FBS0EsV0FBV0EsSUFBSUEsdUNBQW9CQTtvQkFFcENBLEtBQUtBLFdBQVdBLElBQUlBLHVDQUFvQkE7d0JBRXBDQSxjQUF1QkEsZ0JBQU1BLEdBQUdBO3dCQUNoQ0EsSUFBSUEsWUFBV0E7NEJBRVhBLFNBQWtCQTs0QkFDbEJBLElBQUlBO2dDQUNBQSxLQUFLQSxnQkFBTUEsR0FBR0E7OzRCQUNsQkEsV0FBb0JBOzRCQUNwQkEsSUFBSUEsTUFBS0E7Z0NBQ0xBLE9BQU9BLGdCQUFNQSxHQUFHQTs7NEJBQ3BCQSxXQUFvQkE7NEJBQ3BCQSxJQUFJQTtnQ0FDQUEsT0FBT0EsZ0JBQU1BLGVBQU9BOzs0QkFDeEJBLFlBQXFCQTs0QkFDckJBLElBQUlBLE1BQUtBO2dDQUNMQSxRQUFRQSxnQkFBTUEsZUFBT0E7OzRCQUN6QkEsY0FBdUNBLEtBQUlBOzRCQUMzQ0EsSUFBSUEsT0FBTUE7Z0NBQVNBLFlBQVlBLEtBQUlBLHNFQUF1QkEsR0FBR0E7OzRCQUM3REEsSUFBSUEsU0FBUUE7Z0NBQVNBLFlBQVlBLEtBQUlBLHNFQUF1QkEsR0FBR0E7OzRCQUMvREEsSUFBSUEsU0FBUUE7Z0NBQVNBLFlBQVlBLEtBQUlBLHNFQUF1QkEsZUFBT0E7OzRCQUNuRUEsSUFBSUEsVUFBU0E7Z0NBQVNBLFlBQVlBLEtBQUlBLHNFQUF1QkEsZUFBT0E7OzRCQUNwRUEsSUFBSUE7Z0NBRUFBLElBQUlBLFlBQVdBO29DQUErQ0E7O2dDQUM5REEsMEJBQXlDQTs7Ozt3Q0FFckNBLGdCQUFNQSxXQUFXQSxjQUFlQTs7Ozs7O2lDQUVwQ0EsSUFBSUEsWUFBV0E7b0NBQVVBOztnQ0FDekJBLGdCQUFNQSxHQUFHQSxJQUFUQSxpQkFBTUEsR0FBR0E7Z0NBQ1RBLElBQUlBO29DQUNBQSxrQkFBYUE7O2dDQUNqQkEsa0JBQWFBO2dDQUNiQSxJQUFJQSxNQUFLQTtvQ0FDVEEsa0JBQWFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQWlCRkE7Ozs7Ozs7O2dCQVEzQkEsSUFBSUEsK0NBQWlCQSwwREFBaUNBO29CQUNsREE7O2dCQUNKQSxJQUFJQSw0REFBOEJBO29CQUM5QkE7Ozs7O2dCQUlKQSxZQUFzQkE7Z0JBQ3RCQSxhQUFzQkEsK0NBQWlCQTtnQkFDdkNBLElBQUlBO29CQUVBQSxJQUFJQSxlQUFVQSxpQkFBUUEsaUJBQU9BLDZJQUEwQ0E7d0JBQW9CQTs7b0JBQzNGQSx5REFBWUE7b0JBQ1pBO3VCQUVDQSxJQUFJQTtvQkFFTEEsSUFBSUEsZUFBVUEsaUJBQVFBLGlCQUFPQSx5SUFBc0NBO3dCQUE4QkE7O3VCQUVoR0EsSUFBSUEsZUFBVUEsaUJBQVFBLGlCQUFPQSwwSUFBdUNBLGtKQUFXQSxpS0FBMEJBO29CQUUxR0E7b0JBQ0FBLGdCQUFXQSxBQUFVQSxBQUFDQSxBQUFLQSxnQkFBV0EsQUFBS0E7dUJBRTFDQSxJQUFJQSxlQUFVQSxpQkFBUUEsaUJBQU9BLDZJQUEwQ0Esb0tBQTZCQSxrSkFBV0E7b0JBRWhIQSxJQUFJQSx3QkFBa0JBO3dCQUNsQkE7O3VCQUVIQSxJQUFJQSxlQUFVQSxpQkFBUUEsaUJBQU9BLHlJQUFzQ0E7b0JBRXBFQSxJQUFJQTt3QkFDQUE7O3dCQUNDQSxJQUFJQTs0QkFDTEE7Ozt1QkFFSEEsSUFBSUEsZUFBVUEsaUJBQVFBLGlCQUFPQSx5SUFBc0NBO29CQUVwRUEsSUFBSUEsc0JBQWlCQTt3QkFDakJBOzt3QkFDQ0EsSUFBSUEsd0JBQWtCQTs0QkFDdkJBOzs7dUJBRUhBLElBQUlBLGVBQVVBLGlCQUFRQSxpQkFBT0EsNElBQXlDQSxtS0FBNEJBLGtKQUFXQTtvQkFFOUdBLElBQUlBO3dCQUNKQTs7dUJBRUNBLElBQUlBLGVBQVVBLGlCQUFRQSxpQkFBT0Esa0pBQStDQSw4SkFBdUJBO29CQUVwR0E7b0JBQ0FBLGdCQUFXQSxBQUFVQSxBQUFDQSxBQUFLQSxnQkFBV0EsQUFBS0E7dUJBRTFDQSxJQUFJQSxlQUFVQSxpQkFBUUEsaUJBQU9BLGlKQUE4Q0EsNkpBQXNCQTtvQkFFbEdBO29CQUNBQSxJQUFJQSxBQUFLQSxrQkFBWUE7d0JBQ2pCQSxnQkFBV0E7O3VCQUVkQSxJQUFJQSxlQUFVQSxpQkFBUUEsaUJBQU9BLHlJQUFzQ0E7b0JBRXBFQTt1QkFFQ0EsSUFBSUEsZUFBVUEsaUJBQVFBLGlCQUFPQSw0SUFBeUNBLG1LQUE0QkEsa0pBQVdBO29CQUU5R0EsUUFBUUE7d0JBRUpBLEtBQUtBOztnQ0FFR0E7Z0NBQ0FBLEtBQUtBLFFBQVFBLGlEQUF3QkEsT0FBT0E7b0NBRXhDQSxJQUFJQSxnQkFBTUEscUJBQWdCQSxRQUFNQTt3Q0FFNUJBLGdCQUFNQSxxQkFBZ0JBLElBQUtBO3dDQUMzQkEsZ0JBQU1BLHFCQUFnQkEsZ0JBQVNBO3dDQUMvQkE7d0NBQ0FBOzs7Z0NBR1JBLElBQUlBO29DQUNBQTs7Z0NBQ0pBOzt3QkFFUkEsS0FBS0E7O2dDQUVHQTtnQ0FDQUE7Z0NBQ0FBLEtBQUtBLFNBQVFBLGlEQUF3QkEsU0FBUUE7b0NBRXpDQSxJQUFJQSxDQUFDQSxnQkFBTUEscUJBQWdCQSxTQUFNQSxxQ0FBdUJBO3dDQUVwREEsZ0JBQU1BLHFCQUFnQkEsS0FBS0E7d0NBQzNCQTs7b0NBRUpBLElBQUlBLGdCQUFNQSxpQ0FBb0JBLFNBQU1BLG9DQUFzQkE7d0NBRXREQSxnQkFBTUEsaUNBQW9CQSxLQUFLQTt3Q0FDL0JBOzs7Z0NBR1JBLElBQUlBLGFBQWFBO29DQUViQTs7Z0NBRUpBOzt3QkFFUkEsS0FBS0E7O2dDQUVHQTtnQ0FDQUE7Z0NBQ0FBLEtBQUtBLFNBQVFBLGlEQUF3QkEsU0FBUUE7b0NBRXpDQSxJQUFJQSxDQUFDQSxnQkFBTUEscUJBQWdCQSxTQUFNQSxxQ0FBdUJBO3dDQUVwREEsZ0JBQU1BLHFCQUFnQkEsS0FBS0E7d0NBQzNCQTs7b0NBRUpBLElBQUlBLGdCQUFNQSxpQ0FBb0JBLFNBQU1BLG9DQUFzQkE7d0NBRXREQSxnQkFBTUEsaUNBQW9CQSxLQUFLQTt3Q0FDL0JBOzs7Z0NBR1JBLElBQUlBLGNBQWFBO29DQUViQTs7Z0NBRUpBOzt3QkFFUkEsS0FBS0E7O2dDQUVHQTtnQ0FDQUEsS0FBS0EsU0FBUUEsaURBQXdCQSxRQUFPQTtvQ0FFeENBLElBQUlBLGdCQUFNQSxxQkFBZ0JBLFNBQU1BO3dDQUU1QkEsZ0JBQU1BLHFCQUFnQkEsS0FBS0E7d0NBQzNCQSxnQkFBTUEscUJBQWdCQSxpQkFBU0E7d0NBQy9CQTt3Q0FDQUE7OztnQ0FHUkEsSUFBSUE7b0NBQ0FBOztnQ0FDSkE7OztvQkFHWkEsYUFBUUE7b0JBQ1JBLGFBQVFBO29CQUNSQSxJQUFJQSxrQkFBWUE7d0JBRVpBLFlBQU9BLEtBQUlBLGtHQUF3Q0EsR0FBaUJBOzJCQUVuRUEsSUFBSUEsa0JBQVlBO3dCQUVqQkEsWUFBT0EsS0FBSUEsa0dBQ1hBLEFBQWNBLGdCQUFTQSxBQUFLQSxnQkFDNUJBLEFBQWNBLGdCQUFTQSxBQUFLQTs7d0JBSzVCQSxZQUFPQSxLQUFJQSxrR0FDWEEsQUFBY0EsZ0JBQVNBLEVBQUNBLEFBQUtBLDBCQUM3QkEsQUFBY0EsZ0JBQVNBLEVBQUNBLEFBQUtBOzs7Z0JBSXJDQSxnQkFBV0E7Z0JBQ1hBLG9CQUFlQTtnQkFDZkE7Z0JBQ0FBO2dCQUNBQSwwQkFBOEJBOzs7O3dCQUUxQkEsSUFBSUEsU0FBUUE7NEJBQ1JBLDZCQUFVQSxxQkFBWUE7Ozs7Ozs7aUJBRTlCQSx5REFBWUE7Ozs7Ozs7Ozs7Ozs7NEJBa0NhQTtnQkFFekJBLDBCQUFxQkE7Ozs7Z0JBSXJCQTtnQkFDQUEsSUFBSUE7b0JBRUFBOzs7b0JBS0FBLGlCQUFvQkEsYUFBYUE7b0JBQ2pDQSxJQUFJQTt3QkFBV0EsYUFBYUEseUNBQXFCQSxDQUFDQSwrQ0FBaUJBLHFJQUErR0E7OztvQkFFbExBLElBQUlBLENBQUNBO3dCQUVEQSx3QkFBNEJBO3dCQUM1QkEsd0JBQTRCQTt3QkFDNUJBLFNBQVdBO3dCQUNYQSxTQUFXQTt3QkFDWEEsUUFBUUE7NEJBRUpBLEtBQUtBOztvQ0FFR0Esb0JBQW9CQSxJQUFJQSx1Q0FBUUEsZ0NBQVlBO29DQUM1Q0Esb0JBQW9CQSxJQUFJQSx1Q0FBUUEsZ0NBQVlBO29DQUM1Q0EsSUFBSUEsd0JBQWtCQTt3Q0FDbEJBLEtBQUtBOztvQ0FDVEE7OzRCQUVSQSxLQUFLQTs7b0NBRUdBLG9CQUFvQkEsSUFBSUEsdUNBQVFBLGdDQUFZQTtvQ0FDNUNBLG9CQUFvQkEsSUFBSUEsdUNBQVFBLGdDQUFZQTtvQ0FDNUNBLElBQUlBLHdCQUFrQkE7d0NBQ2xCQSxLQUFLQTs7b0NBQ1RBOzs0QkFFUkEsS0FBS0E7O29DQUVHQSxvQkFBb0JBLElBQUlBLHVDQUFRQSxnQ0FBWUE7b0NBQzVDQSxvQkFBb0JBLElBQUlBLHVDQUFRQSxnQ0FBWUE7b0NBQzVDQTs7NEJBRVJBLEtBQUtBOztvQ0FFR0Esb0JBQW9CQSxJQUFJQSx1Q0FBUUEsZ0NBQVlBO29DQUM1Q0Esb0JBQW9CQSxJQUFJQSx1Q0FBUUEsZ0NBQVlBO29DQUM1Q0E7Ozt3QkFHWkEsdUJBQXVCQSx1QkFBaUJBO3dCQUN4Q0EsdUJBQXVCQSx1QkFBaUJBO3dCQUN4Q0EsSUFBSUEsZUFBTUEsZUFBVUE7NEJBQ3BCQSx3QkFBaUJBLGVBQU1BLGFBQVFBLDRCQUFtQkE7O3dCQUNsREEsSUFBSUEsZUFBTUEsZUFBVUE7NEJBQ3BCQSx3QkFBaUJBLGVBQU1BLGFBQVFBLDRCQUFtQkE7O3dCQUNsREEsS0FBS0EsV0FBV0EsSUFBSUEsdUNBQW9CQTs0QkFFcENBLEtBQUtBLFdBQVdBLElBQUlBLHVDQUFvQkE7Z0NBRXBDQSxJQUFJQSxlQUFNQSxnQkFBTUEsR0FBR0EsUUFBT0E7b0NBQ3RCQSxJQUFJQSxNQUFLQTt3Q0FDTEEsd0JBQWlCQSxlQUFNQSxnQkFBTUEsR0FBR0EsTUFBS0EsSUFBSUEsdUNBQVFBLGdCQUFRQSwrQkFBZUE7O3dDQUV4RUEsZ0NBQWlCQSxlQUFNQSxnQkFBTUEsR0FBR0EsTUFBS0EsSUFBSUEsdUNBQVFBLGdCQUFRQTs7Ozs7d0JBR3pFQSxLQUFLQSxZQUFXQSxLQUFJQSx1Q0FBb0JBOzRCQUVwQ0EsOEJBQWlCQSxZQUFPQSxJQUFJQSx5Q0FBVUEsb0RBQXlCQTs7d0JBRS9EQSw4QkFBaUJBLGVBQU1BLGdCQUFhQSxJQUFJQSx5Q0FBVUEsR0FBQ0E7d0JBQ25EQSw4QkFBaUJBLGVBQU1BLGtCQUFhQSxJQUFJQSx5Q0FBVUEsR0FBQ0E7d0JBQ3ZEQSxLQUFLQSx3QkFBdUJBLEFBQUtBLGVBQVVBLGdCQUFnQkEsbUJBQUtBOzRCQUU1REEsSUFBSUEsQUFBY0EsY0FBYUE7Z0NBRTNCQTtnQ0FBS0E7OzRCQUVUQSxJQUFJQSxlQUFNQSxBQUFjQSxjQUFjQTtnQ0FFbENBLDhCQUFpQkEsZUFBTUEsQUFBY0EsWUFBWUEsSUFBSUEseUNBQVVBLEdBQUNBLCtEQUE4QkE7Ozs7d0JBSXRHQSxLQUFLQSxZQUFXQSxLQUFJQSx1Q0FBb0JBOzRCQUVwQ0EsOEJBQWlCQSxZQUFPQSxJQUFJQSx5Q0FBVUEsaUJBQVFBLEdBQUNBOzs7d0JBS25EQSxlQUFrQkEsK0JBQVdBOzs7O2dCQUlyQ0E7O2dCQUVBQSx1REFBVUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkNyakJHQTtZQUViQSxXQUFvQkEsSUFBSUE7O2dCQUVwQkE7Ozs7Ozs7Ozs7Ozs7a0NEdWpCZ0JBLGFBQThCQSxTQUFtQkE7b0JBRXJFQSxtQkFBaUJBLFNBQVNBLG1CQUFVQTs7Z0NBRWhCQSxhQUE4QkEsU0FBbUJBO29CQUVyRUEsaUJBQWlCQSxTQUFTQSxlQUFNQSIsCiAgInNvdXJjZXNDb250ZW50IjogWyJ1c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbi8vdXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuQXVkaW87XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkNvbnRlbnQ7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dDtcclxuLy91c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5NZWRpYTtcclxuXHJcbm5hbWVzcGFjZSBGYXJpZV9BbGNoZW15XHJcbntcclxuICAgIGVudW0gTXl0aGljYWxJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgY2Fycm90LCBjYWtlLCByYWJiaXQsIGR1Y2ssIHBvbnksIHVuaWNvcm4sIGRyYWdvbiwgc3RhciwgSmFja3BvdCwgbW9vbiwgZWFydGgsIHN1biwgYW5nZWwsIHdpc2gsIGdvZCwgRW1wdHksIENvdW50XHJcbiAgICB9XHJcbiAgICBlbnVtIFBvc2l0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBlZy4gcmFiYml0LCBjYWtlXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBub3JtYWwsXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBlZy4gcmFiYml0XHJcbiAgICAgICAgLy8vIGNha2VcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIGRvd24sXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBlZy4gY2FrZSwgcmFiYml0XHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBsZWZ0LFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gZWcuIGNha2VcclxuICAgICAgICAvLy8gcmFiYml0XHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICB1cCxcclxuICAgICAgICBDb3VudCxcclxuICAgIH1cclxuICAgIC8vY2xhc3MgQnV0dG9uXHJcbiAgICAvL3tcclxuICAgIC8vICAgIHB1YmxpYyBkZWxlZ2F0ZSBNb3VzZVN0YXRlIE1vdXNlU3RhdGVHZXQoKTtcclxuICAgIC8vICAgIFJlY3RhbmdsZSByZWN0O1xyXG4gICAgLy8gICAgU3ByaXRlRm9udCBmb250O1xyXG4gICAgLy8gICAgc3RyaW5nIHRleHQ7XHJcbiAgICAvLyAgICBwdWJsaWMgdm9pZCBEcmF3IChTcHJpdGVCYXRjaCBiYXRjaClcclxuICAgIC8vICAgIHtcclxuICAgIC8vICAgICAgICBiYXRjaC5EcmF3U3RyaW5nKGZvbnQsIHRleHQsIHJlY3QuQ2VudGVyLCBjb2xvcik7XHJcbiAgICAvLyAgICB9XHJcbiAgICAvLyAgICBwdWJsaWMgdm9pZCBVcGRhdGUgKE1vdXNlU3RhdGVHZXQgbW91c2VTdGF0ZSA9IG51bGwpXHJcbiAgICAvLyAgICB7XHJcbiAgICAvLyAgICAgICAgaWYgKG1vdXNlU3RhdGUgPT0gbnVsbCkgbW91c2VTdGF0ZSA9IE1vdXNlLkdldFN0YXRlO1xyXG4gICAgLy8gICAgICAgICBVcGRhdGUobW91c2VTdGF0ZSgpKTtcclxuICAgIC8vICAgIH1cclxuICAgIC8vICAgIHB1YmxpYyB2b2lkIFVwZGF0ZSAoTW91c2VTdGF0ZSBzdGF0ZSlcclxuICAgIC8vICAgIHtcclxuXHJcbiAgICAvLyAgICB9XHJcbiAgICAvLyAgICBwdWJsaWMgQnV0dG9uIChzdHJpbmcgdGV4dCwgU3ByaXRlRm9udCBmb250KVxyXG4gICAgLy8gICAge1xyXG5cclxuICAgIC8vICAgIH1cclxuICAgIC8vfVxyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFRoaXMgaXMgdGhlIG1haW4gdHlwZSBmb3IgeW91ciBnYW1lXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIEdhbWUxIDogTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR2FtZVxyXG4gICAge1xyXG4gICAgICAgIEdyYXBoaWNzRGV2aWNlTWFuYWdlciBncmFwaGljcztcclxuICAgICAgICBTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaDtcclxuICAgICAgICBpbnQgcG9pbnRzID0gMDtcclxuICAgICAgICAvL1Nwcml0ZUZvbnQgcG9pbnRGb3JtO1xyXG4gICAgICAgIERpY3Rpb25hcnk8TXl0aGljYWxJdGVtLCBUZXh0dXJlMkQ+IGl0ZW1zO1xyXG4gICAgICAgIC8vU291bmRFZmZlY3RJbnN0YW5jZSBpbnN0YW5jZTtcclxuICAgICAgICBNeXRoaWNhbEl0ZW0gaXRlbTE7XHJcbiAgICAgICAgTXl0aGljYWxJdGVtIGl0ZW0yO1xyXG4gICAgICAgIFJhbmRvbSBybmQ7XHJcbiAgICAgICAgTXl0aGljYWxJdGVtWyxdIGJvYXJkO1xyXG4gICAgICAgIGJvb2wgamFja3BvdDtcclxuXHJcbiAgICAgICAgcHVibGljIEdhbWUxKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzID0gbmV3IEdyYXBoaWNzRGV2aWNlTWFuYWdlcih0aGlzKTtcclxuICAgICAgICAgICAgQ29udGVudC5Sb290RGlyZWN0b3J5ID0gXCJDb250ZW50XCI7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLlByZWZlcnJlZEJhY2tCdWZmZXJIZWlnaHQgPSA3Njg7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLlByZWZlcnJlZEJhY2tCdWZmZXJXaWR0aCA9IDEwMDA7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLklzRnVsbFNjcmVlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFsbG93cyB0aGUgZ2FtZSB0byBwZXJmb3JtIGFueSBpbml0aWFsaXphdGlvbiBpdCBuZWVkcyB0byBiZWZvcmUgc3RhcnRpbmcgdG8gcnVuLlxyXG4gICAgICAgIC8vLyBUaGlzIGlzIHdoZXJlIGl0IGNhbiBxdWVyeSBmb3IgYW55IHJlcXVpcmVkIHNlcnZpY2VzIGFuZCBsb2FkIGFueSBub24tZ3JhcGhpY1xyXG4gICAgICAgIC8vLyByZWxhdGVkIGNvbnRlbnQuICBDYWxsaW5nIGJhc2UuSW5pdGlhbGl6ZSB3aWxsIGVudW1lcmF0ZSB0aHJvdWdoIGFueSBjb21wb25lbnRzXHJcbiAgICAgICAgLy8vIGFuZCBpbml0aWFsaXplIHRoZW0gYXMgd2VsbC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXRpYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogQWRkIHlvdXIgaW5pdGlhbGl6YXRpb24gbG9naWMgaGVyZVxyXG5cclxuICAgICAgICAgICAgYm9hcmQgPSBuZXcgTXl0aGljYWxJdGVtWzksIDhdO1xyXG4gICAgICAgICAgICBmb3IgKGludCB4ID0gMDsgeCA8IGJvYXJkLkdldExlbmd0aCgwKTt4KysgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCB5ID0gMDsgeSA8IGJvYXJkLkdldExlbmd0aCgxKTsgeSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvYXJkW3gseV0gPSBNeXRoaWNhbEl0ZW0uRW1wdHk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm5kID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgICAgICBpdGVtMSA9IChNeXRoaWNhbEl0ZW0pMDtcclxuICAgICAgICAgICAgaXRlbTIgPSAoTXl0aGljYWxJdGVtKTA7XHJcbiAgICAgICAgICAgIHNwZWNpYWxDb2xvciA9IENvbG9yLlR1cnF1b2lzZTtcclxuICAgICAgICAgICAgZm9yZWFjaCAoTXl0aGljYWxJdGVtIGl0ZW0gaW4gRW51bS5HZXRWYWx1ZXModHlwZW9mKE15dGhpY2FsSXRlbSkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwb2ludHNHaXZlbi5BZGQoaXRlbSwgKGludClNYXRoLlBvdygzLCAoaW50KWl0ZW0pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmFzZS5Jbml0aWFsaXplKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIExvYWRDb250ZW50IHdpbGwgYmUgY2FsbGVkIG9uY2UgcGVyIGdhbWUgYW5kIGlzIHRoZSBwbGFjZSB0byBsb2FkXHJcbiAgICAgICAgLy8vIGFsbCBvZiB5b3VyIGNvbnRlbnQuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBMb2FkQ29udGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgU3ByaXRlQmF0Y2gsIHdoaWNoIGNhbiBiZSB1c2VkIHRvIGRyYXcgdGV4dHVyZXMuXHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoID0gbmV3IFNwcml0ZUJhdGNoKEdyYXBoaWNzRGV2aWNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IHVzZSB0aGlzLkNvbnRlbnQgdG8gbG9hZCB5b3VyIGdhbWUgY29udGVudCBoZXJlXHJcbiAgICAgICAgICAgIGl0ZW1zID0gbmV3IERpY3Rpb25hcnk8TXl0aGljYWxJdGVtLCBUZXh0dXJlMkQ+KChpbnQpTXl0aGljYWxJdGVtLkNvdW50KTtcclxuICAgICAgICAgICAgaXRlbXMuQWRkKE15dGhpY2FsSXRlbS5jYWtlLCBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcImNha2VcIikpO1xyXG4gICAgICAgICAgICBpdGVtcy5BZGQoTXl0aGljYWxJdGVtLmNhcnJvdCwgQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJjYXJyb3RcIikpO1xyXG4gICAgICAgICAgICBpdGVtcy5BZGQoTXl0aGljYWxJdGVtLnBvbnksIENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiaG9yc2VcIikpO1xyXG4gICAgICAgICAgICBpdGVtcy5BZGQoTXl0aGljYWxJdGVtLmR1Y2ssIENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiZHVja1wiKSk7IFxyXG4gICAgICAgICAgICBpdGVtcy5BZGQoTXl0aGljYWxJdGVtLnJhYmJpdCwgQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJyYWJiaXRcIikpO1xyXG4gICAgICAgICAgICBpdGVtcy5BZGQoTXl0aGljYWxJdGVtLnN0YXIsIENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwic3RhclwiKSk7XHJcbiAgICAgICAgICAgIGl0ZW1zLkFkZChNeXRoaWNhbEl0ZW0udW5pY29ybiwgQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJ1bmljb3JuXCIpKTtcclxuICAgICAgICAgICAgaXRlbXMuQWRkKE15dGhpY2FsSXRlbS5kcmFnb24sIENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiZHJhZ29uXCIpKTtcclxuICAgICAgICAgICAgaXRlbXMuQWRkKE15dGhpY2FsSXRlbS5KYWNrcG90LCBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcImdvbGRcIikpO1xyXG4gICAgICAgICAgICBpdGVtcy5BZGQoTXl0aGljYWxJdGVtLm1vb24sIENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwibW9vblwiKSk7XHJcbiAgICAgICAgICAgIGl0ZW1zLkFkZChNeXRoaWNhbEl0ZW0uZWFydGgsIENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiZWFydGhcIikpO1xyXG4gICAgICAgICAgICBpdGVtcy5BZGQoTXl0aGljYWxJdGVtLnN1biwgQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJzdW5cIikpO1xyXG4gICAgICAgICAgICBpdGVtcy5BZGQoTXl0aGljYWxJdGVtLmdvZCwgQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJnb2RcIikpO1xyXG4gICAgICAgICAgICBpdGVtcy5BZGQoTXl0aGljYWxJdGVtLndpc2gsIENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwid2lzaFwiKSk7XHJcbiAgICAgICAgICAgIGl0ZW1zLkFkZChNeXRoaWNhbEl0ZW0uYW5nZWwsIENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiYW5nZWxcIikpO1xyXG4gICAgICAgICAgICBpdGVtcy5BZGQoTXl0aGljYWxJdGVtLkVtcHR5LCBudWxsKTtcclxuICAgICAgICAgICAgYmxhY2sgPSBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcImJsYWNrXCIpO1xyXG4gICAgICAgICAgICAvL2JnRWZmZWN0ID0gQ29udGVudC5Mb2FkPFNvdW5kRWZmZWN0PihcInNvbmdcIik7XHJcbiAgICAgICAgICAgIC8vcG9pbnRGb3JtID0gQ29udGVudC5Mb2FkPFNwcml0ZUZvbnQ+KFwiUG9pbnRzXCIpO1xyXG4gICAgICAgICAgICAvL2luc3RhbmNlID0gYmdFZmZlY3QuQ3JlYXRlSW5zdGFuY2UoKTtcclxuICAgICAgICAgICAgLy9pbnN0YW5jZS5Jc0xvb3BlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFVubG9hZENvbnRlbnQgd2lsbCBiZSBjYWxsZWQgb25jZSBwZXIgZ2FtZSBhbmQgaXMgdGhlIHBsYWNlIHRvIHVubG9hZFxyXG4gICAgICAgIC8vLyBhbGwgY29udGVudC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFVubG9hZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogVW5sb2FkIGFueSBub24gQ29udGVudE1hbmFnZXIgY29udGVudCBoZXJlXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgYm9vbCBPclByZXNzZWQgKEdhbWVQYWRTdGF0ZSBnU3RhdGUsIEtleWJvYXJkU3RhdGUgc3RhdGUsIHBhcmFtcyBvYmplY3RbXSBrZXlzT3JCdXR0b25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAodmFyIG8gaW4ga2V5c09yQnV0dG9ucylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKG8gaXMgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuS2V5cylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdGUuSXNLZXlEb3duKChNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5LZXlzKW8pICYmIG9sZFN0YXRlLklzS2V5VXAoKE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LktleXMpbykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobyBpcyBCdXR0b25zKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChnU3RhdGUuSXNCdXR0b25Eb3duKChCdXR0b25zKW8pICYmIG9sZEdQYWRTdGF0ZS5Jc0J1dHRvblVwKChCdXR0b25zKW8pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBcHBseUdyYXZpdHkgKGludCB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaW50IGVtcHR5U3BhY2VzID0gMDtcclxuICAgICAgICAgICAgZm9yIChpbnQgeSA9IGJvYXJkLkdldExlbmd0aCgxKSAtIDE7IHkgPj0gMDsgeS0tKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm9hcmRbeCwgeV0gPT0gTXl0aGljYWxJdGVtLkVtcHR5KSBlbXB0eVNwYWNlcysrO1xyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbXB0eVNwYWNlcyAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmRbeCwgeSArIGVtcHR5U3BhY2VzXSA9IGJvYXJkW3gsIHldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib2FyZFt4LCB5XSA9IE15dGhpY2FsSXRlbS5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEJvYXJkVXBkYXRlICgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCB4ID0gMDsgeCA8IGJvYXJkLkdldExlbmd0aCgwKTsgeCsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCB5ID0gMDsgeSA8IGJvYXJkLkdldExlbmd0aCgxKTsgeSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIE15dGhpY2FsSXRlbSBjdXJyZW50ID0gYm9hcmRbeCwgeV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgIT0gTXl0aGljYWxJdGVtLkVtcHR5KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXl0aGljYWxJdGVtIHVwID0gTXl0aGljYWxJdGVtLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeSAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXAgPSBib2FyZFt4LCB5IC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE15dGhpY2FsSXRlbSBkb3duID0gTXl0aGljYWxJdGVtLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeSAhPSBib2FyZC5HZXRMZW5ndGgoMSkgLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG93biA9IGJvYXJkW3gsIHkgKyAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXl0aGljYWxJdGVtIGxlZnQgPSBNeXRoaWNhbEl0ZW0uRW1wdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4ICE9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gYm9hcmRbeCAtIDEsIHldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNeXRoaWNhbEl0ZW0gcmlnaHQgPSBNeXRoaWNhbEl0ZW0uRW1wdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4ICE9IGJvYXJkLkdldExlbmd0aCgwKSAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodCA9IGJvYXJkW3ggKyAxLCB5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTGlzdDxLZXlWYWx1ZVBhaXI8aW50LCBpbnQ+PiBtYXRjaGVzID0gbmV3IExpc3Q8S2V5VmFsdWVQYWlyPGludCxpbnQ+Pig0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwID09IGN1cnJlbnQpIG1hdGNoZXMuQWRkKG5ldyBLZXlWYWx1ZVBhaXI8aW50LCBpbnQ+KHgsIHkgLSAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb3duID09IGN1cnJlbnQpIG1hdGNoZXMuQWRkKG5ldyBLZXlWYWx1ZVBhaXI8aW50LCBpbnQ+KHgsIHkgKyAxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZWZ0ID09IGN1cnJlbnQpIG1hdGNoZXMuQWRkKG5ldyBLZXlWYWx1ZVBhaXI8aW50LCBpbnQ+KHggLSAxLCB5KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyaWdodCA9PSBjdXJyZW50KSBtYXRjaGVzLkFkZChuZXcgS2V5VmFsdWVQYWlyPGludCwgaW50Pih4ICsgMSwgeSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hlcy5Db3VudCA+PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA9PSAoTXl0aGljYWxJdGVtKSgoaW50KShNeXRoaWNhbEl0ZW0uQ291bnQpIC0gMikpIGphY2twb3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWFjaCAoS2V5VmFsdWVQYWlyPGludCwgaW50PiBtYXRjaCBpbiBtYXRjaGVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkW21hdGNoLktleSwgbWF0Y2guVmFsdWVdID0gTXl0aGljYWxJdGVtLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT0gdG9wQWxvdWQpIHRvcEFsb3VkKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2FyZFt4LCB5XSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHggIT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHBseUdyYXZpdHkoeCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwbHlHcmF2aXR5KHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHggIT0gYm9hcmQuR2V0TGVuZ3RoKDApIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwcGx5R3Jhdml0eSh4ICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIE15dGhpY2FsSXRlbSB0b3BBbG91ZCA9IChNeXRoaWNhbEl0ZW0pMDtcclxuICAgICAgICBib29sIGNvbnRyb2xsZWQgPSBmYWxzZTtcclxuICAgICAgICBib29sIGhpZ2hTY29yZUxpc3QgPSBmYWxzZTtcclxuICAgICAgICBzdHJpbmcgbmFtZSA9IFwiXCI7XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gQWxsb3dzIHRoZSBnYW1lIHRvIHJ1biBsb2dpYyBzdWNoIGFzIHVwZGF0aW5nIHRoZSB3b3JsZCxcclxuICAgICAgICAvLy8gY2hlY2tpbmcgZm9yIGNvbGxpc2lvbnMsIGdhdGhlcmluZyBpbnB1dCwgYW5kIHBsYXlpbmcgYXVkaW8uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJnYW1lVGltZVwiPlByb3ZpZGVzIGEgc25hcHNob3Qgb2YgdGltaW5nIHZhbHVlcy48L3BhcmFtPlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFVwZGF0ZShHYW1lVGltZSBnYW1lVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vaWYgKGluc3RhbmNlLlN0YXRlICE9IFNvdW5kU3RhdGUuUGxheWluZyAmJiAhY29udHJvbGxlZClcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIGluc3RhbmNlLlBsYXkoKTtcclxuICAgICAgICAgICAgLy8gICAgY29udHJvbGxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAvLyBBbGxvd3MgdGhlIGdhbWUgdG8gZXhpdFxyXG4gICAgICAgICAgICBpZiAoR2FtZVBhZC5HZXRTdGF0ZShQbGF5ZXJJbmRleC5PbmUpLkJ1dHRvbnMuQmFjayA9PSBCdXR0b25TdGF0ZS5QcmVzc2VkKVxyXG4gICAgICAgICAgICAgICAgRW52aXJvbm1lbnQuRXhpdCgweDApO1xyXG4gICAgICAgICAgICBpZiAoS2V5Ym9hcmQuR2V0U3RhdGUoKS5Jc0tleURvd24oTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuS2V5cy5Fc2NhcGUpKVxyXG4gICAgICAgICAgICAgICAgRW52aXJvbm1lbnQuRXhpdCgweDApO1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogQWRkIHlvdXIgdXBkYXRlIGxvZ2ljIGhlcmVcclxuXHJcbiAgICAgICAgICAgIEtleWJvYXJkU3RhdGUgc3RhdGUgPSBLZXlib2FyZC5HZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICBHYW1lUGFkU3RhdGUgZ1N0YXRlID0gR2FtZVBhZC5HZXRTdGF0ZShQbGF5ZXJJbmRleC5PbmUpO1xyXG4gICAgICAgICAgICBpZiAoamFja3BvdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKE9yUHJlc3NlZChnU3RhdGUsIHN0YXRlLCBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5LZXlzLkVudGVyLCBCdXR0b25zLkxlZnRTdGljaykpIGphY2twb3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGJhc2UuVXBkYXRlKGdhbWVUaW1lKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChoaWdoU2NvcmVMaXN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT3JQcmVzc2VkKGdTdGF0ZSwgc3RhdGUsIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LktleXMuSCwgQnV0dG9ucy5SaWdodFRodW1ic3RpY2tEb3duKSkgaGlnaFNjb3JlTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKE9yUHJlc3NlZChnU3RhdGUsIHN0YXRlLCBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5LZXlzLlVwLCBCdXR0b25zLlksIEJ1dHRvbnMuTGVmdFRodW1ic3RpY2tVcCwgQnV0dG9ucy5EUGFkVXApKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbisrO1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSAoUG9zaXRpb24pKChpbnQpcG9zaXRpb24gJSAoaW50KVBvc2l0aW9uLkNvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChPclByZXNzZWQoZ1N0YXRlLCBzdGF0ZSwgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuS2V5cy5SaWdodCwgQnV0dG9ucy5MZWZ0VGh1bWJzdGlja1JpZ2h0LCBCdXR0b25zLkIsIEJ1dHRvbnMuRFBhZFJpZ2h0KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZlY3RvclBvc2l0aW9uICE9IGJvYXJkLkdldExlbmd0aCgwKSAtIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmVjdG9yUG9zaXRpb24rKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChPclByZXNzZWQoZ1N0YXRlLCBzdGF0ZSwgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuS2V5cy5BLCBCdXR0b25zLkxlZnRUcmlnZ2VyKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZlY3RvclBvc2l0aW9uID4gMSlcclxuICAgICAgICAgICAgICAgICAgICB2ZWN0b3JQb3NpdGlvbiAtPSAyO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmVjdG9yUG9zaXRpb24gIT0gMClcclxuICAgICAgICAgICAgICAgICAgICB2ZWN0b3JQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKE9yUHJlc3NlZChnU3RhdGUsIHN0YXRlLCBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5LZXlzLkQsIEJ1dHRvbnMuUmlnaHRUcmlnZ2VyKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZlY3RvclBvc2l0aW9uIDwgYm9hcmQuR2V0TGVuZ3RoKDApIC0gMylcclxuICAgICAgICAgICAgICAgICAgICB2ZWN0b3JQb3NpdGlvbiArPSAyO1xyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmVjdG9yUG9zaXRpb24gIT0gYm9hcmQuR2V0TGVuZ3RoKDApIC0gMilcclxuICAgICAgICAgICAgICAgICAgICB2ZWN0b3JQb3NpdGlvbisrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKE9yUHJlc3NlZChnU3RhdGUsIHN0YXRlLCBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5LZXlzLkxlZnQsIEJ1dHRvbnMuTGVmdFRodW1ic3RpY2tMZWZ0LCBCdXR0b25zLlgsIEJ1dHRvbnMuRFBhZExlZnQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmVjdG9yUG9zaXRpb24gIT0gMClcclxuICAgICAgICAgICAgICAgIHZlY3RvclBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoT3JQcmVzc2VkKGdTdGF0ZSwgc3RhdGUsIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LktleXMuUmlnaHRTaGlmdCwgQnV0dG9ucy5SaWdodFNob3VsZGVyLCBCdXR0b25zLlJpZ2h0U3RpY2spKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiArPSAyO1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSAoUG9zaXRpb24pKChpbnQpcG9zaXRpb24gJSAoaW50KVBvc2l0aW9uLkNvdW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChPclByZXNzZWQoZ1N0YXRlLCBzdGF0ZSwgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuS2V5cy5MZWZ0U2hpZnQsIEJ1dHRvbnMuTGVmdFNob3VsZGVyLCBCdXR0b25zLkxlZnRTdGljaykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgICAgICBpZiAoKGludClwb3NpdGlvbiA9PSAtMSlcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IChQb3NpdGlvbikoKChpbnQpUG9zaXRpb24uQ291bnQpIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoT3JQcmVzc2VkKGdTdGF0ZSwgc3RhdGUsIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LktleXMuSCwgQnV0dG9ucy5SaWdodFRodW1ic3RpY2tEb3duKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaGlnaFNjb3JlTGlzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoT3JQcmVzc2VkKGdTdGF0ZSwgc3RhdGUsIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LktleXMuRG93biwgQnV0dG9ucy5MZWZ0VGh1bWJzdGlja0Rvd24sIEJ1dHRvbnMuQSwgQnV0dG9ucy5EUGFkRG93bikpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAocG9zaXRpb24pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQb3NpdGlvbi5kb3duOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib29sIGxvc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IGJvYXJkLkdldExlbmd0aCgxKSAtIDE7IHkgPiAwOyB5LS0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW3ZlY3RvclBvc2l0aW9uLCB5XSA9PSBNeXRoaWNhbEl0ZW0uRW1wdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2FyZFt2ZWN0b3JQb3NpdGlvbiwgeV0gPSBpdGVtMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmRbdmVjdG9yUG9zaXRpb24sIHkgLSAxXSA9IGl0ZW0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3N0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb3N0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9zdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUG9zaXRpb24ubm9ybWFsOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib29sIGZpcnN0RmFpbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib29sIHNlY29uZEZhaWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IGJvYXJkLkdldExlbmd0aCgxKSAtIDE7IHkgPj0gMDsgeS0tKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYm9hcmRbdmVjdG9yUG9zaXRpb24sIHldID09IE15dGhpY2FsSXRlbS5FbXB0eSkgJiYgZmlyc3RGYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmRbdmVjdG9yUG9zaXRpb24sIHldID0gaXRlbTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RmFpbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbdmVjdG9yUG9zaXRpb24gKyAxLCB5XSA9PSBNeXRoaWNhbEl0ZW0uRW1wdHkgJiYgc2Vjb25kRmFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkW3ZlY3RvclBvc2l0aW9uICsgMSwgeV0gPSBpdGVtMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kRmFpbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdEZhaWwgfHwgc2Vjb25kRmFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBvc2l0aW9uLmxlZnQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvb2wgZmlyc3RGYWlsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvb2wgc2Vjb25kRmFpbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCB5ID0gYm9hcmQuR2V0TGVuZ3RoKDEpIC0gMTsgeSA+PSAwOyB5LS0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChib2FyZFt2ZWN0b3JQb3NpdGlvbiwgeV0gPT0gTXl0aGljYWxJdGVtLkVtcHR5KSAmJiBmaXJzdEZhaWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2FyZFt2ZWN0b3JQb3NpdGlvbiwgeV0gPSBpdGVtMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RGYWlsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFt2ZWN0b3JQb3NpdGlvbiArIDEsIHldID09IE15dGhpY2FsSXRlbS5FbXB0eSAmJiBzZWNvbmRGYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmRbdmVjdG9yUG9zaXRpb24gKyAxLCB5XSA9IGl0ZW0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRGYWlsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0RmFpbCB8fCBzZWNvbmRGYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9zdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUG9zaXRpb24udXA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvb2wgbG9zdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCB5ID0gYm9hcmQuR2V0TGVuZ3RoKDEpIC0gMTsgeSA+IDA7IHktLSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbdmVjdG9yUG9zaXRpb24sIHldID09IE15dGhpY2FsSXRlbS5FbXB0eSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkW3ZlY3RvclBvc2l0aW9uLCB5XSA9IGl0ZW0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2FyZFt2ZWN0b3JQb3NpdGlvbiwgeSAtIDFdID0gaXRlbTI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb3N0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpdGVtMSA9IG5leHQuS2V5O1xyXG4gICAgICAgICAgICAgICAgaXRlbTIgPSBuZXh0LlZhbHVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRvcEFsb3VkID09IChNeXRoaWNhbEl0ZW0pMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0ID0gbmV3IEtleVZhbHVlUGFpcjxNeXRoaWNhbEl0ZW0sTXl0aGljYWxJdGVtPigoTXl0aGljYWxJdGVtKTAsIChNeXRoaWNhbEl0ZW0pMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0b3BBbG91ZCA9PSBNeXRoaWNhbEl0ZW0uRW1wdHkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA9IG5ldyBLZXlWYWx1ZVBhaXI8TXl0aGljYWxJdGVtLE15dGhpY2FsSXRlbT4oXHJcbiAgICAgICAgICAgICAgICAgICAgKE15dGhpY2FsSXRlbSlybmQuTmV4dCgoaW50KXRvcEFsb3VkKSxcclxuICAgICAgICAgICAgICAgICAgICAoTXl0aGljYWxJdGVtKXJuZC5OZXh0KChpbnQpdG9wQWxvdWQpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0ID0gbmV3IEtleVZhbHVlUGFpcjxNeXRoaWNhbEl0ZW0sTXl0aGljYWxJdGVtPihcclxuICAgICAgICAgICAgICAgICAgICAoTXl0aGljYWxJdGVtKXJuZC5OZXh0KCgoaW50KXRvcEFsb3VkKSArIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIChNeXRoaWNhbEl0ZW0pcm5kLk5leHQoKChpbnQpdG9wQWxvdWQpICsgMSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9sZFN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgICAgIG9sZEdQYWRTdGF0ZSA9IGdTdGF0ZTtcclxuICAgICAgICAgICAgQm9hcmRVcGRhdGUoKTtcclxuICAgICAgICAgICAgcG9pbnRzID0gMDtcclxuICAgICAgICAgICAgZm9yZWFjaCAoTXl0aGljYWxJdGVtIGl0ZW0gaW4gYm9hcmQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtICE9IE15dGhpY2FsSXRlbS5FbXB0eSlcclxuICAgICAgICAgICAgICAgICAgICBwb2ludHMgKz0gcG9pbnRzR2l2ZW5baXRlbV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYmFzZS5VcGRhdGUoZ2FtZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBEaWN0aW9uYXJ5PE15dGhpY2FsSXRlbSwgaW50PiBwb2ludHNHaXZlbiA9IG5ldyBEaWN0aW9uYXJ5PE15dGhpY2FsSXRlbSxpbnQ+KDEwKTtcclxuICAgICAgICBUZXh0dXJlMkQgYmxhY2s7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBwb3N0aW9uczpcclxuICAgICAgICAgKi9cclxuICAgICAgICBDb2xvciBzcGVjaWFsQ29sb3I7XHJcbiAgICAgICAgY29uc3QgaW50IHBvc2l0aW9uMVggPSAwO1xyXG4gICAgICAgIGNvbnN0IGludCBwb3NpdGlvbjFZID0gMTAwO1xyXG4gICAgICAgIGNvbnN0IGludCBwb3NpdGlvbjJYID0gNTA7XHJcbiAgICAgICAgY29uc3QgaW50IHBvc2l0aW9uMlkgPSBwb3NpdGlvbjFZO1xyXG4gICAgICAgIGNvbnN0IGludCBwb3NpdGlvbjNYID0gcG9zaXRpb24xWDtcclxuICAgICAgICBjb25zdCBpbnQgcG9zaXRpb24zWSA9IDE1MDtcclxuICAgICAgICBjb25zdCBpbnQgcG9zaXRpb240WCA9IHBvc2l0aW9uMlg7XHJcbiAgICAgICAgY29uc3QgaW50IHBvc2l0aW9uNFkgPSBwb3NpdGlvbjNZO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy9cclxuXHJcbiAgICAgICAgS2V5VmFsdWVQYWlyPE15dGhpY2FsSXRlbSwgTXl0aGljYWxJdGVtPiBuZXh0O1xyXG4gICAgICAgIEtleWJvYXJkU3RhdGUgb2xkU3RhdGU7XHJcbiAgICAgICAgR2FtZVBhZFN0YXRlIG9sZEdQYWRTdGF0ZTtcclxuICAgICAgICBQb3NpdGlvbiBwb3NpdGlvbiA9IFBvc2l0aW9uLm5vcm1hbDtcclxuICAgICAgICAvL1NvdW5kRWZmZWN0IGJnRWZmZWN0O1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhlIFggb2YgdGhlIGVsZW1lbnRzIGRyYXduLiBEcmF3biBvbiB0aGUgc2NyZWVuIHBvc2l0aW9uIHggcG9zaXRpb25UaW1lcy5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIGludCB2ZWN0b3JQb3NpdGlvbiA9IDE7XHJcbiAgICAgICAgYm9vbCBsb3N0ID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgaW50IHBvc2l0aW9uVGltZXMgPSA1MDtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoaXMgaXMgY2FsbGVkIHdoZW4gdGhlIGdhbWUgc2hvdWxkIGRyYXcgaXRzZWxmLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZ2FtZVRpbWVcIj5Qcm92aWRlcyBhIHNuYXBzaG90IG9mIHRpbWluZyB2YWx1ZXMuPC9wYXJhbT5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBEcmF3KEdhbWVUaW1lIGdhbWVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgR3JhcGhpY3NEZXZpY2UuQ2xlYXIoQ29sb3IuV2hpdGUpO1xyXG5cclxuICAgICAgICAgICAgLy8gVE9ETzogQWRkIHlvdXIgZHJhd2luZyBjb2RlIGhlcmVcclxuXHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkJlZ2luKCk7XHJcbiAgICAgICAgICAgIGlmIChqYWNrcG90KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdHJpbmcgamFja3BvdFN0cmluZyA9IFwiWW91IHdvbiBhIGphY2twb3QuIFhib3ggdXNlIExlZnQgU3RpY2sgdG8gY2xpY2suIEtleWJvYXJkIHVzZSBlbnRlci5cIjtcclxuICAgICAgICAgICAgICAgIC8vc3ByaXRlQmF0Y2guRHJhd1N0cmluZyhwb2ludEZvcm0sIGphY2twb3RTdHJpbmcsIG5ldyBWZWN0b3IyKEdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC8gMiwgNTApIC0gKHBvaW50Rm9ybS5NZWFzdXJlU3RyaW5nKGphY2twb3RTdHJpbmcpIC8gMiksIENvbG9yLkJsYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZyBwb2ludHNUZXh0ID0gXCJQb2ludHM6IFwiICsgcG9pbnRzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubG9zdCkgcG9pbnRzVGV4dCA9IFwiWW91IGxvc3QuIFByZXNzIFwiICsgKEdhbWVQYWQuR2V0U3RhdGUoUGxheWVySW5kZXguT25lKS5Jc0Nvbm5lY3RlZCA/IFwiQmFjayBvbiB0aGUgWGJveCBjb250cm9sbGVyXCIgOiBcIkVzYyBvbiB0aGUga2V5Ym9hcmRcIikgKyBcIiB0byBleGl0LiBZb3UgaGFkIFwiICsgcG9pbnRzICsgXCIgcG9pbnRzLlwiO1xyXG4gICAgICAgICAgICAgICAgLy9zcHJpdGVCYXRjaC5EcmF3U3RyaW5nKHBvaW50Rm9ybSwgcG9pbnRzVGV4dCwgbmV3IFZlY3RvcjIoR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuV2lkdGggLyAyLCA1MCkgLSAocG9pbnRGb3JtLk1lYXN1cmVTdHJpbmcocG9pbnRzVGV4dCkgLyAyKSwgQ29sb3IuQmxhY2spO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFsb3N0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjIgcG9zaXRpb25Ub0RyYXdBdDEgPSBkZWZhdWx0KFZlY3RvcjIpO1xyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjIgcG9zaXRpb25Ub0RyYXdBdDIgPSBkZWZhdWx0KFZlY3RvcjIpO1xyXG4gICAgICAgICAgICAgICAgICAgIENvbG9yIGkyID0gQ29sb3IuV2hpdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgQ29sb3IgaTEgPSBDb2xvci5XaGl0ZTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQb3NpdGlvbi5ub3JtYWw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25Ub0RyYXdBdDEgPSBuZXcgVmVjdG9yMihwb3NpdGlvbjFYLCBwb3NpdGlvbjFZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblRvRHJhd0F0MiA9IG5ldyBWZWN0b3IyKHBvc2l0aW9uMlgsIHBvc2l0aW9uMlkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ZWN0b3JQb3NpdGlvbiA9PSBib2FyZC5HZXRMZW5ndGgoMCkgLSAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpMiA9IHNwZWNpYWxDb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQb3NpdGlvbi5sZWZ0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uVG9EcmF3QXQxID0gbmV3IFZlY3RvcjIocG9zaXRpb24yWCwgcG9zaXRpb24yWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25Ub0RyYXdBdDIgPSBuZXcgVmVjdG9yMihwb3NpdGlvbjFYLCBwb3NpdGlvbjFZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmVjdG9yUG9zaXRpb24gPT0gYm9hcmQuR2V0TGVuZ3RoKDApIC0gMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaTEgPSBzcGVjaWFsQ29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUG9zaXRpb24uZG93bjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblRvRHJhd0F0MSA9IG5ldyBWZWN0b3IyKHBvc2l0aW9uMVgsIHBvc2l0aW9uMVkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uVG9EcmF3QXQyID0gbmV3IFZlY3RvcjIocG9zaXRpb24zWCwgcG9zaXRpb24zWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUG9zaXRpb24udXA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25Ub0RyYXdBdDEgPSBuZXcgVmVjdG9yMihwb3NpdGlvbjNYLCBwb3NpdGlvbjNZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblRvRHJhd0F0MiA9IG5ldyBWZWN0b3IyKHBvc2l0aW9uMVgsIHBvc2l0aW9uMVkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblRvRHJhd0F0MS5YICs9IHZlY3RvclBvc2l0aW9uICogcG9zaXRpb25UaW1lcztcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblRvRHJhd0F0Mi5YICs9IHZlY3RvclBvc2l0aW9uICogcG9zaXRpb25UaW1lcztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNbaXRlbTFdICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyhpdGVtc1tpdGVtMV0sIHBvc2l0aW9uVG9EcmF3QXQxLCBpMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zW2l0ZW0yXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoaXRlbXNbaXRlbTJdLCBwb3NpdGlvblRvRHJhd0F0MiwgaTIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IHggPSAwOyB4IDwgYm9hcmQuR2V0TGVuZ3RoKDApOyB4KyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCB5ID0gMDsgeSA8IGJvYXJkLkdldExlbmd0aCgxKTsgeSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNbYm9hcmRbeCwgeV1dICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHggPT0gYm9hcmQuR2V0TGVuZ3RoKDApIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyhpdGVtc1tib2FyZFt4LCB5XV0sIG5ldyBWZWN0b3IyKHggKiA1MCwgeSAqIDUwICsgMjUwKSwgc3BlY2lhbENvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoaXRlbXNbYm9hcmRbeCwgeV1dLCBuZXcgVmVjdG9yMih4ICogNTAsIHkgKiA1MCArIDI1MCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IHkgPSAwOyB5IDwgYm9hcmQuR2V0TGVuZ3RoKDEpOyB5KyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KGJsYWNrLCBuZXcgUmVjdGFuZ2xlKGJvYXJkLkdldExlbmd0aCgwKSAqIDUwLCB5ICogNTAgKyAyNTAsIDMyLCAzMikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyhpdGVtc1tuZXh0LktleSAgXSwgbmV3IFJlY3RhbmdsZSgoYm9hcmQuR2V0TGVuZ3RoKDApICsgNCkgKiA1MCwgMjUwLCAzMiwgMzIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyhpdGVtc1tuZXh0LlZhbHVlXSwgbmV3IFJlY3RhbmdsZSgoYm9hcmQuR2V0TGVuZ3RoKDApICsgNSkgKiA1MCwgMjUwLCAzMiwgMzIpKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCB5ID0gMCwgZW51bUluZGV4ID0gKGludCl0b3BBbG91ZDsgZW51bUluZGV4ID49IDA7IHkrKywgZW51bUluZGV4LS0pXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKE15dGhpY2FsSXRlbSllbnVtSW5kZXggPT0gTXl0aGljYWxJdGVtLkVtcHR5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5LS07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1soTXl0aGljYWxJdGVtKWVudW1JbmRleF0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyhpdGVtc1soTXl0aGljYWxJdGVtKWVudW1JbmRleF0sIG5ldyBSZWN0YW5nbGUoKGJvYXJkLkdldExlbmd0aCgwKSArIDEpICogNTAsIHkgKiA1MCArIDI1MCwgMzIsIDMyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3Nwcml0ZUJhdGNoLkRyYXdTdHJpbmcocG9pbnRGb3JtLCBDb252ZXJ0LlRvU3RyaW5nKHBvaW50c0dpdmVuWyhNeXRoaWNhbEl0ZW0pZW51bUluZGV4XSksIG5ldyBWZWN0b3IyKChib2FyZC5HZXRMZW5ndGgoMCkgKyAyKSAqIDUwLCB5ICogNTAgKyAyNTApLCBDb2xvci5CbGFjayk7ICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgeCA9IDA7IHggPCBib2FyZC5HZXRMZW5ndGgoMCk7IHgrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoYmxhY2ssIG5ldyBSZWN0YW5nbGUoeCAqIDUwLCAoYm9hcmQuR2V0TGVuZ3RoKDEpICogNTApICsgMjUwLCAzMiwgMzIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIG5hbWVUZXh0ID0gXCJOYW1lOiBcIiArIG5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9zcHJpdGVCYXRjaC5EcmF3U3RyaW5nKHBvaW50Rm9ybSwgbmFtZVRleHQsIG5ldyBWZWN0b3IyKEdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC8gMiwgMTAwICsgcG9pbnRGb3JtLk1lYXN1cmVTdHJpbmcocG9pbnRzVGV4dCkuWSkgLSAocG9pbnRGb3JtLk1lYXN1cmVTdHJpbmcobmFtZVRleHQpIC8gMiksIENvbG9yLkJsYWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5FbmQoKTtcclxuXHJcbiAgICAgICAgICAgIGJhc2UuRHJhdyhnYW1lVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiAgICBzdGF0aWMgY2xhc3MgU3RhdGljXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERyYXcodGhpcyBTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgVGV4dHVyZTJEIHRleHR1cmUsIFZlY3RvcjIgcG9zaXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIHBvc2l0aW9uLCBDb2xvci5XaGl0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEcmF3KHRoaXMgU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2gsIFRleHR1cmUyRCB0ZXh0dXJlLCBSZWN0YW5nbGUgcmVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgcmVjdCwgQ29sb3IuV2hpdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIEZhcmllX0FsY2hlbXlcclxue1xyXG4gICAgc3RhdGljIGNsYXNzIFByb2dyYW1cclxuICAgIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSBtYWluIGVudHJ5IHBvaW50IGZvciB0aGUgYXBwbGljYXRpb24uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBzdGF0aWMgdm9pZCBNYWluKHN0cmluZ1tdIGFyZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB1c2luZyAoR2FtZTEgZ2FtZSA9IG5ldyBHYW1lMSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLlJ1bigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXQp9Cg==
