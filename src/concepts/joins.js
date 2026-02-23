const db = require('../database/db')


// joins are used to combine rows from different 
// tables based on the relation column between them

//inner join
//retrieve users along with their posts
// but you realise that users is a different table and posts is a different table
// so the inner join will return only the rows where there is a match in both tables
// "on cclause" specifies certain conditions to understand
//  how it'll provide only those users who have created posts
// so the posts table has a column(attribute) called user_id and users has id
// so if you find a row where the posts attribute user_id matches the users id then return it
async function getUsersWithPosts(){
    const getUsersWithPostsQuery = `
    SELECT users.id, users.username, posts.title
    FROM users
    INNER JOIN posts ON users.id = posts.user_id
    `

    try {
        const result = await db.query(getUsersWithPostsQuery)
        // { id: 3, username: 'John doe2', title: 'First post' }

        return result.rows[0];
    } catch (error) {
        console.error('Error', error)
    }
}


//left join
//checks all the values in the left table and checks if they 
// have associated values in the right table
async function getAllUsersAndTheirPosts(){
    const getAllUsersAndTheirPostsQuery = `
    SELECT users.id, users.username, posts.title
    FROM users
    LEFT JOIN posts ON users.id = posts.user_id
    `;

    try {
        const result = await db.query(getAllUsersAndTheirPostsQuery)
        
        return result.rows;
    } catch (error) {
        console.error('Error', error)
    }
}


module.exports = { getUsersWithPosts, getAllUsersAndTheirPosts }