import { getResources, createResource, updateResourceById, deleteResourceById, getDeletedResources } from "../repositories/resourceRepository.js";

async function getResource(req, res) {
  const {lastSync = '2001-01-01T01:01:01.259Z'} = req.params;

  try {
    const resource = await getResources(lastSync);
    const deletedResources = await getDeletedResources(lastSync);

    res.status(200).json({data: resource, deletedData: deletedResources});
  } catch (error) {
    res.status(500).json({message: error});
  }
}

async function postResource(req, res) {
  try {
    const created = await createResource(req.body);

    if(created) {
      res.status(201).json({message: "Resource created"});
    } else {
      res.status(400).json({message: "Resource already exists"});
    }
  } catch (error) {
    res.status(500).json({message: error});
  }
}

async function putResource(req, res) {
  const { id } = req.params;

  try {
    const updated = await updateResourceById(id, req.body);

    if(updated) {
      res.status(200).json({message: "Resource updated"});
    } else {
      res.status(400).json({message: "Resource does not exist"});
    }
  } catch (error) {
    res.status(500).json({message: error});
  }
}

async function deleteResource(req, res) {
  const { id } = req.params;

  try {
    const deleted = await deleteResourceById(parseInt(id));

    if(deleted) {
      res.status(200).json({message: "Resource deleted"});
    } else {
      res.status(400).json({message: "Resource does not exist"});
    }
  } catch (error) {
    res.status(500).json({message: error});
  }
}

export {getResource, postResource, putResource, deleteResource}