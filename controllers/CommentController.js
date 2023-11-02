import CommentModel from '../models/Comment.js'

export const getPostComments = async (req, res) => {
    try {
        const postId = req.params.postId
        const comments = await CommentModel.find({post: postId}).populate('user')

        res.json(comments)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить комментарии'
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new CommentModel({
            text: req.body.text,
            user: req.userId,
            post: req.body.postId
        })

        const comment = await doc.save()

        res.json(comment)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось создать комментарий'
        })
    }
}

export const remove = (req, res) => {

    const commentId = req.params.commentId

    CommentModel.findOneAndRemove({_id: commentId})
        .then(doc => {
            if (!doc) {
                return res.status(403).json({
                    message: 'Запрашиваемый комментарий не найден'
                })
            }

            res.json({
                success: true
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: 'Не удалось удалить комментарий'
            })
        })
}

export const update = (req, res) => {

    const commentId = req.params.commentId

    CommentModel.findOneAndUpdate(
        {_id: commentId},
        req.body,
        {new: true}
    ).then(doc => {
        if (!doc) {
            return res.status(403).json({
                message: 'Запрашиваемый комментарий не найден'
            })
        }

        res.json({
            success: true
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось удалить комментарий'
        })
    })
}