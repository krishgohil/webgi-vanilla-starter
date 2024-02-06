import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    timeout,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    DiamondPlugin,
    FrameFadePlugin,
    GLTFAnimationPlugin,
    GroundPlugin,
    BloomPlugin,
    TemporalAAPlugin,
    AnisotropyPlugin,
    GammaCorrectionPlugin,

    addBasePlugins,
    ITexture, TweakpaneUiPlugin, AssetManagerBasicPopupPlugin, CanvasSnipperPlugin,

    IViewerPlugin, FileTransferPlugin,

    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "webgi";
import "./styles.css";

async function setupViewer(){

    // Initialize the viewer
    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
    })

    // Add plugins individually.
    // await viewer.addPlugin(GBufferPlugin)
    // await viewer.addPlugin(new ProgressivePlugin(32))
    // await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
    // await viewer.addPlugin(GammaCorrectionPlugin)
    // await viewer.addPlugin(SSRPlugin)
    // await viewer.addPlugin(SSAOPlugin)
    // await viewer.addPlugin(DiamondPlugin)
    // await viewer.addPlugin(FrameFadePlugin)
    // await viewer.addPlugin(GLTFAnimationPlugin)
    // await viewer.addPlugin(GroundPlugin)
    // await viewer.addPlugin(BloomPlugin)
    // await viewer.addPlugin(TemporalAAPlugin)
    // await viewer.addPlugin(AnisotropyPlugin)
    // and many more...

    // or use this to add all main ones at once.
    await addBasePlugins(viewer) // check the source: https://codepen.io/repalash/pen/JjLxGmy for the list of plugins added.

    // Add a popup(in HTML) with download progress when any asset is downloading.
    await viewer.addPlugin(AssetManagerBasicPopupPlugin)

    // Required for downloading files from the UI
    await viewer.addPlugin(FileTransferPlugin)

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await viewer.addPlugin(CanvasSnipperPlugin)

    // Import and add a GLB file.
    // await viewer.load("./assets/classic-watch.glb")

    // Load an environment map if not set in the glb file
    // await viewer.setEnvironmentMap("./assets/environment.hdr");


    
var controls = new OrbitControls(camera, renderer.domElement);


// const geometry = new THREE.CircleGeometry( 5, 64 ); 
// const circle_material = new THREE.MeshBasicMaterial( { color: "whitesmoke" } );
// const circle = new THREE.Mesh( geometry, circle_material );
// scene.add( circle );

// Assuming scene, camera, and renderer are already set up

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: "rgb(125, 95, 204)" });

var radius = 30/ ( Math.PI * 2 ); // Radius of the circle
var cubes = []; // Array to hold the cubes

for (var i = 0; i < 30; i++) {
	var cube = new THREE.Mesh(geometry, material);
	
	var angle = (i / 30) * 2 * Math.PI; 
	console.log(angle)

	cube.position.x = radius * Math.cos(angle);
	cube.position.y = radius * Math.sin(angle);

	cube.lookAt(new THREE.Vector3(0, 0, 0));

	cubes.push(cube);
	scene.add(cube);
}

// Render the scene
// renderer.render(scene, camera);


controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Call controls.update() in your animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render(scene, camera);
}
animate();

    // Add some UI for tweak and testing.
    const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin)
    // Add plugins to the UI to see their settings.
    uiPlugin.setupPlugins<IViewerPlugin>(TonemapPlugin, CanvasSnipperPlugin)

}

setupViewer()
