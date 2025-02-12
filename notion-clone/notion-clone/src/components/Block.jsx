import React from 'react';
import PropTypes from 'prop-types';

const Block = ({ block, onUpdate, onDelete }) => {
  const handleChange = (e) => {
    onUpdate(block.id, e.target.value);
  };

  return (
    <div className="block">
      <textarea
        id={`block-${block.id}`}
        name={`block-${block.id}`}
        value={block.content}
        onChange={handleChange}
      />
      <button onClick={() => onDelete(block.id)}>Delete</button>
    </div>
  );
};

Block.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Block;