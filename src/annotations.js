const { getCollection } = require("./mongo");
const { ObjectId } = require("mongodb");

const verifyConnect = (collection) => {
    if (!collection) {
        throw new Error("A colleção Annotation não existe");
    }
}

const getAnnotationForId = async (id) => {
    const collection = getCollection();
    
    const annotation = await collection.find({ _id: new ObjectId(id) }).toArray();

    return annotation;
}

const getAllAnnotations = async (req, res) => {
    const collection = getCollection();
    verifyConnect(collection);

    const annotations = await collection.find({}).toArray();
    res.json(annotations);
}

const getForId = async (req, res) => {
    const { id } = req.params

    const collection = getCollection();
    verifyConnect(collection);

    const annotation = await collection.find({ _id: new ObjectId(id) }).toArray();
    res.json(annotation);
}

const create = async (req, res) => {
    const { title, content } = req.body;

    const collection = getCollection();
    verifyConnect(collection);

    const result = await collection.insertOne({title, content});
    const annotation = await collection.find({ _id: result.insertedId }).toArray();

    res.status(201).json(annotation);
}

const update = async (req, res) => {
    const { id } = req.params
    const { title, content } = req.body;

    const collection = getCollection();
    verifyConnect(collection);
    
    const updates = {};

    if (title) updates.title = title;
    if (content) updates.content = content;

    if (Object.keys(updates).length === 0)
        throw new Error("Sem campos de update.");
    
    verifyId(id)
    await collection.updateOne({ _id: new ObjectId(id)  }, { $set: updates });

    const annotation = getAnnotationForId();

    res.status(204).json(annotation)
}

const destroy = async (req, res) => {
    const { id } = req.params;

    const collection = getCollection();
    verifyConnect(collection);
    
    const annotation = getAnnotationForId();

    await collection.deleteOne({ _id: new ObjectId(id) });

    res.status(204).json(annotation)
}

const search = async (req, res) => {
    const { query } = req.body;

    const collection = getCollection();
    verifyConnect(collection);

    const annotations = await collection.find(
        { $text: { $search: query } }, 
        { score: { $meta: 'textScore'} 
    }).sort({ score: { $meta: 'textScore' } })

    console.log(annotations)

    res.json(annotations)
}

module.exports = { getAllAnnotations, getForId, create, update, destroy, search }