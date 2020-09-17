/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

const postBlog = async () => {
    const blogtext = app_blog.shadowRoot.querySelector("#blogtext").value;
    const author = app_blog.shadowRoot.querySelector("#author").value;
    
    const jsondata = {
        author : author,
        blogtext : blogtext
    }
    let resp = await apiman.rest(APP_CONSTANTS.API_POST_BLOG, "POST", jsondata, false, true);
    if (!resp || !resp.result) router.reload();
    getBlogs();
    app_blog.shadowRoot.querySelector("#post_id").value = resp.results.blogid;
}

const getBlogs = async () => {
    let resp = await apiman.rest(APP_CONSTANTS.API_GET_BLOGS, "GET", {}, true);
    if (!resp.result) router.reload();
    let html = "<table border='1|1'>";
    html+="<thead> <th> Author </th>";
    html+="<th> Blog Content </th> </thead>";
    for (var i = 0; i < resp.results.blogs.length; i++) {
        html+="<tr>";
        html+="<td>"+resp.results.blogs[i].author+"</td>";
        html+="<td>"+resp.results.blogs[i].blogtext+"</td>";
        html+="<td> <button id=e"+i+" type=\"button\" onclick='monkshu_env.components[\"app-blog\"].editInputs(\""+resp.results.blogs[i].author+"\",\""+resp.results.blogs[i].blogtext+"\")'>Edit</button></td>";
        html+="<td> <button id=d"+i+" type=\"button\" onclick='monkshu_env.components[\"app-blog\"].deleteBlog(\""+resp.results.blogs[i].author+"\",\""+resp.results.blogs[i]._id+"\")'>Delete</button></td>";
        html+="<td> <button id=s"+i+" type=\"button\" onclick='monkshu_env.components[\"app-blog\"].editBlog(\""+resp.results.blogs[i].author+"\",\""+resp.results.blogs[i]._id+"\")'>Save</button></td>";
        html+="<td style=\"display:none;\">"+resp.results.blogs[i]._id+"</td>";
        html+="</tr>";

    }
    html+="</table>";
    app_blog.shadowRoot.querySelector("#tableDiv").innerHTML = html;
}

const deleteBlog = async (deleteAuthor,delId) => {
    const data ={
        blogid : delId,
        author:deleteAuthor
    }
    let resp = await apiman.rest(APP_CONSTANTS.API_DELETE_BLOGS, "POST", data, false ,true);
    getBlogs();
    if (!resp.result) router.reload();
}

const editBlog = async (editAuthor,editId) => {
    //const id = "ObjectId(\""+app_message.shadowRoot.querySelector("#post_id").value+"\")";
    const blogid = app_blog.shadowRoot.querySelector("#post_id").value;
    const author = app_blog.shadowRoot.querySelector("#author").value;
    const blogtext = app_blog.shadowRoot.querySelector("#blogtext").value;

    const data ={
        blogid : editId,
        author : author,
        blogtext : blogtext,
        prevAuthor :editAuthor
    }
    let resp = await apiman.rest(APP_CONSTANTS.API_EDIT_BLOGS, "POST", data,false, true);
    getBlogs();
    if (!resp.result) router.reload();
}

function editInputs (author,blogtext) {
    app_blog.shadowRoot.querySelector("#author").value = author;
    app_blog.shadowRoot.querySelector("#blogtext").value = blogtext;
}

function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("app-blog", `${APP_CONSTANTS.APP_PATH}/components/app-blog/app-blog.html`, app_blog);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const app_blog = { trueWebComponentMode, register, postBlog ,deleteBlog,getBlogs,editBlog,editInputs}