import React from 'react';
import { useDrop } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TextBlock from '../Blocks/TextBlock';
import ImageBlock from '../Blocks/ImageBlock';
import ButtonBlock from '../Blocks/ButtonBlock';
import ContainerBlock from '../Blocks/ContainerBlock';
import DividerBlock from '../Blocks/DividerBlock';
import ListBlock from '../Blocks/ListBlock';
import CardBlock from '../Blocks/CardBlock';
import { setCurrentPage, setSelectedBlock, updatePage } from '../../features/pages/pageSlice';
import { ActionCreators } from 'redux-undo';

const blockComponents = {
  text: TextBlock,
  image: ImageBlock,
  button: ButtonBlock,
  container: ContainerBlock,
  divider: DividerBlock,
  list: ListBlock,
  card: CardBlock,
};

const CanvasBlock = ({ block, page, dispatch }) => {
  const selectedBlockId = useSelector(state => state.pages.selectedBlockId);
  const Component = blockComponents[block.type];
  if (!Component) return null;

  const handleClick = e => {
    e.stopPropagation();
    dispatch(setSelectedBlock(block.id));
  };

  const handleChange = updatedBlock => {
    const updatedBlocks = page.blocks.map(b => b.id === updatedBlock.id ? updatedBlock : b);
    dispatch(setCurrentPage({ ...page, blocks: updatedBlocks }));
  };

  const blockStyle = {
    padding: block.style?.padding || '0px',
    margin: block.style?.margin || '0px',
    backgroundColor: block.style?.backgroundColor || 'transparent',
    color: block.style?.color || 'inherit',
    textAlign: block.style?.textAlign || 'left',
    border: block.id === selectedBlockId ? '2px solid blue' : block.style?.border || 'none',
  };

  return (
    <div onClick={handleClick} style={{ ...blockStyle, margin: '5px' }}>
      <Component block={block} onChange={handleChange} />

      {block.children?.map(child => (
        <CanvasBlock key={child.id} block={child} page={page} dispatch={dispatch} />
      ))}
    </div>
  );
};

const Canvas = () => {
  const dispatch = useDispatch();
  const page = useSelector(state => state.pages.currentPage);
  const navigate = useNavigate();

  const [{ isOver }, drop] = useDrop({
    accept: 'BLOCK',
    drop: item => {
      if (!page) return;

      const newBlock = {
        id: crypto.randomUUID(),
        type: item.type,
        content: item.type === 'text' ? { text: 'Text' } :
                 item.type === 'button' ? { text: 'Button' } :
                 item.type === 'image' ? { src: '' } :
                 {},
        style: {},
        children: item.type === 'container' ? [] : undefined,
      };
      dispatch(setCurrentPage({ ...page, blocks: [...page.blocks, newBlock] }));
    },
    collect: monitor => ({ isOver: !!monitor.isOver }),
  });

  if (!page) return <div style={{ flex: 1, padding: '10px' }}>Select or create a page</div>;

  return (
    <div ref={drop} style={{ flex: 1, padding: '10px', minHeight: '80vh', backgroundColor: isOver ? '#f0f0f0' : '#fff' }}>
      {page.blocks.map(block => (
        <CanvasBlock key={block.id} block={block} page={page} dispatch={dispatch} />
      ))}

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => dispatch(ActionCreators.undo())}>Undo</button>
        <button onClick={() => dispatch(ActionCreators.redo())}>Redo</button>
        <button onClick={() => dispatch(updatePage({ id: page._id, blocks: page.blocks, isPublished: false }))}>Save as Draft</button>
        <button onClick={() => dispatch(updatePage({ id: page._id, blocks: page.blocks, isPublished: true }))} style={{ backgroundColor: 'green', color: 'white', marginLeft: '10px' }}>Publish</button>
        <button onClick={() => navigate(`/preview/${page._id}`)} style={{ backgroundColor: 'blue', color: 'white', marginLeft: '10px' }}>Preview</button>
      </div>
    </div>
  );
};

export default Canvas;
