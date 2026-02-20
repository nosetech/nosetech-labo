import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface DeskSceneProps {
  rightcheatIconSrc: string;
  fallbackSrc: string;
  fallbackDarkSrc: string;
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function getTheme(): "light" | "dark" {
  const theme = document.documentElement.getAttribute("data-theme");
  return theme === "dark" ? "dark" : "light";
}

export default function DeskScene({
  rightcheatIconSrc,
  fallbackSrc,
  fallbackDarkSrc,
}: DeskSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [fallbackTheme, setFallbackTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebGLSupported(false);
      setFallbackTheme(getTheme());

      const observer = new MutationObserver(() => {
        setFallbackTheme(getTheme());
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      return () => observer.disconnect();
    }

    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    const getBackgroundColor = () =>
      getTheme() === "dark" ? 0x1a1a1a : 0xffffff;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(getBackgroundColor());
    renderer.shadowMap.enabled = true;

    const containerWidth = container.clientWidth;
    const height = Math.min(containerWidth * 0.55, 420);
    renderer.setSize(containerWidth, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      45,
      containerWidth / height,
      0.1,
      1000,
    );
    camera.position.set(-4, 0, 1);
    camera.lookAt(0, 0, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(3, 5, 5);
    scene.add(dirLight);

    // Materials
    const grayMat = new THREE.MeshLambertMaterial({ color: 0xd9d9d9 });
    const whiteMat = new THREE.MeshLambertMaterial({ color: 0xffffff });

    // Desk top
    const deskTop = new THREE.Mesh(
      new THREE.BoxGeometry(4.0, 0.15, 2.0),
      grayMat,
    );
    deskTop.position.set(0, 0, 0);
    scene.add(deskTop);

    // Desk legs
    const legGeom = new THREE.BoxGeometry(0.15, 1.5, 0.15);
    const legPositions = [
      [-1.85, -0.825, -0.85],
      [1.85, -0.825, -0.85],
      [-1.85, -0.825, 0.85],
      [1.85, -0.825, 0.85],
    ] as const;
    for (const [x, y, z] of legPositions) {
      const leg = new THREE.Mesh(legGeom, grayMat);
      leg.position.set(x, y, z);
      scene.add(leg);
    }

    // // Monitor body
    // const monitor = new THREE.Mesh(
    //   new THREE.BoxGeometry(1.5, 1.0, 0.08),
    //   darkGrayMat,
    // );
    // monitor.position.set(-0.3, 0.65, -0.7);
    // scene.add(monitor);
    //
    // // Monitor stand
    // const monitorStand = new THREE.Mesh(
    //   new THREE.CylinderGeometry(0.05, 0.08, 0.4, 8),
    //   grayMat,
    // );
    // monitorStand.position.set(-0.3, 0.275, -0.7);
    // scene.add(monitorStand);
    //
    // // Monitor base
    // const monitorBase = new THREE.Mesh(
    //   new THREE.BoxGeometry(0.5, 0.05, 0.3),
    //   grayMat,
    // );
    // monitorBase.position.set(-0.3, 0.075, -0.7);
    // scene.add(monitorBase);

    // // Mouse
    // const mouse = new THREE.Mesh(
    //   new THREE.BoxGeometry(0.2, 0.08, 0.3),
    //   grayMat,
    // );
    // mouse.position.set(0.8, 0.115, 0.1);
    // scene.add(mouse);

    // Coffee cup body
    const cupBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.15, 0.12, 0.375, 16),
      whiteMat,
    );
    cupBody.position.set(1.3, 0.2625, 0.55);
    scene.add(cupBody);

    // Coffee cup handle
    const cupHandle = new THREE.Mesh(
      new THREE.TorusGeometry(0.09, 0.0225, 8, 8, Math.PI),
      whiteMat,
    );
    cupHandle.position.set(1.45, 0.2625, 0.55);
    cupHandle.rotation.y = Math.PI / 1;
    cupHandle.rotation.z = Math.PI / 2;
    scene.add(cupHandle);

    // RightCheat icon plane
    const textureLoader = new THREE.TextureLoader();
    let iconPlane: THREE.Mesh | null = null;

    textureLoader.load(rightcheatIconSrc, (texture) => {
      const iconMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      });
      iconPlane = new THREE.Mesh(new THREE.PlaneGeometry(0.65, 0.65), iconMat);
      iconPlane.position.set(-1.0, 0.385, -0.3);
      //iconPlane.rotation.x = -Math.PI / 2;
      scene.add(iconPlane);
    });

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.maxPolarAngle = Math.PI / 2.5;
    controls.minPolarAngle = Math.PI / 6;

    // Click detection
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerMoved = false;

    const onPointerDown = () => {
      pointerMoved = false;
    };
    const onPointerMove = () => {
      pointerMoved = true;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (pointerMoved || !iconPlane) return;

      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(iconPlane);
      if (intersects.length > 0) {
        window.location.href = "/portfolio/rightcheat";
      }
    };

    const onPointerMoveHover = (e: PointerEvent) => {
      if (!iconPlane) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(iconPlane);
      renderer.domElement.style.cursor =
        intersects.length > 0 ? "pointer" : "default";
    };

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointermove", onPointerMoveHover);

    // Theme observer
    const themeObserver = new MutationObserver(() => {
      renderer.setClearColor(getBackgroundColor());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Visibility change
    const onVisibilityChange = () => {
      controls.autoRotate = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = Math.min(w * 0.55, 420);
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    resizeObserver.observe(container);

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener(
        "pointermove",
        onPointerMoveHover,
      );
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [rightcheatIconSrc]);

  if (!webGLSupported) {
    return (
      <img
        src={fallbackTheme === "dark" ? fallbackDarkSrc : fallbackSrc}
        alt="A desk"
        style={{ width: "100%", maxWidth: "750px", height: "auto" }}
      />
    );
  }

  return (
    <div ref={containerRef} style={{ width: "100%", maxWidth: "750px" }} />
  );
}
