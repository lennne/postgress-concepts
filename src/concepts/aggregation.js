const db = require('../database/db')

//group by

// count
// count the number of rows that match
async function countPostsByUser(){
    const countPostsByUserQuery =  `
    SELECT users.username, COUNT(posts.id) as post_count
    FROM users
    LEFT JOIN posts ON users.id = posts.user_id
    GROUP BY users.id, users.username
    `;

    try {
        const result = await db.query(countPostsByUserQuery)
        //console.log
        // [
        //   { username: 'Zayn Malik', post_count: '0' },
        //   { username: 'John doe2', post_count: '2' },
        //   { username: 'John doe4 ', post_count: '0' },
        //   { username: 'John doe3', post_count: '1' },
        //   { username: 'Zxy Maafaf', post_count: '0' },
        //   { username: 'John doe1', post_count: '0' }
        // ]
        return result.rows;
    } catch (error) {
        console.log(error)
    }
}

// total posts / number of users
async function averagePostsPerUser(){
    try {
        const averagePostsPerUserQuery = `
        SELECT AVG(post_count) as average_posts
        FROM(
        SELECT COUNT(posts.id) as post_count
        FROM users
        LEFT JOIN posts ON users.id = posts.user_id
        GROUP BY users.id
        ) as user_per_counts
        `

        try {
        const result = await db.query(averagePostsPerUserQuery)
          
        return result.rows;
    } catch (error) {
        console.log(error)
    }
    } catch (error) {
        console.error(error)
    }
}

module.exports = { countPostsByUser, averagePostsPerUser }