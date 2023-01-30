const { getCollection } = require("./mongo");
const { ObjectID } = require('mongodb');

const getAllAnnotations = async (req, res) => {
    const collection = getCollection();
    const annotations = await collection.find({}).toArray();
    res.json(annotations);
}

const create = async (req, res) => {
    const { title, content } = req.body;

    const collection = getCollection();

    const result = await collection.insertOne({title, content});
    const annotation = await collection.find({ _id: result.insertedId }).toArray();

    res.status(201).json(annotation);
}

const update = async (req, res) => {
    const { _id } = req.params
    const { title, content } = req.body;

    const collection = getCollection();

    const updates = {};

    if (title) updates.title = title;
    if (content) updates.content = content;

    if (Object.keys(updates).length === 0)
      throw new Error("Sem campos de update.");

    await collection.updateOne({ _id }, { $set: updates });
    const annotation = await collection.find({ _id }).toArray();

    res.status(201).json(annotation)
}

const destroy = async (req, res) => {
    const { _id } = req.params

    const collection = getCollection();
  
    const deleteResult = await collection.deleteOne({ _id })

    res.json(204).json(deleteResult)
}

module.exports = { getAllAnnotations, create, update, destroy }