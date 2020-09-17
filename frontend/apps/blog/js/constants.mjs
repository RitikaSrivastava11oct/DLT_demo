/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
const FRONTEND = "http://localhost:8888";
const BACKEND = "http://localhost:9090";
// const APP_NAME = "Sample";
const APP_NAME = "blog";
const APP_PATH = `${FRONTEND}/apps/${APP_NAME}`;

export const APP_CONSTANTS = {
    FRONTEND, BACKEND, APP_PATH, APP_NAME,
    BLOG_HTML: APP_PATH + "/blog.html",

    SESSION_NOTE_ID: "com_monkshu_ts",

    API_POST_BLOG: `${BACKEND}/apis/post`,
    API_GET_BLOGS : `${BACKEND}/apis/get`,
    API_DELETE_BLOGS : `${BACKEND}/apis/delete`,
    API_EDIT_BLOGS:`${BACKEND}/apis/edit`,

    USERID: "id",
    USER_ROLE: "user",
    GUEST_ROLE: "guest",
    PERMISSIONS_MAP: {
        user: [APP_PATH + "/blog.html", $$.MONKSHU_CONSTANTS.ERROR_THTML]
        ,
        guest: [APP_PATH + "/random.html", APP_PATH + "/blog.html", $$.MONKSHU_CONSTANTS.ERROR_THTML]
    },
    API_KEYS: { "*": "uiTmv5YBOZMqdTb0gekD40PnoxtB9Q0k" },
    KEY_HEADER: "X-API-Key"
}