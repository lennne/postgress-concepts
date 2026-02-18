const db = require('../database/db')

//WHERE
//filter the users bassed on a specific condition

async function getUsersWhere(condition){
    const getUsersQuery = `
    SELECT * FROM users
    WHERE ${condition}
    `

    try {
        const result = await db.query(getUsersQuery)
        return result.rows;
    } catch (error) {
        console.error("Error", error)
    }
}

//SORT
//sort users according to some column
async function getSortedUsers(column, order="ASC"){
    const sortUsersQuery = `
    SELECT * FROM users
    ORDER BY ${column} ${order}
    `

    try {
        const result = await db.query(sortUsersQuery);

        return result.rows;
    } catch (error) {
        console.error("Error", error)
    }
}

//LIMIT
async function getPaginatedUsers(limit, offset){
    const getPaginatedQuery = `
    SELECT * FROM users
    LIMIT $1 OFFSET $2
    `

    try{
        const result = await db.query(getPaginatedQuery, [limit, offset])

        return result.rows;
    }catch(error){
        console.error("Error", error)
    }
}


module.exports = { getUsersWhere, getSortedUsers, getPaginatedUsers }