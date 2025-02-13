import React, { useRef, useEffect, useContext, useState } from 'react';
import * as THREE from 'three';
import { WorkspaceContext } from './Workspace';

function Node({ node }) {
    console.log("Node rendering:", node); // <-- Keep this!
    const { scene, updateNodePosition } = useContext(WorkspaceContext);
    const meshRef = useRef();
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // **CRITICAL CHECK: Ensure node.position exists and has x, y, z**
        if (!node || !node.position || typeof node.position.x !== 'number' || typeof node.position.y !== 'number' || typeof node.position.z !== 'number') {
            console.error("Invalid node position:", node);
            return; // Exit the useEffect if position is invalid
        }

        // Create the Three.js mesh when the component mounts
        const geometry = new THREE.BoxGeometry(1, 1, 1); // Or use node.nodeStyle for dimensions
        const material = new THREE.MeshBasicMaterial({ color: node.nodeStyle?.color || 0x00ff00 }); // Use nodeStyle if available
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(node.position.x, node.position.y, node.position.z);
        meshRef.current = mesh;
        scene.add(mesh); // Add the mesh to the scene

        return () => {
            scene.remove(mesh); // Remove the mesh from the scene when unmounting
            geometry.dispose();
            material.dispose();
        };
    }, [scene, node.nodeStyle, node.position]); // Re-create if nodeStyle changes.

    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.position.set(node.position.x, node.position.y, node.position.z);
        }
    }, [node.position]);

    // ... (rest of your handleMouseDown, handleMouseMove, handleMouseUp code remains the same) ...
    const handleMouseDown = (event) => {
      setIsDragging(true);
      // Convert mouse coordinates to 3D space (simplified example)
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Create a raycaster from the camera
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), scene.getObjectByName('mainCamera'));

      // Find intersections with the plane containing the node
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -meshRef.current.position.z);
      const intersectionPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, intersectionPoint);

      // Calculate the offset between the mouse and the node's center
      setDragOffset({
        x: intersectionPoint.x - meshRef.current.position.x,
        y: intersectionPoint.y - meshRef.current.position.y,
      });
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        // Convert mouse coordinates to 3D space
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        // Create a raycaster
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), scene.getObjectByName('mainCamera'));

        // Find intersections
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -meshRef.current.position.z); // Assuming z=0 plane
        const intersectionPoint = new THREE.Vector3();

        if (raycaster.ray.intersectPlane(plane, intersectionPoint)) {
          // Calculate new position considering the offset
          const newPosition = {
            x: intersectionPoint.x - dragOffset.x,
            y: intersectionPoint.y - dragOffset.y,
            z: meshRef.current.position.z, // Keep the Z position constant
          };
          // Directly update the Three.js object's position (for immediate visual feedback)
          meshRef.current.position.set(newPosition.x, newPosition.y, newPosition.z);
          //update position via firestore
          updateNodePosition(node.id, newPosition)
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };
    useEffect(() => {
      // Add mouse event listeners to the window
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      // Remove event listeners when the component unmounts
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging, handleMouseMove, handleMouseUp]); // isDragging is a dependency to re-add listeners
    return (
        <div onMouseDown={handleMouseDown} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
            {/* You can render additional content here, if needed */}
        </div>
    );
}

export default Node;