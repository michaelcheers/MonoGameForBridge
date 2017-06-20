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
        internal const string vertexShader = @"// an attribute will receive data from a buffer
attribute vec4 a_position;
varying vec2 v_texCoord;
 
// all shaders have a main function
void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = a_position;
}";
        internal const string fragmentShader = @"precision mediump float;
 
// our texture
uniform sampler2D u_image;
 
// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;
 
void main() {
   // Look up a color from the texture.
   gl_FragColor = texture2D(u_image, v_texCoord);
}";
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
        internal Context context;
        public SpriteBatch(GraphicsDevice graphicsDevice)
        {
            context = graphicsDevice.@internal.GetContext(Bridge.Html5.CanvasTypes.CanvasContextWebGLType.WebGL).As<Context>();
            var _vertexShader = CreateShader(context, context.VERTEX_SHADER, vertexShader);
            var _fragmentShader = CreateShader(context, context.FRAGMENT_SHADER, fragmentShader);
            var program = CreateProgram(context, _vertexShader, _fragmentShader);
            var positionAttributeLocation = context.GetAttribLocation(program, "a_position");
            var positionBuffer = context.CreateBuffer();
            context.BindBuffer(context.ARRAY_BUFFER, positionBuffer);
            var texCoordLocation = context.GetAttribLocation(program, "a_texCoord");
            var texCoordBuffer = context.CreateBuffer();
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
            context.EnableVertexAttribArray(texCoordLocation);
            context.VertexAttribPointer(texCoordLocation, 2, context.FLOAT, false, 0, 0);
            var texture = context.CreateTexture();
            context.BindTexture(context.TEXTURE_2D, texture);
            context.TexParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE);
            context.TexParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE);
            context.TexParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.NEAREST);
            context.TexParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.NEAREST);

            // Upload the image into the texture.
            //context.TexImage2D(context.TEXTURE_2D, 0, context.RGBA, context.RGBA, context.UNSIGNED_BYTE, image);
        }
        public void Begin ()
        {

        }
        public void End ()
        {

        }
        public void Draw (Texture2D image, Vector2 position, Color color)
        {

        }
    }
}
