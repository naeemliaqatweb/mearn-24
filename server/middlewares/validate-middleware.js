

const validate = (schema) => async (req , res , next) => {

    try {
        const parsBody = await schema.parseAsync(req.body);
        req.body = parsBody;
        next();
    } catch (err) {
        console.log(err);
        const status = 422;
        const message = "Fill the input properly";
        const extraDetails = err.errors[0].message;
        const errors = {
            status,
            message,
            extraDetails
        }
        // return res.status(400).json({mesg : message});
        next(errors);
    }
}

module.exports = validate;