import countComment from "../hooks/countComment.js";

export function renderPostBig(postsBig, API_URL) {
    $.ajax({
        type: "GET",
        url: API_URL,
        data: {
            offset: 0,
            limit: 3
        },
        dataType: "json",
        success: function (data) {
            let content = '';
            for (let i = 0; i < data.length; i++) {
                // gọi component renderPost -> trả về DOM element
                content += /*html*/`<article class="post"> ${renderPost(data[i])}</article>`;
            }
            postsBig.html(content);
        }
    });
}

export function renderPostSmall(postSmall, API_URL) {
    $.ajax({
        type: "GET",
        url: API_URL,
        data: {
            offset: 3,
            limit: 4
        },
        dataType: "json",
        success: function (data) {
            let content = '';
            for (let i = 0; i < data.length; i++) {
                content += /*html*/`<article class="item post col-md-6"> ${renderPost(data[i])} </article> `;
            }
            postSmall.html(content);
        }
    });
}

export function renderPost(item) {
    let thumb = item.thumb;
    let title = item.title;
    let description = item.description;
    let pubDate = new Date(item.publish_date);
    pubDate = pubDate.toLocaleDateString('vi-VI');

    // modify href
    let linkDetail = `detail.html?id=${item.id}`
    let linkCate = `category.html?id=${item.category_id}`
    // 1. Đếm số lượng cmt từng bài viêt
    const count = countComment(item.id)


    // 2. Thả tim bài viết
    let arrayLiked = JSON.parse(localStorage.getItem("articlesLiked")) || []
    let heart = arrayLiked.includes(item.id) ?  'red_heart.jpg' : 'black_heart.jpg'
    
    return /*html*/`
            <div class="card shadow-lg">
                <figure class="card-img-top overlay overlay-1">
                    <a href=${linkDetail}><img src="${thumb}" alt="" /></a>
                    <figcaption><h5 class="from-top mb-0">Read More</h5></figcaption>
                </figure>
                <div class="card-body">
                    <div class="post-header">
                        <div class="post-category">
                            <a href="${linkCate}" class="hover link-grape" rel="category">${item.category.name}</a>
                        </div>
                        <h2 class="post-title mt-1 mb-0">
                            <a class="link-navy" href=${linkDetail}>${title}</a>
                        </h2>
                    </div>
                    <div class="post-content">
                        <p>${description}</p>
                    </div>
                </div>
                <div class="card-footer">
                    <ul class="post-meta d-flex mb-0">
                        <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${pubDate}</span></li>
                        <li class="post-comments"><a href="#"><i  class="uil uil-comment"></i><span style='color:#3f78e0'>${count} Comments</span></a></li>
                        <li class="post-likes ms-auto">
                            <img class='btn-like' id="${item.id}" src="assets/img/icons/heart/${heart}" alt=""></a>
                        </li>
                    </ul>
                </div>
            </div>
            `
}

export function renderPopularPost(DOM, API_URL) {
    $.ajax({
        type: "get",
        url: API_URL,
        data: {
            offset: 0,
            limit: 3
        },
        dataType: "JSON",
        success: function (response) {
            const postPopular = response.map(element => popularPost(element)).join('');
            DOM.html(postPopular)
        }
    });
}

function popularPost({ thumb, title, publish_date, id }) {
    const idArticle = `detail.html?id=${id}`;
    const count = countComment(id)

    return /*html*/`
        <!-- Popular Posts 1 -->
        <li>
            <figure class="rounded"><a href=${idArticle}>
            <img src=${thumb} alt="" /></a></figure>
            <div class="post-content">
                <h6 class="mb-2"> <a class="link-dark" href=${idArticle}>${title}</a> </h6>
                <ul class="post-meta">
                    <li class="post-date"><i class="uil uil-calendar-alt"></i><span>${publish_date}</span></li>
                    <li class="post-comments"><a href="#"><i class="uil uil-comment"></i>${count}</a>
                    </li>
                </ul>
            </div>
        </li>
    `
}

export default {}