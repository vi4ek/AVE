import React, { useEffect, useRef } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import * as THREE from "three";

export interface Anatomy3DVisualizerProps {
  modelType?: "hair_follicle" | "skin_layers" | "neural_brain";
  width?: number;
  height?: number;
  rotationSpeed?: number;
  showLabels?: boolean;
}

/**
 * High-Performance Procedural 3D Anatomical Visualizer
 * Powered by Three.js inside Remotion
 * Frame-by-frame deterministic rendering with cinematic studio lighting
 */
export const Anatomy3DVisualizer: React.FC<Anatomy3DVisualizerProps> = ({
  modelType = "hair_follicle",
  width = 800,
  height = 800,
  rotationSpeed = 1.0,
  showLabels = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Smooth rotation angles driven deterministically by Remotion frame
  const rotationY = (frame / fps) * 0.8 * rotationSpeed;
  const cameraZoom = interpolate(frame, [0, 150], [1.0, 1.15], {
    extrapolateRight: "clamp",
  });

  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    rootGroup: THREE.Group;
  } | null>(null);

  // 1. Initialize Scene, Lights, Geometries, and Renderer ONCE
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2, 7);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(1.0); // Optimized 1.0 pixel ratio for fast, lightweight rendering
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Lights
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x0071e3, 2.8);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xf59e0b, 1.2);
    fillLight.position.set(2, -4, 3);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0xf5f5f7, 0.9);
    scene.add(ambientLight);

    // Root model group
    const rootGroup = new THREE.Group();

    if (modelType === "hair_follicle") {
      // The Hair Shaft
      const shaftGeo = new THREE.CylinderGeometry(0.28, 0.32, 5.0, 24);
      const shaftMat = new THREE.MeshPhysicalMaterial({
        color: 0x1d1d1f,
        roughness: 0.35,
        metalness: 0.15,
        clearcoat: 0.6,
      });
      const shaft = new THREE.Mesh(shaftGeo, shaftMat);
      shaft.position.y = 1.2;
      rootGroup.add(shaft);

      // Follicle Outer Root Sheath
      const sheathGeo = new THREE.CylinderGeometry(0.65, 0.85, 3.2, 24);
      const sheathMat = new THREE.MeshPhysicalMaterial({
        color: 0x0071e3,
        transparent: true,
        opacity: 0.35,
        roughness: 0.2,
      });
      const sheath = new THREE.Mesh(sheathGeo, sheathMat);
      sheath.position.y = -0.5;
      rootGroup.add(sheath);

      // Bulb & Dermal Papilla
      const bulbGeo = new THREE.SphereGeometry(0.92, 24, 24);
      const bulbMat = new THREE.MeshPhysicalMaterial({
        color: 0xd9531e,
        roughness: 0.4,
        emissive: 0x991b1b,
        emissiveIntensity: 0.25,
      });
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.position.y = -2.0;
      bulb.scale.set(1.0, 1.25, 1.0);
      rootGroup.add(bulb);

      // Capillary Micro-Vessels
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(Math.cos(angle) * 0.2, -3.2, Math.sin(angle) * 0.2),
          new THREE.Vector3(Math.cos(angle) * 0.7, -2.4, Math.sin(angle) * 0.7),
          new THREE.Vector3(Math.cos(angle + 0.5) * 0.5, -1.9, Math.sin(angle + 0.5) * 0.5),
        ]);
        const tubeGeo = new THREE.TubeGeometry(curve, 12, 0.05, 6, false);
        const tubeMat = new THREE.MeshStandardMaterial({
          color: 0xef4444,
          roughness: 0.3,
          emissive: 0xef4444,
          emissiveIntensity: 0.4,
        });
        const vessel = new THREE.Mesh(tubeGeo, tubeMat);
        rootGroup.add(vessel);
      }

      // Sebaceous Oil Gland Cluster
      const glandMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.5,
      });
      const gland1 = new THREE.Mesh(new THREE.SphereGeometry(0.42, 12, 12), glandMat);
      gland1.position.set(0.7, -0.2, 0.3);
      const gland2 = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 12), glandMat);
      gland2.position.set(0.9, -0.5, 0.1);
      rootGroup.add(gland1, gland2);
    } else if (modelType === "skin_layers") {
      const topGeo = new THREE.BoxGeometry(4.0, 0.4, 3.0);
      const topMat = new THREE.MeshPhysicalMaterial({ color: 0xfde68a, roughness: 0.5 });
      const top = new THREE.Mesh(topGeo, topMat);
      top.position.y = 1.0;

      const midGeo = new THREE.BoxGeometry(4.0, 0.8, 3.0);
      const midMat = new THREE.MeshPhysicalMaterial({ color: 0xf87171, roughness: 0.4 });
      const mid = new THREE.Mesh(midGeo, midMat);
      mid.position.y = 0.4;

      const botGeo = new THREE.BoxGeometry(4.0, 1.6, 3.0);
      const botMat = new THREE.MeshPhysicalMaterial({ color: 0xb91c1c, roughness: 0.6 });
      const bot = new THREE.Mesh(botGeo, botMat);
      bot.position.y = -0.8;

      rootGroup.add(top, mid, bot);
    }

    scene.add(rootGroup);

    sceneRef.current = { renderer, scene, camera, rootGroup };

    return () => {
      renderer.dispose();
      scene.clear();
      sceneRef.current = null;
    };
  }, [modelType, width, height]);

  // 2. Deterministic Frame Update (Ultra Fast - Zero Reallocation)
  useEffect(() => {
    if (!sceneRef.current) return;
    const { renderer, scene, camera, rootGroup } = sceneRef.current;

    rootGroup.rotation.y = rotationY;
    rootGroup.rotation.x = Math.sin(rotationY * 0.5) * 0.15;
    camera.position.z = 7 / cameraZoom;

    renderer.render(scene, camera);
  }, [frame, rotationY, cameraZoom]);

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
        }}
      />

      {/* Anatomical Callout Badge Overlays */}
      {showLabels && modelType === "hair_follicle" && (
        <>
          {/* Label 1: Dermal Papilla */}
          <div
            style={{
              position: "absolute",
              bottom: "16%",
              right: "8%",
              padding: "8px 16px",
              borderRadius: 12,
              backgroundColor: "rgba(255, 255, 255, 0.88)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.06)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#EF4444" }} />
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, fontWeight: 700, color: "#1D1D1F" }}>
              Dermal Papilla (Root)
            </span>
          </div>

          {/* Label 2: Sebaceous Gland */}
          <div
            style={{
              position: "absolute",
              top: "38%",
              left: "6%",
              padding: "8px 16px",
              borderRadius: 12,
              backgroundColor: "rgba(255, 255, 255, 0.88)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "0 6px 18px rgba(0, 0, 0, 0.06)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
            <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 16, fontWeight: 700, color: "#1D1D1F" }}>
              Sebaceous Sebum Gland
            </span>
          </div>
        </>
      )}
    </div>
  );
};
