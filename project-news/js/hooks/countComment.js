export default function countComment(idArticle) {
    const commentAll = JSON.parse(localStorage.getItem("comments")) || []
    let count = 2

    commentAll.filter(comment => {
        if(comment.id == idArticle){
            count += 1
        }
    })
    
    return count
}