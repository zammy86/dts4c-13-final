// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { parseHTML, parseJSON} from 'linkedom';
import parse from 'html-react-parser';
import axios from 'axios'
// import { getContent } from '../utility/Utils'
//REFERENCE = https://mediastack.com/documentation
const urlFormat = `${process.env.REACT_APP_API_URL}news?access_key=${process.env.REACT_APP_API_URL_TOKEN}&sources=fullcomment`
function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

export const getCurrentNews = createAsyncThunk('news/getCurrentNews', async (url) => {

    const response = await axios.get(url)
    const { document } = parseHTML(response.data);
    const textSelection = document.querySelectorAll('.article-content__content-group > p')
    const imageSelection = document.querySelectorAll('.featured-image__image')
    const imageNews = createElementFromHTML(imageSelection.toString()).src
    const textNews = parse(textSelection.toString());
   
    return {
      url,
      textNews,
      imageNews
    }
})


export const getNews = createAsyncThunk('news/getNews', async () => {
    const response = await axios.get(urlFormat)
    return response.data
})

export const getHotTopic = createAsyncThunk('news/getHotTopic', async () => {
  const response = await axios.get(urlFormat, {params : {sort : 'popularity', limit:12}})
  return response.data
})

export const authSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    selectedNews : null,
    paramsNews : {},
    pagination : {},
    hotTopic : {}
  },
  reducers: {
      deselectNews: (state, action) => {
          state.selectedNews = null
      },
  },
  extraReducers: builder => {
    builder
      .addCase(getNews.fulfilled, (state, action) => {
        let news =[]
        action.payload.data.map((val) => {
          return (val.image && val.published_at) && news.push(val) 
        })
        const numDescending = [...news].sort(function(a, b){
            const date1 = new Date(a.published_at)
            const date2 = new Date(b.published_at)
            
            return date2 - date1;
        })
        state.news = numDescending
      })
      .addCase(getHotTopic.fulfilled, (state, action) => {
        action.payload.data.map((val) => {
           if (val.image !== null && val.description.length > 150) {
             return state.hotTopic = val
           } else {
            return null
           }
        })
      })
      .addCase(getCurrentNews.fulfilled, (state, action) => {
        state.selectedNews = action.payload
      })
    }
})

export const { deselectNews } = authSlice.actions

export default authSlice.reducer
