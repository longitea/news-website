// Ứng dụng Object trong JS

/**
     Điểm chung:
         1. Hàm -> callAjax
             - gọi api bằng ajax
         2. truyền params 
             - API_URL, data_ofset
             - vị trí cần render trong DOM
         3. Funtion Custom dữ liệu lấy từ API
  */

const articleService = {
    getArticle(query, data = "data") {
        $.ajax({
            type: "GET",
            url: query,
            data: data,
            dataType: "JSON",
            success: res => {
                return res
            }

        });
    }
}

export default articleService
