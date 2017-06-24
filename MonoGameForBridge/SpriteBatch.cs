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
        internal Context context => @internal.context;
        internal TextCanvas textCanvas => @internal.textContext;
        WebGLProgram program;
        WebGLShader _vertexShader, _fragmentShader;
        int positionLocation, texCoordLocation;
        WebGLUniformLocation rotationLocation;
        GraphicsDevice @internal;

        public SpriteBatch(GraphicsDevice graphicsDevice)
        {
            @internal = graphicsDevice;
            _vertexShader = CreateShader(context, context.VERTEX_SHADER, vertexShader);
            _fragmentShader = CreateShader(context, context.FRAGMENT_SHADER, fragmentShader);
            program = CreateProgram(context, _vertexShader, _fragmentShader);
            positionBuffer = context.CreateBuffer();
            texCoordBuffer = context.CreateBuffer();
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
            textCanvas.ClearRect(0, 0, textCanvas.Canvas.Width, textCanvas.Canvas.Height);
            AssertState(BeginState.End, BeginState.Begin);
            positionLocation = context.GetAttribLocation(program, "a_position");
            texCoordLocation = context.GetAttribLocation(program, "a_texCoord");
            rotationLocation = context.GetUniformLocation(program, "u_rotation");
            // Tell WebGL how to convert from clip space to pixels
            context.Viewport(0, 0, @internal.@internal.Width, @internal.@internal.Height);
            context.BlendFunc(context.SRC_ALPHA, context.ONE_MINUS_SRC_ALPHA);
            context.Enable(context.BLEND);
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
            float sinRotation = (float)Math.Sin(rotation);
            float cosRotation = (float)Math.Cos(rotation);
            AssertState(BeginState.Begin, BeginState.Begin);
            if (sourceRectangle == null)
                sourceRectangle = new Rectangle(new Point(), new Point(texture.Width, texture.Height));
            Rectangle sourceRectangle_ = (Rectangle)sourceRectangle;
            context.Uniform4f(context.GetUniformLocation(program, "u_color"), color.R / 255d, color.G / 255d, color.B / 255d, color.A / 255d);
            context.BindBuffer(context.ARRAY_BUFFER, positionBuffer);
            SetRotatedRectangle(context, rotation, position, origin * scale, new Vector2(texture.Width, texture.Height) * scale);
            context.BindBuffer(context.ARRAY_BUFFER, texCoordBuffer);
            var left = (effects.HasFlag(SpriteEffects.FlipHorizontally) ? sourceRectangle_.Right : sourceRectangle_.Left) / (float)texture.Width;
            var right = (effects.HasFlag(SpriteEffects.FlipHorizontally) ? sourceRectangle_.Left : sourceRectangle_.Right) / (float)texture.Width;
            var top = (effects.HasFlag(SpriteEffects.FlipVertically) ? sourceRectangle_.Bottom : sourceRectangle_.Top) / (float)texture.Height;
            var bottom = (effects.HasFlag(SpriteEffects.FlipVertically) ? sourceRectangle_.Top : sourceRectangle_.Bottom) / (float)texture.Height;
            context.BufferData(context.ARRAY_BUFFER, new FloatArray(new[]
            {
                left, top,
                right, top,
                left, bottom,
                left, bottom,
                right, top,
                right, bottom
            }), context.STATIC_DRAW);
            var wTexture = context.CreateTexture();
            context.BindTexture(context.TEXTURE_2D, wTexture);
            context.TexParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.REPEAT);
            context.TexParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.REPEAT);
            context.TexParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR);
            context.TexParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR);

            // Upload the image into the texture.
            context.TexImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, texture.@internal);
            var resolutionLocation = context.GetUniformLocation(program, "u_resolution");
            context.UseProgram(program);
            context.EnableVertexAttribArray(positionLocation);
            context.BindBuffer(context.ARRAY_BUFFER, positionBuffer);
            context.VertexAttribPointer(positionLocation, 2, context.FLOAT, false, 0, 0);
            context.EnableVertexAttribArray(texCoordLocation);
            context.BindBuffer(context.ARRAY_BUFFER, texCoordBuffer);
            context.VertexAttribPointer(texCoordLocation, 2, context.FLOAT, false, 0, 0);
            context.Uniform2f(resolutionLocation, context.Canvas.Width, context.Canvas.Height);
            context.DrawArrays(context.TRIANGLES, 0, 6);
        }
        public void DrawString(SpriteFont spriteFont, string value, Vector2 position, Color color)
        {
            AssertState(BeginState.Begin, BeginState.Begin);
            textCanvas.Font = spriteFont._name;
            textCanvas.FillStyle = $"rgba({color.R}, {color.G}, {color.B}, {color.A})";
            textCanvas.FillText(value, (uint)position.X, (uint)(position.Y + spriteFont._height));
        }
    }
}
