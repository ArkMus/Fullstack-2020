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
        if (element.likes > favorite.likes) {
            favorite = element
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    let mostBlogger = {
        author: "",
        blogs: 0
    }
    let bloggerMap = new Map()
    blogs.forEach(e => {
        if (bloggerMap.has(e.author)) {
            let count = bloggerMap.get(e.author)
            count++
            bloggerMap.set(e.author, count)
        } else {
            bloggerMap.set(e.author, 1)
        }
        if (bloggerMap.get(e.author) > mostBlogger.blogs) {
            mostBlogger.author = e.author
            mostBlogger.blogs = bloggerMap.get(e.author)
        }
    })
    if (mostBlogger.author === "") {
        return null
    } else {
        return mostBlogger
    }
}

const mostLikes = (blogs) => {
    let mostLiker = {
        author: "",
        likes: 0
    }
    let bloggerMap = new Map()
    blogs.forEach(e => {
        if (bloggerMap.has(e.author)) {
            let count = bloggerMap.get(e.author)
            count += e.likes
            bloggerMap.set(e.author, count)
        } else {
            bloggerMap.set(e.author, e.likes)
        }
        if (bloggerMap.get(e.author) > mostLiker.likes) {
            mostLiker.author = e.author
            mostLiker.likes = bloggerMap.get(e.author)
        }
    })
    if (mostLiker.author === "") {
        return null
    } else {
        return mostLiker
    }
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}