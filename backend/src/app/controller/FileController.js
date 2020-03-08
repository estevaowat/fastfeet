import File from '../models/File';

class FileController {
  async show(req, res) {
    const { id } = req.params;
    const file = await File.findByPk(id);

    return res.json(file);
  }

  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const { id, url } = await File.create({
      name,
      path,
    });

    return res.json({ id, name, path, url });
  }

  async update(req, res) {
    const { id } = req.params;

    const file = await File.findByPk(id);
    const { originalname: name, filename: path } = req.file;

    await file.update({
      name,
      path,
    });

    return res.json({ id, name, path, url: file.url });
  }
}

export default new FileController();
