import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Editor/Sidebar';
import Canvas from '../components/Editor/Canvas';
import SettingsPanel from '../components/Editor/SettingsPanel';
import PreviewPanel from '../components/Editor/PreviewPanel'; 
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../features/pages/pageSlice';
import { useSocket } from '../context/SocketContext';
import axios from '../api/axiosInstance';

const EditorPage = () => {
  const { pageId } = useParams();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.pages.currentPage);
  const socket = useSocket();

  useEffect(() => {
    const initPage = async () => {
      try {
        let pageData;

        if (!pageId) {
          const response = await axios.post('/api/pages', {
            title: 'Untitled Page',
            blocks: [],
          });
          pageData = response.data;

          window.history.replaceState(null, '', `/editor/${pageData._id}`);
        } else {
          const response = await axios.get(`/api/pages/${pageId}`);
          pageData = response.data;
        }

        dispatch(setCurrentPage(pageData));

        socket?.emit('join-page', pageData._id);

        socket?.on('update-page', (blocks) => {
          dispatch(setCurrentPage({ ...pageData, blocks }));
        });
      } catch (err) {
        console.error('Failed to load page:', err);
      }
    };

    initPage();

    return () => socket?.off('update-page');
  }, [pageId, socket]);

  useEffect(() => {
    if (socket && page?._id) {
      socket.emit('edit-page', { pageId: page._id, blocks: page.blocks });
    }
  }, [page?.blocks]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar style={{ flex: '0 0 200px' }} />
      <Canvas style={{ flex: 1 }} />
      <SettingsPanel style={{ flex: '0 0 300px' }} />
      <PreviewPanel style={{ flex: 1 }} /> 
    </div>
  );
};

export default EditorPage;
