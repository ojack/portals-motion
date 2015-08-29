/**
 *  Ascii shader
 * by Olivia Jack (@rhizomaticode) and Kamal Marhubi (@kamalmarhubi)
 *
 */

THREE.AsciiShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"tDiffuse2": { type: "t", value: null },
		"rows": {type: "f", value: null},
		"cols": {type: "f", value: null},
		"numChars": {type: "f", value: null},

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float rows;",
		"uniform float cols;",
		"uniform sampler2D tDiffuse;",
		"uniform sampler2D tDiffuse2;",
		"uniform float numChars;",

		"varying vec2 vUv;",

		"void main() {",
                  "vec4 color;",
                  "vec2 uv = vUv;",
                  "vec2 xf = vec2(cols, rows);",
                  "vec2 box = (floor(xf*uv) + 0.5) / xf;",
                  "vec2 offset = (uv - floor(xf*uv)/xf);",
                  "color = texture2D(tDiffuse, box);",
                  "float luminance = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;",
                  "float bucket = floor(numChars * luminance) / numChars ;",
                  "offset.x = bucket + offset.x * xf.x / numChars;",
                  "offset.y = offset.y * xf.y;",
                  "float shade = bucket;",
                  //"gl_FragColor = vec4(shade, shade, shade, 1.0);",
               "gl_FragColor = texture2D(tDiffuse2, offset) ;",
              // "gl_FragColor = texture2D(tDiffuse2, uv) ;
		"}"

	].join("\n")

};
//vec4(abs(t0.r*diff - t1.r*diffI), abs(t0.g*diff - t1.g*diffI),  abs(t0.b*diff - t1.b*diffI)
