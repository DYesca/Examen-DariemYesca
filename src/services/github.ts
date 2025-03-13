import { Octokit } from '@octokit/core';
import languages from '../data.json';
const API_KEY = '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'

const getRepos = async (lang :string) => {
    const octokit = new Octokit({auth: API_KEY});
    var lang = lang.toLowerCase() as string;
    const { data } = await octokit.request('GET /search/repositories', {
        q: lang,
        sort: 'stars',
        order: 'desc' 
    });

    if (!data.items) {
        return [];
    }
    return data.items;
};
export { getRepos };
