export const profile = async (req,res) => {
    const user = req.user;
    const {name, email, phoneNumber, gender, dob} = user
    res.status(200).send({
        name,
        email,
        phoneNumber,
        gender,
        dob
    })
}