Bridge.assembly("Test", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = [System,Microsoft.Xna.Framework,Microsoft.Xna.Framework.Graphics,Test];
    $m($n[3].Program, function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Main","is":true,"t":8,"sn":"Main","rt":$n[0].Void}]}; });
    $m($n[3].Game1, function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"sn":"ctor"},{"ov":true,"a":3,"n":"Draw","t":8,"pi":[{"n":"gameTime","pt":$n[1].GameTime,"ps":0}],"sn":"Draw","rt":$n[0].Void,"p":[$n[1].GameTime]},{"ov":true,"a":3,"n":"Initialize","t":8,"sn":"Initialize","rt":$n[0].Void},{"ov":true,"a":3,"n":"LoadContent","t":8,"sn":"LoadContent","rt":$n[0].Void},{"ov":true,"a":3,"n":"Update","t":8,"pi":[{"n":"gameTime","pt":$n[1].GameTime,"ps":0}],"sn":"Update","rt":$n[0].Void,"p":[$n[1].GameTime]},{"a":1,"n":"angel","t":4,"rt":$n[2].Texture2D,"sn":"angel"},{"a":1,"n":"frames","t":4,"rt":$n[0].Int32,"sn":"frames"},{"a":1,"n":"graphics","t":4,"rt":$n[1].GraphicsDeviceManager,"sn":"graphics"},{"a":1,"n":"spriteBatch","t":4,"rt":$n[2].SpriteBatch,"sn":"spriteBatch"}]}; });
});
