
export const validate = (schema) => async (req, res, next) => {    
    try {
        await schema.validate({
            params: req.params,
            query: req.query,
            body: req.body
        });
        return next();
    } catch (err: any) {
        return res.status(400).json({ type: err.name, message: err.message });
    }
};