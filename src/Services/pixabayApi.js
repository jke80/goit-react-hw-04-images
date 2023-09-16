import axios from 'axios';

const API_KEY = '9908260-97928272ad9de5d3030a89b8a';
const URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

const instance = axios.create({
  baseURL: URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
  },
});

export const getImages = async ({ page = 1, q = '' }) => {
  const params = {
    page,
    q,
  };

  const responce = await instance.get('', { params });
  return responce;
};
