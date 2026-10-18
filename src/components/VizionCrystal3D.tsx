import React, { useEffect, useRef } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import * as THREE from "three";

export interface VizionCrystal3DProps {
  width?: number;
  height?: number;
  mode: "intro" | "loop";
  intensity?: number;
}

/**
 * VizionCrystal3D - Dark Luxury & Prismatic Glass Monogram
 *
 * Tendril / Apple Pro / Sony Aesthetic:
 * - High-end faceted crystalline geometry with precision-cut planar facets
 * - Studio Softbox Light Panels (illuminating transmission & caustics)
 * - Ultra-clear optical crystal glass (IOR 1.58, dispersion, clearcoat)
 * - Interlocking geometric negative space with floating core
 */
export const VizionCrystal3D: React.FC<VizionCrystal3DProps> = ({
  width = 900,
  height = 900,
  mode = "loop",
  intensity = 1.0,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const coreRef = useRef<THREE.Mesh | null>(null);
  const causticLightRef = useRef<THREE.PointLight | null>(null);
  const softboxGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    // -------------------------------------------------------------
    // STUDIO SOFTBOX ENVIRONMENT (Essential for Glass Refraction!)
    // -------------------------------------------------------------
    const softboxGroup = new THREE.Group();
    scene.add(softboxGroup);
    softboxGroupRef.current = softboxGroup;

    // Overhead Key Softbox (Blinding white studio reflector)
    const topSoftboxGeo = new THREE.PlaneGeometry(12, 6);
    const topSoftboxMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const topSoftbox = new THREE.Mesh(topSoftboxGeo, topSoftboxMat);
    topSoftbox.position.set(0, 7, 2);
    topSoftbox.rotation.x = Math.PI / 2.8;
    softboxGroup.add(topSoftbox);

    // Left Rim Softbox (Vibrant Cyan Reflector)
    const cyanSoftboxGeo = new THREE.PlaneGeometry(8, 10);
    const cyanSoftboxMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
    });
    const cyanSoftbox = new THREE.Mesh(cyanSoftboxGeo, cyanSoftboxMat);
    cyanSoftbox.position.set(-8, 1, -1);
    cyanSoftbox.rotation.y = Math.PI / 3;
    softboxGroup.add(cyanSoftbox);

    // Right Rim Softbox (Royal Iris / Amethyst Reflector)
    const irisSoftboxGeo = new THREE.PlaneGeometry(8, 10);
    const irisSoftboxMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
    });
    const irisSoftbox = new THREE.Mesh(irisSoftboxGeo, irisSoftboxMat);
    irisSoftbox.position.set(8, -1, -1);
    irisSoftbox.rotation.y = -Math.PI / 3;
    softboxGroup.add(irisSoftbox);

    // Bottom Ambient Softbox (Warm Golden Amber)
    const amberSoftboxGeo = new THREE.PlaneGeometry(10, 6);
    const amberSoftboxMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
    });
    const amberSoftbox = new THREE.Mesh(amberSoftboxGeo, amberSoftboxMat);
    amberSoftbox.position.set(0, -7, 1);
    amberSoftbox.rotation.x = -Math.PI / 2.8;
    softboxGroup.add(amberSoftbox);

    // Dynamic Caustic Specular Point Light
    const causticLight = new THREE.PointLight(0xffffff, 12.0 * intensity, 16, 1.5);
    causticLight.position.set(0, 1, 3.5);
    scene.add(causticLight);
    causticLightRef.current = causticLight;

    // Studio Directional Lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5 * intensity);
    dirLight1.position.set(4, 6, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00f0ff, 3.0 * intensity);
    dirLight2.position.set(-5, 2, 4);
    scene.add(dirLight2);

    // -------------------------------------------------------------
    // PRISMATIC CRYSTAL MATERIALS
    // -------------------------------------------------------------
    // High-refractive Optical Diamond Glass
    const crystalGlassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xf1f5f9),
      transmission: 0.96,
      opacity: 1.0,
      transparent: true,
      roughness: 0.02,
      metalness: 0.05,
      ior: 1.68,
      thickness: 2.2,
      specularIntensity: 3.5,
      specularColor: new THREE.Color(0xffffff),
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      attenuationColor: new THREE.Color(0x38bdf8),
      attenuationDistance: 4.5,
      emissive: new THREE.Color(0x0ea5e9),
      emissiveIntensity: 0.08,
    });

    // Dark Brushed Titanium Bevel Material
    const titaniumBevelMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x1e2433),
      metalness: 0.95,
      roughness: 0.15,
      emissive: new THREE.Color(0x0f172a),
      emissiveIntensity: 0.2,
    });

    // Inner Amber Diamond Core Material
    const amberDiamondMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0xffedd5),
      transmission: 0.92,
      opacity: 1.0,
      transparent: true,
      roughness: 0.01,
      metalness: 0.1,
      ior: 2.42, // Diamond
      thickness: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.01,
      emissive: new THREE.Color(0xf59e0b),
      emissiveIntensity: 0.65,
      attenuationColor: new THREE.Color(0xfbbf24),
      attenuationDistance: 1.8,
    });

    // -------------------------------------------------------------
    // GEOMETRIC SCULPTURE: THE INTERLOCKING PRISMATIC "V"
    // -------------------------------------------------------------
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    rootGroupRef.current = rootGroup;

    // Procedural Faceted Geometry for Left Wing
    // 7 vertices defining a chiseled crystalline obelisk
    const leftShape = new THREE.Shape();
    leftShape.moveTo(0, -1.9);       // Shared sharp apex at base
    leftShape.lineTo(-1.25, 1.4);    // Outer shoulder
    leftShape.lineTo(-0.75, 1.8);    // Top outer bevel
    leftShape.lineTo(-0.25, 1.6);    // Top inner bevel
    leftShape.lineTo(0.0, -0.4);     // Center crotch
    leftShape.closePath();

    const extrudeOpts: THREE.ExtrudeGeometryOptions = {
      steps: 1,
      depth: 0.38,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.10,
      bevelOffset: 0,
      bevelSegments: 3,
    };

    const leftWingGeo = new THREE.ExtrudeGeometry(leftShape, extrudeOpts);
    leftWingGeo.center();

    const leftWingMesh = new THREE.Mesh(leftWingGeo, crystalGlassMat);
    leftWingMesh.position.set(-0.55, 0.05, 0);
    leftWingMesh.rotation.z = 0.04;
    rootGroup.add(leftWingMesh);

    // Titanium Backing Spine for Left Wing
    const leftSpineGeo = new THREE.ExtrudeGeometry(leftShape, {
      ...extrudeOpts,
      depth: 0.08,
      bevelSize: 0.02,
    });
    leftSpineGeo.center();
    const leftSpineMesh = new THREE.Mesh(leftSpineGeo, titaniumBevelMat);
    leftSpineMesh.position.set(-0.55, 0.05, -0.22);
    leftSpineMesh.rotation.z = 0.04;
    rootGroup.add(leftSpineMesh);

    // Symmetric Right Wing
    const rightShape = new THREE.Shape();
    rightShape.moveTo(0, -1.9);
    rightShape.lineTo(1.25, 1.4);
    rightShape.lineTo(0.75, 1.8);
    rightShape.lineTo(0.25, 1.6);
    rightShape.lineTo(0.0, -0.4);
    rightShape.closePath();

    const rightWingGeo = new THREE.ExtrudeGeometry(rightShape, extrudeOpts);
    rightWingGeo.center();

    const rightWingMesh = new THREE.Mesh(rightWingGeo, crystalGlassMat);
    rightWingMesh.position.set(0.55, 0.05, 0);
    rightWingMesh.rotation.z = -0.04;
    rootGroup.add(rightWingMesh);

    // Titanium Backing Spine for Right Wing
    const rightSpineGeo = new THREE.ExtrudeGeometry(rightShape, {
      ...extrudeOpts,
      depth: 0.08,
      bevelSize: 0.02,
    });
    rightSpineGeo.center();
    const rightSpineMesh = new THREE.Mesh(rightSpineGeo, titaniumBevelMat);
    rightSpineMesh.position.set(0.55, 0.05, -0.22);
    rightSpineMesh.rotation.z = -0.04;
    rootGroup.add(rightSpineMesh);

    // Center Diamond Core (Faceted Bipyramid)
    const coreGeo = new THREE.OctahedronGeometry(0.52, 0);
    const coreMesh = new THREE.Mesh(coreGeo, amberDiamondMat);
    coreMesh.position.set(0, 0.42, 0.06);
    coreMesh.scale.set(0.85, 1.3, 0.85);
    rootGroup.add(coreMesh);
    coreRef.current = coreMesh;

    // Chiseled Titanium Base Shoe (Cradling the apex)
    const shoeGeo = new THREE.ConeGeometry(0.35, 0.6, 4);
    shoeGeo.rotateY(Math.PI / 4);
    shoeGeo.rotateX(Math.PI);
    const shoeMesh = new THREE.Mesh(shoeGeo, titaniumBevelMat);
    shoeMesh.position.set(0, -1.45, 0);
    shoeMesh.scale.set(1.1, 0.8, 1.1);
    rootGroup.add(shoeMesh);

    return () => {
      renderer.dispose();
      leftWingGeo.dispose();
      rightWingGeo.dispose();
      leftSpineGeo.dispose();
      rightSpineGeo.dispose();
      coreGeo.dispose();
      shoeGeo.dispose();
      topSoftboxGeo.dispose();
      cyanSoftboxGeo.dispose();
      irisSoftboxGeo.dispose();
      amberSoftboxGeo.dispose();
      crystalGlassMat.dispose();
      titaniumBevelMat.dispose();
      amberDiamondMat.dispose();
      scene.clear();
    };
  }, [width, height, intensity]);

  // Deterministic Frame Motion
  useEffect(() => {
    const rootGroup = rootGroupRef.current;
    const coreMesh = coreRef.current;
    const causticLight = causticLightRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    const scene = sceneRef.current;

    if (!rootGroup || !renderer || !scene || !camera) return;

    if (mode === "loop") {
      const progress = (frame % durationInFrames) / durationInFrames;
      const angle = progress * Math.PI * 2;

      // 3D Orbital Precession
      rootGroup.rotation.y = Math.sin(angle) * 0.28;
      rootGroup.rotation.x = Math.cos(angle) * 0.12 + 0.04;
      rootGroup.rotation.z = Math.sin(angle * 2) * 0.03;
      rootGroup.position.y = Math.sin(angle) * 0.15;

      // Center Core Harmonic Spin
      if (coreMesh) {
        coreMesh.rotation.y = -angle;
        coreMesh.rotation.x = Math.sin(angle * 2) * 0.25;
        const cScale = 1.0 + Math.sin(angle * 2) * 0.10;
        coreMesh.scale.set(0.85 * cScale, 1.3 * cScale, 0.85 * cScale);
      }

      // Orbiting Caustic Specular Highlight
      if (causticLight) {
        causticLight.position.x = Math.cos(angle) * 4.0;
        causticLight.position.y = Math.sin(angle) * 2.0 + 0.5;
        causticLight.position.z = Math.sin(angle) * 2.0 + 3.2;
      }

      camera.position.z = 7.8 + Math.sin(angle) * 0.18;
    } else {
      // Intro Stinger
      const introScale = interpolate(frame, [0, 55], [0.3, 1.0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const camZ = interpolate(frame, [0, 80, 240, 300], [13.0, 7.8, 7.5, 7.8], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      camera.position.z = camZ;

      const rotY = interpolate(frame, [0, 75, 180, 300], [-0.75, 0.06, -0.04, 0.0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const rotX = interpolate(frame, [0, 75, 200, 300], [0.45, -0.03, 0.02, 0.0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

      rootGroup.scale.set(introScale, introScale, introScale);
      rootGroup.rotation.y = rotY;
      rootGroup.rotation.x = rotX;
      rootGroup.position.y = Math.sin((frame / fps) * 1.5) * 0.06;

      if (coreMesh) {
        const coreEnter = interpolate(frame, [20, 65], [0.0, 1.0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        coreMesh.scale.set(0.85 * coreEnter, 1.3 * coreEnter, 0.85 * coreEnter);
        coreMesh.rotation.y = (frame / fps) * 1.0;
      }

      if (causticLight) {
        const sweepX = interpolate(frame, [60, 140], [-5.0, 5.0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        causticLight.position.set(sweepX, 1.5, 3.2);
      }
    }

    renderer.render(scene, camera);
  }, [frame, fps, durationInFrames, mode]);

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          filter: "drop-shadow(0 25px 60px rgba(0, 240, 255, 0.22)) drop-shadow(0 15px 35px rgba(245, 158, 11, 0.18))",
        }}
      />
    </div>
  );
};
