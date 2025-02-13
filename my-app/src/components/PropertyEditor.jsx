import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function PropertyEditor({ node, onClose }) {
    const [properties, setProperties] = useState();

    useEffect(() => {
        // Initialize properties with the node's current properties
        setProperties(node.nodeProp);
    }, [node]); // Re-run the effect if the node changes

    const handlePropertyChange = (index, newProperty) => {
        // Update the properties array when a property is changed
        const updatedProperties = [...properties];
        updatedProperties[index] = newProperty;
        setProperties(updatedProperties);
    };

    const saveProperties = async () => {
        try {
            // Update the node's properties in Firestore
            await updateDoc(doc(db, "nodes", node.id), {
                nodeProp: properties,
            });
            console.log("Properties updated successfully!");
            onClose(); // Close the editor after saving
        } catch (error) {
            console.error("Error updating properties:", error);
        }
    };

    return (
        <div>
            <h3>Edit Properties</h3>
            {properties.map((property, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={property}
                        onChange={(e) => handlePropertyChange(index, e.target.value)}
                    />
                </div>
            ))}
            <button onClick={saveProperties}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default PropertyEditor;