import PostModel from '../models/Post.js'

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts.map(obj => obj.tags).flat().slice(0, 5)

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
        const posts = await PostModel.find().populate('user').exec()
        res.json(posts)
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

export const remove = (req, res) => {

    const postId = req.params.id

    PostModel.findOneAndRemove(
        {_id: postId}
    ).then(doc => {
        if (!doc) {
            return res.status(403).json({
                message: 'Запрашиваемая статья не найдена'
            })
        }

        res.json({
            success: true
        })
    }).catch(err => {
        console.log(err)
        return res.status(500).json({
            message: 'Не удалось удалить статью'
        })
    })

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