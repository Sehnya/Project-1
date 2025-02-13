import React, { useRef, useEffect, useState, createContext, useContext } from 'react';
import * as THREE from 'three';
import { db } from '../firebase'; // Import your Firestore setup
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import Node from './Node';

// Create a context to share the scene and node data
const WorkspaceContext = createContext();

function Workspace() {
    console.log("Workspace rendered");

    const sceneRef = useRef(new THREE.Scene());
    const cameraRef = useRef();
    const rendererRef = useRef();
    const [nodes, setNodes] = useState([]);
    const containerRef = useRef();

    // --- Update Node Position in Firestore ---
    const updateNodePosition = async (nodeId, newPosition) => {
        const nodeRef = doc(db, 'nodes', nodeId);
        await updateDoc(nodeRef, {
            position: newPosition
        });
    };

    // --- Firestore Data Loading --- (useEffect #1)
    useEffect(() => {
        const container = containerRef.current;

        // Camera setup
        cameraRef.current = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        cameraRef.current.position.z = 5;
        cameraRef.current.name = 'mainCamera';

        // Renderer setup
        rendererRef.current = new THREE.WebGLRenderer({ antialias: true });
        rendererRef.current.setSize(container.clientWidth, container.clientHeight);
        console.log("Renderer size:", container.clientWidth, container.clientHeight);
        container.appendChild(rendererRef.current.domElement);
        console.log("Canvas appended");


        // Basic lighting
        const light = new THREE.AmbientLight(0xffffff);
        sceneRef.current.add(light);

        const nodesCollection = collection(db, 'nodes');
        const unsubscribe = onSnapshot(nodesCollection, (snapshot) => {
            const newNodes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("Nodes from Firestore:", newNodes);
            setNodes(newNodes);
        });

        // --- Animation Loop --- (Inside the same useEffect)
        const animate = () => {
            requestAnimationFrame(animate);
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        };
        animate();

        return () => {
            unsubscribe();
            rendererRef.current.dispose();
            if (containerRef.current) {
                containerRef.current.removeChild(rendererRef.current.domElement);
            }
        };
    }, []); // Empty dependency array

    // --- Resize Handler --- (useEffect #2 - Now SEPARATE)
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current && rendererRef.current && cameraRef.current) {
                const width = containerRef.current.clientWidth;
                const height = containerRef.current.clientHeight;
                cameraRef.current.aspect = width / height;
                cameraRef.current.updateProjectionMatrix();
                rendererRef.current.setSize(width, height);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array


    // --- JSX for Rendering ---
    return (
        <WorkspaceContext.Provider value={{ scene: sceneRef.current, nodes, updateNodePosition }}>
            <div ref={containerRef} style={{ width: '100vw', height: '100vh' }}>
                {/* The Three.js canvas will be inserted here */}
                {nodes.map(node => (
                    <Node key={node.id} node={node} />
                ))}
            </div>
        </WorkspaceContext.Provider>
    );
}

export default Workspace;
export { WorkspaceContext };