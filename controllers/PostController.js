import PostModel from '../models/Post.js'
import CommentModel from '../models/Comment.js'

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().exec()

        const sorted = posts.sort((a, b) => b.createdAt.toISOString().localeCompare(a.createdAt.toISOString())).slice(0, 5)

        const tags = sorted.map(obj => obj.tags).flat().slice(0, 5)

        res.json(tags)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить тэги'
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const sortType = req.params.sortType

        const posts = await PostModel.find().populate('user').exec()

        let result
        switch (sortType) {
            case 'new':
                result = posts.sort((a, b) => b.createdAt.toISOString().localeCompare(a.createdAt.toISOString()))
                break
            case 'pop':
                result = posts.sort((a, b) => {
                    if (a.viewsCount === b.viewsCount) {
                        return b.createdAt.toISOString().localeCompare(a.createdAt.toISOString())
                    }
                    return b.viewsCount - a.viewsCount
                })
                break
            default:
                const tag = sortType
                result = posts.filter(post => post.tags.includes(tag)).sort((a, b) => b.createdAt.toISOString().localeCompare(a.createdAt.toISOString()))
                break
        }

        res.json(result)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось получить статьи'
        })
    }
}

export const getOne = (req, res) => {

    const postId = req.params.id

    PostModel.findOneAndUpdate(
        {_id: postId},
        {
            $inc: {viewsCount: 1}
        },
        {returnDocument: 'after'}
    ).populate('user').then((doc) => {
        if (!doc) {
            return res.status(403).json({
                message: 'Запрашиваемая статья не найдена'
            })
        }

        res.json(doc)
    }).catch((err) => {
        console.log(err)
        return res.status(500).json({
            message: 'Не удалось получить статью'
        })

    })
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        const removingPost = await PostModel.findOneAndRemove({_id: postId})
        if (!removingPost) {
            res.status(403).json({ message: 'Статья не найдена' })
        }

        const removingPostComments = await CommentModel.deleteMany({ post: postId })
        if (!removingPostComments) {
            res.status(204).json({ message: 'Нет комментариев' })
        }

        res.json({ success: 'true' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Не удалось удалить статью'
        })
    }

    // const postId = req.params.id
    //
    // PostModel.findOneAndRemove(
    //     {_id: postId}
    // ).then(doc => {
    //     if (!doc) {
    //         return res.status(403).json({
    //             message: 'Запрашиваемая статья не найдена'
    //         })
    //     }
    //
    //     res.json({
    //         success: true
    //     })
    // }).catch(err => {
    //     console.log(err)
    //     return res.status(500).json({
    //         message: 'Не удалось удалить статью'
    //     })
    // })

}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
            user: req.userId
        })

        const post = await doc.save()

        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось создать статью'
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        await PostModel.updateOne(
            {_id: postId},
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                imageUrl: req.body.imageUrl,
                user: req.userId
            }
        )

        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось обновить статью'
        })
    }

}