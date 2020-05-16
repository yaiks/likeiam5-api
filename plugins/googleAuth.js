"use strict";
const oauthPlugin = require("../utils/patch-oauth2");

module.exports = oauthPlugin;

module.exports.autoConfig = {
	name: "googleOAuth2",
	scope: ["profile", "email"],
	credentials: {
		client: {
			id: process.env.GOOGLE_CLIENT_ID,
			secret: process.env.GOOGLE_CLIENT_SECRET,
		},
		auth: oauthPlugin.GOOGLE_CONFIGURATION,
	},
	startRedirectPath: "/login/google",
	callbackUri: `${process.env.DOMAIN}/login/google/callback`,
};
