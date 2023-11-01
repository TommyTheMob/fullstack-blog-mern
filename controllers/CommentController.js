import CommentModel from '../models/Comment.js'

export const getPostComments = async (req, res) => {
    try {
        const comments = await CommentModel.find({post: req.body.postId})

        res.json(comments)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить комментарии'
        })
    }
}

export const create = async (req, res) => {}