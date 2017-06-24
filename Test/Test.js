/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2017
 * @compiler Bridge.NET 16.0.0-beta3
 */
Bridge.assembly("Test", function ($asm, globals) {
    "use strict";

    Bridge.define("Test.Game1", {
        inherits: [Microsoft.Xna.Framework.Game],
        fields: {
            graphics: null,
            angel: null,
            spriteBatch: null,
            frames: 0
        },
        ctors: {
            ctor: function () {
                this.$initialize();
                Microsoft.Xna.Framework.Game.ctor.call(this);
                this.Content.RootDirectory = "";
                this.graphics = new Microsoft.Xna.Framework.GraphicsDeviceManager(this);
                this.graphics.PreferredBackBufferWidth = 1366;
                this.graphics.PreferredBackBufferHeight = 768;
                this.graphics.IsFullScreen = true;
                this.IsMouseVisible = true;
            }
        },
        methods: {
            Initialize: function () {
                Microsoft.Xna.Framework.Game.prototype.Initialize.call(this);
            },
            LoadContent: function () {
                this.spriteBatch = new Microsoft.Xna.Framework.Graphics.SpriteBatch(this.GraphicsDevice);
                this.angel = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "angel");
                Microsoft.Xna.Framework.Game.prototype.LoadContent.call(this);
            },
            Draw: function (gameTime) {
                this.GraphicsDevice.Clear(Microsoft.Xna.Framework.Color.LightPink.$clone());
                this.spriteBatch.Begin();
                this.spriteBatch.Draw$4(this.angel, new Microsoft.Xna.Framework.Vector2.$ctor2(((500 + ((this.frames * 2) | 0)) | 0), 500), null, Microsoft.Xna.Framework.Color.OrangeRed.$clone(), this.frames * 0.05, new Microsoft.Xna.Framework.Vector2.$ctor2(16, 16), Microsoft.Xna.Framework.Vector2.op_Multiply$1(new Microsoft.Xna.Framework.Vector2.$ctor2(0.5, 1), 4), 0, 0);
                this.spriteBatch.End();
                Microsoft.Xna.Framework.Game.prototype.Draw.call(this, gameTime);
            },
            Update: function (gameTime) {
                this.frames = (this.frames + 1) | 0;
                Microsoft.Xna.Framework.Game.prototype.Update.call(this, gameTime);
            }
        }
    });

    Bridge.define("Test.Program", {
        main: function Main () {
            var game = new Test.Game1();
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
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJUZXN0LmpzIiwKICAic291cmNlUm9vdCI6ICIiLAogICJzb3VyY2VzIjogWyJHYW1lMS5jcyIsIkFwcC5jcyJdLAogICJuYW1lcyI6IFsiIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBZVlBO2dCQUNBQSxnQkFBV0EsSUFBSUEsOENBQXNCQTtnQkFDckNBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBOzs7OztnQkFLQUE7OztnQkFRQUEsbUJBQWNBLElBQUlBLDZDQUFZQTtnQkFDOUJBLGFBQVFBO2dCQUNSQTs7NEJBR3lCQTtnQkFFekJBLDBCQUFxQkE7Z0JBQ3JCQTtnQkFDQUEsd0JBQWlCQSxZQUFPQSxJQUFJQSx1Q0FBUUEsUUFBTUEscUNBQWtCQSxNQUFNQSxrREFBaUJBLEFBQU9BLEFBQUNBLG9CQUFnQkEsSUFBSUEsZ0RBQWlCQSxrREFBSUE7Z0JBQ3BJQTtnQkFDQUEsdURBQVVBOzs4QkFLaUJBO2dCQUUzQkE7Z0JBQ0FBLHlEQUFZQTs7Ozs7OztZQ3pDWkEsV0FBb0JBLElBQUlBOztnQkFBU0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG51c2luZyBTeXN0ZW0uTGlucTtcclxudXNpbmcgU3lzdGVtLlRleHQ7XHJcbnVzaW5nIFN5c3RlbS5UaHJlYWRpbmcuVGFza3M7XHJcblxyXG5uYW1lc3BhY2UgVGVzdFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR2FtZTEgOiBHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgR3JhcGhpY3NEZXZpY2VNYW5hZ2VyIGdyYXBoaWNzO1xyXG4gICAgICAgIHB1YmxpYyBHYW1lMSAoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQ29udGVudC5Sb290RGlyZWN0b3J5ID0gXCJcIjtcclxuICAgICAgICAgICAgZ3JhcGhpY3MgPSBuZXcgR3JhcGhpY3NEZXZpY2VNYW5hZ2VyKHRoaXMpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5QcmVmZXJyZWRCYWNrQnVmZmVyV2lkdGggPSAxMzY2O1xyXG4gICAgICAgICAgICBncmFwaGljcy5QcmVmZXJyZWRCYWNrQnVmZmVySGVpZ2h0ID0gNzY4O1xyXG4gICAgICAgICAgICBncmFwaGljcy5Jc0Z1bGxTY3JlZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBJc01vdXNlVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0aWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgVGV4dHVyZTJEIGFuZ2VsO1xyXG4gICAgICAgIFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBMb2FkQ29udGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaCA9IG5ldyBTcHJpdGVCYXRjaChHcmFwaGljc0RldmljZSk7XHJcbiAgICAgICAgICAgIGFuZ2VsID0gQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJhbmdlbFwiKTtcclxuICAgICAgICAgICAgYmFzZS5Mb2FkQ29udGVudCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgRHJhdyhHYW1lVGltZSBnYW1lVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEdyYXBoaWNzRGV2aWNlLkNsZWFyKENvbG9yLkxpZ2h0UGluayk7XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkJlZ2luKCk7XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoYW5nZWwsIG5ldyBWZWN0b3IyKDUwMCArIGZyYW1lcyAqIDIsIDUwMCksIG51bGwsIENvbG9yLk9yYW5nZVJlZCwgKGZsb2F0KShmcmFtZXMgKiAwLjA1KSwgbmV3IFZlY3RvcjIoMTYsIDE2KSwgbmV3IFZlY3RvcjIoMC41ZiwgMSkgKiA0LCAwLCAwKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRW5kKCk7XHJcbiAgICAgICAgICAgIGJhc2UuRHJhdyhnYW1lVGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnQgZnJhbWVzO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoR2FtZVRpbWUgZ2FtZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmcmFtZXMrKztcclxuICAgICAgICAgICAgYmFzZS5VcGRhdGUoZ2FtZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBCcmlkZ2U7XHJcbnVzaW5nIEJyaWRnZS5IdG1sNTtcclxudXNpbmcgTmV3dG9uc29mdC5Kc29uO1xyXG51c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgVGVzdFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgUHJvZ3JhbVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHVzaW5nIChHYW1lMSBnYW1lID0gbmV3IEdhbWUxKCkpIGdhbWUuUnVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0KfQo=
