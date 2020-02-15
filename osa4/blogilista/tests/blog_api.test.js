
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const testData = require('./testData')

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjects = helper.initialBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.length).toBe(testData.length)
    })

    test('blogs have parameter id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })

    describe('addition of a new blog', () => {
        test('New blog is added', async () => {
            const oldResponse = await api.get('/api/blogs')

            const newBlog = {
                _id: "5b422bb71b54b676234d17f8",
                title: "Yle",
                author: "Markus",
                url: "http://www.yle.fi",
                likes: 11,
                __v: 0
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')
            expect(response.body.length).toBe(oldResponse.body.length + 1)

        })

        test('If likes is not defined, it is setted to zero', async () => {
            const newBlog = {
                _id: "5b422bb71b54b676234d17f8",
                title: "Yle",
                author: "Markus",
                url: "http://www.yle.fi",
                __v: 0
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')
            expect(response.body[6].likes).toBe(0)

        })

        test('If fields url and title is not defined, return status 400 Bad request', async () => {
            const newBlog = {
                _id: "5b422bb71b54b676234d17f8",
                author: "Markus",
                likes: 11,
                __v: 0
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)

        })
        describe('deletion of a new blog', () => {
            test('succeeds with status code 204 if id is valid', async () => {
                const blogsAtStart = await helper.blogsInDb()
                const blogToDelete = blogsAtStart[0]

                await api
                    .delete(`/api/blogs/${blogToDelete.id}`)
                    .expect(204)

                const blogsAtEnd = await helper.blogsInDb()

                expect(blogsAtEnd.length).toBe(
                    helper.initialBlogs.length - 1
                )

                const contents = blogsAtEnd.map(r => r.title)

                expect(contents).not.toContain(blogToDelete.title)
            })
        })

    })

})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'sekret' })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'arkmus',
            name: 'Markus',
            password: 'secret',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username is to short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'a',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('username: Path `username` (`a`) is shorter than the minimum allowed length (3)')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
    
    test('creation fails with proper statuscode and message if password is to short', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'arkmus',
            name: 'Superuser',
            password: 'a',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('Password needs to be at least 3 characters')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})