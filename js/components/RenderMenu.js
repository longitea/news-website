import { API_CATEGORY } from "../contants/api_path.js";

export function renderMenu(mainMenu) {
    //  load danh sách sản phẩm khi vừa vào trang
    $.ajax({
        type: "GET",
        url: API_CATEGORY,
        data: {
            offset: 0,
            limit: 20
        },
        dataType: "json",
        success: function (data) {
            let contentMenu = '';
            let contentMenuOther = '';

            for (let i = 0; i < data.length; i++) {
                if (i < 4) {
                    contentMenu += RenderMenuDetail(data[i], "nav-link")
                } else {
                    contentMenuOther += RenderMenuDetail(data[i], "dropdown-item" )

                }
            }
            contentMenuOther = /*html*/`
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Danh mục khác</a>
                            <ul class="dropdown-menu">
                                ${contentMenuOther}
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="favorite.html">Bài Viết Yêu Thích 💙</a>
                        </li>`;

            mainMenu.html(contentMenu + contentMenuOther);
        }
    });
}

// 4 giờ sáng rồi, dcm
export function renderMenuCountArticle(DOM, API_URL){
    $.ajax({
        type: "get",
        url: API_URL,
        data: {
            offset: 0,
            limit: 3
        },
        dataType: "JSON",
        success: response => {
            const renderCate = response.map(element => RenderMenuDetail(element)).join('');
            DOM.html(renderCate)
        }
    })
}

function RenderMenuDetail(item, className = '') {
    let categoryName = item.name;
    let linkDetail = `category.html?id=${item.id}`
    let count = item.articles_count
    let countCate = count ? ` (${count})` : ''
    return (`
                <li class="nav-item">
                    <a class="${className}" href="${linkDetail}">${categoryName}${countCate}</a>
                </li>
            `)
}

export default {}
