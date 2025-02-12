import { useState } from "react";
import Block from "./components/Block";

export default function App() {
  const [blocks, setBlocks] = useState([
    { id: 1, type: "text", content: "Type something here..." },
  ]);

  const addBlock = () => {
    setBlocks([...blocks, { id: Date.now(), type: "text", content: "" }]);
  };

  const updateBlock = (id, newContent) => {
    setBlocks(blocks.map(block => (block.id === id ? { ...block, content: newContent } : block)));
  };

  const deleteBlock = (id) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  return (
    <div className="min-h-screen p-5 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Notion Clone</h1>
      <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={addBlock}>
        Add Block
      </button>
      <div className="bg-white p-4 rounded shadow">
        {blocks.map(block => (
          <Block key={block.id} block={block} onUpdate={updateBlock} onDelete={deleteBlock} />
        ))}
      </div>
    </div>
  );
}