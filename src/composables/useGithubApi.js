import axios from 'axios';
const GITHUB_API_URL = 'https://api.github.com/search/repositories';
const GITHUB_TOKEN = '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';

export const fetchRandomRepository = async (language) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}?q=language:${language}&sort=stars&order=desc`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
    });
    const repos = response.data.items;
    if (repos.length > 0) {
      const randomIndex = Math.floor(Math.random() * repos.length);
      return repos[randomIndex];
    } else {
      throw new Error('No repositories found');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};