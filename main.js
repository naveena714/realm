// SCENE
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x14001f, 0.035);

// CAMERA
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 10;

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#scene"),
  alpha: true,
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// LIGHTS (soft anime glow)
scene.add(new THREE.AmbientLight(0xffd6ff, 0.7));

const glowLight = new THREE.PointLight(0xcaa7ff, 2, 40);
glowLight.position.set(0, 6, 10);
scene.add(glowLight);

// DREAM PARTICLES
const particleCount = 4000;
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 60;
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particleMaterial = new THREE.PointsMaterial({
  color: 0xffcaff,
  size: 0.07,
  transparent: true,
  opacity: 0.7
});

const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

// MYSTICAL PORTAL
const portalGeometry = new THREE.TorusGeometry(2, 0.25, 32, 100);
const portalMaterial = new THREE.MeshStandardMaterial({
  color: 0xffb7ff,
  emissive: 0xff88ff,
  emissiveIntensity: 0.8,
  transparent: true,
  opacity: 0.85
});

const portal = new THREE.Mesh(portalGeometry, portalMaterial);
portal.rotation.x = Math.PI / 2;
scene.add(portal);

// MOUSE MAGIC
const mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
  mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
});

// CINEMATIC LOOP
function animate() {
  requestAnimationFrame(animate);

  particles.rotation.y += 0.0005;
  particles.rotation.x += 0.0002;

  portal.rotation.z += 0.003;
  portal.scale.setScalar(1 + Math.sin(Date.now() * 0.002) * 0.05);

  camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.02;
  camera.position.y += (-mouse.y * 1.2 - camera.position.y) * 0.02;

  renderer.render(scene, camera);
}

animate();

// ENTER REALM
document.getElementById("enter").addEventListener("click", () => {
  gsap.to("#overlay", { opacity: 0, duration: 1.2 });

  gsap.to(camera.position, {
    z: 5,
    duration: 3,
    ease: "power3.inOut"
  });

  gsap.to(portal.scale, {
    x: 4,
    y: 4,
    z: 4,
    duration: 2.5,
    ease: "power4.inOut"
  });
});

// RESIZE
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});