using Bridge;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Context = Bridge.WebGL.WebGLRenderingContext;
using TextCanvas = Bridge.Html5.CanvasRenderingContext2D;
using Bridge.WebGL;
using FloatArray = Bridge.Html5.Float32Array;

namespace Microsoft.Xna.Framework.Graphics
{
    public class SpriteBatch
    {
        #region Shaders
        internal const string vertexShader = @"attribute vec2 a_position;
attribute vec2 a_texCoord;
uniform vec2 u_resolution;
varying vec2 v_texCoord;
uniform vec2 u_rotation;

void main() {
   // convert the rectangle from pixels to 0.0 to 1.0
   vec2 zeroToOne = a_position / u_resolution;

   // convert from 0->1 to 0->2
   vec2 zeroToTwo = zeroToOne * 2.0;

   // convert from 0->2 to -1->+1 (clipspace)
   vec2 clipSpace = zeroToTwo - 1.0;

   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);

   // pass the texCoord to the fragment shader
   // The GPU will interpolate this value between points.
   v_texCoord = a_texCoord;
}";
        internal const string fragmentShader = @"precision mediump float;

// our texture
uniform sampler2D u_image;
uniform vec4 u_color;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
   gl_FragColor = texture2D(u_image, v_texCoord) * u_color;
}
";
        #endregion
        #region JS Methods
        [Script(@"var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
 
  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);")]
        static extern WebGLShader CreateShader(Context gl, int type, string source);
        [Script(@"  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
 
  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);")]
        static extern WebGLProgram CreateProgram(Context gl, WebGLShader vertexShader, WebGLShader fragmentShader);
        static void SetRotatedRectangle(Context gl, float rotation, Vector2 position, Vector2 origin, Vector2 size)
        {
            Vector2 stepRight =
                new Vector2(size.X * (float)Math.Cos(rotation), size.X * (float)Math.Sin(rotation));
            Vector2 stepDown =
                new Vector2(size.Y * -(float)Math.Sin(rotation), size.Y * (float)Math.Cos(rotation));
            Vector2 topLeft = new Vector2(
                position.X + origin.X * -(float)Math.Cos(rotation) + origin.Y * (float)Math.Sin(rotation),
                position.Y + origin.X * -(float)Math.Sin(rotation) + origin.Y * -(float)Math.Cos(rotation));
            gl.BufferData(gl.ARRAY_BUFFER, new FloatArray(new[] {
                topLeft.X                           , topLeft.Y,
                topLeft.X + stepRight.X             , topLeft.Y + stepRight.Y,
                topLeft.X + stepDown.X              , topLeft.Y + stepDown.Y,
                topLeft.X + stepDown.X              , topLeft.Y + stepDown.Y,
                topLeft.X + stepRight.X             , topLeft.Y + stepRight.Y,
                topLeft.X + stepRight.X + stepDown.X, topLeft.Y + stepRight.Y + stepDown.Y
            }), gl.STATIC_DRAW);
        }
        #endregion
        internal Context _context => @internal.context;
        internal TextCanvas _textCanvas => @internal.textContext;
        WebGLProgram program;
        WebGLShader _vertexShader, _fragmentShader;
        int positionLocation, texCoordLocation;
        WebGLUniformLocation rotationLocation;
        GraphicsDevice @internal;

        public SpriteBatch(GraphicsDevice graphicsDevice)
        {
            @internal = graphicsDevice;
            _vertexShader = CreateShader(_context, _context.VERTEX_SHADER, vertexShader);
            _fragmentShader = CreateShader(_context, _context.FRAGMENT_SHADER, fragmentShader);
            program = CreateProgram(_context, _vertexShader, _fragmentShader);
            positionBuffer = _context.CreateBuffer();
            texCoordBuffer = _context.CreateBuffer();
        }
        WebGLBuffer positionBuffer, texCoordBuffer;
        BeginState _beginState = BeginState.End;
        enum BeginState
        {
            Begin,
            End
        }
        void AssertState (BeginState old, BeginState @new)
        {
            if (_beginState == old)
                _beginState = @new;
            else
                throw new Exception($"Trying to {@new} but state is {_beginState}");
        }
        public void Begin ()
        {
            _textCanvas.ClearRect(0, 0, _textCanvas.Canvas.Width, _textCanvas.Canvas.Height);
            AssertState(BeginState.End, BeginState.Begin);
            positionLocation = _context.GetAttribLocation(program, "a_position");
            texCoordLocation = _context.GetAttribLocation(program, "a_texCoord");
            rotationLocation = _context.GetUniformLocation(program, "u_rotation");
            // Tell WebGL how to convert from clip space to pixels
            _context.Viewport(0, 0, @internal.@internal.Width, @internal.@internal.Height);
            _context.BlendFunc(_context.SRC_ALPHA, _context.ONE_MINUS_SRC_ALPHA);
            _context.Enable(_context.BLEND);
        }
        public void End ()
        {
            AssertState(BeginState.Begin, BeginState.End);
        }
        public void Draw(Texture2D image, Vector2 position, Color color) =>
            Draw(image, new Rectangle(position.ToPoint(), new Point(image.Width, image.Height)), color);
        public void Draw (Texture2D image, Rectangle position, Color color) =>
            Draw(image, position, null, color);
        public void Draw(Texture2D image, Rectangle position, Rectangle? sourceRectangle, Color color) =>
            Draw(image, position, sourceRectangle, color, 0, new Vector2(), SpriteEffects.None, 0f);
        public void Draw(Texture2D image, Rectangle position, Rectangle? sourceRectangle, Color color, float rotation, Vector2 origin, SpriteEffects effects, float layerDepth) =>
            Draw(image, position.Location.ToVector2(), sourceRectangle, color, rotation, origin, new Vector2(position.Width / (float)image.Width, position.Height / (float)image.Height), effects, layerDepth);
        public void Draw
        (
             Texture2D texture,
             Vector2 position,
             Rectangle? sourceRectangle,
             Color color,
             float rotation,
             Vector2 origin,
             Vector2 scale,
             SpriteEffects effects,
             float layerDepth
        )
        {
            AssertState(BeginState.Begin, BeginState.Begin);
            if (sourceRectangle == null)
                sourceRectangle = new Rectangle(new Point(), new Point(texture.Width, texture.Height));
            Rectangle sourceRectangle_ = (Rectangle)sourceRectangle;
            _context.Uniform4f(_context.GetUniformLocation(program, "u_color"), color.R / 255d, color.G / 255d, color.B / 255d, color.A / 255d);
            _context.BindBuffer(_context.ARRAY_BUFFER, positionBuffer);
            SetRotatedRectangle(_context, rotation, position, origin * scale, new Vector2(texture.Width, texture.Height) * scale);
            _context.BindBuffer(_context.ARRAY_BUFFER, texCoordBuffer);
            var left = (effects.HasFlag(SpriteEffects.FlipHorizontally) ? sourceRectangle_.Right : sourceRectangle_.Left) / (float)texture.Width;
            var right = (effects.HasFlag(SpriteEffects.FlipHorizontally) ? sourceRectangle_.Left : sourceRectangle_.Right) / (float)texture.Width;
            var top = (effects.HasFlag(SpriteEffects.FlipVertically) ? sourceRectangle_.Bottom : sourceRectangle_.Top) / (float)texture.Height;
            var bottom = (effects.HasFlag(SpriteEffects.FlipVertically) ? sourceRectangle_.Top : sourceRectangle_.Bottom) / (float)texture.Height;
            _context.BufferData(_context.ARRAY_BUFFER, new FloatArray(new[]
            {
                left, top,
                right, top,
                left, bottom,
                left, bottom,
                right, top,
                right, bottom
            }), _context.STATIC_DRAW);
            // Cache WebGL texture on first use
            if (!texture._glTextureInitialized)
            {
                texture._glTexture = _context.CreateTexture();
                _context.BindTexture(_context.TEXTURE_2D, texture._glTexture);
                _context.TexParameteri(_context.TEXTURE_2D, _context.TEXTURE_WRAP_S, _context.CLAMP_TO_EDGE);
                _context.TexParameteri(_context.TEXTURE_2D, _context.TEXTURE_WRAP_T, _context.CLAMP_TO_EDGE);
                _context.TexParameteri(_context.TEXTURE_2D, _context.TEXTURE_MIN_FILTER, _context.LINEAR);
                _context.TexParameteri(_context.TEXTURE_2D, _context.TEXTURE_MAG_FILTER, _context.LINEAR);
                _context.TexImage2D(_context.TEXTURE_2D, 0, _context.RGBA, _context.RGBA, _context.UNSIGNED_BYTE, texture.@internal);
                texture._glTextureInitialized = true;
            }
            else
            {
                _context.BindTexture(_context.TEXTURE_2D, texture._glTexture);
            }
            var resolutionLocation = _context.GetUniformLocation(program, "u_resolution");
            _context.UseProgram(program);
            _context.EnableVertexAttribArray(positionLocation);
            _context.BindBuffer(_context.ARRAY_BUFFER, positionBuffer);
            _context.VertexAttribPointer(positionLocation, 2, _context.FLOAT, false, 0, 0);
            _context.EnableVertexAttribArray(texCoordLocation);
            _context.BindBuffer(_context.ARRAY_BUFFER, texCoordBuffer);
            _context.VertexAttribPointer(texCoordLocation, 2, _context.FLOAT, false, 0, 0);
            _context.Uniform2f(resolutionLocation, _context.Canvas.Width, _context.Canvas.Height);
            _context.DrawArrays(_context.TRIANGLES, 0, 6);
        }
        public void DrawString(SpriteFont spriteFont, string value, Vector2 position, Color color)
        {
            AssertState(BeginState.Begin, BeginState.Begin);
            _textCanvas.Font = spriteFont._name;
            _textCanvas.FillStyle = $"rgba({color.R}, {color.G}, {color.B}, {color.A})";
            float y = position.Y;
            foreach (var cVal in value.Split('\n'))
            {
                float x = position.X;
                foreach (var sItem in cVal)
                {
                    _textCanvas.FillText(sItem.ToString(), (int)x, (uint)(y + spriteFont._height));
                    x += (float)_textCanvas.MeasureText(sItem.ToString()).Width;
                    x += (float)spriteFont._spacing;
                }
                y += spriteFont.MeasureString(cVal).Y;
            }
        }
    }
}
