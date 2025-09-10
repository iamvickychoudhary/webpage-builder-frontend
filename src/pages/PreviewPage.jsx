import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosInstance";

// Import block components
import TextBlock from "../components/Blocks/TextBlock";
import ImageBlock from "../components/Blocks/ImageBlock";
import ButtonBlock from "../components/Blocks/ButtonBlock";
import ContainerBlock from "../components/Blocks/ContainerBlock";
import DividerBlock from "../components/Blocks/DividerBlock";
import CardBlock from "../components/Blocks/CardBlock";
import ListBlock from "../components/Blocks/ListBlock";

const blockComponents = {
  text: TextBlock,
  image: ImageBlock,
  button: ButtonBlock,
  container: ContainerBlock,
  divider: DividerBlock,
  card: CardBlock,
  list: ListBlock,
};

const PreviewPage = () => {
  const { pageId } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const { data } = await axios.get(`/api/pages/${pageId}`);
        setPage(data);
      } catch (err) {
        console.error("Failed to fetch page:", err);
      }
    };
    fetchPage();
  }, [pageId]);

  const renderBlock = (block) => {
    const Component = blockComponents[block.type];
    if (!Component) return null;

    if (block.type === "container") {
      return (
        <ContainerBlock key={block.id} block={block}>
          {block.children?.map((child) => renderBlock(child))}
        </ContainerBlock>
      );
    }

    return <Component key={block.id} block={block} />;
  };

  if (!page) return <div>Loading preview...</div>;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      {page.blocks.map((block) => renderBlock(block))}
    </div>
  );
};

export default PreviewPage;
