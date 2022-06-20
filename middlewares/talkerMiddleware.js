const nameMiddleware = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "O campo \"name\" é obrigatório" });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: "O \"name\" deve ter pelo menos 3 caracteres" });
  }

  next();
};

const ageMiddleware = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: "O campo \"age\" é obrigatório" });
  }
  if (age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const talkMiddleware = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk) {
    return res.status(400).json({ message: "O campo \"talk\" é obrigatório" });
  }
  if (!talk.watchedAt) {
    return res.status(400).json({ message: "O campo \"watchedAt\" é obrigatório" });
  } if (!talk.rate && typeof talk.rate !== 'number') {
    return res.status(400).json({ message: "O campo \"rate\" é obrigatório" });
  }
  
  next();
};

const ifTalk = (req, res, next) => {
  const { talk } = req.body;
  const dateRegex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;

  if (!dateRegex.test(talk.watchedAt)) {
    return res.status(400).json({
      message: "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
    });
  } if (parseInt(talk.rate, 10) < 1 || parseInt(talk.rate, 10) > 5) {
    return res.status(400).json({ message: "O campo \"rate\" deve ser um inteiro de 1 à 5" });
  }

  next();
};

module.exports = {
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  ifTalk,
};