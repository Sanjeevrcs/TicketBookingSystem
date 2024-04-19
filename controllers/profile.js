export const profile = async (req,res) => {
    const user = req.user;
    const {name, email, phoneNumber, gender, dob} = user
    return res.status(200).send({
        name,
        email,
        phoneNumber,
        gender,
        dob
    })
}