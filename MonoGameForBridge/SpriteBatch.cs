using Bridge;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Context = Bridge.WebGL.WebGLRenderingContext;
using Bridge.WebGL;
using FloatArray = Bridge.Html5.Float32Array;

namespace Microsoft.Xna.Framework.Graphics
{
    public class SpriteBatch
    {
        #region Consts
        internal const string vertexShader = @"attribute vec2 a_position;
attribute vec2 a_texCoord;

uniform vec2 u_resolution;

varying vec2 v_texCoord;

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
        [Script(@"var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
     x1, y1,
     x2, y1,
     x1, y2,
     x1, y2,
     x2, y1,
     x2, y2,
  ]), gl.STATIC_DRAW);")]
        static extern void SetRectangle(Context gl, double x, double y, double width, double height);
        #endregion
        internal Context context => @internal.context;
        internal Bridge.Html5.CanvasRenderingContext2D context2d => @internal.@internal.GetContext(Bridge.Html5.CanvasTypes.CanvasContext2DType.CanvasRenderingContext2D);
        WebGLProgram program;
        WebGLShader _vertexShader, _fragmentShader;
        int positionLocation, texCoordLocation;
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
            AssertState(BeginState.End, BeginState.Begin);
            positionLocation = context.GetAttribLocation(program, "a_position");
            texCoordLocation = context.GetAttribLocation(program, "a_texCoord");
            // Tell WebGL how to convert from clip space to pixels
            context.Viewport(0, 0, @internal.@internal.Width, @internal.@internal.Height);
        }
        public void End ()
        {
            AssertState(BeginState.Begin, BeginState.End);
        }
        public void Draw(Texture2D image, Vector2 position, Color color) =>
            Draw(image, new Rectangle(position.ToPoint(), new Point(image.Width, image.Height)), color);
        public void Draw (Texture2D image, Rectangle position, Color color)
        {
            context.Uniform4f(context.GetUniformLocation(program, "u_color"), color.R / 255d, color.G / 255d, color.B / 255d, color.A / 255d);
            context.BindBuffer(context.ARRAY_BUFFER, positionBuffer);
            SetRectangle(context, position.X, position.Y, position.Width, position.Height);
            context.BindBuffer(context.ARRAY_BUFFER, texCoordBuffer);
            context.BufferData(context.ARRAY_BUFFER, new FloatArray(new[]
            {
                0f, 0f,
                1f, 0f,
                0f, 1f,
                0f, 1f,
                1f, 0,
                1f, 1f
            }), context.STATIC_DRAW);
            var texture = context.CreateTexture();
            context.BindTexture(context.TEXTURE_2D, texture);
            context.TexParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
            context.TexParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
            context.TexParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
            context.TexParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);

            // Upload the image into the texture.
            context.TexImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, image.@internal);
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
        //public void DrawString (SpriteFont spriteFont, string value, Vector2 position, Color color)
        //{
        //    context2d.FillStyle = $"rgba({color.R}, {color.G}, {color.B}, {color.A})";
        //    context2d.FillText(value, (uint)position.X, (uint)position.Y);
        //}
    }
}
