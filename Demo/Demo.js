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
                this.items = Bridge.fn.bind(this, $asm.$.Farie_Alchemy.Game1.f1)(new (System.Collections.Generic.Dictionary$2(Farie_Alchemy.MythicalItem, Microsoft.Xna.Framework.Graphics.Texture2D))());
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
                            this.spriteBatch.Draw$3(this.items.get(this.item1), positionToDrawAt1.$clone(), i1.$clone());
                        }
                        if (this.items.get(this.item2) != null) {
                            this.spriteBatch.Draw$3(this.items.get(this.item2), positionToDrawAt2.$clone(), i2.$clone());
                        }
                        for (var x = 0; x < System.Array.getLength(this.board, 0); x = (x + 1) | 0) {
                            for (var y = 0; y < System.Array.getLength(this.board, 1); y = (y + 1) | 0) {
                                if (this.items.get(this.board.get([x, y])) != null) {
                                    if (x === ((System.Array.getLength(this.board, 0) - 1) | 0)) {
                                        this.spriteBatch.Draw$3(this.items.get(this.board.get([x, y])), new Microsoft.Xna.Framework.Vector2.$ctor2(((x * 50) | 0), ((((y * 50) | 0) + 250) | 0)), this.specialColor.$clone());
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

    Bridge.ns("Farie_Alchemy.Game1", $asm.$);

    Bridge.apply($asm.$.Farie_Alchemy.Game1, {
        f1: function (_o1) {
            _o1.add(Farie_Alchemy.MythicalItem.cake, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "cake"));
            _o1.add(Farie_Alchemy.MythicalItem.carrot, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "carrot"));
            _o1.add(Farie_Alchemy.MythicalItem.pony, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "horse"));
            _o1.add(Farie_Alchemy.MythicalItem.duck, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "duck"));
            _o1.add(Farie_Alchemy.MythicalItem.rabbit, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "rabbit"));
            _o1.add(Farie_Alchemy.MythicalItem.star, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "star"));
            _o1.add(Farie_Alchemy.MythicalItem.unicorn, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "unicorn"));
            _o1.add(Farie_Alchemy.MythicalItem.dragon, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "dragon"));
            _o1.add(Farie_Alchemy.MythicalItem.Jackpot, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "gold"));
            _o1.add(Farie_Alchemy.MythicalItem.moon, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "moon"));
            _o1.add(Farie_Alchemy.MythicalItem.earth, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "earth"));
            _o1.add(Farie_Alchemy.MythicalItem.sun, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "sun"));
            _o1.add(Farie_Alchemy.MythicalItem.god, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "god"));
            _o1.add(Farie_Alchemy.MythicalItem.wish, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "wish"));
            _o1.add(Farie_Alchemy.MythicalItem.angel, this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "angel"));
            _o1.add(Farie_Alchemy.MythicalItem.Empty, null);
            return _o1;
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
                    spriteBatch.Draw$3(texture, position.$clone(), Microsoft.Xna.Framework.Color.White.$clone());
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJEZW1vLmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJHYW1lMS5jcyIsIlByb2dyYW0uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0FpYitCQTtzQ0FDQUE7O3NDQUVBQTtzQ0FDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBbk5DQTs7OzttQ0FzTW9CQSw2Q0FBZUEsNEJBQWFBO2dDQW9CcERBOzs7Ozs7O2dCQTNXaEJBLGdCQUFXQSxJQUFJQSw4Q0FBc0JBO2dCQUNyQ0E7Z0JBQ0FBO2dCQUNBQTtnQkFDQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFhQUEsYUFBUUE7Z0JBQ1JBLEtBQUtBLFdBQVdBLElBQUlBLHVDQUFtQkE7b0JBRW5DQSxLQUFLQSxXQUFXQSxJQUFJQSx1Q0FBb0JBO3dCQUVwQ0EsZ0JBQU1BLEdBQUVBLElBQUtBOzs7Z0JBR3JCQSxXQUFNQSxJQUFJQTtnQkFDVkEsYUFBUUE7Z0JBQ1JBLGFBQVFBO2dCQUNSQSxvQkFBZUE7Z0JBQ2ZBLDBCQUE4QkEsc0JBQWVBLEFBQU9BOzs7O3dCQUVoREEscUJBQWdCQSxNQUFNQSxrQkFBS0EsWUFBWUEsQUFBS0E7Ozs7Ozs7Z0JBR2hEQTs7Ozs7Ozs7Ozs7Ozs7O2dCQVVBQSxtQkFBY0EsSUFBSUEsNkNBQVlBOzs7Z0JBRzlCQSxhQUFRQSxBQUF1RkEsb0RBQWpFQSw2Q0FBZUEsNEJBQWNBO2dCQUMzREEsYUFBUUE7O2dCQUVSQSxpQkFBWUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQ0FjT0EsUUFBcUJBLE9BQXFCQTs7O2dCQUU3REEsMEJBQWtCQTs7Ozt3QkFFZEEsSUFBSUE7NEJBRUFBLElBQUlBLGdCQUFnQkEscUNBQW9DQSxvQ0FBTUEsc0JBQWlCQSxxQ0FBb0NBO2dDQUMvR0E7OytCQUVIQSxJQUFJQTs0QkFFTEEsSUFBSUEs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InVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcbnVzaW5nIFN5c3RlbS5MaW5xO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxuLy91c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5BdWRpbztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuQ29udGVudDtcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0O1xyXG4vL3VzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLk1lZGlhO1xyXG5cclxubmFtZXNwYWNlIEZhcmllX0FsY2hlbXlcclxue1xyXG4gICAgZW51bSBNeXRoaWNhbEl0ZW1cclxuICAgIHtcclxuICAgICAgICBjYXJyb3QsIGNha2UsIHJhYmJpdCwgZHVjaywgcG9ueSwgdW5pY29ybiwgZHJhZ29uLCBzdGFyLCBKYWNrcG90LCBtb29uLCBlYXJ0aCwgc3VuLCBhbmdlbCwgd2lzaCwgZ29kLCBFbXB0eSwgQ291bnRcclxuICAgIH1cclxuICAgIGVudW0gUG9zaXRpb25cclxuICAgIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIGVnLiByYWJiaXQsIGNha2VcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIG5vcm1hbCxcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIGVnLiByYWJiaXRcclxuICAgICAgICAvLy8gY2FrZVxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgZG93bixcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIGVnLiBjYWtlLCByYWJiaXRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIGxlZnQsXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBlZy4gY2FrZVxyXG4gICAgICAgIC8vLyByYWJiaXRcclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHVwLFxyXG4gICAgICAgIENvdW50LFxyXG4gICAgfVxyXG4gICAgLy9jbGFzcyBCdXR0b25cclxuICAgIC8ve1xyXG4gICAgLy8gICAgcHVibGljIGRlbGVnYXRlIE1vdXNlU3RhdGUgTW91c2VTdGF0ZUdldCgpO1xyXG4gICAgLy8gICAgUmVjdGFuZ2xlIHJlY3Q7XHJcbiAgICAvLyAgICBTcHJpdGVGb250IGZvbnQ7XHJcbiAgICAvLyAgICBzdHJpbmcgdGV4dDtcclxuICAgIC8vICAgIHB1YmxpYyB2b2lkIERyYXcgKFNwcml0ZUJhdGNoIGJhdGNoKVxyXG4gICAgLy8gICAge1xyXG4gICAgLy8gICAgICAgIGJhdGNoLkRyYXdTdHJpbmcoZm9udCwgdGV4dCwgcmVjdC5DZW50ZXIsIGNvbG9yKTtcclxuICAgIC8vICAgIH1cclxuICAgIC8vICAgIHB1YmxpYyB2b2lkIFVwZGF0ZSAoTW91c2VTdGF0ZUdldCBtb3VzZVN0YXRlID0gbnVsbClcclxuICAgIC8vICAgIHtcclxuICAgIC8vICAgICAgICBpZiAobW91c2VTdGF0ZSA9PSBudWxsKSBtb3VzZVN0YXRlID0gTW91c2UuR2V0U3RhdGU7XHJcbiAgICAvLyAgICAgICAgIFVwZGF0ZShtb3VzZVN0YXRlKCkpO1xyXG4gICAgLy8gICAgfVxyXG4gICAgLy8gICAgcHVibGljIHZvaWQgVXBkYXRlIChNb3VzZVN0YXRlIHN0YXRlKVxyXG4gICAgLy8gICAge1xyXG5cclxuICAgIC8vICAgIH1cclxuICAgIC8vICAgIHB1YmxpYyBCdXR0b24gKHN0cmluZyB0ZXh0LCBTcHJpdGVGb250IGZvbnQpXHJcbiAgICAvLyAgICB7XHJcblxyXG4gICAgLy8gICAgfVxyXG4gICAgLy99XHJcbiAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAvLy8gVGhpcyBpcyB0aGUgbWFpbiB0eXBlIGZvciB5b3VyIGdhbWVcclxuICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICBwdWJsaWMgY2xhc3MgR2FtZTEgOiBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HYW1lXHJcbiAgICB7XHJcbiAgICAgICAgR3JhcGhpY3NEZXZpY2VNYW5hZ2VyIGdyYXBoaWNzO1xyXG4gICAgICAgIFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoO1xyXG4gICAgICAgIGludCBwb2ludHMgPSAwO1xyXG4gICAgICAgIFNwcml0ZUZvbnQgcG9pbnRGb3JtO1xyXG4gICAgICAgIERpY3Rpb25hcnk8TXl0aGljYWxJdGVtLCBUZXh0dXJlMkQ+IGl0ZW1zO1xyXG4gICAgICAgIC8vU291bmRFZmZlY3RJbnN0YW5jZSBpbnN0YW5jZTtcclxuICAgICAgICBNeXRoaWNhbEl0ZW0gaXRlbTE7XHJcbiAgICAgICAgTXl0aGljYWxJdGVtIGl0ZW0yO1xyXG4gICAgICAgIFJhbmRvbSBybmQ7XHJcbiAgICAgICAgTXl0aGljYWxJdGVtWyxdIGJvYXJkO1xyXG4gICAgICAgIGJvb2wgamFja3BvdDtcclxuXHJcbiAgICAgICAgcHVibGljIEdhbWUxKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzID0gbmV3IEdyYXBoaWNzRGV2aWNlTWFuYWdlcih0aGlzKTtcclxuICAgICAgICAgICAgQ29udGVudC5Sb290RGlyZWN0b3J5ID0gXCJDb250ZW50XCI7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLlByZWZlcnJlZEJhY2tCdWZmZXJIZWlnaHQgPSA3Njg7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLlByZWZlcnJlZEJhY2tCdWZmZXJXaWR0aCA9IDEwMDA7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLklzRnVsbFNjcmVlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFsbG93cyB0aGUgZ2FtZSB0byBwZXJmb3JtIGFueSBpbml0aWFsaXphdGlvbiBpdCBuZWVkcyB0byBiZWZvcmUgc3RhcnRpbmcgdG8gcnVuLlxyXG4gICAgICAgIC8vLyBUaGlzIGlzIHdoZXJlIGl0IGNhbiBxdWVyeSBmb3IgYW55IHJlcXVpcmVkIHNlcnZpY2VzIGFuZCBsb2FkIGFueSBub24tZ3JhcGhpY1xyXG4gICAgICAgIC8vLyByZWxhdGVkIGNvbnRlbnQuICBDYWxsaW5nIGJhc2UuSW5pdGlhbGl6ZSB3aWxsIGVudW1lcmF0ZSB0aHJvdWdoIGFueSBjb21wb25lbnRzXHJcbiAgICAgICAgLy8vIGFuZCBpbml0aWFsaXplIHRoZW0gYXMgd2VsbC5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXRpYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy8gVE9ETzogQWRkIHlvdXIgaW5pdGlhbGl6YXRpb24gbG9naWMgaGVyZVxyXG5cclxuICAgICAgICAgICAgYm9hcmQgPSBuZXcgTXl0aGljYWxJdGVtWzksIDhdO1xyXG4gICAgICAgICAgICBmb3IgKGludCB4ID0gMDsgeCA8IGJvYXJkLkdldExlbmd0aCgwKTt4KysgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCB5ID0gMDsgeSA8IGJvYXJkLkdldExlbmd0aCgxKTsgeSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvYXJkW3gseV0gPSBNeXRoaWNhbEl0ZW0uRW1wdHk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm5kID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgICAgICBpdGVtMSA9IChNeXRoaWNhbEl0ZW0pMDtcclxuICAgICAgICAgICAgaXRlbTIgPSAoTXl0aGljYWxJdGVtKTA7XHJcbiAgICAgICAgICAgIHNwZWNpYWxDb2xvciA9IENvbG9yLlR1cnF1b2lzZTtcclxuICAgICAgICAgICAgZm9yZWFjaCAoTXl0aGljYWxJdGVtIGl0ZW0gaW4gRW51bS5HZXRWYWx1ZXModHlwZW9mKE15dGhpY2FsSXRlbSkpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwb2ludHNHaXZlbi5BZGQoaXRlbSwgKGludClNYXRoLlBvdygzLCAoaW50KWl0ZW0pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmFzZS5Jbml0aWFsaXplKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIExvYWRDb250ZW50IHdpbGwgYmUgY2FsbGVkIG9uY2UgcGVyIGdhbWUgYW5kIGlzIHRoZSBwbGFjZSB0byBsb2FkXHJcbiAgICAgICAgLy8vIGFsbCBvZiB5b3VyIGNvbnRlbnQuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBMb2FkQ29udGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgU3ByaXRlQmF0Y2gsIHdoaWNoIGNhbiBiZSB1c2VkIHRvIGRyYXcgdGV4dHVyZXMuXHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoID0gbmV3IFNwcml0ZUJhdGNoKEdyYXBoaWNzRGV2aWNlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IHVzZSB0aGlzLkNvbnRlbnQgdG8gbG9hZCB5b3VyIGdhbWUgY29udGVudCBoZXJlXHJcbiAgICAgICAgICAgIGl0ZW1zID0gQnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBEaWN0aW9uYXJ5PE15dGhpY2FsSXRlbSwgVGV4dHVyZTJEPigoaW50KU15dGhpY2FsSXRlbS5Db3VudCksKF9vMSk9PntfbzEuQWRkKE15dGhpY2FsSXRlbS5jYWtlLENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiY2FrZVwiKSk7X28xLkFkZChNeXRoaWNhbEl0ZW0uY2Fycm90LENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiY2Fycm90XCIpKTtfbzEuQWRkKE15dGhpY2FsSXRlbS5wb255LENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiaG9yc2VcIikpO19vMS5BZGQoTXl0aGljYWxJdGVtLmR1Y2ssQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJkdWNrXCIpKTtfbzEuQWRkKE15dGhpY2FsSXRlbS5yYWJiaXQsQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJyYWJiaXRcIikpO19vMS5BZGQoTXl0aGljYWxJdGVtLnN0YXIsQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJzdGFyXCIpKTtfbzEuQWRkKE15dGhpY2FsSXRlbS51bmljb3JuLENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwidW5pY29yblwiKSk7X28xLkFkZChNeXRoaWNhbEl0ZW0uZHJhZ29uLENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiZHJhZ29uXCIpKTtfbzEuQWRkKE15dGhpY2FsSXRlbS5KYWNrcG90LENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiZ29sZFwiKSk7X28xLkFkZChNeXRoaWNhbEl0ZW0ubW9vbixDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIm1vb25cIikpO19vMS5BZGQoTXl0aGljYWxJdGVtLmVhcnRoLENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiZWFydGhcIikpO19vMS5BZGQoTXl0aGljYWxJdGVtLnN1bixDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcInN1blwiKSk7X28xLkFkZChNeXRoaWNhbEl0ZW0uZ29kLENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwiZ29kXCIpKTtfbzEuQWRkKE15dGhpY2FsSXRlbS53aXNoLENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwid2lzaFwiKSk7X28xLkFkZChNeXRoaWNhbEl0ZW0uYW5nZWwsQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJhbmdlbFwiKSk7X28xLkFkZChNeXRoaWNhbEl0ZW0uRW1wdHksbnVsbCk7cmV0dXJuIF9vMTt9KTtcclxuICAgICAgICAgICAgYmxhY2sgPSBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcImJsYWNrXCIpO1xyXG4gICAgICAgICAgICAvL2JnRWZmZWN0ID0gQ29udGVudC5Mb2FkPFNvdW5kRWZmZWN0PihcInNvbmdcIik7XHJcbiAgICAgICAgICAgIHBvaW50Rm9ybSA9IENvbnRlbnQuTG9hZDxTcHJpdGVGb250PihcIlBvaW50c1wiKTtcclxuICAgICAgICAgICAgLy9pbnN0YW5jZSA9IGJnRWZmZWN0LkNyZWF0ZUluc3RhbmNlKCk7XHJcbiAgICAgICAgICAgIC8vaW5zdGFuY2UuSXNMb29wZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBVbmxvYWRDb250ZW50IHdpbGwgYmUgY2FsbGVkIG9uY2UgcGVyIGdhbWUgYW5kIGlzIHRoZSBwbGFjZSB0byB1bmxvYWRcclxuICAgICAgICAvLy8gYWxsIGNvbnRlbnQuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBVbmxvYWRDb250ZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IFVubG9hZCBhbnkgbm9uIENvbnRlbnRNYW5hZ2VyIGNvbnRlbnQgaGVyZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGJvb2wgT3JQcmVzc2VkIChHYW1lUGFkU3RhdGUgZ1N0YXRlLCBLZXlib2FyZFN0YXRlIHN0YXRlLCBwYXJhbXMgb2JqZWN0W10ga2V5c09yQnV0dG9ucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBvIGluIGtleXNPckJ1dHRvbnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChvIGlzIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LktleXMpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlLklzS2V5RG93bigoTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuS2V5cylvKSAmJiBvbGRTdGF0ZS5Jc0tleVVwKChNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5LZXlzKW8pKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG8gaXMgQnV0dG9ucylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ1N0YXRlLklzQnV0dG9uRG93bigoQnV0dG9ucylvKSAmJiBvbGRHUGFkU3RhdGUuSXNCdXR0b25VcCgoQnV0dG9ucylvKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgQXBwbHlHcmF2aXR5IChpbnQgeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGludCBlbXB0eVNwYWNlcyA9IDA7XHJcbiAgICAgICAgICAgIGZvciAoaW50IHkgPSBib2FyZC5HZXRMZW5ndGgoMSkgLSAxOyB5ID49IDA7IHktLSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGJvYXJkW3gsIHldID09IE15dGhpY2FsSXRlbS5FbXB0eSkgZW1wdHlTcGFjZXMrKztcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZW1wdHlTcGFjZXMgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkW3gsIHkgKyBlbXB0eVNwYWNlc10gPSBib2FyZFt4LCB5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmRbeCwgeV0gPSBNeXRoaWNhbEl0ZW0uRW1wdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBCb2FyZFVwZGF0ZSAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgeCA9IDA7IHggPCBib2FyZC5HZXRMZW5ndGgoMCk7IHgrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IDA7IHkgPCBib2FyZC5HZXRMZW5ndGgoMSk7IHkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBNeXRoaWNhbEl0ZW0gY3VycmVudCA9IGJvYXJkW3gsIHldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ICE9IE15dGhpY2FsSXRlbS5FbXB0eSlcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE15dGhpY2FsSXRlbSB1cCA9IE15dGhpY2FsSXRlbS5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwID0gYm9hcmRbeCwgeSAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBNeXRoaWNhbEl0ZW0gZG93biA9IE15dGhpY2FsSXRlbS5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgIT0gYm9hcmQuR2V0TGVuZ3RoKDEpIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvd24gPSBib2FyZFt4LCB5ICsgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE15dGhpY2FsSXRlbSBsZWZ0ID0gTXl0aGljYWxJdGVtLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeCAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdCA9IGJvYXJkW3ggLSAxLCB5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgTXl0aGljYWxJdGVtIHJpZ2h0ID0gTXl0aGljYWxJdGVtLkVtcHR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeCAhPSBib2FyZC5HZXRMZW5ndGgoMCkgLSAxKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQgPSBib2FyZFt4ICsgMSwgeV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIExpc3Q8S2V5VmFsdWVQYWlyPGludCwgaW50Pj4gbWF0Y2hlcyA9IG5ldyBMaXN0PEtleVZhbHVlUGFpcjxpbnQsaW50Pj4oNCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cCA9PSBjdXJyZW50KSBtYXRjaGVzLkFkZChuZXcgS2V5VmFsdWVQYWlyPGludCwgaW50Pih4LCB5IC0gMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZG93biA9PSBjdXJyZW50KSBtYXRjaGVzLkFkZChuZXcgS2V5VmFsdWVQYWlyPGludCwgaW50Pih4LCB5ICsgMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGVmdCA9PSBjdXJyZW50KSBtYXRjaGVzLkFkZChuZXcgS2V5VmFsdWVQYWlyPGludCwgaW50Pih4IC0gMSwgeSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmlnaHQgPT0gY3VycmVudCkgbWF0Y2hlcy5BZGQobmV3IEtleVZhbHVlUGFpcjxpbnQsIGludD4oeCArIDEsIHkpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoZXMuQ291bnQgPj0gMilcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPT0gKE15dGhpY2FsSXRlbSkoKGludCkoTXl0aGljYWxJdGVtLkNvdW50KSAtIDIpKSBqYWNrcG90ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmVhY2ggKEtleVZhbHVlUGFpcjxpbnQsIGludD4gbWF0Y2ggaW4gbWF0Y2hlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2FyZFttYXRjaC5LZXksIG1hdGNoLlZhbHVlXSA9IE15dGhpY2FsSXRlbS5FbXB0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ID09IHRvcEFsb3VkKSB0b3BBbG91ZCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmRbeCwgeV0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4ICE9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXBwbHlHcmF2aXR5KHggLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFwcGx5R3Jhdml0eSh4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4ICE9IGJvYXJkLkdldExlbmd0aCgwKSAtIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBcHBseUdyYXZpdHkoeCArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBNeXRoaWNhbEl0ZW0gdG9wQWxvdWQgPSAoTXl0aGljYWxJdGVtKTA7XHJcbiAgICAgICAgYm9vbCBjb250cm9sbGVkID0gZmFsc2U7XHJcbiAgICAgICAgYm9vbCBoaWdoU2NvcmVMaXN0ID0gZmFsc2U7XHJcbiAgICAgICAgc3RyaW5nIG5hbWUgPSBcIlwiO1xyXG5cclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIEFsbG93cyB0aGUgZ2FtZSB0byBydW4gbG9naWMgc3VjaCBhcyB1cGRhdGluZyB0aGUgd29ybGQsXHJcbiAgICAgICAgLy8vIGNoZWNraW5nIGZvciBjb2xsaXNpb25zLCBnYXRoZXJpbmcgaW5wdXQsIGFuZCBwbGF5aW5nIGF1ZGlvLlxyXG4gICAgICAgIC8vLyA8L3N1bW1hcnk+XHJcbiAgICAgICAgLy8vIDxwYXJhbSBuYW1lPVwiZ2FtZVRpbWVcIj5Qcm92aWRlcyBhIHNuYXBzaG90IG9mIHRpbWluZyB2YWx1ZXMuPC9wYXJhbT5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoR2FtZVRpbWUgZ2FtZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL2lmIChpbnN0YW5jZS5TdGF0ZSAhPSBTb3VuZFN0YXRlLlBsYXlpbmcgJiYgIWNvbnRyb2xsZWQpXHJcbiAgICAgICAgICAgIC8ve1xyXG4gICAgICAgICAgICAvLyAgICBpbnN0YW5jZS5QbGF5KCk7XHJcbiAgICAgICAgICAgIC8vICAgIGNvbnRyb2xsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgLy8gQWxsb3dzIHRoZSBnYW1lIHRvIGV4aXRcclxuICAgICAgICAgICAgaWYgKEdhbWVQYWQuR2V0U3RhdGUoUGxheWVySW5kZXguT25lKS5CdXR0b25zLkJhY2sgPT0gQnV0dG9uU3RhdGUuUHJlc3NlZClcclxuICAgICAgICAgICAgICAgIEVudmlyb25tZW50LkV4aXQoMHgwKTtcclxuICAgICAgICAgICAgaWYgKEtleWJvYXJkLkdldFN0YXRlKCkuSXNLZXlEb3duKE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LktleXMuRXNjYXBlKSlcclxuICAgICAgICAgICAgICAgIEVudmlyb25tZW50LkV4aXQoMHgwKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IEFkZCB5b3VyIHVwZGF0ZSBsb2dpYyBoZXJlXHJcblxyXG4gICAgICAgICAgICBLZXlib2FyZFN0YXRlIHN0YXRlID0gS2V5Ym9hcmQuR2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgR2FtZVBhZFN0YXRlIGdTdGF0ZSA9IEdhbWVQYWQuR2V0U3RhdGUoUGxheWVySW5kZXguT25lKTtcclxuICAgICAgICAgICAgaWYgKGphY2twb3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChPclByZXNzZWQoZ1N0YXRlLCBzdGF0ZSwgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuS2V5cy5FbnRlciwgQnV0dG9ucy5MZWZ0U3RpY2spKSBqYWNrcG90ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBiYXNlLlVwZGF0ZShnYW1lVGltZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaGlnaFNjb3JlTGlzdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKE9yUHJlc3NlZChnU3RhdGUsIHN0YXRlLCBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5LZXlzLkgsIEJ1dHRvbnMuUmlnaHRUaHVtYnN0aWNrRG93bikpIGhpZ2hTY29yZUxpc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChPclByZXNzZWQoZ1N0YXRlLCBzdGF0ZSwgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuS2V5cy5VcCwgQnV0dG9ucy5ZLCBCdXR0b25zLkxlZnRUaHVtYnN0aWNrVXAsIEJ1dHRvbnMuRFBhZFVwKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24rKztcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gKFBvc2l0aW9uKSgoaW50KXBvc2l0aW9uICUgKGludClQb3NpdGlvbi5Db3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoT3JQcmVzc2VkKGdTdGF0ZSwgc3RhdGUsIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LktleXMuUmlnaHQsIEJ1dHRvbnMuTGVmdFRodW1ic3RpY2tSaWdodCwgQnV0dG9ucy5CLCBCdXR0b25zLkRQYWRSaWdodCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh2ZWN0b3JQb3NpdGlvbiAhPSBib2FyZC5HZXRMZW5ndGgoMCkgLSAyKVxyXG4gICAgICAgICAgICAgICAgICAgIHZlY3RvclBvc2l0aW9uKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoT3JQcmVzc2VkKGdTdGF0ZSwgc3RhdGUsIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LktleXMuQSwgQnV0dG9ucy5MZWZ0VHJpZ2dlcikpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh2ZWN0b3JQb3NpdGlvbiA+IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgdmVjdG9yUG9zaXRpb24gLT0gMjtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZlY3RvclBvc2l0aW9uICE9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgdmVjdG9yUG9zaXRpb24tLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChPclByZXNzZWQoZ1N0YXRlLCBzdGF0ZSwgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuS2V5cy5ELCBCdXR0b25zLlJpZ2h0VHJpZ2dlcikpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh2ZWN0b3JQb3NpdGlvbiA8IGJvYXJkLkdldExlbmd0aCgwKSAtIDMpXHJcbiAgICAgICAgICAgICAgICAgICAgdmVjdG9yUG9zaXRpb24gKz0gMjtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZlY3RvclBvc2l0aW9uICE9IGJvYXJkLkdldExlbmd0aCgwKSAtIDIpXHJcbiAgICAgICAgICAgICAgICAgICAgdmVjdG9yUG9zaXRpb24rKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChPclByZXNzZWQoZ1N0YXRlLCBzdGF0ZSwgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQuS2V5cy5MZWZ0LCBCdXR0b25zLkxlZnRUaHVtYnN0aWNrTGVmdCwgQnV0dG9ucy5YLCBCdXR0b25zLkRQYWRMZWZ0KSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZlY3RvclBvc2l0aW9uICE9IDApXHJcbiAgICAgICAgICAgICAgICB2ZWN0b3JQb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKE9yUHJlc3NlZChnU3RhdGUsIHN0YXRlLCBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5LZXlzLlJpZ2h0U2hpZnQsIEJ1dHRvbnMuUmlnaHRTaG91bGRlciwgQnV0dG9ucy5SaWdodFN0aWNrKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gKz0gMjtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gKFBvc2l0aW9uKSgoaW50KXBvc2l0aW9uICUgKGludClQb3NpdGlvbi5Db3VudCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoT3JQcmVzc2VkKGdTdGF0ZSwgc3RhdGUsIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0LktleXMuTGVmdFNoaWZ0LCBCdXR0b25zLkxlZnRTaG91bGRlciwgQnV0dG9ucy5MZWZ0U3RpY2spKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi0tO1xyXG4gICAgICAgICAgICAgICAgaWYgKChpbnQpcG9zaXRpb24gPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSAoUG9zaXRpb24pKCgoaW50KVBvc2l0aW9uLkNvdW50KSAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKE9yUHJlc3NlZChnU3RhdGUsIHN0YXRlLCBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5LZXlzLkgsIEJ1dHRvbnMuUmlnaHRUaHVtYnN0aWNrRG93bikpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhpZ2hTY29yZUxpc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKE9yUHJlc3NlZChnU3RhdGUsIHN0YXRlLCBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dC5LZXlzLkRvd24sIEJ1dHRvbnMuTGVmdFRodW1ic3RpY2tEb3duLCBCdXR0b25zLkEsIEJ1dHRvbnMuRFBhZERvd24pKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUG9zaXRpb24uZG93bjpcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBsb3N0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IHkgPSBib2FyZC5HZXRMZW5ndGgoMSkgLSAxOyB5ID4gMDsgeS0tKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2FyZFt2ZWN0b3JQb3NpdGlvbiwgeV0gPT0gTXl0aGljYWxJdGVtLkVtcHR5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmRbdmVjdG9yUG9zaXRpb24sIHldID0gaXRlbTI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkW3ZlY3RvclBvc2l0aW9uLCB5IC0gMV0gPSBpdGVtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9zdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9zdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBvc2l0aW9uLm5vcm1hbDpcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBmaXJzdEZhaWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCBzZWNvbmRGYWlsID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW50IHkgPSBib2FyZC5HZXRMZW5ndGgoMSkgLSAxOyB5ID49IDA7IHktLSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGJvYXJkW3ZlY3RvclBvc2l0aW9uLCB5XSA9PSBNeXRoaWNhbEl0ZW0uRW1wdHkpICYmIGZpcnN0RmFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkW3ZlY3RvclBvc2l0aW9uLCB5XSA9IGl0ZW0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdEZhaWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW3ZlY3RvclBvc2l0aW9uICsgMSwgeV0gPT0gTXl0aGljYWxJdGVtLkVtcHR5ICYmIHNlY29uZEZhaWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2FyZFt2ZWN0b3JQb3NpdGlvbiArIDEsIHldID0gaXRlbTI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZEZhaWwgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3RGYWlsIHx8IHNlY29uZEZhaWwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb3N0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBQb3NpdGlvbi5sZWZ0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib29sIGZpcnN0RmFpbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib29sIHNlY29uZEZhaWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IGJvYXJkLkdldExlbmd0aCgxKSAtIDE7IHkgPj0gMDsgeS0tKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYm9hcmRbdmVjdG9yUG9zaXRpb24sIHldID09IE15dGhpY2FsSXRlbS5FbXB0eSkgJiYgZmlyc3RGYWlsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmRbdmVjdG9yUG9zaXRpb24sIHldID0gaXRlbTI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RmFpbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbdmVjdG9yUG9zaXRpb24gKyAxLCB5XSA9PSBNeXRoaWNhbEl0ZW0uRW1wdHkgJiYgc2Vjb25kRmFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvYXJkW3ZlY3RvclBvc2l0aW9uICsgMSwgeV0gPSBpdGVtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kRmFpbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdEZhaWwgfHwgc2Vjb25kRmFpbClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFBvc2l0aW9uLnVwOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib29sIGxvc3QgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IGJvYXJkLkdldExlbmd0aCgxKSAtIDE7IHkgPiAwOyB5LS0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvYXJkW3ZlY3RvclBvc2l0aW9uLCB5XSA9PSBNeXRoaWNhbEl0ZW0uRW1wdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2FyZFt2ZWN0b3JQb3NpdGlvbiwgeV0gPSBpdGVtMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9hcmRbdmVjdG9yUG9zaXRpb24sIHkgLSAxXSA9IGl0ZW0yO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb3N0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb3N0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9zdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaXRlbTEgPSBuZXh0LktleTtcclxuICAgICAgICAgICAgICAgIGl0ZW0yID0gbmV4dC5WYWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0b3BBbG91ZCA9PSAoTXl0aGljYWxJdGVtKTApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA9IG5ldyBLZXlWYWx1ZVBhaXI8TXl0aGljYWxJdGVtLE15dGhpY2FsSXRlbT4oKE15dGhpY2FsSXRlbSkwLCAoTXl0aGljYWxJdGVtKTApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodG9wQWxvdWQgPT0gTXl0aGljYWxJdGVtLkVtcHR5KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIG5leHQgPSBuZXcgS2V5VmFsdWVQYWlyPE15dGhpY2FsSXRlbSxNeXRoaWNhbEl0ZW0+KFxyXG4gICAgICAgICAgICAgICAgICAgIChNeXRoaWNhbEl0ZW0pcm5kLk5leHQoKGludCl0b3BBbG91ZCksXHJcbiAgICAgICAgICAgICAgICAgICAgKE15dGhpY2FsSXRlbSlybmQuTmV4dCgoaW50KXRvcEFsb3VkKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA9IG5ldyBLZXlWYWx1ZVBhaXI8TXl0aGljYWxJdGVtLE15dGhpY2FsSXRlbT4oXHJcbiAgICAgICAgICAgICAgICAgICAgKE15dGhpY2FsSXRlbSlybmQuTmV4dCgoKGludCl0b3BBbG91ZCkgKyAxKSxcclxuICAgICAgICAgICAgICAgICAgICAoTXl0aGljYWxJdGVtKXJuZC5OZXh0KCgoaW50KXRvcEFsb3VkKSArIDEpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvbGRTdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgICAgICBvbGRHUGFkU3RhdGUgPSBnU3RhdGU7XHJcbiAgICAgICAgICAgIEJvYXJkVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIHBvaW50cyA9IDA7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKE15dGhpY2FsSXRlbSBpdGVtIGluIGJvYXJkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSAhPSBNeXRoaWNhbEl0ZW0uRW1wdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzICs9IHBvaW50c0dpdmVuW2l0ZW1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJhc2UuVXBkYXRlKGdhbWVUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRGljdGlvbmFyeTxNeXRoaWNhbEl0ZW0sIGludD4gcG9pbnRzR2l2ZW4gPSBuZXcgRGljdGlvbmFyeTxNeXRoaWNhbEl0ZW0saW50PigxMCk7XHJcbiAgICAgICAgVGV4dHVyZTJEIGJsYWNrO1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogcG9zdGlvbnM6XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgQ29sb3Igc3BlY2lhbENvbG9yO1xyXG4gICAgICAgIGNvbnN0IGludCBwb3NpdGlvbjFYID0gMDtcclxuICAgICAgICBjb25zdCBpbnQgcG9zaXRpb24xWSA9IDEwMDtcclxuICAgICAgICBjb25zdCBpbnQgcG9zaXRpb24yWCA9IDUwO1xyXG4gICAgICAgIGNvbnN0IGludCBwb3NpdGlvbjJZID0gcG9zaXRpb24xWTtcclxuICAgICAgICBjb25zdCBpbnQgcG9zaXRpb24zWCA9IHBvc2l0aW9uMVg7XHJcbiAgICAgICAgY29uc3QgaW50IHBvc2l0aW9uM1kgPSAxNTA7XHJcbiAgICAgICAgY29uc3QgaW50IHBvc2l0aW9uNFggPSBwb3NpdGlvbjJYO1xyXG4gICAgICAgIGNvbnN0IGludCBwb3NpdGlvbjRZID0gcG9zaXRpb24zWTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vXHJcblxyXG4gICAgICAgIEtleVZhbHVlUGFpcjxNeXRoaWNhbEl0ZW0sIE15dGhpY2FsSXRlbT4gbmV4dDtcclxuICAgICAgICBLZXlib2FyZFN0YXRlIG9sZFN0YXRlO1xyXG4gICAgICAgIEdhbWVQYWRTdGF0ZSBvbGRHUGFkU3RhdGU7XHJcbiAgICAgICAgUG9zaXRpb24gcG9zaXRpb24gPSBQb3NpdGlvbi5ub3JtYWw7XHJcbiAgICAgICAgLy9Tb3VuZEVmZmVjdCBiZ0VmZmVjdDtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSBYIG9mIHRoZSBlbGVtZW50cyBkcmF3bi4gRHJhd24gb24gdGhlIHNjcmVlbiBwb3NpdGlvbiB4IHBvc2l0aW9uVGltZXMuXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBpbnQgdmVjdG9yUG9zaXRpb24gPSAxO1xyXG4gICAgICAgIGJvb2wgbG9zdCA9IGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IGludCBwb3NpdGlvblRpbWVzID0gNTA7XHJcbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxyXG4gICAgICAgIC8vLyBUaGlzIGlzIGNhbGxlZCB3aGVuIHRoZSBnYW1lIHNob3VsZCBkcmF3IGl0c2VsZi5cclxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxyXG4gICAgICAgIC8vLyA8cGFyYW0gbmFtZT1cImdhbWVUaW1lXCI+UHJvdmlkZXMgYSBzbmFwc2hvdCBvZiB0aW1pbmcgdmFsdWVzLjwvcGFyYW0+XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgRHJhdyhHYW1lVGltZSBnYW1lVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdyYXBoaWNzRGV2aWNlLkNsZWFyKENvbG9yLldoaXRlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFRPRE86IEFkZCB5b3VyIGRyYXdpbmcgY29kZSBoZXJlXHJcblxyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5CZWdpbigpO1xyXG4gICAgICAgICAgICBpZiAoamFja3BvdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RyaW5nIGphY2twb3RTdHJpbmcgPSBcIllvdSB3b24gYSBqYWNrcG90LiBYYm94IHVzZSBMZWZ0IFN0aWNrIHRvIGNsaWNrLiBLZXlib2FyZCB1c2UgZW50ZXIuXCI7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3U3RyaW5nKHBvaW50Rm9ybSwgamFja3BvdFN0cmluZywgbmV3IFZlY3RvcjIoR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuV2lkdGggLyAyLCA1MCkgLSAocG9pbnRGb3JtLk1lYXN1cmVTdHJpbmcoamFja3BvdFN0cmluZykgLyAyKSwgQ29sb3IuQmxhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3RyaW5nIHBvaW50c1RleHQgPSBcIlBvaW50czogXCIgKyBwb2ludHM7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sb3N0KSBwb2ludHNUZXh0ID0gXCJZb3UgbG9zdC4gUHJlc3MgXCIgKyAoR2FtZVBhZC5HZXRTdGF0ZShQbGF5ZXJJbmRleC5PbmUpLklzQ29ubmVjdGVkID8gXCJCYWNrIG9uIHRoZSBYYm94IGNvbnRyb2xsZXJcIiA6IFwiRXNjIG9uIHRoZSBrZXlib2FyZFwiKSArIFwiIHRvIGV4aXQuIFlvdSBoYWQgXCIgKyBwb2ludHMgKyBcIiBwb2ludHMuXCI7XHJcbiAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3U3RyaW5nKHBvaW50Rm9ybSwgcG9pbnRzVGV4dCwgbmV3IFZlY3RvcjIoR3JhcGhpY3NEZXZpY2UuVmlld3BvcnQuV2lkdGggLyAyLCA1MCkgLSAocG9pbnRGb3JtLk1lYXN1cmVTdHJpbmcocG9pbnRzVGV4dCkgLyAyKSwgQ29sb3IuQmxhY2spO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFsb3N0KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjIgcG9zaXRpb25Ub0RyYXdBdDEgPSBkZWZhdWx0KFZlY3RvcjIpO1xyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjIgcG9zaXRpb25Ub0RyYXdBdDIgPSBkZWZhdWx0KFZlY3RvcjIpO1xyXG4gICAgICAgICAgICAgICAgICAgIENvbG9yIGkyID0gQ29sb3IuV2hpdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgQ29sb3IgaTEgPSBDb2xvci5XaGl0ZTtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHBvc2l0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQb3NpdGlvbi5ub3JtYWw6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25Ub0RyYXdBdDEgPSBuZXcgVmVjdG9yMihwb3NpdGlvbjFYLCBwb3NpdGlvbjFZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblRvRHJhd0F0MiA9IG5ldyBWZWN0b3IyKHBvc2l0aW9uMlgsIHBvc2l0aW9uMlkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2ZWN0b3JQb3NpdGlvbiA9PSBib2FyZC5HZXRMZW5ndGgoMCkgLSAyKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpMiA9IHNwZWNpYWxDb2xvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBQb3NpdGlvbi5sZWZ0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uVG9EcmF3QXQxID0gbmV3IFZlY3RvcjIocG9zaXRpb24yWCwgcG9zaXRpb24yWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25Ub0RyYXdBdDIgPSBuZXcgVmVjdG9yMihwb3NpdGlvbjFYLCBwb3NpdGlvbjFZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmVjdG9yUG9zaXRpb24gPT0gYm9hcmQuR2V0TGVuZ3RoKDApIC0gMilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaTEgPSBzcGVjaWFsQ29sb3I7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUG9zaXRpb24uZG93bjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblRvRHJhd0F0MSA9IG5ldyBWZWN0b3IyKHBvc2l0aW9uMVgsIHBvc2l0aW9uMVkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uVG9EcmF3QXQyID0gbmV3IFZlY3RvcjIocG9zaXRpb24zWCwgcG9zaXRpb24zWSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgUG9zaXRpb24udXA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25Ub0RyYXdBdDEgPSBuZXcgVmVjdG9yMihwb3NpdGlvbjNYLCBwb3NpdGlvbjNZKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblRvRHJhd0F0MiA9IG5ldyBWZWN0b3IyKHBvc2l0aW9uMVgsIHBvc2l0aW9uMVkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblRvRHJhd0F0MS5YICs9IHZlY3RvclBvc2l0aW9uICogcG9zaXRpb25UaW1lcztcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvblRvRHJhd0F0Mi5YICs9IHZlY3RvclBvc2l0aW9uICogcG9zaXRpb25UaW1lcztcclxuICAgICAgICAgICAgICAgICAgICBpbnQgbWluWCA9IChpbnQpTWF0aC5NaW4ocG9zaXRpb25Ub0RyYXdBdDEuWCwgcG9zaXRpb25Ub0RyYXdBdDIuWCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFkgPSAoaW50KU1hdGguTWF4KHBvc2l0aW9uVG9EcmF3QXQxLlksIHBvc2l0aW9uVG9EcmF3QXQyLlkpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5ZID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKDsgbWluWSA8IGJvYXJkLkdldExlbmd0aCgxKTsgbWluWSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9hcmRbdmVjdG9yUG9zaXRpb24sIG1pblldICE9IE15dGhpY2FsSXRlbS5FbXB0eSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIG1pblktLTtcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KGJsYWNrLCBuZXcgUmVjdGFuZ2xlKG1pblggKyAyNCwgbWF4WSArIHBvc2l0aW9uVGltZXMsIDIsICgobWluWSArIDIpICogcG9zaXRpb25UaW1lcykgLSBtYXhZICsgcG9zaXRpb24xWSksIENvbG9yLldoaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNbaXRlbTFdICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyhpdGVtc1tpdGVtMV0sIHBvc2l0aW9uVG9EcmF3QXQxLCBpMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW1zW2l0ZW0yXSAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoaXRlbXNbaXRlbTJdLCBwb3NpdGlvblRvRHJhd0F0MiwgaTIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IHggPSAwOyB4IDwgYm9hcmQuR2V0TGVuZ3RoKDApOyB4KyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGludCB5ID0gMDsgeSA8IGJvYXJkLkdldExlbmd0aCgxKTsgeSsrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNbYm9hcmRbeCwgeV1dICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHggPT0gYm9hcmQuR2V0TGVuZ3RoKDApIC0gMSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyhpdGVtc1tib2FyZFt4LCB5XV0sIG5ldyBWZWN0b3IyKHggKiA1MCwgeSAqIDUwICsgMjUwKSwgc3BlY2lhbENvbG9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoaXRlbXNbYm9hcmRbeCwgeV1dLCBuZXcgVmVjdG9yMih4ICogNTAsIHkgKiA1MCArIDI1MCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoYmxhY2ssIG5ldyBSZWN0YW5nbGUoMCwgMjUwLCBib2FyZC5HZXRMZW5ndGgoMCkgKiA1MCwgMSksIENvbG9yLldoaXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCB5ID0gMDsgeSA8IGJvYXJkLkdldExlbmd0aCgxKTsgeSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyhibGFjaywgbmV3IFJlY3RhbmdsZShib2FyZC5HZXRMZW5ndGgoMCkgKiA1MCwgeSAqIDUwICsgMjUwLCAzMiwgMzIpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoaXRlbXNbbmV4dC5LZXkgIF0sIG5ldyBSZWN0YW5nbGUoKGJvYXJkLkdldExlbmd0aCgwKSArIDQpICogNTAsIDI1MCwgMzIsIDMyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoaXRlbXNbbmV4dC5WYWx1ZV0sIG5ldyBSZWN0YW5nbGUoKGJvYXJkLkdldExlbmd0aCgwKSArIDUpICogNTAsIDI1MCwgMzIsIDMyKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgeSA9IDAsIGVudW1JbmRleCA9IChpbnQpdG9wQWxvdWQ7IGVudW1JbmRleCA+PSAwOyB5KyssIGVudW1JbmRleC0tKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChNeXRoaWNhbEl0ZW0pZW51bUluZGV4ID09IE15dGhpY2FsSXRlbS5FbXB0eSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeS0tOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbXNbKE15dGhpY2FsSXRlbSllbnVtSW5kZXhdICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoaXRlbXNbKE15dGhpY2FsSXRlbSllbnVtSW5kZXhdLCBuZXcgUmVjdGFuZ2xlKChib2FyZC5HZXRMZW5ndGgoMCkgKyAxKSAqIDUwLCB5ICogNTAgKyAyNTAsIDMyLCAzMikpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhd1N0cmluZyhwb2ludEZvcm0sIENvbnZlcnQuVG9TdHJpbmcocG9pbnRzR2l2ZW5bKE15dGhpY2FsSXRlbSllbnVtSW5kZXhdKSwgbmV3IFZlY3RvcjIoKGJvYXJkLkdldExlbmd0aCgwKSArIDIpICogNTAsIHkgKiA1MCArIDI1MCksIENvbG9yLkJsYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCB4ID0gMDsgeCA8IGJvYXJkLkdldExlbmd0aCgwKTsgeCsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyhibGFjaywgbmV3IFJlY3RhbmdsZSh4ICogNTAsIChib2FyZC5HZXRMZW5ndGgoMSkgKiA1MCkgKyAyNTAsIDMyLCAzMikpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHJpbmcgbmFtZVRleHQgPSBcIk5hbWU6IFwiICsgbmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3U3RyaW5nKHBvaW50Rm9ybSwgbmFtZVRleHQsIG5ldyBWZWN0b3IyKEdyYXBoaWNzRGV2aWNlLlZpZXdwb3J0LldpZHRoIC8gMiwgMTAwICsgcG9pbnRGb3JtLk1lYXN1cmVTdHJpbmcocG9pbnRzVGV4dCkuWSkgLSAocG9pbnRGb3JtLk1lYXN1cmVTdHJpbmcobmFtZVRleHQpIC8gMiksIENvbG9yLkJsYWNrKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5FbmQoKTtcclxuXHJcbiAgICAgICAgICAgIGJhc2UuRHJhdyhnYW1lVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiAgICBzdGF0aWMgY2xhc3MgU3RhdGljXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIERyYXcodGhpcyBTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaCwgVGV4dHVyZTJEIHRleHR1cmUsIFZlY3RvcjIgcG9zaXRpb24pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KHRleHR1cmUsIHBvc2l0aW9uLCBDb2xvci5XaGl0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBEcmF3KHRoaXMgU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2gsIFRleHR1cmUyRCB0ZXh0dXJlLCBSZWN0YW5nbGUgcmVjdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcodGV4dHVyZSwgcmVjdCwgQ29sb3IuV2hpdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuIiwidXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIEZhcmllX0FsY2hlbXlcclxue1xyXG4gICAgc3RhdGljIGNsYXNzIFByb2dyYW1cclxuICAgIHtcclxuICAgICAgICAvLy8gPHN1bW1hcnk+XHJcbiAgICAgICAgLy8vIFRoZSBtYWluIGVudHJ5IHBvaW50IGZvciB0aGUgYXBwbGljYXRpb24uXHJcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cclxuICAgICAgICBzdGF0aWMgdm9pZCBNYWluKHN0cmluZ1tdIGFyZ3MpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB1c2luZyAoR2FtZTEgZ2FtZSA9IG5ldyBHYW1lMSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLlJ1bigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iXQp9Cg==
