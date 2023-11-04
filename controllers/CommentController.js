import CommentModel from '../models/Comment.js'
import PostModel from '../models/Post.js'

export const getPostComments = async (req, res) => {
    try {
        const postId = req.params.postId
        const comments = await CommentModel.find({post: postId}).populate('user').exec()

        comments.sort((a, b) => b.createdAt.toISOString().localeCompare(a.createdAt.toISOString()))

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
        const postId = req.params.postId

        const doc = new CommentModel({
            text: req.body.text,
            user: req.userId,
            post: postId
        })

        const comment = await doc.save()

        const incrementComments = await PostModel.updateOne({_id: postId}, {$inc : { commentsAmount: 1 }})
        if (!incrementComments) {
            res.status(500).json({
                message: 'Не удалось инкрементировать число комментариев'
            })
        }

        const comm = await CommentModel.findOne({_id: comment._id}).populate('user').exec()

        res.json(comm)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось создать комментарий'
        })
    }
}

export const remove = async (req, res) => {
    try {
        const commentId = req.params.commentId

        const removing = await CommentModel.findOneAndRemove({_id: commentId}).exec()
        if (!removing) {
            return res.status(403).json({
                message: 'Запрашиваемый комментарий не найден'
            })
        }

        const postId = removing.post

        const decrementComments = await PostModel.updateOne({_id: postId}, {$inc : { commentsAmount: -1 }})
        if (!decrementComments) {
            res.status(500).json({
                message: 'Не удалось декрементировать число комментариев'
            })
        }

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось удалить комментарий'
        })
    }
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

export const getLastComments = async (req, res) => {
    try {
        const comments = await CommentModel.find().populate('user').exec()

        const result = comments.sort((a, b) => b.createdAt.toISOString().localeCompare(a.createdAt.toISOString())).slice(0, 5)

        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить комментарии'
        })
    }
}