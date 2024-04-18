import PostModal from '../models/post.js'

export const getTagByName = async (req, res) => {
    const tagName = req.params.nameTag; // Получаем имя тега из запроса

    try {
        // Ищем посты с тегом, совпадающим с именем
        const postsWithTag = await PostModal.find({ tags: tagName });

        // Если найдены посты, отправляем только их теги
        if (postsWithTag.length > 0) {
            const tags = postsWithTag.map(post => post.tags).flat();
            res.json(tags);
        } else {
            res.status(404).json({ message: 'Тег не найден' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не удалось получить тэги' });
    }
}
export const getLastTags = async (req, res) => {
    try {

        const posts = await PostModal
            .find()
            .limit(5)
            .exec();

        const tags = posts
            .map((obj) => obj.tags)
            .flat()
            .slice(0, 5);


        res.json(tags);
    }
    catch (err) {

        console.log(err);
        res.status(500).json({ meassage: 'Не удалось  получить тэги' })

    }
}
export const getAll = async (req, res) => {

    try {

        const posts = await PostModal.find().populate('user').exec();
        res.json(posts);

    }
    catch (err) {

        console.log(err);
        res.status(500).json({ meassage: 'Не удалось  получить статьи' })

    }
}
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await PostModal.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' }
        ).populate('user');

        if (!doc) {
            return res.status(404).json({ message: 'Статья не найдена' });
        }

        res.json(doc);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не удалось получить статью' });
    }
}
export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        const doc = await PostModal.findOneAndDelete({ _id: postId });

        if (!doc) {
            return res.status(404).json({ message: 'Статья не найдена' });
        }

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не удалось удалить статью' });
    }
}
export const create = async (req, res) => {
    try {
        const doc = new PostModal({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        })

        const post = await doc.save();

        res.json(post)
    } catch (err) {

        console.log(err);
        res.status(500).json({ meassage: 'Не удалось  создать статью' })

    }
}
export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModal.updateOne(
            { _id: postId },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags,
            }
        );

        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не удалось обновить статью' });
    }
}
