
var composer;
var EffectChain = require('./EffectChain.js');
var frame = 0;
var delay = 2;
var WebGL = class WebGL {
  constructor(local_stream, remote_stream){
    this.video = document.getElementById("local-stream");
    this.video.src = URL.createObjectURL(local_stream);
    this.remote = document.getElementById("remote-stream");
    this.remote.src = URL.createObjectURL(remote_stream);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.insertBefore(this.renderer.domElement, document.body.firstChild);
    this.texture1 = this.initVideoTexture(this.video);
    this.texture2 = this.initVideoTexture(this.remote);
    this.lagTexture = this.initVideoTexture(this.video);
    this.woodTexture = THREE.ImageUtils.loadTexture( './textures/crate.gif' );
    this.woodTexture.anisotropy = this.renderer.getMaxAnisotropy();
    //this.initEffects();
    this.effectChain = EffectChain("GlassWarp", this.renderer, this.texture1, this.lagTexture, this.texture2);
  }
  initVideoTexture(vid){
    var tex = new THREE.Texture( vid );
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    //tex.format = THREE.RGBFormat;
    return tex;
  }
  increaseDelay(){
    delay++;
    console.log(delay);
  }
  decreaseDelay(){
    delay--;
    if(delay < 1){
      delay = 1;
    }
    console.log(delay);
  }
  addFrame(){
    frame++;
    this.texture1.needsUpdate = true;
    this.texture2.needsUpdate = true;
    if(frame%delay == 0){
     this.lagTexture.needsUpdate = true;

    } else {
     
      this.lagTexture.needsUpdate = false;

    }
    this.effectChain.render(100, 100, 100);
    //this.lagTexture.needsUpdate = true;
    
    // this.texture2.needsUpdate = true;
    // //console.log(this.composer);
    // this.composer.render();
  }
  initEffects(){
    this.composer = new THREE.EffectComposer( this.renderer );
    var textureEffect = new THREE.TexturePass( this.woodTexture, 1.0 );
 textureEffect.renderToScreen = true;
  console.log("tex");
 console.log(textureEffect);
  this.composer.addPass( textureEffect );
  //shaderEffect = new THREE.ShaderPass(THREE.KaleidoShader);
  //composer.addPass(shaderEffect);

 // var  dotScreenEffect = new THREE.ShaderPass( THREE.DotScreenShader );
 //  dotScreenEffect.uniforms[ 'scale' ].value = 0.8;
 //  dotScreenEffect.renderToScreen = true;
 //  this.composer.addPass( dotScreenEffect );
  //blendEffect = new THREE.ShaderPass(THREE.DifferenceShader);
//  var blendEffect = new THREE.ShaderPass(THREE.DifferenceShader);
//   blendEffect.uniforms['tDiffuse2'].value = texture2;
// //blendEffect.uniforms['tDiffuse2'].value = woodTexture;
//   //blendEffect.uniforms['tDiffuse2'].value = texture1;
//   blendEffect.renderToScreen = true;
//   //shaderEffect.renderToScreen = true;
  
//  this.composer.addPass( blendEffect);
  }
 
}


export default WebGL;