import userModels from '../models/users.models.js'

const usersController = {}

usersController.getUsers = async (req, res) => {
    const users = await userModels.find()
    res.json(users)
}

usersController.postUser = async (req, res) => {
    const {userName, email, password} = req.body
    const newUser = new userModels({
        userName: userName,
        email: email,
        password: password
    })

    await newUser.save()
    res.status(200).json({message: "Created user"})
}

export default usersController