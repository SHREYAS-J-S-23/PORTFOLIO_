/**
 * ============================================================================
 * HeroModel.tsx — 3D Developer Avatar & Model Viewer with R3F & Drei
 * ============================================================================
 * 
 * 🛠 3D AVATAR & MODEL TUNING GUIDE:
 * 
 * 1. Avatar Colors (CFG):
 *    - skin: hex color for skin tone (default 0xb67f5a)
 *    - hair: hex color for wavy hair & facial hair (default 0x17100c)
 *    - navy: hex color for shirt base & collar (default 0x111a33)
 *    - stripe: hex color for shirt stripes (default 0xf1f1f1)
 *    - laptop: hex color for laptop casing (default 0x8aa0b8)
 *    - accent: hex color for rim lighting & glow rings (default 0x7c5cff / violet)
 * 
 * 2. External GLB Model (optional):
 *    - If you want to load an external GLB instead of this avatar, pass:
 *      <HeroModel modelUrl="/models/my-custom-model.glb" />
 *    - targetSize: default 2.3 (scales model to fit viewport)
 *    - positionOffset: [x, y, z] to fine-tune placement
 *    - rotationOffset: [x, y, z] to rotate initial orientation
 * 
 * 3. Interactions:
 *    - Head tracks mouse cursor in real-time (looks wherever cursor moves)
 *    - Hands type with burst typing animations on the laptop
 *    - Eyes blink periodically
 *    - Drag/swipe on canvas to rotate avatar in 3D
 *    - Decorative orbit rings and soft round glowing particles surround the avatar
 * ============================================================================
 */

import React, { useRef, useMemo, useEffect, useState, Suspense, Component, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '../hooks';

export interface HeroModelProps {
  /** Optional custom GLB path in /public. If omitted or fails, renders the custom 3D Developer Avatar */
  modelUrl?: string;
  /** Target bounding box size (default: 2.3) */
  targetSize?: number;
  /** Extra scale multiplier (default: 1.0) */
  scaleMultiplier?: number;
  /** Fine-tuning position offset [x, y, z] */
  positionOffset?: [number, number, number];
  /** Fine-tuning rotation offset in radians [x, y, z] */
  rotationOffset?: [number, number, number];
  /** Whether to show orbit rings and soft glowing particles (default: true) */
  showDecor?: boolean;
  /** Static image fallback if WebGL is unavailable */
  fallbackImage?: string;
  /** Accessibility label */
  altText?: string;
}

// ── Avatar Color Configuration ───────────────────────────────────────────────
const AVATAR_CFG = {
  skin: 0xb67f5a,
  hair: 0x17100c,
  navy: 0x111a33,
  stripe: 0xf1f1f1,
  laptop: 0x8aa0b8,
  mouse: 0xb9a0ff,
  accent: 0x7c5cff,
};

// ── Procedural Striped Fabric Texture ─────────────────────────────────────────
function createStripeTexture(rep: number, navyColor: number, stripeColor: number) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 4;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const hex = (c: number) => '#' + c.toString(16).padStart(6, '0');
    ctx.fillStyle = hex(navyColor);
    ctx.fillRect(0, 0, 64, 4);
    ctx.fillStyle = hex(stripeColor);
    ctx.fillRect(27, 0, 8, 4);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.repeat.set(rep, 1);
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

// ── Soft Glowing Particles (No Squares, True Radial Alpha Sprite) ─────────────
function GlowingParticles({ count = 40 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const reduced = usePrefersReducedMotion();

  const circleTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.25, 'rgba(71, 245, 250, 0.9)');
      gradient.addColorStop(0.6, 'rgba(61, 240, 245, 0.3)');
      gradient.addColorStop(1, 'rgba(61, 240, 245, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 2.0 + Math.sin(i * 3) * 0.6;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = Math.sin(i * 5) * 1.1;
      pos[i * 3 + 2] = Math.sin(angle) * r * 0.7;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reduced) return;
    pointsRef.current.rotation.y += delta * 0.12;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      {circleTexture && (
        <pointsMaterial
          map={circleTexture}
          size={0.18}
          color="#3DF0F5"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      )}
    </points>
  );
}

// ── Orbit Torus Rings ────────────────────────────────────────────────────────
function DecorativeOrbitRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const reduced = usePrefersReducedMotion();

  useFrame((_, delta) => {
    if (reduced) return;
    if (ring1.current) ring1.current.rotation.z += delta * 0.22;
    if (ring2.current) ring2.current.rotation.z -= delta * 0.16;
  });

  return (
    <group>
      <mesh ref={ring1} rotation={[0.45, 0.2, 0]}>
        <torusGeometry args={[2.3, 0.012, 16, 120]} />
        <meshStandardMaterial
          color="#3DF0F5"
          emissive="#3DF0F5"
          emissiveIntensity={0.65}
          roughness={0.2}
          transparent
          opacity={0.65}
        />
      </mesh>
      <mesh ref={ring2} rotation={[-0.6, -0.3, 0.8]}>
        <torusGeometry args={[2.6, 0.01, 16, 120]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.55}
          roughness={0.2}
          transparent
          opacity={0.55}
        />
      </mesh>
    </group>
  );
}

// ── Complete Procedural 3D Developer Avatar ──────────────────────────────────
function ProceduralDeveloperAvatar({
  lookCoords,
  isDragging,
  dragOffset,
}: {
  lookCoords: { x: number; y: number };
  isDragging: boolean;
  dragOffset: number;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);
  const eyesRefs = useRef<THREE.Group[]>([]);
  const handsData = useRef<{ mesh: THREE.Mesh; baseY: number; phase: number }[]>([]);

  const reduced = usePrefersReducedMotion();

  // Create avatar materials
  const materials = useMemo(() => {
    const M = (c: number, r = 0.7, m = 0) =>
      new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });

    const stripe8 = createStripeTexture(8, AVATAR_CFG.navy, AVATAR_CFG.stripe);
    const stripe4 = createStripeTexture(4, AVATAR_CFG.navy, AVATAR_CFG.stripe);

    return {
      skin: M(AVATAR_CFG.skin, 0.65),
      hair: M(AVATAR_CFG.hair, 0.85),
      dark: M(0x14110f, 0.5),
      white: M(0xffffff, 0.4),
      shirt: stripe8
        ? new THREE.MeshStandardMaterial({ map: stripe8, roughness: 0.8 })
        : M(AVATAR_CFG.navy, 0.8),
      sleeve: stripe4
        ? new THREE.MeshStandardMaterial({ map: stripe4, roughness: 0.8 })
        : M(AVATAR_CFG.navy, 0.8),
      navy: M(AVATAR_CFG.navy, 0.8),
      laptop: M(AVATAR_CFG.laptop, 0.35, 0.6),
      mouse: M(AVATAR_CFG.mouse, 0.4),
      platform: M(0x1b1b27, 0.5, 0.3),
      glowRing: new THREE.MeshBasicMaterial({ color: AVATAR_CFG.accent }),
      laptopLogo: new THREE.MeshStandardMaterial({
        color: 0xe8eef5,
        emissive: new THREE.Color(0x556070),
        roughness: 0.3,
      }),
      lip: M(0x7a3b2e, 0.6),
      stubble: new THREE.MeshBasicMaterial({
        color: 0x2a1a12,
        transparent: true,
        opacity: 0.28,
      }),
      // Bracelet materials
      bGreen: M(0x2e8b57, 0.6),
      bRed: M(0xc0392b, 0.6),
      bGold: M(0xd4a63a, 0.4, 0.5),
      bWatch: M(0x1b2540, 0.6),
    };
  }, []);

  // Procedural Curly Hair Generation
  const hairCurls = useMemo(() => {
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const curls: { pos: [number, number, number]; r: number }[] = [];

    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      curls.push({
        pos: [Math.sin(a) * 0.52, 0.58 + rnd() * 0.08, Math.cos(a) * 0.5 - 0.04],
        r: 0.17 + rnd() * 0.08,
      });
    }
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      curls.push({
        pos: [Math.sin(a) * 0.3, 0.8 + rnd() * 0.08, Math.cos(a) * 0.28 - 0.02],
        r: 0.17 + rnd() * 0.08,
      });
    }
    for (let i = 0; i < 8; i++) {
      const a = Math.PI + (i / 8 - 0.5) * 2.2;
      curls.push({
        pos: [Math.sin(a) * 0.6, 0.15 + rnd() * 0.2, Math.cos(a) * 0.55 - 0.05],
        r: 0.17 + rnd() * 0.08,
      });
    }
    curls.push({ pos: [0, 0.93, 0.0], r: 0.2 });
    curls.push({ pos: [0.15, 0.88, 0.12], r: 0.19 });
    curls.push({ pos: [-0.15, 0.9, 0.1], r: 0.19 });

    return curls;
  }, []);

  // Cylinder limb helper
  const createLimb = (a: THREE.Vector3, b: THREE.Vector3, r: number, mat: THREE.Material) => {
    const d = new THREE.Vector3().subVectors(b, a);
    const len = d.length();
    const geom = new THREE.CylinderGeometry(r, r, len, 16);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize());
    return mesh;
  };

  // Setup dynamic arm limbs & hands
  const armElements = useMemo(() => {
    const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    const limbs: React.ReactNode[] = [];
    handsData.current = [];

    [-1, 1].forEach((s) => {
      const S = V(s * 1.2, 0.75, 0.05);
      const E = V(s * 1.42, -0.4, 0.4);
      const W = V(s * 0.85, -0.78, 1.65);
      const mid = S.clone().lerp(E, 0.58);

      // Limbs
      const l1 = createLimb(S, mid, 0.34, materials.sleeve);
      const l2 = createLimb(S.clone().lerp(mid, 0.8), mid, 0.355, materials.navy);
      const l3 = createLimb(mid, E, 0.25, materials.skin);
      const l4 = createLimb(E, W, 0.23, materials.skin);

      limbs.push(
        <primitive key={`l1-${s}`} object={l1} />,
        <primitive key={`l2-${s}`} object={l2} />,
        <primitive key={`l3-${s}`} object={l3} />,
        <primitive key={`l4-${s}`} object={l4} />
      );

      // Bracelets / smartwatch on wrists
      const dir = W.clone().sub(E);
      const at = (t: number) => E.clone().add(dir.clone().multiplyScalar(t));
      const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), dir.clone().normalize());

      if (s < 0) {
        // Wristbands on left wrist
        [
          { t: 0.92, r: 0.24, tube: 0.05, m: materials.dark },
          { t: 0.82, r: 0.24, tube: 0.04, m: materials.bGreen },
          { t: 0.72, r: 0.235, tube: 0.035, m: materials.bRed },
          { t: 0.66, r: 0.235, tube: 0.03, m: materials.bGold },
        ].forEach((item, idx) => {
          limbs.push(
            <mesh
              key={`ring-${idx}`}
              position={at(item.t).toArray()}
              quaternion={quat}
              material={item.m}
            >
              <torusGeometry args={[item.r, item.tube, 10, 28]} />
            </mesh>
          );
        });
      } else {
        // Smartwatch on right wrist
        limbs.push(
          <mesh
            key="watch-ring"
            position={at(0.9).toArray()}
            quaternion={quat}
            material={materials.bWatch}
          >
            <torusGeometry args={[0.235, 0.04, 10, 28]} />
          </mesh>
        );
        const watchPos = at(0.9).add(new THREE.Vector3(0, 0.22, 0));
        limbs.push(
          <mesh key="watch-face" position={watchPos.toArray()} material={materials.dark}>
            <boxGeometry args={[0.32, 0.1, 0.3]} />
          </mesh>
        );
      }
    });

    return limbs;
  }, [materials]);

  // Animation Loop (Breathing, Typing Burst, Eye Blink, Head Looking at Cursor)
  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;

    // 1. Root floating bob and gentle idle turn + user drag
    if (rootRef.current) {
      rootRef.current.rotation.y = 0.5 + dragOffset + (!isDragging ? Math.sin(t * 0.5) * 0.3 : 0);
      rootRef.current.position.y = Math.sin(t * 1.2) * 0.04;
    }

    // 2. Breathing torso
    if (torsoRef.current) {
      torsoRef.current.scale.y = 1 + Math.sin(t * 1.6) * 0.01;
    }

    // 3. Head turns toward mouse cursor smoothly
    if (headRef.current) {
      const targetHeadY = (lookCoords.x * 0.4 - 0.2) + Math.sin(t * 0.6) * 0.08;
      const targetHeadX = 0.2 + lookCoords.y * 0.15;
      headRef.current.rotation.y += (targetHeadY - headRef.current.rotation.y) * 0.08;
      headRef.current.rotation.x += (targetHeadX - headRef.current.rotation.x) * 0.08;
    }

    // 4. Typing Hands Animation (realistic typing bursts!)
    const burst = 0.5 + 0.5 * Math.sin(t * 0.7);
    handsData.current.forEach((h) => {
      if (h.mesh) {
        h.mesh.position.y = h.baseY + Math.sin(t * 10 + h.phase) * 0.025 * burst;
      }
    });

    // 5. Blinking Eyes
    const blink = (t % 3.6) < 0.12 ? 0.1 : 1;
    eyesRefs.current.forEach((eye) => {
      if (eye) eye.scale.y = blink;
    });
  });

  return (
    <group ref={rootRef} scale={0.52} position={[0, -0.35, 0]}>
      {/* Inner group offset to center the avatar at origin */}
      <group position={[0, 0, -1.6]}>
        {/* Desk Platform Base */}
        <mesh position={[0, -1.18, 1.6]} material={materials.platform}>
          <cylinderGeometry args={[3, 3.1, 0.25, 64]} />
        </mesh>

        {/* Torso */}
        <mesh ref={torsoRef} position={[0, 0, 0]} scale={[1.2, 1, 0.72]} material={materials.shirt}>
          <cylinderGeometry args={[0.95, 1.0, 2.1, 36]} />
        </mesh>

        {/* Shirt Placket & Collar */}
        <mesh position={[0, 0.85, 0.7]} material={materials.navy}>
          <boxGeometry args={[0.14, 0.5, 0.03]} />
        </mesh>
        <mesh position={[0, 1.08, 0.05]} rotation={[Math.PI / 2, 0, 0]} material={materials.navy}>
          <torusGeometry args={[0.33, 0.07, 10, 28]} />
        </mesh>
        {/* Collar Flaps */}
        <mesh position={[-0.2, 1.08, 0.4]} rotation={[0.35, 0.5, 0]} material={materials.navy}>
          <boxGeometry args={[0.28, 0.06, 0.22]} />
        </mesh>
        <mesh position={[0.2, 1.08, 0.4]} rotation={[0.35, -0.5, 0]} material={materials.navy}>
          <boxGeometry args={[0.28, 0.06, 0.22]} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 1.3, 0.02]} material={materials.skin}>
          <cylinderGeometry args={[0.25, 0.28, 0.5, 20]} />
        </mesh>

        {/* Shoulder spheres */}
        <mesh position={[-1.2, 0.75, 0.05]} material={materials.sleeve}>
          <sphereGeometry args={[0.42, 24, 16]} />
        </mesh>
        <mesh position={[1.2, 0.75, 0.05]} material={materials.sleeve}>
          <sphereGeometry args={[0.42, 24, 16]} />
        </mesh>

        {/* Elbow spheres */}
        <mesh position={[-1.42, -0.4, 0.4]} material={materials.skin}>
          <sphereGeometry args={[0.25, 20, 16]} />
        </mesh>
        <mesh position={[1.42, -0.4, 0.4]} material={materials.skin}>
          <sphereGeometry args={[0.25, 20, 16]} />
        </mesh>

        {/* Arm Limbs and Wrists */}
        {armElements}

        {/* Typing Hands */}
        <mesh
          position={[-0.85, -0.8, 2.0]}
          scale={[1, 0.42, 1.25]}
          material={materials.skin}
          ref={(m) => {
            if (m && !handsData.current.some((h) => h.mesh === m)) {
              handsData.current.push({ mesh: m, baseY: -0.8, phase: 0 });
            }
          }}
        >
          <sphereGeometry args={[0.3, 20, 16]} />
        </mesh>
        <mesh
          position={[0.85, -0.8, 2.0]}
          scale={[1, 0.42, 1.25]}
          material={materials.skin}
          ref={(m) => {
            if (m && !handsData.current.some((h) => h.mesh === m)) {
              handsData.current.push({ mesh: m, baseY: -0.8, phase: 2 });
            }
          }}
        >
          <sphereGeometry args={[0.3, 20, 16]} />
        </mesh>

        {/* Desk Laptop */}
        <mesh position={[0, -1.0, 2.75]} material={materials.laptop}>
          <boxGeometry args={[3.1, 0.1, 2.1]} />
        </mesh>
        {/* Keyboard Area */}
        <mesh position={[0, -0.94, 2.45]} material={materials.navy}>
          <boxGeometry args={[2.6, 0.02, 1.0]} />
        </mesh>
        {/* Trackpad */}
        <mesh position={[0, -0.94, 3.3]} material={materials.laptop}>
          <boxGeometry args={[1.0, 0.02, 0.6]} />
        </mesh>
        {/* Screen Hinge & Angled Display Lid */}
        <group position={[0, -0.95, 3.8]} rotation={[0.3, 0, 0]}>
          <mesh position={[0, 0.8, 0]} material={materials.laptop}>
            <boxGeometry args={[3.1, 1.6, 0.07]} />
          </mesh>
          {/* Glowing Laptop Back Logo */}
          <mesh position={[0, 0.85, 0.045]} material={materials.laptopLogo}>
            <circleGeometry args={[0.17, 32]} />
          </mesh>
        </group>

        {/* Desk Mouse */}
        <mesh position={[-2.2, -0.9, 2.3]} scale={[0.8, 0.45, 1.25]} material={materials.mouse}>
          <sphereGeometry args={[0.28, 20, 16]} />
        </mesh>

        {/* Head & Facial Features Group */}
        <group ref={headRef} position={[0, 1.98, 0.05]}>
          {/* Head Sphere */}
          <mesh scale={[0.92, 1.08, 0.95]} material={materials.skin}>
            <sphereGeometry args={[0.62, 24, 16]} />
          </mesh>

          {/* Stubble / Beard Shadow */}
          <mesh scale={[0.93, 1.09, 0.96]} material={materials.stubble}>
            <sphereGeometry args={[0.62, 32, 16, 0, Math.PI * 2, Math.PI * 0.58, Math.PI * 0.42]} />
          </mesh>

          {/* Blinking Eyes (Left & Right) */}
          {[-1, 1].map((s, idx) => (
            <group
              key={`eye-${s}`}
              position={[s * 0.22, 0.1, 0]}
              ref={(g) => {
                if (g) eyesRefs.current[idx] = g;
              }}
            >
              {/* Sclera (White) */}
              <mesh position={[0, 0, 0.5]} scale={[1, 1, 0.6]} material={materials.white}>
                <sphereGeometry args={[0.085, 16, 16]} />
              </mesh>
              {/* Pupil (Dark) */}
              <mesh position={[0, 0, 0.545]} scale={[1, 1, 0.6]} material={materials.dark}>
                <sphereGeometry args={[0.05, 16, 16]} />
              </mesh>
            </group>
          ))}

          {/* Eyebrows */}
          <mesh position={[-0.22, 0.27, 0.5]} rotation={[0, 0, 0.12]} material={materials.hair}>
            <boxGeometry args={[0.2, 0.045, 0.06]} />
          </mesh>
          <mesh position={[0.22, 0.27, 0.5]} rotation={[0, 0, -0.12]} material={materials.hair}>
            <boxGeometry args={[0.2, 0.045, 0.06]} />
          </mesh>

          {/* Mustache */}
          <mesh position={[-0.1, -0.2, 0.56]} rotation={[0, 0, 0.18]} material={materials.hair}>
            <boxGeometry args={[0.2, 0.05, 0.07]} />
          </mesh>
          <mesh position={[0.1, -0.2, 0.56]} rotation={[0, 0, -0.18]} material={materials.hair}>
            <boxGeometry args={[0.2, 0.05, 0.07]} />
          </mesh>

          {/* Ears & Sideburns */}
          {[-1, 1].map((s) => (
            <React.Fragment key={`ear-${s}`}>
              <mesh position={[s * 0.56, 0, -0.02]} scale={[0.6, 1, 1]} material={materials.skin}>
                <sphereGeometry args={[0.11, 16, 16]} />
              </mesh>
              <mesh position={[s * 0.56, 0.12, 0.0]} scale={[0.7, 1.6, 0.9]} material={materials.hair}>
                <sphereGeometry args={[0.1, 16, 16]} />
              </mesh>
            </React.Fragment>
          ))}

          {/* Nose */}
          <mesh position={[0, -0.06, 0.6]} scale={[1, 1.1, 1]} material={materials.skin}>
            <sphereGeometry args={[0.085, 16, 16]} />
          </mesh>

          {/* Lips */}
          <mesh position={[0, -0.33, 0.52]} material={materials.lip}>
            <boxGeometry args={[0.16, 0.03, 0.04]} />
          </mesh>

          {/* Base Wavy Hair Volume */}
          <mesh position={[0, 0.2, -0.06]} scale={[0.97, 0.82, 1.02]} material={materials.hair}>
            <sphereGeometry args={[0.68, 24, 20]} />
          </mesh>

          {/* Curly Hair Locks */}
          {hairCurls.map((curl, i) => (
            <mesh key={`curl-${i}`} position={curl.pos} scale={[1, 0.9, 1]} material={materials.hair}>
              <sphereGeometry args={[curl.r, 14, 12]} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

// ── Optional External GLTF Model Loader (with auto-centering fallback) ──────
function ExternalGLBModel({
  modelUrl,
  targetSize,
  scaleMultiplier,
  positionOffset,
  rotationOffset,
}: {
  modelUrl: string;
  targetSize: number;
  scaleMultiplier: number;
  positionOffset: [number, number, number];
  rotationOffset: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelUrl);
  const { actions, names } = useAnimations(animations, groupRef);

  const { normalizedScale, centerOffset } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = maxDim > 0 ? (targetSize / maxDim) * scaleMultiplier : 1;

    return {
      normalizedScale: scale,
      centerOffset: [
        -center.x * scale + positionOffset[0],
        -center.y * scale + positionOffset[1],
        -center.z * scale + positionOffset[2],
      ] as [number, number, number],
    };
  }, [scene, targetSize, scaleMultiplier, positionOffset]);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((mat) => {
            if ('envMapIntensity' in mat) {
              (mat as THREE.MeshStandardMaterial).envMapIntensity = 1.25;
            }
          });
        }
      }
    });
  }, [scene]);

  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]]?.reset().fadeIn(0.5).play();
    }
  }, [actions, names]);

  return (
    <group ref={groupRef} position={centerOffset} rotation={rotationOffset}>
      <primitive object={scene} scale={normalizedScale} />
    </group>
  );
}

// ── Error Boundary ──────────────────────────────────────────────────────────
class ModelErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { hasError: boolean }> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// ── Interactive Controller & Stage ──────────────────────────────────────────
function InteractiveStage({
  modelUrl,
  targetSize,
  scaleMultiplier,
  positionOffset,
  rotationOffset,
  showDecor,
  lookCoords,
  isDragging,
  dragOffset,
}: {
  modelUrl?: string;
  targetSize: number;
  scaleMultiplier: number;
  positionOffset: [number, number, number];
  rotationOffset: [number, number, number];
  showDecor: boolean;
  lookCoords: { x: number; y: number };
  isDragging: boolean;
  dragOffset: number;
}) {
  return (
    <group>
      {/* If a custom modelUrl is provided, try loading it; otherwise render the Avatar */}
      {modelUrl ? (
        <ModelErrorBoundary
          fallback={
            <ProceduralDeveloperAvatar
              lookCoords={lookCoords}
              isDragging={isDragging}
              dragOffset={dragOffset}
            />
          }
        >
          <Suspense
            fallback={
              <ProceduralDeveloperAvatar
                lookCoords={lookCoords}
                isDragging={isDragging}
                dragOffset={dragOffset}
              />
            }
          >
            <ExternalGLBModel
              modelUrl={modelUrl}
              targetSize={targetSize}
              scaleMultiplier={scaleMultiplier}
              positionOffset={positionOffset}
              rotationOffset={rotationOffset}
            />
          </Suspense>
        </ModelErrorBoundary>
      ) : (
        <ProceduralDeveloperAvatar
          lookCoords={lookCoords}
          isDragging={isDragging}
          dragOffset={dragOffset}
        />
      )}

      {/* Decorative Orbit Rings and Soft Particle Cloud */}
      {showDecor && (
        <>
          <DecorativeOrbitRings />
          <GlowingParticles count={40} />
        </>
      )}
    </group>
  );
}

// ── Main Exported Component ──────────────────────────────────────────────────
export default function HeroModel({
  modelUrl,
  targetSize = 2.3,
  scaleMultiplier = 1.0,
  positionOffset = [0, 0, 0],
  rotationOffset = [0, 0, 0],
  showDecor = false,
  fallbackImage = '/models/fallback.png',
  altText = 'Shreyas J S — 3D Developer Avatar',
}: HeroModelProps) {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Mouse & Drag State
  const [lookCoords, setLookCoords] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const lastPointerX = useRef(0);

  // WebGL detection
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      setWebGLSupported(!!gl);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  // IntersectionObserver to pause rendering when offscreen
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Pointer drag and cursor tracking
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = (e.clientX - lastPointerX.current) * 0.01;
        setDragOffset((d) => d + deltaX);
        lastPointerX.current = e.clientX;
      }

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const lx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
        const ly = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
        setLookCoords({ x: lx, y: ly });
      }
    };

    const handlePointerUp = () => setIsDragging(false);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging]);

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    lastPointerX.current = e.clientX;
  };

  // Fallback if WebGL unavailable
  if (!webGLSupported) {
    return (
      <div
        ref={containerRef}
        role="img"
        aria-label={altText}
        style={{
          width: '100%',
          height: '100%',
          minHeight: 480,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <img
          src={fallbackImage}
          alt={altText}
          style={{
            maxWidth: '90%',
            maxHeight: '90%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 32px rgba(71, 245, 250, 0.25))',
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={altText}
      onPointerDown={onPointerDown}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 480,
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'pan-y',
      }}
    >

      <Canvas
        camera={{ position: [0, 0.6, 5.2], fov: 38 }}
        dpr={[1, 1.75]}
        frameloop={isVisible ? 'always' : 'demand'}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Hemisphere ambient light */}
        <hemisphereLight args={[0xcfd8ff, 0x20202c, 0.95]} />

        {/* Crisp Key directional light */}
        <directionalLight position={[4, 6, 6]} intensity={1.5} color="#FFFFFF" />

        {/* Violet rim light from behind */}
        <directionalLight position={[-5, 3, -4]} intensity={1.8} color="#7c5cff" />

        {/* Cyan front fill */}
        <pointLight position={[0, -2, 3]} intensity={0.6} color="#3DF0F5" />

        {/* City reflections */}
        <Environment preset="city" />

        <InteractiveStage
          modelUrl={modelUrl}
          targetSize={targetSize}
          scaleMultiplier={scaleMultiplier}
          positionOffset={positionOffset}
          rotationOffset={rotationOffset}
          showDecor={showDecor}
          lookCoords={lookCoords}
          isDragging={isDragging}
          dragOffset={dragOffset}
        />
      </Canvas>
    </div>
  );
}
