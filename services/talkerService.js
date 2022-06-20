const fs = require('fs').promises;

async function readTalkers() {
  try {
    const content = await fs.readFile('talker.json', 'utf-8');
    const response = JSON.parse(content);
    return response;
  } catch (err) {
    console.log(err);
  }
}

async function writeTalkers(data) {
  const convertedData = JSON.stringify(data);
  try {
    await fs.writeFile('talker.json', convertedData, { flag: 'w', encoding: 'utf-8' });
  } catch (err) {
    console.log(err);
  }
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

const addTalker = async (req, res, _next) => {
  const { name, age, talk } = req.body;
  const talkers = await readTalkers();
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk: {
      watchedAt: talk.watchedAt,
      rate: talk.rate,
    },
  };
  talkers.push(newTalker);
  await writeTalkers(talkers);
  return res.status(201).json(newTalker);
};

const updateTalker = async (req, res, _next) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await readTalkers();
  const oldTalker = talkers.find((talker) => talker.id === parseInt(id, 10));
  const newTalker = {
    id: parseInt(id, 10),
    name,
    age,
    talk,
  };
  const index = talkers.indexOf(oldTalker);
  talkers[index] = newTalker;
  await writeTalkers(talkers);
  return res.status(200).json(newTalker);
};

const deleteTalker = async (req, res, _next) => {
  const { id } = req.params;
  const talkers = await readTalkers();
  const match = talkers.find((talker) => talker.id === parseInt(id, 10));
  const index = talkers.indexOf(match);
  talkers.splice(index, 1);
  await writeTalkers(talkers);
  return res.status(204).json();
};

const getByName = async (req, res, _next) => {
  const { q } = req.query;
  const talkers = await readTalkers();
  const matches = talkers.filter((talker) => talker.name.includes(q));

  if (!q) return res.status(200).json(talkers);
  if (!matches) return res.status(200).json([]);
  return res.status(200).json(matches);
};

module.exports = {
  getTalkers,
  getTalkerId,
  addTalker,
  updateTalker,
  deleteTalker,
  getByName,
};