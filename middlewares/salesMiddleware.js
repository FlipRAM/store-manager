const checkId = (req, res, next) => {
  const arraySale = req.body;

  const response = arraySale.some((element) => element.productId === undefined);

  if (response) return res.status(400).json({ message: '"productId" is required' });

  next();
};

const checkQuant = (req, res, next) => {
  const arraySale = req.body;

  const responseIfExist = arraySale.some((element) => element.quantity === undefined);
  if (responseIfExist) return res.status(400).json({ message: '"quantity" is required' });

  const responseIfGreater = arraySale.some((element) => element.quantity <= 0);
  if (responseIfGreater) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = {
  checkId,
  checkQuant,
};