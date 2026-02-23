require('dotenv').config()


const { countPostsByUser, averagePostsPerUser } = require('./concepts/aggregation');
const {createUsersTable, insertUsersTable, fetchAllUsers, updateUserInfo, deleteUser} = require('./concepts/basic-queries');
const { getUsersWhere, getSortedUsers, getPaginatedUsers } = require('./concepts/filtering-sorting');
const { getUsersWithPosts, getAllUsersAndTheirPosts } = require('./concepts/joins');
const { createPostsTable, insertNewPost } = require('./concepts/relationships');

//test basic queries
async function testBasicQueries(){
    try {
        await createUsersTable();
        
        //Insert new users
        await insertUsersTable('John doe', 'johndoe@gmail.com')
        await insertUsersTable('John doe1', 'johndoe1@gmail.com')
        await insertUsersTable('John doe2', 'johndoe2@gmail.com')
        await insertUsersTable('John doe3', 'johndoe3@gmail.com')
        await insertUsersTable('John doe4 ', 'johndoe4@gmail.com')
        console.log("All users")
        const allUsers = await fetchAllUsers()
        console.log(allUsers)

        console.log("Update Users")
        const updateUser = await updateUserInfo('John doe1', 'johndoe11@gmail.com')
        console.log(updateUser)

        const updatedUser = await updateUserInfo('John doe', 'JohnDoeee@gmail.com')
        console.log(updatedUser)

        const deletedUser = await deleteUser('John doe')
        console.log(deletedUser)
    } catch (error) {
        console.error('Error ', error)
    }
}

async function testFilterAndSortQueries(){
    try {
        // await insertUsersTable("Zxy Maafaf", "zxyaljfmalik@gmail.com")

        //get users with a username whose username starts with z
        // const zFilteredUsers = await getUsersWhere("username LIKE 'Z%'")
        // console.log(zFilteredUsers)

        // const sortedUsers = await getSortedUsers('created_at', 'ASC')
        // console.log(sortedUsers)

         const paginatedUsers = await getPaginatedUsers(2,1) //give me data in two's and skip the 'second argument' position 
         console.log(paginatedUsers)
    } catch (error) {
        console.log("Error ", error)
    }
}

async function testRelationshipQueries(){
    try {
        // await createPostsTable()
        // await insertNewPost('second post', 'This is my second post', 3)
        // await insertNewPost('third post', 'This is my third post', 4)
    } catch (error) {
        console.log('Error', error)
    }
}

async function testJoinQueries(){
    try {
        // const usersWithPosts = await getUsersWithPosts()
        // console.log(usersWithPosts)

        const allUsersAndTheirPosts = await getAllUsersAndTheirPosts();
        console.log(allUsersAndTheirPosts)
    } catch (error) {
        console.log('Error', error)
    }
}

async function testAggregateQueries(){
    try {
        // const postCount = await countPostsByUser();
        // console.log(postCount)

        const averagePosts = await averagePostsPerUser();
        console.log(averagePosts)
    } catch (error) {
        console.log(error)
    }
}

async function testAllQueries(){
    // await testBasicQueries()
    // await testFilterAndSortQueries()
    // await testRelationshipQueries()
    // await testJoinQueries()
    await testAggregateQueries()
}

testAllQueries()