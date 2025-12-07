using Microsoft.Xna.Framework.Audio;
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
        internal Dictionary<string, SoundEffect> sounds = new Dictionary<string, SoundEffect>();

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
                LoadSpriteFont(value, r);
                fonts.Add(value, r);
                return (T)(object)r;
            }
            else if (typeof(T) == typeof(SoundEffect))
            {
                if (sounds.ContainsKey(value))
                    return (T)(object)sounds[value];
                SoundEffect r = new SoundEffect(@internal.audioContext);
                sounds.Add(value, r);
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
            foreach (var sound in sounds)
            {
                await sound.Value.LoadSound($"{RootDirectory}/{sound.Key}.wav");
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
        internal void LoadSpriteFont (string value, SpriteFont font)
        {
            var request = new Bridge.Html5.XMLHttpRequest();
            request.Open("GET", $"{RootDirectory}/{value}.spritefont", false);
            request.Send((string)null);
            var xmlDoc = (new Bridge.Html5.DOMParser()).ParseFromString(request.ResponseText, "text/xml");
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
            font._spacing = double.Parse(xmlDoc.GetElementsByTagName("Spacing")[0].ChildNodes[0].NodeValue);
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
