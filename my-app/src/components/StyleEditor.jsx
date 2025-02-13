import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

function StyleEditor({ node, onClose }) {
    const [styles, setStyles] = useState({});

    useEffect(() => {
        // Initialize styles with the node's current styles
        const initialStyles = {};
        node.nodeStyle.forEach(style => {
            initialStyles[style.property] = style.value;
        });
        setStyles(initialStyles);
    }, [node]);

    const handleStyleChange = (property, value) => {
        // Update the styles object when a style is changed
        setStyles({...styles, [property]: value });
    };

    const saveStyles = async () => {
        try {
            // Convert the styles object back to an array of objects
            const updatedNodeStyle = Object.entries(styles).map(([property, value]) => ({
                property,
                value,
            }));
            // Update the node's styles in Firestore
            await updateDoc(doc(db, "nodes", node.id), {
                nodeStyle: updatedNodeStyle,
            });
            console.log("Styles updated successfully!");
            onClose(); // Close the editor after saving
        } catch (error) {
            console.error("Error updating styles:", error);
        }
    };

    return (
        <div>
            <h3>Edit Styles</h3>
            {/* Add controls for different style properties */}
            <input
                type="color"
                value={styles.color || "#000000"}
                onChange={(e) => handleStyleChange("color", e.target.value)}
            />
            {/*... other style controls (e.g., for font, border, etc.) */}
            <button onClick={saveStyles}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default StyleEditor;