import { API_ARTICLE_BY_ID_CATEGORY, API_CATEGORY_DETAIL_BY_ID, API_CATEGORY_WITH_COUNT_ARTILCE, API_POPULAR_POST } from "./contants/api_path.js";
import { renderMenu, renderMenuCountArticle } from "./components/RenderMenu.js";
import { renderPopularPost, renderPostBig, renderPostSmall } from "./components/RenderPost.js";
import handleLike from "./modules/handleLike.js";


$(document).ready(function () {
    // DOM Seletor
    let mainMenu = $('.main-menu');
    let categoryTitle = $('#category-title')
    let postsBig = $('#posts_big');
    let postSmall = $('#posts_small');
    let postPopolar = $('#popular-posts')
    let countCategory = $('#category-count-articles')



    // Module Render Menu 
    renderMenu(mainMenu);
    renderTitleSection();

    // load article
    renderPostBig(postsBig, API_ARTICLE_BY_ID_CATEGORY)
    renderPostSmall(postSmall, API_ARTICLE_BY_ID_CATEGORY);

    // Right Sidebar
    renderPopularPost(postPopolar, API_POPULAR_POST) 
    renderMenuCountArticle(countCategory, API_CATEGORY_WITH_COUNT_ARTILCE)



    function renderTitleSection() {
        $.ajax({
            type: "GET",
            url: API_CATEGORY_DETAIL_BY_ID,
            data: "data",
            dataType: "JSON",
            success: function (response) {
                categoryTitle.text(response.name)
            }
        });
    }

    // Chức Năng Thả Tim
    handleLike()
}); 