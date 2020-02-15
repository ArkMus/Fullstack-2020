const blogs = require("../tests/testData")
const listHelper = require("../utils/list_helper")

describe('total likes', () => {
    
    test('Empty list returns zero', () => {
      const result = listHelper.totalLikes([])
      expect(result).toBe(0)
    })

    test('The right amount of likes is returned from one blog', () => {
        let list = [blogs[0]]
        const result = listHelper.totalLikes(list)
        expect(result).toBe(7)
    })

    test('The right amount of likes is returned from a list of blogs', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })

  })

  describe("favorite blog", () => {

    test('The favorite is returned with a list of one blog', () => {
        const result = listHelper.favoriteBlog([blogs[0]])
        expect(result).toEqual(blogs[0])
    })
    
    test('The favorite is returned with a list blogs', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[2])
    })

  })

  describe("most blogs", () => {
    test('The author with most blogs is returned', () => {
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
    })
  })
  
  describe("most likes", () => {
    test('The author with most likes is returned', () => {
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({author: "Edsger W. Dijkstra",likes: 17})
    })
  })