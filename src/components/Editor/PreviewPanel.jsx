import React from 'react';
import { useSelector } from 'react-redux';
import TextBlock from '../Blocks/TextBlock';
import ImageBlock from '../Blocks/ImageBlock';
import ButtonBlock from '../Blocks/ButtonBlock';
import ContainerBlock from '../Blocks/ContainerBlock';
import FormBlock from '../Blocks/FormBlock';
import DividerBlock from '../Blocks/DividerBlock';
import CardBlock from '../Blocks/CardBlock';
import ListBlock from '../Blocks/ListBlock';

const blockComponents = {
  text: TextBlock,
  image: ImageBlock,
  button: ButtonBlock,
  container: ContainerBlock,
  form: FormBlock,
  divider: DividerBlock,
  card: CardBlock,
  list: ListBlock,
};

const PreviewBlock = ({ block }) => {
  const Component = blockComponents[block.type];
  if (!Component) return null;

  if (block.type === 'container') {
    return (
      <ContainerBlock block={block} isPreview>
        <h2>Live Preview</h2>
        {block.children?.map((child) => (
          <PreviewBlock key={child.id} block={child} />
        ))}
      </ContainerBlock>
    );
  }

  return <Component block={block} isPreview />;
};

const PreviewPanel = () => {
  const page = useSelector((state) => state.pages.currentPage);

  if (!page) return <div style={{ padding: '10px' }}>No page loaded</div>;

  return (
    <div
      style={{
        flex: 1,
        padding: '10px',
        backgroundColor: '#f9f9f9',
        minHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      {page.blocks.map((block) => (
        <PreviewBlock key={block.id} block={block} />
      ))}
    </div>
  );
};

export default PreviewPanel;
