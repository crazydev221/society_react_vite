import axios from 'axios';
import { API_Key, URLS } from '../constants/consts';

export const searchPaper = (search_string, offset, limit, isOpenAccess, fields) => {
    setApiKey(API_Key);
    return axios.get(URLS.apiURL + "/search", {
        params: {
            query: search_string,
            offset,
            limit,
            isOpenAccess,
            fields,
        },
    }).then(response => {
        return Promise.resolve(response.data);
    })
    .catch(error => {
        return Promise.reject(error);
    });
}

export const setApiKey = (key) => {
    if (key) {
        axios.defaults.headers.common['x-api-key'] = key;
    } else {
        delete axios.defaults.headers.common['x-api-key'];
    }
};

export const getUserPapers = (user_id) => {
    return axios
        .post(URLS.baseURL + "/get-user-papers", {
            user: user_id,
            is_paper: 1,
        })
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

export const savePaper = (userId, check, paperId, title, authors, year, citationCount) => {
    return axios
        .post(URLS.baseURL + '/save-paper', {
            user: userId,
            citationCount: citationCount,
            check: 1 - check,
            paperId: paperId,
            title: title,
            authors: authors,
            year: year,
            is_paper: 1,
        })
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

export const getPaperById = (paper_id, fields) => {
    setApiKey(API_Key);
    return axios.get(URLS.apiURL + '/' + paper_id, {
        params: {
            fields
        },
    }).then(response => {
        return Promise.resolve(response.data);
    })
    .catch(err => {
        return Promise.reject(err);
    });
}

export const suggestDrug = (search) => {
    return axios
        .post(URLS.baseURL + "/suggest-drugs", { search_text: search })
        .then((response) => {
            return Promise.resolve(response.data);
        }).catch((err) => {
            return Promise.reject(err);
        })
};

export const searchDrug = (search) => {
    return axios
        .post(URLS.baseURL + "/search-drugs", { search_text: search })
        .then((response) => {
            return Promise.resolve(response.data);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};
