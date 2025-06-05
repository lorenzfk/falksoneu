let scene, camera, renderer, controls, mixer, rightHandBone, raycaster, mouse, ascher, cd, cover, shlab, gomboc, currentAction;
var isTyping =false;
let animations ={};
const cont = document.querySelector('#three');
const fourx =0.5;
var camTar = [0, 4, 19];
var curStep =0;
const continueBtn =document.querySelector('#continue');
const dialogBox=document.getElementById("dialog-box");
const btnWork=document.querySelector('#btnWork');
const btnAbout=document.querySelector('#btnAbout');
const btnContact=document.querySelector('#btnContact');
const btnMail=document.querySelector('#btnMail');
const btnInsta=document.querySelector('#btnInsta');
const itemSelectBox=document.querySelector('#item-select');
const btnPrevItem=document.querySelector('#prevItem');
const btnNextItem=document.querySelector('#nextItem');
const closeItems=document.querySelector('#closeItems');
const itemInfo=document.querySelector('#itemInfo');
const itemInfoName=document.querySelector('#itemInfoName');
const skipBtn=document.querySelector('#skipBtn');
var deb= false;
var itemshow = false;
const blindtext = "";
var curItem = 2;
var itemlist =[];
const itemDescriptions =["Animation","Fashion Design","Graphic Design","Product Design","Print Design"];
function setcam(where){
  camTar=where;
}
document.querySelector('#home-btn').addEventListener("click", function () {
        camTar = [0, 4.7, 21];
        curStep=1;
        dialog('What can I do for You?');
 });
closeItems.addEventListener("click", function () {
        camTar = [0, 4, 21];
        itemshow=false;
        curStep=1;
        dialog('What else can I do for You?');
 });
btnPrevItem.addEventListener("click", function () {
  if (curItem==0){
    curItem=itemlist.length-1;
  }
  else{
    curItem--;
  }
  
 });
btnNextItem.addEventListener("click", function () {
  
  if (curItem==(itemlist.length-1)){
    curItem=0;
  }
  else{
    curItem++;
  }
  
 });

btnWork.addEventListener("click", function () {
        if (btnWork.textContent.includes('again')==false){
          btnWork.textContent+= ", again";
        }
        itemshow=true;
        curStep =5;
        camTar = [0, 4.7, 21];
        dialog('');
 });
btnAbout.addEventListener("click", function () {
        if (btnAbout.textContent.includes('again')==false){
          btnAbout.textContent+= ", again";
        }
        curStep=3;
        camTar = [1.5, 4, 5];
        dialog('I am Lorenz Falkson, a Designer currently based in Hamburg, Germany.  This Year, I received my Bachelor`s Degree in Communications Design. Yap Yap Yap 3D Animation, Fashion, Product Design and Web Development.');
 });
btnContact.addEventListener("click", function () {
        btnContact.textContent="I still wanna get in Touch";
        curStep=5;
        camTar = [1, 4, 5];
        dialog('If you want to work with me, you can send me an E-Mail - or check out my instagram to get inspired!');
 });
continueBtn.addEventListener("click", function () {
        curStep++;
    if(curStep ==1){
      dialog('What do you want to see first?');
      camTar = [0,4.5,19];
    }
    if(curStep ==4 || curStep ==6){
      curStep=1;
      camTar = [0,4.5,19];
        dialog('What do you want to see next?');
    }
    if(curStep ==5){
        dialog('');
        itemshow=true;
        camTar = [0, 4.5, 20];
      }
    if(curStep ==2){
        dialog('');
        camTar = [1.5, 4, 5];
      }
 });
document.querySelector('#i-btn').addEventListener("click", function () {
        camTar = [-2,4,5];
 });
document.querySelector('#search-btn').addEventListener("click", function () {
        camTar = [2,4,5];
 });
const loadingManager = new THREE.LoadingManager();

// Define the onLoad callback to run code after all assets are loaded
loadingManager.onLoad = function() {
  console.log('All assets loaded');
  if (deb==false){
    setTimeout(() => camTar = [1.5, 4, 5], 800);
    setTimeout(() => dialog("Welcome to my Portfolio! Let me show you what I’ve got."), 900);
  }
  else{
    
  }
  
  // Start animations, reveal scene, etc.
  animate(); 
};

// Optional: onProgress and onError
loadingManager.onProgress = function(url, itemsLoaded, itemsTotal) {
  console.log('loading...');
  //console.log(`Loading ${url}: ${itemsLoaded} of ${itemsTotal} files.`);
};
loadingManager.onError = function(url) {
  console.error(`There was an error loading ${url}`);
};

// Initialize the scene
function init() {
  // Scene
  scene = new THREE.Scene();

  // Camera (Adjusted for centering and visibility)
  camera = new THREE.PerspectiveCamera(30, cont.clientWidth / cont.clientHeight, 0.01, 1000);
  camera.position.set(0, 4, 19); // Move the camera further back

  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: false
  });
  renderer.setClearColor(0x578990, 1);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(cont.clientWidth*fourx , cont.clientHeight*fourx);
  const pointLight = new THREE.PointLight( 0xffd8ffd4, 1, 10 );
pointLight.position.set(0, 8, -4 );
scene.add( pointLight );
  const itemLight = new THREE.DirectionalLight( 0xffd8ffd4, .8 );
itemLight.position.set(0, 4, 7 );
scene.add( itemLight );
  cont.style.scale=(1/fourx);
  cont.appendChild(renderer.domElement);

  // Lights
  const envLight = new THREE.AmbientLight(0xe3ffe9, .4);
  scene.add(envLight);
  const directionalLight = new THREE.DirectionalLight(0xb3f5ab, .5);
  directionalLight.position.set(2, 10, 3);
  //scene.add(directionalLight);

  // Background image
  //scene.background = new THREE.TextureLoader().load('https://thumbs.dreamstime.com/b/stairway-to-heaven-stairs-sky-concept-sun-white-clouds-concept-religion-background-91862193.jpg');
  const textureLoader = new THREE.TextureLoader(loadingManager);

const loader = new THREE.GLTFLoader(loadingManager);
const modelUrl = "https://cdn.jsdelivr.net/gh/lorenzfk/fscontent/shopver5.gltf";

loader.load(modelUrl, function(gltf) {
  const model2 = gltf.scene;
  gltf.scene.traverse(child => {
    if (child.isMesh && child.material && child.material.map) {
    child.material.map.minFilter = THREE.NearestFilter;
    child.material.map.magFilter = THREE.NearestFilter;
    child.material.map.needsUpdate = true; // Ensure the change is applied
  }
    // Adjust materials if needed
    if (child.isMesh && child.material.map) {
      child.material.map.colorSpace = THREE.LinearSRGBColorSpace;
      child.material.map.needsUpdate = true;
    }
    if (child.material) {
      child.material.vertexColors = false;  // Disable vertex colors
      child.material.metalness = 0;
      child.material.roughness = 0.8; 
    }

    // Store references to specific named objects
    if (child.name === "ascher") {
    ascher = child;
    ascher.originalPos = child.position.clone();
    ascher.originalRot = child.rotation.x;
  }
    if (child.name === "cd") {
    cd = child;
    cd.originalPos = child.position.clone(); 
    cd.originalRot = child.rotation.x;
  }
    if (child.name === "cover") {
    cover = child;
    cover.originalPos = child.position.clone();
    cover.originalRot = child.rotation.x;
  }
    if (child.name === "shlab") {
    shlab = child;
    shlab.originalPos = child.position.clone();
    shlab.originalRot = child.rotation.x;
  }
    if (child.name === "gomboc") {
    gomboc = child;
    gomboc.originalPos = child.position.clone();
    gomboc.originalRot = child.rotation.x;
  }
  itemlist=[cd,shlab,cover,ascher,gomboc];
  });

  model2.position.set(0, 0, -2.5);
  model2.scale.set(1.2, 1.2, 1.2);
  scene.add(model2);
  console.log(ascher, cd, cover, shlab, gomboc);
});

 loader.load('https://cdn.jsdelivr.net/gh/lorenzfk/fscontent/avatar3.gltf', function loadModel(gltf) {
  const model = gltf.scene;

  gltf.scene.traverse(child => {
    if (child.isMesh && child.material && child.material.map) {
    child.material.map.minFilter = THREE.NearestFilter;
    child.material.map.magFilter = THREE.NearestFilter;
    child.material.map.needsUpdate = true; // Ensure the change is applied
  }
    if (child.material) child.material.metalness = 0;
  });

  model.position.set(1, 0, -5);
  model.scale.set(3, 3, 3);
   model.rotation.y=-0.05;
  scene.add(model);

  // Create an AnimationMixer and store each animation action by name
  mixer = new THREE.AnimationMixer(model);
  gltf.animations.forEach((clip) => {
    animations[clip.name] = mixer.clipAction(clip);
  });

  // Play the initial animation
  playAnimation('look');
});
  
}
function playAnimation(name, duration = 2.0) {
  // Check if the requested animation exists
  if (!animations[name]) return;

  const newAction = animations[name]; // The new action to play

  if (currentAction !== newAction) {
    // Stop the current action smoothly and crossfade to the new action
    if (currentAction) {
      currentAction.crossFadeTo(newAction, duration, false); // Crossfade from current to new action
    }

    // Start the new action and set it as the current action
    newAction.reset().play();
    currentAction = newAction;
  }
}
window.addEventListener('resize', onWindowResize);
function onWindowResize() {
  camera.aspect = cont.clientWidth / cont.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(cont.clientWidth*fourx, cont.clientHeight*fourx);
}
var t =0;

//ANIMATE===========================
function animate() {
  const showOffPos = new THREE.Vector3(0, 3, 5);
  const showOffSca = new THREE.Vector3(5, 5, 5);
  t++;
  renderer.render(scene, camera); // Render the scene
  requestAnimationFrame(animate);
  if (mixer) mixer.update(0.02); // Update animation at 60FPS (0.016 for ~60fps)
  const camSpeed =0.05;
  itemInfo.textContent=blindtext;
  itemInfoName.textContent=itemDescriptions[curItem];
  if (itemshow && itemlist[curItem]){
    itemSelectBox.classList.remove('minim');
    itemlist[curItem].position.lerp(showOffPos, 0.1);
    itemlist[curItem].scale.lerp(showOffSca, 0.1);
    if (itemlist[curItem]==gomboc){
      itemlist[curItem].scale.lerp((new THREE.Vector3(1.2, 1.2, 1.2)), 0.1);
    }
    if (itemlist[curItem]==shlab){
      itemlist[curItem].scale.lerp((new THREE.Vector3(1.5, 1.5, 1.5)), 0.1);
    }
    itemlist[curItem].rotation.x=.3;
    itemlist[curItem].rotation.y+=0.02;
  for (let i = 0; i < itemlist.length; i++) {
    if (i !== curItem) {
      itemlist[i].position.lerp(itemlist[i].originalPos, 0.1);
      itemlist[i].scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      itemlist[i].rotation.y=0;
      itemlist[i].rotation.x=itemlist[i].originalRot;
    }
}
  }
  else{
    curItem=0;
    itemSelectBox.classList.add('minim');
    for (let i = 0; i < itemlist.length; i++) {
      itemlist[i].position.lerp(itemlist[i].originalPos, 0.1);
      itemlist[i].scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      itemlist[i].rotation.y=0;
      itemlist[i].rotation.x=itemlist[i].originalRot;
    }
  }
  
  camera.position.x-= ((camera.position.x-camTar[0])*camSpeed);
  camera.position.y-= ((camera.position.y-camTar[1])*camSpeed);
  camera.position.z-= ((camera.position.z-camTar[2])*camSpeed);//(14.0 + (Math.sin(t*0.02)*3));
}

// Initialize and animate
init();
//animate();
 function dialog(text, speed = 50) {
  if (text !== "") {
    playAnimation("yap");
  }

  const element = document.querySelector("#dialog-text");
  let index = 0;
  element.textContent = ""; // Clear previous text  

  // Set up initial visibility
  btnSkip.classList.remove("minim");
  dialogBox.classList.add("minim");
  continueBtn.classList.add("minim");
  document.querySelector("#btn2").classList.add("minim");
  btnAbout.classList.add("minim");
  btnWork.classList.add("minim");
  btnContact.classList.add("minim");
  btnMail.classList.add("minim");
  btnInsta.classList.add("minim");

  // Event listener to skip typing and show full text immediately
  btnSkip.onclick = () => {
    index = text.length; // Set index to the end of the text
    element.textContent = text; // Display full text immediately
    finalizeDialog(); // Call the function to finalize dialog state
  };

  function typeLetter() {
    if (index < text.length) {
      element.textContent += text[index];
      index++;

      // Remove 'minim' class as soon as there's text content
      if (index === 1) {
        dialogBox.classList.remove("minim");
      }

      setTimeout(typeLetter, speed); // Continue typing with delay
    } else {
      finalizeDialog(); // Finalize dialog when typing completes
    }
  }

  function finalizeDialog() {
    // Hide btnSkip once text is fully displayed
    btnSkip.classList.add("minim");
    playAnimation("look");
    continueBtn.classList.remove("minim");

    if (curStep === 0) {
      // Any additional actions for curStep 0
      // continueBtn.classList.add("minim");
      // document.querySelector("#btn2").classList.remove("minim");
    }
    if (curStep === 1) {
      continueBtn.classList.add("minim");
      btnAbout.classList.remove("minim");
      btnWork.classList.remove("minim");
      btnContact.classList.remove("minim");
    }
    if (curStep === 5) {
      btnMail.classList.remove("minim");
      btnInsta.classList.remove("minim");
    }
  }

  typeLetter();
}



