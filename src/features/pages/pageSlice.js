import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
import { logout } from '../auth/authSlice';

// Fetch all pages of current user
export const fetchPages = createAsyncThunk('pages/fetchPages', async (_, { getState }) => {
  const token = getState().auth.token;
  const res = await axiosInstance.get('/api/pages', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

// Create a new page
export const createPage = createAsyncThunk('pages/createPage', async (pageData, { getState }) => {
  const token = getState().auth.token;
  const res = await axiosInstance.post('/api/pages', pageData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
});

// Update page (save or publish)
export const updatePage = createAsyncThunk(
  'pages/updatePage',
  async ({ id, blocks, isPublished }, { getState }) => {
    const token = getState().auth.token;
    const res = await axiosInstance.put(
      `/api/pages/${id}`,
      { blocks, isPublished },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
);


const pageSlice = createSlice({
  name: 'pages',
  initialState: {
    pages: [],
    currentPage: { _id: null, blocks: [] },
    selectedBlockId: null, 
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSelectedBlock: (state, action) => {
      state.selectedBlockId = action.payload;
    },
    updateBlockStyle: (state, action) => {
      const { blockId, style } = action.payload;

      const updateStyleRecursively = (blocks) => {
        return blocks.map((b) => {
          if (b.id === blockId) {
            return { ...b, style: { ...b.style, ...style } };
          }
          if (b.children) {
            b.children = updateStyleRecursively(b.children);
          }
          return b;
        });
      };

      state.currentPage.blocks = updateStyleRecursively(state.currentPage.blocks);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.pages = action.payload;
        if (action.payload.length > 0) {
          state.currentPage = action.payload[0]; 
        }
      })
      .addCase(createPage.fulfilled, (state, action) => {
        state.pages.push(action.payload);
        state.currentPage = action.payload;
      })
      .addCase(updatePage.fulfilled, (state, action) => {
        state.currentPage = action.payload;
        state.pages = state.pages.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
      })
      .addCase(logout, (state) => {
        state.pages = [];
        state.currentPage = { _id: null, blocks: [] };
        state.selectedBlockId = null;
      });
  },
});


export const { setCurrentPage, setSelectedBlock, updateBlockStyle } = pageSlice.actions;
export default pageSlice.reducer;
