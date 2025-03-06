import React, { useEffect, useRef, useState } from 'react'
import { useGraph } from '@react-three/fiber'
import { useFBX, useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

const Avatar = ({ isSpeaking, ...props }) => {
  const { scene } = useGLTF('/ThreeD/sir.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { animations: standing } = useFBX("/Animation/Idle.fbx");
  const { animations: interact } = useFBX("/Animation/Talking.fbx");

  standing[0].name = "Idle";
  interact[0].name = "Talking";

  const [animation, setAnimation] = useState("Idle");
  const group = useRef()
  const { actions } = useAnimations([standing[0], interact[0]], group);

  useEffect(() => {
    actions[animation].reset().fadeIn(1).play();
    return () => actions[animation].fadeOut(1);
  }, [animation])

  useEffect(() => {
    if (actions["Idle"]) {
      actions["Idle"].reset().fadeIn(0.5).play();
    }
  }, [actions]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (nodes.Wolf3D_Avatar.morphTargetDictionary["eyeBlinkLeft"] !== undefined) {
        nodes.Wolf3D_Avatar.morphTargetInfluences[nodes.Wolf3D_Avatar.morphTargetDictionary["eyeBlinkLeft"]] = 1;
        nodes.Wolf3D_Avatar.morphTargetInfluences[nodes.Wolf3D_Avatar.morphTargetDictionary["eyeBlinkRight"]] = 1;

        setTimeout(() => {
          nodes.Wolf3D_Avatar.morphTargetInfluences[nodes.Wolf3D_Avatar.morphTargetDictionary["eyeBlinkLeft"]] = 0;
          nodes.Wolf3D_Avatar.morphTargetInfluences[nodes.Wolf3D_Avatar.morphTargetDictionary["eyeBlinkRight"]] = 0;
        }, 150);
      }
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, [nodes]);

  useEffect(() => {
    if (isSpeaking) {
      setAnimation("Talking");

      const mouthMove = setInterval(() => {
        if (nodes.Wolf3D_Avatar.morphTargetDictionary) {
          const dict = nodes.Wolf3D_Avatar.morphTargetDictionary;
          const influences = nodes.Wolf3D_Avatar.morphTargetInfluences;

          influences[dict["mouthOpen"]] = Math.random() * 0.6 + 0.3;
          influences[dict["mouthSmileLeft"]] = Math.random() * 0.2;
          influences[dict["mouthSmileRight"]] = Math.random() * 0.2;
          influences[dict["mouthShrugUpper"]] = Math.random() * 0.3;
          influences[dict["mouthShrugLower"]] = Math.random() * 0.3;
        }
      }, 100);

      return () => {
        clearInterval(mouthMove);
        if (nodes.Wolf3D_Avatar.morphTargetDictionary) {
          const dict = nodes.Wolf3D_Avatar.morphTargetDictionary;
          const influences = nodes.Wolf3D_Avatar.morphTargetInfluences;

          influences[dict["mouthOpen"]] = 0;
          influences[dict["mouthSmileLeft"]] = 0;
          influences[dict["mouthSmileRight"]] = 0;
          influences[dict["mouthShrugUpper"]] = 0;
          influences[dict["mouthShrugLower"]] = 0;
        }
        setAnimation("Idle");
      };
    }
  }, [isSpeaking]);

  return (
    <group {...props} dispose={null} ref={group}>
      <primitive object={nodes.Hips} />
      <skinnedMesh
        geometry={nodes.Wolf3D_Avatar_Transparent.geometry}
        material={materials.Wolf3D_Avatar_Transparent}
        skeleton={nodes.Wolf3D_Avatar_Transparent.skeleton}
      />
      <skinnedMesh
        name="Wolf3D_Avatar"
        geometry={nodes.Wolf3D_Avatar.geometry}
        material={materials.Wolf3D_Avatar}
        skeleton={nodes.Wolf3D_Avatar.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Avatar.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Avatar.morphTargetInfluences}
      />
    </group>
  )
}

useGLTF.preload('/ThreeD/sir.glb')

export default Avatar;
