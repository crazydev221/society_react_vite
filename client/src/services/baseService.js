import axios from "axios"
import { URLS } from "../constants/consts"

export const inviteUsers = (info) => {
    console.log('invite Users', info);
    return axios.post(URLS.baseURL + '/invite-users', info)
        .then(response => {
            return Promise.resolve(response);
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

export const contactTeam = (msg) => {
    return axios.post(URLS.baseURL + '/save-contact', msg)
        .then(response => {
            return Promise.resolve(response);
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

export const getPublicContent = () => {
    return axios.get(URLS.baseURL + '/test/all');
}

export const getPubicPageById = (pageId) => {
    return axios.get(URLS.baseURL + '/pages/' + pageId);
}

export const getOurWorkList = (page) => {
    return axios.get(URLS.baseURL + '/ourworks', {
        params: {
            page,
        }
    });
};

export const getLeadershipTeamList = (page) => {
    return axios.get(URLS.baseURL + '/leadershipteams', {
        params: {
            page,
        }
    });
}

export const getLeadershipTestimonalList = (page) => {
    return axios.get(URLS.baseURL + '/leadershiptestimonials', {
        params: {
            page,
        }
    });
}

export const getNitaliaBlanketList = (page) => {
    return axios.get(URLS.baseURL + '/nitaliablankets', {
        params: {
            page,
        }
    });
}

export const getPurpleAaprtmentList = (page) => {
    return axios.get(URLS.baseURL + '/purpleapartments', {
        params: {
            page,
        }
    });
}

export const getJuniorPurpleSocietyList = (page) => {
    return axios.get(URLS.baseURL + '/juniors', {
        params: {
            page,
        }
    });
}

export const saveJuniorPurpleSociety = (info) => {
    return axios.post(URLS.baseURL + '/save-juniorpurplesociety', info);
}

export const saveVolunteer = (info) => {
    return axios.post(URLS.baseURL + '/save-volunteer', info);
}

export const checkEmailSubscriber = (email) => {
    return axios.post(URLS.baseURL + '/check-email', {
        email,
    });
}

export const addEmailNewsletter = (email) => {
    return axios.post(URLS.baseURL + '/save-newsletter', {
        email,
    });
}