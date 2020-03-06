import File from '../models/File';

class FileController {
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
    file.name = name;
    file.path = path;

    await file.update();

    return res.json({ id, name, path, url: file.url });
  }
}

export default new FileController();
