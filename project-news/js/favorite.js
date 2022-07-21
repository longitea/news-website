import { renderPostSmall } from "./components/RenderPost.js";
import { API_ARTICLE } from "./contants/api_path.js";

$(document).ready(function () {

    let mainMenu = $('.main-menu');
    renderMenu(mainMenu);



    // load bài viết yêu thích từ localStorage
    let arrayLiked = JSON.parse(localStorage.getItem("articlesLiked")) || []
    // let heart = arrayLiked.includes(item.id) ?  'red_heart.jpg' : 'black_heart.jpg'

    let postSmall = $('#posts_small')

    
    $.ajax({
        type: "GET",
        url: "url",
        data: "data",
        dataType: "dataType",
        success: function (response) {
            
        }
    });





});