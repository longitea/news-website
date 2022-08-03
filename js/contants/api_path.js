
// -===============  URL Search ===============-
import useSearchID from "../hooks/useSearchID.js";
let id = useSearchID();


// -=============== API HOST ===============-
const API_URL = 'http://apiforlearning.zendvn.com/api/';

export const API_CATEGORY = `${API_URL}categories_news`;
export const API_ARTICLE = `${API_URL}articles`;

// -=============== PAGE ===============-
// 1. Category.html -> Render Article dựa trên Category
export const API_CATEGORY_DETAIL_BY_ID = API_CATEGORY + '/' + id

// 2. Detail.html -> Render Article Detail
export const API_ARTICLE_DETAIL_BY_ID = API_ARTICLE + '/' + id

// 3. Render Post API
export const API_ARTICLE_BY_ID_CATEGORY =  API_CATEGORY_DETAIL_BY_ID + '/articles'

// 4. Article render lên silder 
export const API_TOP_ARTICLES= API_ARTICLE + '/top-articles'

// 5. Article phổ biến bên hông
export const API_POPULAR_POST = API_ARTICLE + '/most-read'

// 6. Load Category đếm được số lượng bài viết
export const API_CATEGORY_WITH_COUNT_ARTILCE =    API_CATEGORY + '/list-with-count-articles'


export default {}


/**
Danh sách các api cần truy xuất
1. Category.html : Lấy title để render. dựa trên ID
http://apiforlearning.zendvn.com/api/categories_news/1


2. ARTICLE DETAIL BY ID:
http://apiforlearning.zendvn.com/api/articles/1


3. Lấy danh sách bài viết dựa trên id category
http://apiforlearning.zendvn.com/api/categories_news/1/articles?


4. Render Menu Category List:
http://apiforlearning.zendvn.com/api/categories_news

*/

