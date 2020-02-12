const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(element => {
        total += element.likes
    })
    return total
}

const favoriteBlog = (blogs) => {
    let favorite = blogs[0]
    blogs.forEach(element => {
        if(element.likes > favorite.likes){
            favorite = element
        }
    })
    return favorite
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}