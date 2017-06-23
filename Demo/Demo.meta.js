Bridge.assembly("Demo", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = [Microsoft.Xna.Framework.Graphics,Microsoft.Xna.Framework,System,Farie_Alchemy,Microsoft.Xna.Framework.Input,System.Collections.Generic];
    $m(Static, function () { return {"att":1048960,"a":4,"s":true,"m":[{"a":2,"n":"Draw","is":true,"t":8,"pi":[{"n":"spriteBatch","pt":$n[0].SpriteBatch,"ps":0},{"n":"texture","pt":$n[0].Texture2D,"ps":1},{"n":"rect","pt":$n[1].Rectangle,"ps":2}],"sn":"Draw","rt":$n[2].Void,"p":[$n[0].SpriteBatch,$n[0].Texture2D,$n[1].Rectangle]},{"a":2,"n":"Draw","is":true,"t":8,"pi":[{"n":"spriteBatch","pt":$n[0].SpriteBatch,"ps":0},{"n":"texture","pt":$n[0].Texture2D,"ps":1},{"n":"position","pt":$n[1].Vector2,"ps":2}],"sn":"Draw$1","rt":$n[2].Void,"p":[$n[0].SpriteBatch,$n[0].Texture2D,$n[1].Vector2]}]}; });
    $m($n[3].MythicalItem, function () { return {"att":256,"a":4,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Count","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"Count"},{"a":2,"n":"Empty","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"Empty"},{"a":2,"n":"Jackpot","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"Jackpot"},{"a":2,"n":"angel","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"angel"},{"a":2,"n":"cake","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"cake"},{"a":2,"n":"carrot","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"carrot"},{"a":2,"n":"dragon","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"dragon"},{"a":2,"n":"duck","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"duck"},{"a":2,"n":"earth","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"earth"},{"a":2,"n":"god","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"god"},{"a":2,"n":"moon","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"moon"},{"a":2,"n":"pony","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"pony"},{"a":2,"n":"rabbit","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"rabbit"},{"a":2,"n":"star","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"star"},{"a":2,"n":"sun","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"sun"},{"a":2,"n":"unicorn","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"unicorn"},{"a":2,"n":"wish","is":true,"t":4,"rt":$n[3].MythicalItem,"sn":"wish"}]}; });
    $m($n[3].Position, function () { return {"att":256,"a":4,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Count","is":true,"t":4,"rt":$n[3].Position,"sn":"Count"},{"a":2,"n":"down","is":true,"t":4,"rt":$n[3].Position,"sn":"down"},{"a":2,"n":"left","is":true,"t":4,"rt":$n[3].Position,"sn":"left"},{"a":2,"n":"normal","is":true,"t":4,"rt":$n[3].Position,"sn":"normal"},{"a":2,"n":"up","is":true,"t":4,"rt":$n[3].Position,"sn":"up"}]}; });
    $m($n[3].Game1, function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"ApplyGravity","t":8,"pi":[{"n":"x","pt":$n[2].Int32,"ps":0}],"sn":"ApplyGravity","rt":$n[2].Void,"p":[$n[2].Int32]},{"a":2,"n":"BoardUpdate","t":8,"sn":"BoardUpdate","rt":$n[2].Void},{"ov":true,"a":3,"n":"Draw","t":8,"pi":[{"n":"gameTime","pt":$n[1].GameTime,"ps":0}],"sn":"Draw","rt":$n[2].Void,"p":[$n[1].GameTime]},{"ov":true,"a":3,"n":"Initialize","t":8,"sn":"Initialize","rt":$n[2].Void},{"ov":true,"a":3,"n":"LoadContent","t":8,"sn":"LoadContent","rt":$n[2].Void},{"a":2,"n":"OrPressed","t":8,"pi":[{"n":"gState","pt":$n[4].GamePadState,"ps":0},{"n":"state","pt":$n[4].KeyboardState,"ps":1},{"n":"keysOrButtons","ip":true,"pt":$n[2].Array.type(System.Object),"ps":2}],"sn":"OrPressed","rt":$n[2].Boolean,"p":[$n[4].GamePadState,$n[4].KeyboardState,$n[2].Array.type(System.Object)]},{"ov":true,"a":3,"n":"UnloadContent","t":8,"sn":"UnloadContent","rt":$n[2].Void},{"ov":true,"a":3,"n":"Update","t":8,"pi":[{"n":"gameTime","pt":$n[1].GameTime,"ps":0}],"sn":"Update","rt":$n[2].Void,"p":[$n[1].GameTime]},{"a":1,"n":"black","t":4,"rt":$n[0].Texture2D,"sn":"black"},{"a":1,"n":"board","t":4,"rt":System.Array.type(Farie_Alchemy.MythicalItem, 2),"sn":"board"},{"a":1,"n":"controlled","t":4,"rt":$n[2].Boolean,"sn":"controlled"},{"a":1,"n":"graphics","t":4,"rt":$n[1].GraphicsDeviceManager,"sn":"graphics"},{"a":1,"n":"highScoreList","t":4,"rt":$n[2].Boolean,"sn":"highScoreList"},{"a":1,"n":"item1","t":4,"rt":$n[3].MythicalItem,"sn":"item1"},{"a":1,"n":"item2","t":4,"rt":$n[3].MythicalItem,"sn":"item2"},{"a":1,"n":"items","t":4,"rt":$n[5].Dictionary$2(Farie_Alchemy.MythicalItem,Microsoft.Xna.Framework.Graphics.Texture2D),"sn":"items"},{"a":1,"n":"jackpot","t":4,"rt":$n[2].Boolean,"sn":"jackpot"},{"a":1,"n":"lost","t":4,"rt":$n[2].Boolean,"sn":"lost"},{"a":1,"n":"name","t":4,"rt":$n[2].String,"sn":"name"},{"a":1,"n":"next","t":4,"rt":$n[5].KeyValuePair$2(Farie_Alchemy.MythicalItem,Farie_Alchemy.MythicalItem),"sn":"next"},{"a":1,"n":"oldGPadState","t":4,"rt":$n[4].GamePadState,"sn":"oldGPadState"},{"a":1,"n":"oldState","t":4,"rt":$n[4].KeyboardState,"sn":"oldState"},{"a":1,"n":"points","t":4,"rt":$n[2].Int32,"sn":"points"},{"a":1,"n":"pointsGiven","t":4,"rt":$n[5].Dictionary$2(Farie_Alchemy.MythicalItem,System.Int32),"sn":"pointsGiven"},{"a":1,"n":"position","t":4,"rt":$n[3].Position,"sn":"position"},{"a":1,"n":"position1X","is":true,"t":4,"rt":$n[2].Int32,"sn":"position1X"},{"a":1,"n":"position1Y","is":true,"t":4,"rt":$n[2].Int32,"sn":"position1Y"},{"a":1,"n":"position2X","is":true,"t":4,"rt":$n[2].Int32,"sn":"position2X"},{"a":1,"n":"position2Y","is":true,"t":4,"rt":$n[2].Int32,"sn":"position2Y"},{"a":1,"n":"position3X","is":true,"t":4,"rt":$n[2].Int32,"sn":"position3X"},{"a":1,"n":"position3Y","is":true,"t":4,"rt":$n[2].Int32,"sn":"position3Y"},{"a":1,"n":"position4X","is":true,"t":4,"rt":$n[2].Int32,"sn":"position4X"},{"a":1,"n":"position4Y","is":true,"t":4,"rt":$n[2].Int32,"sn":"position4Y"},{"a":1,"n":"positionTimes","is":true,"t":4,"rt":$n[2].Int32,"sn":"positionTimes"},{"a":1,"n":"rnd","t":4,"rt":$n[2].Random,"sn":"rnd"},{"a":1,"n":"specialColor","t":4,"rt":$n[1].Color,"sn":"specialColor"},{"a":1,"n":"spriteBatch","t":4,"rt":$n[0].SpriteBatch,"sn":"spriteBatch"},{"a":1,"n":"topAloud","t":4,"rt":$n[3].MythicalItem,"sn":"topAloud"},{"a":1,"n":"vectorPosition","t":4,"rt":$n[2].Int32,"sn":"vectorPosition"}]}; });
    $m($n[3].Program, function () { return {"att":1048960,"a":4,"s":true,"m":[{"a":1,"n":"Main","is":true,"t":8,"pi":[{"n":"args","pt":$n[2].Array.type(System.String),"ps":0}],"sn":"Main","rt":$n[2].Void,"p":[$n[2].Array.type(System.String)]}]}; });
});
