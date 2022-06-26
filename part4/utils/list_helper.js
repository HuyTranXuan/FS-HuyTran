const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    let total = 0
    blogs.forEach(blog => {
        total += blog.likes
    });
    return total
}

const favoriteBlog = (blogs) => {
    let top = blogs[0]
    blogs.forEach(blog => {
        if(blog.likes > top.likes) top = blog 
    });
    return blogs.length === 0? 0: top
}

  module.exports = {
    dummy,totalLikes,favoriteBlog
  }