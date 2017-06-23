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
            pointForm: null,
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
                this.pointForm = this.Content.Load(Microsoft.Xna.Framework.Graphics.SpriteFont, "Points");
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
                    this.spriteBatch.DrawString(this.pointForm, jackpotString, Microsoft.Xna.Framework.Vector2.op_Subtraction(new Microsoft.Xna.Framework.Vector2.$ctor2(((Bridge.Int.div(this.GraphicsDevice.Viewport.Width, 2)) | 0), 50), (Microsoft.Xna.Framework.Vector2.op_Division$1(this.pointForm.MeasureString(jackpotString), 2))), Microsoft.Xna.Framework.Color.Black.$clone());
                } else {
                    var pointsText = "Points: " + this.points;
                    if (this.lost) {
                        pointsText = System.String.concat("You lost. Press ", (Microsoft.Xna.Framework.Input.GamePad.GetState(Microsoft.Xna.Framework.PlayerIndex.One).IsConnected ? "Back on the Xbox controller" : "Esc on the keyboard"), " to exit. You had ", this.points, " points.");
                    }
                    this.spriteBatch.DrawString(this.pointForm, pointsText, Microsoft.Xna.Framework.Vector2.op_Subtraction(new Microsoft.Xna.Framework.Vector2.$ctor2(((Bridge.Int.div(this.GraphicsDevice.Viewport.Width, 2)) | 0), 50), (Microsoft.Xna.Framework.Vector2.op_Division$1(this.pointForm.MeasureString(pointsText), 2))), Microsoft.Xna.Framework.Color.Black.$clone());
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
                        var minX = Bridge.Int.clip32(Math.min(positionToDrawAt1.X, positionToDrawAt2.X)), maxY = Bridge.Int.clip32(Math.max(positionToDrawAt1.Y, positionToDrawAt2.Y)), minY = 0;
                        for (; minY < System.Array.getLength(this.board, 1); minY = (minY + 1) | 0) {
                            if (this.board.get([this.vectorPosition, minY]) !== Farie_Alchemy.MythicalItem.Empty) {
                                break;
                            }
                        }
                        minY = (minY - 1) | 0;
                        this.spriteBatch.Draw(this.black, new Microsoft.Xna.Framework.Rectangle.$ctor2(((minX + 24) | 0), ((maxY + Farie_Alchemy.Game1.positionTimes) | 0), 2, ((((((((((minY + 2) | 0)) * Farie_Alchemy.Game1.positionTimes) | 0)) - maxY) | 0) + Farie_Alchemy.Game1.position1Y) | 0)), Microsoft.Xna.Framework.Color.White.$clone());
                        if (this.items.get(this.item1) != null) {
                            this.spriteBatch.Draw$2(this.items.get(this.item1), positionToDrawAt1.$clone(), i1.$clone());
                        }
                        if (this.items.get(this.item2) != null) {
                            this.spriteBatch.Draw$2(this.items.get(this.item2), positionToDrawAt2.$clone(), i2.$clone());
                        }
                        for (var x = 0; x < System.Array.getLength(this.board, 0); x = (x + 1) | 0) {
                            for (var y = 0; y < System.Array.getLength(this.board, 1); y = (y + 1) | 0) {
                                if (this.items.get(this.board.get([x, y])) != null) {
                                    if (x === ((System.Array.getLength(this.board, 0) - 1) | 0)) {
                                        this.spriteBatch.Draw$2(this.items.get(this.board.get([x, y])), new Microsoft.Xna.Framework.Vector2.$ctor2(((x * 50) | 0), ((((y * 50) | 0) + 250) | 0)), this.specialColor.$clone());
                                    } else {
                                        Static.Draw$1(this.spriteBatch, this.items.get(this.board.get([x, y])), new Microsoft.Xna.Framework.Vector2.$ctor2(((x * 50) | 0), ((((y * 50) | 0) + 250) | 0)));
                                    }
                                }
                            }
                        }
                        this.spriteBatch.Draw(this.black, new Microsoft.Xna.Framework.Rectangle.$ctor2(0, 250, ((System.Array.getLength(this.board, 0) * 50) | 0), 1), Microsoft.Xna.Framework.Color.White.$clone());
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
                                this.spriteBatch.DrawString(this.pointForm, System.Convert.toString(Bridge.box(this.pointsGiven.get(enumIndex), System.Int32)), new Microsoft.Xna.Framework.Vector2.$ctor2((((((System.Array.getLength(this.board, 0) + 2) | 0)) * 50) | 0), ((((y2 * 50) | 0) + 250) | 0)), Microsoft.Xna.Framework.Color.Black.$clone());
                            }
                        }
                        for (var x1 = 0; x1 < System.Array.getLength(this.board, 0); x1 = (x1 + 1) | 0) {
                            Static.Draw(this.spriteBatch, this.black, new Microsoft.Xna.Framework.Rectangle.$ctor2(((x1 * 50) | 0), (((((System.Array.getLength(this.board, 1) * 50) | 0)) + 250) | 0), 32, 32));
                        }
                    } else {
                        var nameText = System.String.concat("Name: ", this.name);
                        this.spriteBatch.DrawString(this.pointForm, nameText, Microsoft.Xna.Framework.Vector2.op_Subtraction(new Microsoft.Xna.Framework.Vector2.$ctor2(((Bridge.Int.div(this.GraphicsDevice.Viewport.Width, 2)) | 0), 100 + this.pointForm.MeasureString(pointsText).Y), (Microsoft.Xna.Framework.Vector2.op_Division$1(this.pointForm.MeasureString(nameText), 2))), Microsoft.Xna.Framework.Color.Black.$clone());
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
                    spriteBatch.Draw$2(texture, position.$clone(), Microsoft.Xna.Framework.Color.White.$clone());
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJHYW1lMS5jcyIsIlByb2dyYW0uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FpYytCQTtzQ0FDQUE7O3NDQUVBQTtzQ0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBbk5DQTs7OzttQ0FzTW9CQSw2Q0FBZUEsNEJBQWFBO2dDQW9CcERBOzs7Ozs7O2dCQTNYaEJBLGdCQUFXQSxJQUFJQSw4Q0FBc0JBO2dCQUNyQ0E7Z0JBQ0FBO2dCQUNBQTtnQkFDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFhQUEsYUFBUUE7Z0JBQ1JBLEtBQUtBLFdBQVdBLElBQUlBLHVDQUFtQkE7b0JBRW5DQSxLQUFLQSxXQUFXQSxJQUFJQSx1Q0FBb0JBO3dCQUVwQ0EsZ0JBQU1BLEdBQUVBLElBQUtBOzs7Z0JBR3JCQSxXQUFNQSxJQUFJQTtnQkFDVkEsYUFBUUE7Z0JBQ1JBLGFBQVFBO2dCQUNSQSxvQkFBZUE7Z0JBQ2ZBLDBCQUE4QkEsc0JBQWVBLEFBQU9BOzs7O3dCQUVoREEscUJBQWdCQSxNQUFNQSxrQkFBS0EsWUFBWUEsQUFBS0E7Ozs7Ozs7Z0JBR2hEQTs7Ozs7Ozs7Ozs7Ozs7O2dCQVVBQSxtQkFBY0EsSUFBSUEsNkNBQVlBOzs7Z0JBRzlCQSxhQUFRQSw2Q0FBZUEsNEJBQWNBO2dCQUNyQ0EsZUFBVUEsaUNBQW1CQTtnQkFDN0JBLGVBQVVBLG1DQUFxQkE7Z0JBQy9CQSxlQUFVQSxpQ0FBbUJBO2dCQUM3QkEsZUFBVUEsaUNBQW1CQTtnQkFDN0JBLGVBQVVBLG1DQUFxQkE7Z0JBQy9CQSxlQUFVQSxpQ0FBbUJBO2dCQUM3QkEsZUFBVUEsb0NBQXNCQTtnQkFDaENBLGVBQVVBLG1DQUFxQkE7Z0JBQy9CQSxlQUFVQSxvQ0FBc0JBO2dCQUNo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c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbi8vdXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuQXVkaW87XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkNvbnRlbnQ7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dDtcclxuLy91c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5NZWRpYTtcclxuXHJcbm5hbWVzcGFjZSBGYXJpZV9BbGNoZW15XHJcbntcclxuICAgIGVudW0gTXl0aGljYWxJdGVtXHJcbiAgICB7XHJcbiAgICAgICAgY2Fycm90LCBjYWtlLCByYWJiaXQsIGR1Y2ssIHBvbnksIHVuaWNvcm4sIGRyYWdvbiwgc3RhciwgSmFja3BvdCwgbW9vbiwgZWFydGgsIHN1biwgYW5nZWwsIHdpc2gsIGdvZCwgRW1wdHksIENvdW50XHJcbiAgICB9XHJcbiAgICBlbnVtIFBvc2l0aW9uXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBlZy4gcmFiYml0LCBjYWtlXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBub3JtYWwsXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBlZy4gcmFiYml0XHJcbiAgICAgICAgLy8vIGNha2VcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIGRvd24sXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBlZy4gY2FrZSwgcmFiYml0XHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBsZWZ0LFxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gZWcuIGNha2VcclxuICAgICAgICAvLy8gcmFiYml0XHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICB1cCxcclxuICAgICAgICBDb3VudCxcclxuICAgIH1cclxuICAgIC8vY2xhc3MgQnV0dG9uXHJcbiAgICAvL3tcclxuICAgIC8vICAgIHB1YmxpYyBkZWxlZ2F0ZSBNb3VzZVN0YXRlIE1vdXNlU3RhdGVHZXQoKTtcclxuICAgIC8vICAgIFJlY3RhbmdsZSByZWN0O1xyXG4gICAgLy8gICAgU3ByaXRlRm9udCBmb250O1xyXG4gICAgLy8gICAgc3RyaW5nIHRleHQ7XHJcbiAgICAvLyAgICBwdWJsaWMgdm9pZCBEcmF3IChTcHJpdGVCYXRjaCBiYXRjaClcclxuICAgIC8vICAgIHtcclxuICAgIC8vICAgICAgICBiYXRjaC5EcmF3U3RyaW5nKGZvbnQsIHRleHQsIHJlY3QuQ2VudGVyLCBjb2xvcik7XHJcbiAgICAvLyAgICB9XHJcbiAgICAvLyAgICBwdWJsaWMgdm9pZCBVcGRhdGUgKE1vdXNlU3RhdGVHZXQgbW91c2VTdGF0ZSA9IG51bGwpXHJcbiAgICAvLyAgICB7XHJcbiAgICAvLyAgICAgICAgaWYgKG1vdXNlU3RhdGUgPT0gbnVsbCkgbW91c2VTdGF0ZSA9IE1vdXNlLkdldFN0YXRlO1xyXG4gICAgLy8gICAgICAgICBVcGRhdGUobW91c2VTdGF0ZSgpKTtcclxuICAgIC8vICAgIH1cclxuICAgIC8vICAgIHB1YmxpYyB2b2lkIFVwZGF0ZSAoTW91c2VTdGF0ZSBzdGF0ZSlcclxuICAgIC8vICAgIHtcclxuXHJcbiAgICAvLyAgICB9XHJcbiAgICAvLyAgICBwdWJsaWMgQnV0dG9uIChzdHJpbmcgdGV4dCwgU3ByaXRlRm9udCBmb250KVxyXG4gICAgLy8gICAge1xyXG5cclxuICAgIC8vICAgIH1cclxuICAgIC8vfVxyXG4gICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgLy8vIFRoaXMgaXMgdGhlIG1haW4gdHlwZSBmb3IgeW91ciBnYW1lXHJcbiAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgcHVibGljIGNsYXNzIEdhbWUxIDogTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR2FtZVxyXG4gICAge1xyXG4gICAgICAgIEdyYXBoaWNzRGV2aWNlTWFuYWdlciBncmFwaGljcztcclxuICAgICAgICBTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaDtcclxuICAgICAgICBpbnQgcG9pbnRzID0gMDtcclxuICAgICAgICBTcHJpdGVGb250IHBvaW50Rm9ybTtcclxuICAgICAgICBEaWN0aW9uYXJ5PE15dGhpY2FsSXRlbSwgVGV4dHVyZTJEPiBpdGVtcztcclxuICAgICAgICAvL1NvdW5kRWZmZWN0SW5zdGFuY2UgaW5zdGFuY2U7XHJcbiAgICAgICAgTXl0aGljYWxJdGVtIGl0ZW0xO1xyXG4gICAgICAgIE15dGhpY2FsSXRlbSBpdGVtMjtcclxuICAgICAgICBSYW5kb20gcm5kO1xyXG4gICAgICAgIE15dGhpY2FsSXRlbVssXSBib2FyZDtcclxuICAgICAgICBib29sIGphY2twb3Q7XHJcblxyXG4gICAgICAgIHB1YmxpYyBHYW1lMSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBncmFwaGljcyA9IG5ldyBHcmFwaGljc0RldmljZU1hbmFnZXIodGhpcyk7XHJcbiAgICAgICAgICAgIENvbnRlbnQuUm9vdERpcmVjdG9yeSA9IFwiQ29udGVudFwiO1xyXG4gICAgICAgICAgICBncmFwaGljcy5QcmVmZXJyZWRCYWNrQnVmZmVySGVpZ2h0ID0gNzY4O1xyXG4gICAgICAgICAgICBncmFwaGljcy5QcmVmZXJyZWRCYWNrQnVmZmVyV2lkdGggPSAxMDAwO1xyXG4gICAgICAgICAgICBncmFwaGljcy5Jc0Z1bGxTY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBBbGxvd3MgdGhlIGdhbWUgdG8gcGVyZm9ybSBhbnkgaW5pdGlhbGl6YXRpb24gaXQgbmVlZHMgdG8gYmVmb3JlIHN0YXJ0aW5nIHRvIHJ1bi5cclxuICAgICAgICAvLy8gVGhpcyBpcyB3aGVyZSBpdCBjYW4gcXVlcnkgZm9yIGFueSByZXF1aXJlZCBzZXJ2aWNlcyBhbmQgbG9hZCBhbnkgbm9uLWdyYXBoaWNcclxuICAgICAgICAvLy8gcmVsYXRlZCBjb250ZW50LiAgQ2FsbGluZyBiYXNlLkluaXRpYWxpemUgd2lsbCBlbnVtZXJhdGUgdGhyb3VnaCBhbnkgY29tcG9uZW50c1xyXG4gICAgICAgIC8vLyBhbmQgaW5pdGlhbGl6ZSB0aGVtIGFzIHdlbGwuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0aWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IEFkZCB5b3VyIGluaXRpYWxpemF0aW9uIGxvZ2ljIGhlcmVcclxuXHJcbiAgICAgICAgICAgIGJvYXJkID0gbmV3IE15dGhpY2FsSXRlbVs5LCA4XTtcclxuICAgICAgICAgICAgZm9yIChpbnQgeCA9IDA7IHggPCBib2FyZC5HZXRMZW5ndGgoMCk7eCsrIClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IDA7IHkgPCBib2FyZC5HZXRMZW5ndGgoMSk7IHkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBib2FyZFt4LHldID0gTXl0aGljYWxJdGVtLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJuZCA9IG5ldyBSYW5kb20oKTtcclxuICAgICAgICAgICAgaXRlbTEgPSAoTXl0aGljYWxJdGVtKTA7XHJcbiAgICAgICAgICAgIGl0ZW0yID0gKE15dGhpY2FsSXRlbSkwO1xyXG4gICAgICAgICAgICBzcGVjaWFsQ29sb3IgPSBDb2xvci5UdXJxdW9pc2U7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKE15dGhpY2FsSXRlbSBpdGVtIGluIEVudW0uR2V0VmFsdWVzKHR5cGVvZihNeXRoaWNhbEl0ZW0pKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcG9pbnRzR2l2ZW4uQWRkKGl0ZW0sIChpbnQpTWF0aC5Qb3coMywgKGludClpdGVtKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJhc2UuSW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBMb2FkQ29udGVudCB3aWxsIGJlIGNhbGxlZCBvbmNlIHBlciBnYW1lIGFuZCBpcyB0aGUgcGxhY2UgdG8gbG9hZFxyXG4gICAgICAgIC8vLyBhbGwgb2YgeW91ciBjb250ZW50LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgTG9hZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IFNwcml0ZUJhdGNoLCB3aGljaCBjYW4gYmUgdXNlZCB0byBkcmF3IHRleHR1cmVzLlxyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaCA9IG5ldyBTcHJpdGVCYXRjaChHcmFwaGljc0RldmljZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiB1c2UgdGhpcy5Db250ZW50IHRvIGxvYWQgeW91ciBnYW1lIGNvbnRlbnQgaGVyZVxyXG4gICAgICAgICAgICBpdGVtcyA9IG5ldyBEaWN0aW9uYXJ5PE15dGhpY2FsSXRlbSwgVGV4dHVyZTJEPigoaW50KU15dGhpY2FsSXRlbS5Db3VudCk7XHJcbiAgICAgICAgICAgIGl0ZW1zLkFkZChNeXRoaWNhbEl0ZW0uY2FrZSwgQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJjYWtlXCIpKTtcclxuICAgICAgICAgICAgaXRlbXMuQWRkKE15dGhpY2FsSXRlbS5jYXJyb3QsIENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiY2Fycm90XCIpKTtcclxuICAgICAgICAgICAgaXRlbXMuQWRkKE15dGhpY2FsSXRlbS5wb255LCBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcImhvcnNlXCIpKTtcclxuICAgICAgICAgICAgaXRlbXMuQWRkKE15dGhpY2FsSXRlbS5kdWNrLCBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcImR1Y2tcIikpOyBcclxuICAgICAgICAgICAgaXRlbXMuQWRkKE15dGhpY2FsSXRlbS5yYWJiaXQsIENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwicmFiYml0XCIpKTtcclxuICAgICAgICAgICAgaXRlbXMuQWRkKE15dGhpY2FsSXRlbS5zdGFyLCBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcInN0YXJcIikpO1xyXG4gICAgICAgICAgICBpdGVtcy5BZGQoTXl0aGljYWxJdGVtLnVuaWNvcm4sIENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwidW5pY29yblwiKSk7XHJcbiAgICAgICAgICAgIGl0ZW1zLkFkZChNeXRoaWNhbEl0ZW0uZHJhZ29uLCBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcImRyYWdvblwiKSk7XHJcbiAgICAgICAgICAgIGl0ZW1zLkFkZChNeXRoaWNhbEl0ZW0uSmFja3BvdCwgQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJnb2xkXCIpKTtcclxuICAgICAgICAgICAgaXRlbXMuQWRkKE15dGhpY2FsSXRlbS5tb29uLCBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIm1vb25cIikpO1xyXG4gICAgICAgICAgICBpdGVtcy5BZGQoTXl0aGljYWxJdGVtLmVhcnRoLCBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcImVhcnRoXCIpKTtcclxuICAgICAgICAgICAgaXRlbXMuQWRkKE15dGhpY2FsSXRlbS5zdW4sIENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwic3VuXCIpKTtcclxuICAgICAgICAgICAgaXRlbXMuQWRkKE15dGhpY2FsSXRlbS5nb2QsIENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiZ29kXCIpKTtcclxuICAgICAgICAgICAgaXRlbXMuQWRkKE15dGhpY2FsSXRlbS53aXNoLCBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIndpc2hcIikpO1xyXG4gICAgICAgICAgICBpdGVtcy5BZGQoTXl0aGljYWxJdGVtLmFuZ2VsLCBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcImFuZ2VsXCIpKTtcclxuICAgICAgICAgICAgaXRlbXMuQWRkKE15dGhpY2FsSXRlbS5FbXB0eSwgbnVsbCk7XHJcbiAgICAgICAgICAgIGJsYWNrID0gQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJibGFja1wiKTtcclxuICAgICAgICAgICAgLy9iZ0VmZmVjdCA9IENvbnRlbnQuTG9hZDxTb3VuZEVmZmVjdD4oXCJzb25nXCIpO1xyXG4gICAgICAgICAgICBwb2ludEZvcm0gPSBDb250ZW50LkxvYWQ8U3ByaXRlRm9udD4oXCJQb2ludHNcIik7XHJcbiAgICAgICAgICAgIC8vaW5zdGFuY2UgPSBiZ0VmZmVjdC5DcmVhdGVJbnN0YW5jZSgpO1xyXG4gICAgICAgICAgICAvL2luc3RhbmNlLklzTG9vcGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVW5sb2FkQ29udGVudCB3aWxsIGJlIGNhbGxlZCBvbmNlIHBlciBnYW1lIGFuZCBpcyB0aGUgcGxhY2UgdG8gdW5sb2FkXHJcbiAgICAgICAgLy8vIGFsbCBjb250ZW50LlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgVW5sb2FkQ29udGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBVbmxvYWQgYW55IG5vbiBDb250ZW50TWFuYWdlciBjb250ZW50IGhlcmVcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBib29sIE9yUHJlc3NlZCAoR2FtZVBhZFN0YXRlIGdTdGF0ZSwgS2V5Ym9hcmRTdGF0ZSBzdGF0ZSwgcGFyYW1zIG9iamVjdFtdIGtleXNPckJ1dHRvbnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoICh2YXIgbyBpbiBrZXlzT3JCdXR0b25zKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAobyBpcyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5LZXlzKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5Jc0tleURvd24oKE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LktleXMpbykgJiYgb2xkU3RhdGUuSXNLZXlVcCgoTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuS2V5cylvKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvIGlzIEJ1dHRvbnMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdTdGF0ZS5Jc0J1dHRvbkRvd24oKEJ1dHRvbnMpbykgJiYgb2xkR1BhZFN0YXRlLklzQnV0dG9uVXAoKEJ1dHRvbnMpbykpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFwcGx5R3Jhdml0eSAoaW50IHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbnQgZW1wdHlTcGFjZXMgPSAwO1xyXG4gICAgICAgICAgICBmb3IgKGludCB5ID0gYm9hcmQuR2V0TGVuZ3RoKDEpIC0gMTsgeSA+PSAwOyB5LS0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChib2FyZFt4LCB5XSA9PSBNeXRoaWNhbEl0ZW0uRW1wdHkpIGVtcHR5U3BhY2VzKys7XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVtcHR5U3BhY2VzICE9IDApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib2FyZFt4LCB5ICsgZW1wdHlTcGFjZXNdID0gYm9hcmRbeCwgeV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkW3gsIHldID0gTXl0aGljYWxJdGVtLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQm9hcmRVcGRhdGUgKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IHggPSAwOyB4IDwgYm9hcmQuR2V0TGVuZ3RoKDApOyB4KyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IHkgPSAwOyB5IDwgYm9hcmQuR2V0TGVuZ3RoKDEpOyB5KyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgTXl0aGljYWxJdGVtIGN1cnJlbnQgPSBib2FyZFt4LCB5XTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudCAhPSBNeXRoaWNhbEl0ZW0uRW1wdHkpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNeXRoaWNhbEl0ZW0gdXAgPSBNeXRoaWNhbEl0ZW0uRW1wdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5ICE9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cCA9IGJvYXJkW3gsIHkgLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXl0aGljYWxJdGVtIGRvd24gPSBNeXRoaWNhbEl0ZW0uRW1wdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5ICE9IGJvYXJkLkdldExlbmd0aCgxKSAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3duID0gYm9hcmRbeCwgeSArIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNeXRoaWNhbEl0ZW0gbGVmdCA9IE15dGhpY2FsSXRlbS5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHggIT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSBib2FyZFt4IC0gMSwgeV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE15dGhpY2FsSXRlbSByaWdodCA9IE15dGhpY2FsSXRlbS5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHggIT0gYm9hcmQuR2V0TGVuZ3RoKDApIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZ2h0ID0gYm9hcmRbeCArIDEsIHldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBMaXN0PEtleVZhbHVlUGFpcjxpbnQsIGludD4+IG1hdGNoZXMgPSBuZXcgTGlzdDxLZXlWYWx1ZVBhaXI8aW50LGludD4+KDQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodXAgPT0gY3VycmVudCkgbWF0Y2hlcy5BZGQobmV3IEtleVZhbHVlUGFpcjxpbnQsIGludD4oeCwgeSAtIDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvd24gPT0gY3VycmVudCkgbWF0Y2hlcy5BZGQobmV3IEtleVZhbHVlUGFpcjxpbnQsIGludD4oeCwgeSArIDEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxlZnQgPT0gY3VycmVudCkgbWF0Y2hlcy5BZGQobmV3IEtleVZhbHVlUGFpcjxpbnQsIGludD4oeCAtIDEsIHkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJpZ2h0ID09IGN1cnJlbnQpIG1hdGNoZXMuQWRkKG5ldyBLZXlWYWx1ZVBhaXI8aW50LCBpbnQ+KHggKyAxLCB5KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzLkNvdW50ID49IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ID09IChNeXRoaWNhbEl0ZW0pKChpbnQpKE15dGhpY2FsSXRlbS5Db3VudCkgLSAyKSkgamFja3BvdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JlYWNoIChLZXlWYWx1ZVBhaXI8aW50LCBpbnQ+IG1hdGNoIGluIG1hdGNoZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmRbbWF0Y2guS2V5LCBtYXRjaC5WYWx1ZV0gPSBNeXRoaWNhbEl0ZW0uRW1wdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA9PSB0b3BBbG91ZCkgdG9wQWxvdWQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkW3gsIHldKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeCAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwcGx5R3Jhdml0eSh4IC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHBseUdyYXZpdHkoeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoeCAhPSBib2FyZC5HZXRMZW5ndGgoMCkgLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwbHlHcmF2aXR5KHggKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgTXl0aGljYWxJdGVtIHRvcEFsb3VkID0gKE15dGhpY2FsSXRlbSkwO1xyXG4gICAgICAgIGJvb2wgY29udHJvbGxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGJvb2wgaGlnaFNjb3JlTGlzdCA9IGZhbHNlO1xyXG4gICAgICAgIHN0cmluZyBuYW1lID0gXCJcIjtcclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBBbGxvd3MgdGhlIGdhbWUgdG8gcnVuIGxvZ2ljIHN1Y2ggYXMgdXBkYXRpbmcgdGhlIHdvcmxkLFxyXG4gICAgICAgIC8vLyBjaGVja2luZyBmb3IgY29sbGlzaW9ucywgZ2F0aGVyaW5nIGlucHV0LCBhbmQgcGxheWluZyBhdWRpby5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImdhbWVUaW1lXCI+UHJvdmlkZXMgYSBzbmFwc2hvdCBvZiB0aW1pbmcgdmFsdWVzLjwvcGFyYW0+XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgVXBkYXRlKEdhbWVUaW1lIGdhbWVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9pZiAoaW5zdGFuY2UuU3RhdGUgIT0gU291bmRTdGF0ZS5QbGF5aW5nICYmICFjb250cm9sbGVkKVxyXG4gICAgICAgICAgICAvL3tcclxuICAgICAgICAgICAgLy8gICAgaW5zdGFuY2UuUGxheSgpO1xyXG4gICAgICAgICAgICAvLyAgICBjb250cm9sbGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgIC8vIEFsbG93cyB0aGUgZ2FtZSB0byBleGl0XHJcbiAgICAgICAgICAgIGlmIChHYW1lUGFkLkdldFN0YXRlKFBsYXllckluZGV4Lk9uZSkuQnV0dG9ucy5CYWNrID09IEJ1dHRvblN0YXRlLlByZXNzZWQpXHJcbiAgICAgICAgICAgICAgICBFbnZpcm9ubWVudC5FeGl0KDB4MCk7XHJcbiAgICAgICAgICAgIGlmIChLZXlib2FyZC5HZXRTdGF0ZSgpLklzS2V5RG93bihNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5LZXlzLkVzY2FwZSkpXHJcbiAgICAgICAgICAgICAgICBFbnZpcm9ubWVudC5FeGl0KDB4MCk7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBBZGQgeW91ciB1cGRhdGUgbG9naWMgaGVyZVxyXG5cclxuICAgICAgICAgICAgS2V5Ym9hcmRTdGF0ZSBzdGF0ZSA9IEtleWJvYXJkLkdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIEdhbWVQYWRTdGF0ZSBnU3RhdGUgPSBHYW1lUGFkLkdldFN0YXRlKFBsYXllckluZGV4Lk9uZSk7XHJcbiAgICAgICAgICAgIGlmIChqYWNrcG90KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT3JQcmVzc2VkKGdTdGF0ZSwgc3RhdGUsIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LktleXMuRW50ZXIsIEJ1dHRvbnMuTGVmdFN0aWNrKSkgamFja3BvdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYmFzZS5VcGRhdGUoZ2FtZVRpbWUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGhpZ2hTY29yZUxpc3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChPclByZXNzZWQoZ1N0YXRlLCBzdGF0ZSwgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuS2V5cy5ILCBCdXR0b25zLlJpZ2h0VGh1bWJzdGlja0Rvd24pKSBoaWdoU2NvcmVMaXN0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoT3JQcmVzc2VkKGdTdGF0ZSwgc3RhdGUsIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LktleXMuVXAsIEJ1dHRvbnMuWSwgQnV0dG9ucy5MZWZ0VGh1bWJzdGlja1VwLCBCdXR0b25zLkRQYWRVcCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IChQb3NpdGlvbikoKGludClwb3NpdGlvbiAlIChpbnQpUG9zaXRpb24uQ291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKE9yUHJlc3NlZChnU3RhdGUsIHN0YXRlLCBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5LZXlzLlJpZ2h0LCBCdXR0b25zLkxlZnRUaHVtYnN0aWNrUmlnaHQsIEJ1dHRvbnMuQiwgQnV0dG9ucy5EUGFkUmlnaHQpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmVjdG9yUG9zaXRpb24gIT0gYm9hcmQuR2V0TGVuZ3RoKDApIC0gMilcclxuICAgICAgICAgICAgICAgICAgICB2ZWN0b3JQb3NpdGlvbisrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKE9yUHJlc3NlZChnU3RhdGUsIHN0YXRlLCBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5LZXlzLkEsIEJ1dHRvbnMuTGVmdFRyaWdnZXIpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmVjdG9yUG9zaXRpb24gPiAxKVxyXG4gICAgICAgICAgICAgICAgICAgIHZlY3RvclBvc2l0aW9uIC09IDI7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2ZWN0b3JQb3NpdGlvbiAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHZlY3RvclBvc2l0aW9uLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoT3JQcmVzc2VkKGdTdGF0ZSwgc3RhdGUsIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LktleXMuRCwgQnV0dG9ucy5SaWdodFRyaWdnZXIpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmVjdG9yUG9zaXRpb24gPCBib2FyZC5HZXRMZW5ndGgoMCkgLSAzKVxyXG4gICAgICAgICAgICAgICAgICAgIHZlY3RvclBvc2l0aW9uICs9IDI7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2ZWN0b3JQb3NpdGlvbiAhPSBib2FyZC5HZXRMZW5ndGgoMCkgLSAyKVxyXG4gICAgICAgICAgICAgICAgICAgIHZlY3RvclBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoT3JQcmVzc2VkKGdTdGF0ZSwgc3RhdGUsIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LktleXMuTGVmdCwgQnV0dG9ucy5MZWZ0VGh1bWJzdGlja0xlZnQsIEJ1dHRvbnMuWCwgQnV0dG9ucy5EUGFkTGVmdCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh2ZWN0b3JQb3NpdGlvbiAhPSAwKVxyXG4gICAgICAgICAgICAgICAgdmVjdG9yUG9zaXRpb24tLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChPclByZXNzZWQoZ1N0YXRlLCBzdGF0ZSwgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuS2V5cy5SaWdodFNoaWZ0LCBCdXR0b25zLlJpZ2h0U2hvdWxkZXIsIEJ1dHRvbnMuUmlnaHRTdGljaykpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uICs9IDI7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IChQb3NpdGlvbikoKGludClwb3NpdGlvbiAlIChpbnQpUG9zaXRpb24uQ291bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKE9yUHJlc3NlZChnU3RhdGUsIHN0YXRlLCBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5LZXlzLkxlZnRTaGlmdCwgQnV0dG9ucy5MZWZ0U2hvdWxkZXIsIEJ1dHRvbnMuTGVmdFN0aWNrKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24tLTtcclxuICAgICAgICAgICAgICAgIGlmICgoaW50KXBvc2l0aW9uID09IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gKFBvc2l0aW9uKSgoKGludClQb3NpdGlvbi5Db3VudCkgLSAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChPclByZXNzZWQoZ1N0YXRlLCBzdGF0ZSwgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuS2V5cy5ILCBCdXR0b25zLlJpZ2h0VGh1bWJzdGlja0Rvd24pKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBoaWdoU2NvcmVMaXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChPclByZXNzZWQoZ1N0YXRlLCBzdGF0ZSwgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuS2V5cy5Eb3duLCBCdXR0b25zLkxlZnRUaHVtYnN0aWNrRG93biwgQnV0dG9ucy5BLCBCdXR0b25zLkRQYWREb3duKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChwb3NpdGlvbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBvc2l0aW9uLmRvd246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvb2wgbG9zdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCB5ID0gYm9hcmQuR2V0TGVuZ3RoKDEpIC0gMTsgeSA+IDA7IHktLSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbdmVjdG9yUG9zaXRpb24sIHldID09IE15dGhpY2FsSXRlbS5FbXB0eSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkW3ZlY3RvclBvc2l0aW9uLCB5XSA9IGl0ZW0yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2FyZFt2ZWN0b3JQb3NpdGlvbiwgeSAtIDFdID0gaXRlbTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb3N0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQb3NpdGlvbi5ub3JtYWw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvb2wgZmlyc3RGYWlsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvb2wgc2Vjb25kRmFpbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCB5ID0gYm9hcmQuR2V0TGVuZ3RoKDEpIC0gMTsgeSA+PSAwOyB5LS0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChib2FyZFt2ZWN0b3JQb3NpdGlvbiwgeV0gPT0gTXl0aGljYWxJdGVtLkVtcHR5KSAmJiBmaXJzdEZhaWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2FyZFt2ZWN0b3JQb3NpdGlvbiwgeV0gPSBpdGVtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RGYWlsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFt2ZWN0b3JQb3NpdGlvbiArIDEsIHldID09IE15dGhpY2FsSXRlbS5FbXB0eSAmJiBzZWNvbmRGYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmRbdmVjdG9yUG9zaXRpb24gKyAxLCB5XSA9IGl0ZW0yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRGYWlsID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0RmFpbCB8fCBzZWNvbmRGYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9zdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUG9zaXRpb24ubGVmdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBmaXJzdEZhaWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBzZWNvbmRGYWlsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IHkgPSBib2FyZC5HZXRMZW5ndGgoMSkgLSAxOyB5ID49IDA7IHktLSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGJvYXJkW3ZlY3RvclBvc2l0aW9uLCB5XSA9PSBNeXRoaWNhbEl0ZW0uRW1wdHkpICYmIGZpcnN0RmFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkW3ZlY3RvclBvc2l0aW9uLCB5XSA9IGl0ZW0yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEZhaWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW3ZlY3RvclBvc2l0aW9uICsgMSwgeV0gPT0gTXl0aGljYWxJdGVtLkVtcHR5ICYmIHNlY29uZEZhaWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2FyZFt2ZWN0b3JQb3NpdGlvbiArIDEsIHldID0gaXRlbTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEZhaWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3RGYWlsIHx8IHNlY29uZEZhaWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb3N0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQb3NpdGlvbi51cDpcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBsb3N0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IHkgPSBib2FyZC5HZXRMZW5ndGgoMSkgLSAxOyB5ID4gMDsgeS0tKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFt2ZWN0b3JQb3NpdGlvbiwgeV0gPT0gTXl0aGljYWxJdGVtLkVtcHR5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmRbdmVjdG9yUG9zaXRpb24sIHldID0gaXRlbTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkW3ZlY3RvclBvc2l0aW9uLCB5IC0gMV0gPSBpdGVtMjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9zdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9zdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGl0ZW0xID0gbmV4dC5LZXk7XHJcbiAgICAgICAgICAgICAgICBpdGVtMiA9IG5leHQuVmFsdWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodG9wQWxvdWQgPT0gKE15dGhpY2FsSXRlbSkwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQgPSBuZXcgS2V5VmFsdWVQYWlyPE15dGhpY2FsSXRlbSxNeXRoaWNhbEl0ZW0+KChNeXRoaWNhbEl0ZW0pMCwgKE15dGhpY2FsSXRlbSkwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRvcEFsb3VkID09IE15dGhpY2FsSXRlbS5FbXB0eSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXh0ID0gbmV3IEtleVZhbHVlUGFpcjxNeXRoaWNhbEl0ZW0sTXl0aGljYWxJdGVtPihcclxuICAgICAgICAgICAgICAgICAgICAoTXl0aGljYWxJdGVtKXJuZC5OZXh0KChpbnQpdG9wQWxvdWQpLFxyXG4gICAgICAgICAgICAgICAgICAgIChNeXRoaWNhbEl0ZW0pcm5kLk5leHQoKGludCl0b3BBbG91ZClcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQgPSBuZXcgS2V5VmFsdWVQYWlyPE15dGhpY2FsSXRlbSxNeXRoaWNhbEl0ZW0+KFxyXG4gICAgICAgICAgICAgICAgICAgIChNeXRoaWNhbEl0ZW0pcm5kLk5leHQoKChpbnQpdG9wQWxvdWQpICsgMSksXHJcbiAgICAgICAgICAgICAgICAgICAgKE15dGhpY2FsSXRlbSlybmQuTmV4dCgoKGludCl0b3BBbG91ZCkgKyAxKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2xkU3RhdGUgPSBzdGF0ZTtcclxuICAgICAgICAgICAgb2xkR1BhZFN0YXRlID0gZ1N0YXRlO1xyXG4gICAgICAgICAgICBCb2FyZFVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBwb2ludHMgPSAwO1xyXG4gICAgICAgICAgICBmb3JlYWNoIChNeXRoaWNhbEl0ZW0gaXRlbSBpbiBib2FyZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0gIT0gTXl0aGljYWxJdGVtLkVtcHR5KVxyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50cyArPSBwb2ludHNHaXZlbltpdGVtXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBiYXNlLlVwZGF0ZShnYW1lVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIERpY3Rpb25hcnk8TXl0aGljYWxJdGVtLCBpbnQ+IHBvaW50c0dpdmVuID0gbmV3IERpY3Rpb25hcnk8TXl0aGljYWxJdGVtLGludD4oMTApO1xyXG4gICAgICAgIFRleHR1cmUyRCBibGFjaztcclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIHBvc3Rpb25zOlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIENvbG9yIHNwZWNpYWxDb2xvcjtcclxuICAgICAgICBjb25zdCBpbnQgcG9zaXRpb24xWCA9IDA7XHJcbiAgICAgICAgY29uc3QgaW50IHBvc2l0aW9uMVkgPSAxMDA7XHJcbiAgICAgICAgY29uc3QgaW50IHBvc2l0aW9uMlggPSA1MDtcclxuICAgICAgICBjb25zdCBpbnQgcG9zaXRpb24yWSA9IHBvc2l0aW9uMVk7XHJcbiAgICAgICAgY29uc3QgaW50IHBvc2l0aW9uM1ggPSBwb3NpdGlvbjFYO1xyXG4gICAgICAgIGNvbnN0IGludCBwb3NpdGlvbjNZID0gMTUwO1xyXG4gICAgICAgIGNvbnN0IGludCBwb3NpdGlvbjRYID0gcG9zaXRpb24yWDtcclxuICAgICAgICBjb25zdCBpbnQgcG9zaXRpb240WSA9IHBvc2l0aW9uM1k7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvL1xyXG5cclxuICAgICAgICBLZXlWYWx1ZVBhaXI8TXl0aGljYWxJdGVtLCBNeXRoaWNhbEl0ZW0+IG5leHQ7XHJcbiAgICAgICAgS2V5Ym9hcmRTdGF0ZSBvbGRTdGF0ZTtcclxuICAgICAgICBHYW1lUGFkU3RhdGUgb2xkR1BhZFN0YXRlO1xyXG4gICAgICAgIFBvc2l0aW9uIHBvc2l0aW9uID0gUG9zaXRpb24ubm9ybWFsO1xyXG4gICAgICAgIC8vU291bmRFZmZlY3QgYmdFZmZlY3Q7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgWCBvZiB0aGUgZWxlbWVudHMgZHJhd24uIERyYXduIG9uIHRoZSBzY3JlZW4gcG9zaXRpb24geCBwb3NpdGlvblRpbWVzLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgaW50IHZlY3RvclBvc2l0aW9uID0gMTtcclxuICAgICAgICBib29sIGxvc3QgPSBmYWxzZTtcclxuICAgICAgICBjb25zdCBpbnQgcG9zaXRpb25UaW1lcyA9IDUwO1xyXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cclxuICAgICAgICAvLy8gVGhpcyBpcyBjYWxsZWQgd2hlbiB0aGUgZ2FtZSBzaG91bGQgZHJhdyBpdHNlbGYuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICAvLy8gPHBhcmFtIG5hbWU9XCJnYW1lVGltZVwiPlByb3ZpZGVzIGEgc25hcHNob3Qgb2YgdGltaW5nIHZhbHVlcy48L3BhcmFtPlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIERyYXcoR2FtZVRpbWUgZ2FtZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBHcmFwaGljc0RldmljZS5DbGVhcihDb2xvci5XaGl0ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBUT0RPOiBBZGQgeW91ciBkcmF3aW5nIGNvZGUgaGVyZVxyXG5cclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guQmVnaW4oKTtcclxuICAgICAgICAgICAgaWYgKGphY2twb3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0cmluZyBqYWNrcG90U3RyaW5nID0gXCJZb3Ugd29uIGEgamFja3BvdC4gWGJveCB1c2UgTGVmdCBTdGljayB0byBjbGljay4gS2V5Ym9hcmQgdXNlIGVudGVyLlwiO1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhd1N0cmluZyhwb2ludEZvcm0sIGphY2twb3RTdHJpbmcsIG5ldyBWZWN0b3IyKEdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC8gMiwgNTApIC0gKHBvaW50Rm9ybS5NZWFzdXJlU3RyaW5nKGphY2twb3RTdHJpbmcpIC8gMiksIENvbG9yLkJsYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0cmluZyBwb2ludHNUZXh0ID0gXCJQb2ludHM6IFwiICsgcG9pbnRzO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubG9zdCkgcG9pbnRzVGV4dCA9IFwiWW91IGxvc3QuIFByZXNzIFwiICsgKEdhbWVQYWQuR2V0U3RhdGUoUGxheWVySW5kZXguT25lKS5Jc0Nvbm5lY3RlZCA/IFwiQmFjayBvbiB0aGUgWGJveCBjb250cm9sbGVyXCIgOiBcIkVzYyBvbiB0aGUga2V5Ym9hcmRcIikgKyBcIiB0byBleGl0LiBZb3UgaGFkIFwiICsgcG9pbnRzICsgXCIgcG9pbnRzLlwiO1xyXG4gICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhd1N0cmluZyhwb2ludEZvcm0sIHBvaW50c1RleHQsIG5ldyBWZWN0b3IyKEdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC8gMiwgNTApIC0gKHBvaW50Rm9ybS5NZWFzdXJlU3RyaW5nKHBvaW50c1RleHQpIC8gMiksIENvbG9yLkJsYWNrKTtcclxuICAgICAgICAgICAgICAgIGlmICghbG9zdClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBWZWN0b3IyIHBvc2l0aW9uVG9EcmF3QXQxID0gZGVmYXVsdChWZWN0b3IyKTtcclxuICAgICAgICAgICAgICAgICAgICBWZWN0b3IyIHBvc2l0aW9uVG9EcmF3QXQyID0gZGVmYXVsdChWZWN0b3IyKTtcclxuICAgICAgICAgICAgICAgICAgICBDb2xvciBpMiA9IENvbG9yLldoaXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIENvbG9yIGkxID0gQ29sb3IuV2hpdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChwb3NpdGlvbilcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUG9zaXRpb24ubm9ybWFsOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uVG9EcmF3QXQxID0gbmV3IFZlY3RvcjIocG9zaXRpb24xWCwgcG9zaXRpb24xWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25Ub0RyYXdBdDIgPSBuZXcgVmVjdG9yMihwb3NpdGlvbjJYLCBwb3NpdGlvbjJZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmVjdG9yUG9zaXRpb24gPT0gYm9hcmQuR2V0TGVuZ3RoKDApIC0gMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaTIgPSBzcGVjaWFsQ29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUG9zaXRpb24ubGVmdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblRvRHJhd0F0MSA9IG5ldyBWZWN0b3IyKHBvc2l0aW9uMlgsIHBvc2l0aW9uMlkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uVG9EcmF3QXQyID0gbmV3IFZlY3RvcjIocG9zaXRpb24xWCwgcG9zaXRpb24xWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZlY3RvclBvc2l0aW9uID09IGJvYXJkLkdldExlbmd0aCgwKSAtIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkxID0gc3BlY2lhbENvbG9yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFBvc2l0aW9uLmRvd246XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25Ub0RyYXdBdDEgPSBuZXcgVmVjdG9yMihwb3NpdGlvbjFYLCBwb3NpdGlvbjFZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblRvRHJhd0F0MiA9IG5ldyBWZWN0b3IyKHBvc2l0aW9uM1gsIHBvc2l0aW9uM1kpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFBvc2l0aW9uLnVwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uVG9EcmF3QXQxID0gbmV3IFZlY3RvcjIocG9zaXRpb24zWCwgcG9zaXRpb24zWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25Ub0RyYXdBdDIgPSBuZXcgVmVjdG9yMihwb3NpdGlvbjFYLCBwb3NpdGlvbjFZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25Ub0RyYXdBdDEuWCArPSB2ZWN0b3JQb3NpdGlvbiAqIHBvc2l0aW9uVGltZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25Ub0RyYXdBdDIuWCArPSB2ZWN0b3JQb3NpdGlvbiAqIHBvc2l0aW9uVGltZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgaW50IG1pblggPSAoaW50KU1hdGguTWluKHBvc2l0aW9uVG9EcmF3QXQxLlgsIHBvc2l0aW9uVG9EcmF3QXQyLlgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhZID0gKGludClNYXRoLk1heChwb3NpdGlvblRvRHJhd0F0MS5ZLCBwb3NpdGlvblRvRHJhd0F0Mi5ZKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWluWSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IG1pblkgPCBib2FyZC5HZXRMZW5ndGgoMSk7IG1pblkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW3ZlY3RvclBvc2l0aW9uLCBtaW5ZXSAhPSBNeXRoaWNhbEl0ZW0uRW1wdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBtaW5ZLS07XHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyhibGFjaywgbmV3IFJlY3RhbmdsZShtaW5YICsgMjQsIG1heFkgKyBwb3NpdGlvblRpbWVzLCAyLCAoKG1pblkgKyAyKSAqIHBvc2l0aW9uVGltZXMpIC0gbWF4WSArIHBvc2l0aW9uMVkpLCBDb2xvci5XaGl0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zW2l0ZW0xXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoaXRlbXNbaXRlbTFdLCBwb3NpdGlvblRvRHJhd0F0MSwgaTEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtc1tpdGVtMl0gIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KGl0ZW1zW2l0ZW0yXSwgcG9zaXRpb25Ub0RyYXdBdDIsIGkyKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCB4ID0gMDsgeCA8IGJvYXJkLkdldExlbmd0aCgwKTsgeCsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IDA7IHkgPCBib2FyZC5HZXRMZW5ndGgoMSk7IHkrKylcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zW2JvYXJkW3gsIHldXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4ID09IGJvYXJkLkdldExlbmd0aCgwKSAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoaXRlbXNbYm9hcmRbeCwgeV1dLCBuZXcgVmVjdG9yMih4ICogNTAsIHkgKiA1MCArIDI1MCksIHNwZWNpYWxDb2xvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KGl0ZW1zW2JvYXJkW3gsIHldXSwgbmV3IFZlY3RvcjIoeCAqIDUwLCB5ICogNTAgKyAyNTApKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KGJsYWNrLCBuZXcgUmVjdGFuZ2xlKDAsIDI1MCwgYm9hcmQuR2V0TGVuZ3RoKDApICogNTAsIDEpLCBDb2xvci5XaGl0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IDA7IHkgPCBib2FyZC5HZXRMZW5ndGgoMSk7IHkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoYmxhY2ssIG5ldyBSZWN0YW5nbGUoYm9hcmQuR2V0TGVuZ3RoKDApICogNTAsIHkgKiA1MCArIDI1MCwgMzIsIDMyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KGl0ZW1zW25leHQuS2V5ICBdLCBuZXcgUmVjdGFuZ2xlKChib2FyZC5HZXRMZW5ndGgoMCkgKyA0KSAqIDUwLCAyNTAsIDMyLCAzMikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KGl0ZW1zW25leHQuVmFsdWVdLCBuZXcgUmVjdGFuZ2xlKChib2FyZC5HZXRMZW5ndGgoMCkgKyA1KSAqIDUwLCAyNTAsIDMyLCAzMikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IHkgPSAwLCBlbnVtSW5kZXggPSAoaW50KXRvcEFsb3VkOyBlbnVtSW5kZXggPj0gMDsgeSsrLCBlbnVtSW5kZXgtLSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoTXl0aGljYWxJdGVtKWVudW1JbmRleCA9PSBNeXRoaWNhbEl0ZW0uRW1wdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHktLTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zWyhNeXRoaWNhbEl0ZW0pZW51bUluZGV4XSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KGl0ZW1zWyhNeXRoaWNhbEl0ZW0pZW51bUluZGV4XSwgbmV3IFJlY3RhbmdsZSgoYm9hcmQuR2V0TGVuZ3RoKDApICsgMSkgKiA1MCwgeSAqIDUwICsgMjUwLCAzMiwgMzIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXdTdHJpbmcocG9pbnRGb3JtLCBDb252ZXJ0LlRvU3RyaW5nKHBvaW50c0dpdmVuWyhNeXRoaWNhbEl0ZW0pZW51bUluZGV4XSksIG5ldyBWZWN0b3IyKChib2FyZC5HZXRMZW5ndGgoMCkgKyAyKSAqIDUwLCB5ICogNTAgKyAyNTApLCBDb2xvci5CbGFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgeCA9IDA7IHggPCBib2FyZC5HZXRMZW5ndGgoMCk7IHgrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoYmxhY2ssIG5ldyBSZWN0YW5nbGUoeCAqIDUwLCAoYm9hcmQuR2V0TGVuZ3RoKDEpICogNTApICsgMjUwLCAzMiwgMzIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RyaW5nIG5hbWVUZXh0ID0gXCJOYW1lOiBcIiArIG5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhd1N0cmluZyhwb2ludEZvcm0sIG5hbWVUZXh0LCBuZXcgVmVjdG9yMihHcmFwaGljc0RldmljZS5WaWV3cG9ydC5XaWR0aCAvIDIsIDEwMCArIHBvaW50Rm9ybS5NZWFzdXJlU3RyaW5nKHBvaW50c1RleHQpLlkpIC0gKHBvaW50Rm9ybS5NZWFzdXJlU3RyaW5nKG5hbWVUZXh0KSAvIDIpLCBDb2xvci5CbGFjayk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRW5kKCk7XHJcblxyXG4gICAgICAgICAgICBiYXNlLkRyYXcoZ2FtZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4gICAgc3RhdGljIGNsYXNzIFN0YXRpY1xyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEcmF3KHRoaXMgU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2gsIFRleHR1cmUyRCB0ZXh0dXJlLCBWZWN0b3IyIHBvc2l0aW9uKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyh0ZXh0dXJlLCBwb3NpdGlvbiwgQ29sb3IuV2hpdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgRHJhdyh0aGlzIFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoLCBUZXh0dXJlMkQgdGV4dHVyZSwgUmVjdGFuZ2xlIHJlY3QpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIHJlY3QsIENvbG9yLldoaXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiIsInVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBGYXJpZV9BbGNoZW15XHJcbntcclxuICAgIHN0YXRpYyBjbGFzcyBQcm9ncmFtXHJcbiAgICB7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGUgbWFpbiBlbnRyeSBwb2ludCBmb3IgdGhlIGFwcGxpY2F0aW9uLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgc3RhdGljIHZvaWQgTWFpbihzdHJpbmdbXSBhcmdzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdXNpbmcgKEdhbWUxIGdhbWUgPSBuZXcgR2FtZTEoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS5SdW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIl0KfQo=
