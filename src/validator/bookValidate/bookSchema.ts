import joi from "joi";

export const bookSchema = {
    bookValidate: joi.object({
        title: joi.string().required().min(2).max(100).required(),
        author: joi.string().min(2).max(200).required(),
        year: joi.number().integer().min(1).max(4),
        genre: joi.string().min(2).max(200).required()
    }).unknown(true)
}
