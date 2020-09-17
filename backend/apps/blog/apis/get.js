/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed LICENSE file.
 */

// Custom modules
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/blog/apis/lib/constants`);
const MongoClient = require(`${CONSTANTS.APPROOTDIR}/blog/3p/node_modules/mongodb`).MongoClient;

exports.doService = async jsonReq => {
    // Validate API request and check mandatory payload required
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;

    try {
        const blogs = await getBlogs(jsonReq);
        if (!blogs) return API_CONSTANTS.API_RESPONSE_FALSE;
        return { result: true, results: { blogs } };
    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

const getBlogs = async (jsonReq) => {
    try {
        var url = "mongodb://localhost:27017/";
        const dbname = 'blogdb';

        const client = await  MongoClient.connect(url)
        console.log('Connected correctly to server');
        const db = client.db(dbname);
        const result =await db.collection("blogs").find().toArray();
        return result;
    
    } catch (error) {
        throw error;
    }
}

const validateRequest = jsonReq => (jsonReq);
