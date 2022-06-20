const fs = require('fs').promises;

async function readTalkers() {
  const content = await fs.readFile('talker.json', 'utf-8');
  const response = JSON.parse(content);
  return response;
}

const getTalkers = async (req, res, _next) => {
  const talkers = await readTalkers();
  if (talkers.length === 0) return res.status(200).json([]);
  if (talkers.length > 0) return res.status(200).json(talkers);
};

const getTalkerId = async (req, res, _next) => {
  const talkers = await readTalkers();
  const { id } = req.params;
  const match = talkers.find((talker) => talker.id === parseInt(id, 10));
  if (!match) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  if (match) return res.status(200).json(match);
};

module.exports = {
  getTalkers,
  getTalkerId,
};