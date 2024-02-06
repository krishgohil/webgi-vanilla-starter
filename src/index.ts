import { IModel, Vector3, ViewerApp, addBasePlugins } from "webgi";


// let numClones = 3; // initial number of clones

// window.updateNumClones = function(value) {
//   numClones = value;
//   document.getElementById('numClonesValue').innerHTML = "Number of Clones: " + value;
//   setupViewer(); // call setupViewer again to update the scene
// }



async function setupViewer() {


  const viewer = new ViewerApp({
    canvas: document.getElementById("webgi-canvas") as HTMLCanvasElement,
  });

  await addBasePlugins(viewer);

  let chain = await viewer.load(
    "./assets/13.259.3dm",
    {
      addToRoot: false,
    }
  );


  // let ring = await viewer.load(
  //   "./assets/FI-RUND-050.3dm",
  //   {
  //     addToRoot: false,
  //   }
  // );



  let cubes = [];
  let numClones = 3; // number of clones
  let distanceBetween = 13; // distance between each clone


  for (let i = 0; i < numClones; i++) {
    let chain_unit = (chain as IModel).modelObject.clone();

    chain_unit.position.x = i * distanceBetween;

    cubes.push(chain_unit);
    viewer.scene.modelRoot.add(chain_unit);
  }

  await viewer.setEnvironmentMap(
    "https://dist.pixotronics.com/webgi/assets/hdr/gem_2.hdr"
  );
}

setupViewer();
