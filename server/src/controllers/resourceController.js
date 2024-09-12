import { getResources, createResource, updateResourceById, deleteResourceById } from "../repositories/resourceRepository.js";

export async function getResource(req, res) {
  const {lastSync = '2001-01-01T01:01:01.259Z'} = req.params;
  res.status(200).json({data: lastSync})

  try {
    const resource = await getResources(lastSync);
    res.status(200).json({data: resource});
  } catch (error) {
    res.status(500).json({message: error});
  }
}

export async function postResource(req, res) {
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

export async function putResource(req, res) {
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

export async function deleteResource(req, res) {
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