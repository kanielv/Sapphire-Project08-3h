'use strict';
const dotenv = require('dotenv').config();
const { google } = require('googleapis');
// const { OAuth2Client } = require('google-auth-library');
const { sanitizeEntity } = require('strapi-utils');
const _ = require('lodash');


module.exports = {
    createAuthenticatedClient() {
        const oAuth2Client = new google.auth.OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URL
        );
        
        return oAuth2Client;
    },
    getAuthenticatedClientUrl(auth, scopes) {
        const authorizationUrl = auth.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: scopes,
        });
        return authorizationUrl
    },

    createAuthUrl() {
        const scopes = ['https://www.googleapis.com/auth/classroom.rosters', 'https://www.googleapis.com/auth/userinfo.profile']

        const auth = this.createAuthenticatedClient();
        const authUrl = this.getAuthenticatedClientUrl(auth, scopes);

        const authUrlObj = {
            url: authUrl
        }
        
        return authUrlObj
    }

    
};
