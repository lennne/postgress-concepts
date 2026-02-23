const db = require('../database/db')
// we want a foreign post table that will reference the user table
// example one user can create multiple posts
// now say an admin needs to group all the posts created by a specific user

//Serial means it'll automatically generate a unique integer for each row
//user_id -> everytime a post gets created we capture the user_id of the user
// REFERENCES -> basically we specify the table which contains the values we're referring to
// ON DELETE CASCADE -> this means that if user 1, has 5 posts, when we delete user 1,
// all of user 1's posts get deleted automatically(all of user 1s data gets deleted)
async function createPostsTable (){
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS posts(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
    `

    try {
        const result = await db.query(createTableQuery)
        console.log('Posts table created successfully')

        return result.rows;
    } catch (error) {
        console.error('Error', error)
    }
}

//you can't pass a userId
async function insertNewPost(title, content, userId){
    const insertPostQuery = `
    INSERT into posts (title, content, user_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `

    try{
        const result = await db.query(insertPostQuery, [title, content, userId])

        return result.rows[0];
    }catch(error){
        console.error('Error',error)
    }
}

module.exports = { createPostsTable, insertNewPost }