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
        Dictionary<string, Texture2D> images;

        public T Load<T> (string value)
        {
            if (typeof(T) == typeof(Texture2D))
            {
                Texture2D r = new Texture2D();
                images.Add(value, (Texture2D)(object)r);
                return (T)(object)r;
            }
            else if (typeof(T) == typeof(SpriteFont))
                return (T)(object)(new SpriteFont());
            else
                throw new NotImplementedException();
        }

        internal async Task AwaitLoad ()
        {
            foreach (var image in images)
                image.Value.@internal = await AwaitLoad(image.Key);
        }

        internal Task<HTMLImageElement> AwaitLoad (string value)
        {
            HTMLImageElement image = new HTMLImageElement
            {
                Src = $"{RootDirectory}/{value}.png"
            };
            var result = new TaskCompletionSource<HTMLImageElement>();
            image.OnLoad = e => result.SetResult(image);
            return result.Task;
        }
    }
}
