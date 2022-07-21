import { renderPost } from "./components/RenderPost.js";
import { renderMenu, renderMenuCountArticle } from './components/RenderMenu.js'
import { renderPopularPost } from "./components/RenderPost.js";

import handleLike from "./modules/handleLike.js";
import { API_CATEGORY_WITH_COUNT_ARTILCE, API_POPULAR_POST } from "./contants/api_path.js";

$(document).ready(function () {

    let mainMenu = $('.main-menu');
    let postSmall = $('#posts_small')
    let postPopolar = $('#popular-posts')
    let countCategory = $('#category-count-articles')

    // Render Menu 
    renderMenu(mainMenu);

    // Right Sidebar
    renderPopularPost(postPopolar, API_POPULAR_POST) 
    renderMenuCountArticle(countCategory, API_CATEGORY_WITH_COUNT_ARTILCE)




    // -=============== Render Favorite Articles ===============-
    
    // 1. lấy danh sách id bài viết yêu thích từ local
    let arrayLiked = JSON.parse(localStorage.getItem("articlesLiked")) || []

    let checkArticle = arrayLiked.length
    if(checkArticle == 0) {
        postSmall.append(`<h1>Bạn chưa có bài viết yêu thích nào hết 😭<h1/>`)
    }
    
    // 2. lấy từng id duyệt mảng call api/id

    arrayLiked.map(id => {
        const api = `http://apiforlearning.zendvn.com/api/articles/${id}`
        callEachAPI(postSmall, api)
    })

    function callEachAPI(DOM, API_URL) {
        $.ajax({
            type: "GET",
            url: API_URL,
            data: "data",
            dataType: "JSON",
            success: response => {
                // 3. append bài viết trả về từ api -> UI
                DOM.append(`<article class="item post col-md-6"> ${renderPost(response)} </article> `);
            }
        });
    }

    // -=============== Unlike Delete Article ===============-
    
    //  chức năng xóa id ra khỏi localStorage
    handleLike()

    // thêm chức năng xóa bài viết ra khỏi dom.
    $(document).on('click', '.btn-like', event => {
        /*
            $(this).parents('article').remove();    
            chỗ này dùng this không xóa được
         */
        $(event.target).parents('article').remove();

        checkArticle =  checkArticle - 1
        if(checkArticle == 0) {
            postSmall.append(`<h1>Bạn chưa yêu thích bài viết nào hết 😭<h1/>`)
        }
    })


});