using System;
using Bridge;

namespace Microsoft.Xna.Framework.Audio
{
    public class SoundEffectInstance : IDisposable
    {
        internal SoundEffect soundEffect;
        internal dynamic source;
        private dynamic gainNode;
        private bool disposedValue = false;

        public double Volume
        {
            get { return gainNode.gain.value; }
            set { gainNode.gain.value = value; }
        }

        public bool IsLooped { get; set; }

        public bool IsDisposed => disposedValue;

        private SoundState _state = SoundState.Stopped;
        public SoundState State => _state;

        public SoundEffectInstance(SoundEffect effect)
        {
            soundEffect = effect;
            gainNode = effect._audioContext.createGain();
        }

        public void Play()
        {
            source = soundEffect._audioContext.createBufferSource();
            source.buffer = soundEffect._soundBuffer;
            source.connect(gainNode);
            gainNode.connect(soundEffect._audioContext.destination);
            source.loop = IsLooped;
            source.start(0);
            _state = SoundState.Playing;
        }

        public void Stop(bool immediate = true)
        {
            if (source != null)
            {
                source.stop(0);
            }
            _state = SoundState.Stopped;
        }

        public void Pause()
        {
            // Web Audio doesn't have native pause, so stop is used
            Stop();
            _state = SoundState.Paused;
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(disposing: true);
        }
    }
}
