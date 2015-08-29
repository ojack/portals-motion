/**
 *  by Olivia Jacks
 * adapted from http://glslsandbox.com/e#26136.1
 *
 */

THREE.BlendMaskShader = {

	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"tDiffuse2": { type: "t", value: null },
		"tDiffuse3": { type: "t", value: null },
		"mixRatio":  { type: "f", value: 1.0 },
		"mouseX": {type: "f", value: 0.1},
		"mouseY": {type: "f", value: 0.3},
		"mag": {type: "f", value: 50.}

	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float mouseX;",
		"uniform float mouseY;",
		"uniform float mag;",
		"uniform float mixRatio;",
		"uniform sampler2D tDiffuse;",
		"uniform sampler2D tDiffuse2;",
		"uniform sampler2D tDiffuse3;",
		"varying vec2 vUv;",
	

		"void main() {",
			"vec2 p = vUv;",
			"p.x = 1.0 - p.x;",
			"float size = mag*(mouseX+0.5);",
			"vec2 pos = vec2(mouseX,1.0-mouseY);",
			//"float dist = 0.3*distance(pos, vUv);",
			
			"float color = 0.1;",
		//	"vec2 disp = vec2(vUv.x + dist, vUv.y +dist);",
			"float dist = 0.;",
	
			"for(int i = 0; i < 1; i++){",
				"dist += (size) / distance(pos+dist, vUv);",
				"color += cos(vUv.x*vUv.y*dist);",
			"}",
			
			"vec4 mixRatio = texture2D( tDiffuse, vUv );",
			"vec4 texel2 = texture2D( tDiffuse2, vUv );",
			"vec4 texel3 = texture2D( tDiffuse3, vUv );",
			"gl_FragColor = mix( texel2, texel3, mixRatio.r );",
			//"gl_FragColor = opacity * mix( texel1, texel2, mixRatio );",
			//"gl_FragColor = vec4(abs(texel1.r*mixRatio - texel2.r*mixI), abs(texel1.g*mixRatio - texel2.g*mixI), abs(texel1.b*mixRatio - texel2.b*mixI), 1.0);",
			//"gl_FragColor = vec4((texel1.r*mixRatio - texel2.r*mixI), (texel1.g*mixRatio - texel2.g*mixI), (texel1.b*mixRatio - texel2.b*mixI), 1.0);",
			//"gl_FragColor = texture2D(tDiffuse, vec2(vUv.x-color*0.1, vUv.y));",
			//"vec4 fullColor = vec4(color, 1.0);",
			//"gl_FragColor = vec4(diff(color.r, tex.r, 0.5), diff(color.g, tex.g, 0.5), diff(color.b, tex.b, 0.5), 1.0);",
		//	"gl_FragColor = texture2D( tDiffuse, disp);",
			//"gl_FragColor = vec4(dist, dist, dist, 1.0);",
			/*"vec2 checker = vec2(width, height);",
			//"if(p.x > mirror) p.x = p.x-2.0*(p.x-mirror);",
			/*"vec2 cell = step(0.5, fract(vUv/checker));",
			"if(cell.x + cell.y == 1.0){",
			"gl_FragColor = texture2D( tDiffuse, p);",
			"} else {",
			"gl_FragColor = texture2D( tDiffuse, vUv);",
			"}",*/

		"}"

	].join("\n")

};

/*
ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;
varying vec2 surfacePosition;

#define N 100
void main( void ) {
	float size = 500.*(mouse.x+0.5);
	float dist = 0.;
	vec2 pos = vec2(mouse.x-0.5,mouse.y-0.5);
	vec3 color = vec3(0.1);;
	
	for(int i = 0; i < N; i++){
		dist += (size) / distance(pos+dist, surfacePosition);
		color += vec3(cos(surfacePosition.x*surfacePosition.y*dist));
	}
	gl_FragColor = vec4(color, 1.0);

*/
//vec4(abs(t0.r*diff - t1.r*diffI), abs(t0.g*diff - t1.g*diffI),  abs(t0.b*diff - t1.b*diffI)
