using System;
using System.Threading.Tasks;
using Bridge;
using Bridge.Html5;

namespace Microsoft.Xna.Framework.Audio
{
    public class SoundEffect
    {
        internal dynamic _audioContext;
        internal dynamic _soundBuffer;

        internal SoundEffect(dynamic audioContext)
        {
            _audioContext = audioContext;
        }

        internal async Task LoadSound(string path)
        {
            var request = new XMLHttpRequest();
            request.ResponseType = XMLHttpRequestResponseType.ArrayBuffer;
            request.Open("GET", path);
            request.Send();

            var tcs = new TaskCompletionSource<ArrayBuffer>();
            request.OnLoad = e => tcs.SetResult((ArrayBuffer)request.Response);

            var arrayBuffer = await tcs.Task;

            var tcs2 = new TaskCompletionSource<object>();
            Script.Write("{0}.decodeAudioData({1}, {2}, function() {{ throw new Error('Failed to decode audio'); }});",
                _audioContext, arrayBuffer, (Action<object>)(buffer => tcs2.SetResult(buffer)));

            _soundBuffer = await tcs2.Task;
        }

        public void Play()
        {
            CreateInstance().Play();
        }

        public SoundEffectInstance CreateInstance()
        {
            return new SoundEffectInstance(this);
        }
    }
}
