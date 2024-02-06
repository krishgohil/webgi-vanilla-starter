import { IModel, Vector3, ViewerApp, addBasePlugins } from "webgi";

async function setupViewer() {
  const viewer = new ViewerApp({
    canvas: document.getElementById("webgi-canvas") as HTMLCanvasElement,
  });

  await addBasePlugins(viewer);

  let radius = 30 / (Math.PI * 2);
  let cubes = [];

  let cubeModel = await viewer.load(
    "https://dist.pixotronics.com/webgi/assets/gltf/cube_diamond_sample.gltf",
    {
      addToRoot: false,
    }
  );

  for (let i = 0; i < 30; i++) {
    let angle = (i / 30) * 2 * Math.PI;

    let cube = (cubeModel as IModel).modelObject.clone();

    cube.position.x = radius * Math.cos(angle);
    cube.position.y = radius * Math.sin(angle);

    cube.lookAt(new Vector3(0, 0, 0));

    cubes.push(cube);
    viewer.scene.add(cube);
    viewer.scene.modelRoot.add(cube);

  }
  await viewer.setEnvironmentMap(
    "https://dist.pixotronics.com/webgi/assets/hdr/gem_2.hdr"
  );
}

setupViewer();
