import { API_ARTICLE, API_CATEGORY_WITH_COUNT_ARTILCE, API_POPULAR_POST, API_TOP_ARTICLES } from "./contants/api_path.js";
import countComment from "./hooks/countComment.js";
import { renderMenu, renderMenuCountArticle } from "./components/RenderMenu.js";
import { renderPopularPost, renderPostBig, renderPostSmall } from "./components/RenderPost.js";
import handleLike from "./modules/handleLike.js";

$(document).ready(function () {

    // Truyền vào prop : vị trí cụ thể muốn render ra
    let mainMenu = $('.main_menu');
    let postBig = $('#posts_big');
    let postsSmall = $('#posts_small');
    let postSilder = $('.swiper-wrapper');
    let postPopolar = $('#popular-posts')
    let countCategory = $('#category-count-articles')

    // render CatetogyNews
    renderMenu(mainMenu);

    // 1. DOM, 2. URL API
    renderPostBig(postBig, API_ARTICLE)
    renderPostSmall(postsSmall, API_ARTICLE);

    // 2. Render Right Sidebar
    renderPopularPost(postPopolar, API_POPULAR_POST)
    renderMenuCountArticle(countCategory, API_CATEGORY_WITH_COUNT_ARTILCE)

    // 3. Render Slider
    $.ajax({
        type: "get",
        url: API_TOP_ARTICLES,
        data: {
            offset: 0,
            limit: 5
        },
        dataType: "JSON",
        success: function (response) {
            const sidler = response.map(element => renderSilder(element)).join('');
            postSilder.html(sidler)
            // fix lỗi css ngu
            theme.swiperSlider();
        }
    });

    function renderSilder({ thumb, category, id, description, publish_date }) {
        const idArticle = `detail.html?id=${id}`;
        const count = countComment(id)

        return (`
            <!--/.swiper-slide 1-->
            <div class="swiper-slide">
                <figure class="overlay caption caption-overlay rounded mb-0">
                <a href=${idArticle}><img src=${thumb} alt=""> </a>
                    <figcaption>
                        <span class="badge badge-lg bg-white text-uppercase mb-3">${category.name}</span>
                        <h2 class="post-title h3 mt-1 mb-3"><a href=${idArticle}>${description}</a></h2>
                        <ul class="post-meta text-white mb-0">
                            <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${publish_date}</span></li>
                            <li class="post-author"><a href="#"><i class="uil uil-user"></i><span>By Sandbox</span></a></li>
                            <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${count}<span>Comments</span></a></li>
                        </ul>
                        <!-- /.post-meta -->
                    </figcaption>
                    <!-- /figcaption -->
                </figure>
            </div>
        `)
    }

    // -===============  Chức năng thả tim ===============-
    handleLike()


}); 