using Microsoft.Xna.Framework.Graphics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HTMLImageElement = Bridge.Html5.HTMLImageElement;

namespace Microsoft.Xna.Framework.Content
{
    public class ContentManager
    {
        public string RootDirectory { get; set; } = "Content";
        internal Game @internal;
        internal ContentManager() { }
        internal Dictionary<string, Texture2D> images = new Dictionary<string, Texture2D>();
        internal Dictionary<string, SpriteFont> fonts = new Dictionary<string, SpriteFont>();

        public T Load<T> (string value)
        {
            if (typeof(T) == typeof(Texture2D))
            {
                if (images.ContainsKey(value))
                    return (T)(object)images[value];
                Texture2D r = new Texture2D();
                images.Add(value, r);
                return (T)(object)r;
            }
            else if (typeof(T) == typeof(SpriteFont))
            {
                if (fonts.ContainsKey(value))
                    return (T)(object)fonts[value];
                SpriteFont r = new SpriteFont(@internal.GraphicsDevice);
                fonts.Add(value, r);
                return (T)(object)r;
            }
            else
                throw new NotImplementedException();
        }

        internal async Task AwaitLoad ()
        {
            foreach (var image in images)
            {
                image.Value.@internal = await AwaitLoadImage(image.Key);
                @internal.progress.Value++;
            }
            foreach (var font in fonts)
            {
                await AwaitLoadSpriteFont(font.Key, font.Value);
                @internal.progress.Value++;
            }
        }

        internal Task<HTMLImageElement> AwaitLoadImage (string value)
        {
            HTMLImageElement image = new HTMLImageElement
            {
                Src = $"{RootDirectory}/{value}.png"
            };
            var result = new TaskCompletionSource<HTMLImageElement>();
            image.OnLoad = e => result.SetResult(image);
            return result.Task;
        }
        internal async Task AwaitLoadSpriteFont (string value, SpriteFont font)
        {
            var request = new Bridge.Html5.XMLHttpRequest();
            request.Open("GET", $"{RootDirectory}/{value}.spritefont");
            request.Send((string)null);
            var task = new TaskCompletionSource<string>();
            request.OnReadyStateChange = () =>
            {
                if (request.ReadyState == Bridge.Html5.AjaxReadyState.Done)
                    if (request.Status == 200)
                        task.SetResult(request.ResponseText);
            };
            var domParser = new Bridge.Html5.DOMParser();
            var xmlDoc = domParser.ParseFromString(await task.Task, "text/xml");
            string fontName = xmlDoc.GetElementsByTagName("FontName")[0].ChildNodes[0].NodeValue;
            double fontSize = double.Parse(xmlDoc.GetElementsByTagName("Size")[0].ChildNodes[0].NodeValue);
            InStyle style = (InStyle)Enum.Parse(typeof(InStyle), xmlDoc.GetElementsByTagName("Style")[0].ChildNodes[0].NodeValue);
            string resultVal = "";
            if (style.HasFlag(InStyle.Bold))
                resultVal += "bold ";
            if (style.HasFlag(InStyle.Italic))
                resultVal += "italic ";
            font._height = fontSize;
            resultVal += fontSize + "px ";
            resultVal += fontName;
            font._name = resultVal;
        }
        [Flags]
        enum InStyle
        {
            Regular = 0,
            Bold = 1,
            Italic = 2
        }
    }
}
