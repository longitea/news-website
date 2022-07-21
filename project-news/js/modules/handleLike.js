export default function handleLike(){
    let arrayLiked = JSON.parse(localStorage.getItem("articlesLiked")) || []
    
    $(document).on('click', '.btn-like', function (event) {
        console.log(arrayLiked);
        const img = $(event.target)
        // lưu vào json -> convert sang string
        const id = parseInt(img.attr('id'))
        if (img.attr('src') === 'assets/img/icons/heart/black_heart.jpg') {
            img.attr('src', "assets/img/icons/heart/red_heart.jpg")
            arrayLiked.push(id)

        } else {
            img.attr('src', "assets/img/icons/heart/black_heart.jpg")
            // trả về 1 cái mảng mới khác với id của bài viết được click vào
            arrayLiked = arrayLiked.filter(element => element != id)
        }

        localStorage.setItem('articlesLiked', JSON.stringify(arrayLiked))
    });
    
}