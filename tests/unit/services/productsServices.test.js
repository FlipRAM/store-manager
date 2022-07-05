const sinon = require('sinon');
const { expect } = require('chai');

const prodModel = require('../../../models/productsModels');
const prodServ = require('../../../services/productsServices');

describe('Gets all products', () => {
  const data = [
    {id:1,name:'Martelo de Thor'},
    {id:2,name:'Traje de encolhimento'},
    {id:3,name:'Escudo do Capitão América'},
  ]

  before(async () => {
    sinon.stub(prodModel, 'getAll').resolves(data);
  });

  after(async () => {
    prodModel.getAll.restore();
  });

  describe('with success', () => {
    it('returns a list', async () => {
      const response = await prodServ.getAll();

      expect(response).to.be.an('array');
    })

    it('returns the correct answer', async () => {
      const response = await prodServ.getAll();

      expect(response).to.deep.equal(data)
    })
  })
});

describe('Gets the correct element with the id', () => {
  const data = { id: 2, name: 'Traje de encolhimento' };

  before(async () => {
    sinon.stub(prodModel, 'getById').resolves(data);
  });

  after(async () => {
    prodModel.getById.restore();
  });
  
  describe('with success', () => {
    it('returns an object', async () => {
      const response = await prodServ.getById(data.id);

      expect(response).to.be.an('object');
    })

    it('returns the correct answer', async () => {
      const response = await prodServ.getById(data.id);

      expect(response).to.deep.equal(data);
    })
  })
});

describe('Add the element to products database', () => {
  const data = { id: 4, name: 'Cinto de utilidades' };
  
  before(async () => {
    sinon.stub(prodModel, 'add').resolves(data);
  });

  after(async () => {
    prodModel.add.restore();
  });
  
  describe('with success', () => {
    it('returns an object', async () => {
      const response = await prodServ.add(data.name);

      expect(response).to.be.an('object');
    })

    it('returns the correct answer', async () => {
      const response = await prodServ.add(data.name);

      expect(response).to.deep.equal(data);
    })
  })
});

describe('Updates an element in products database', () => {
  const data = { id: 2, name: 'Cinto de utilidades' };

  before(async () => {
    sinon.stub(prodModel, 'update').resolves(data);
  });

  after(async () => {
    prodModel.update.restore();
  });
  
  describe('with success', () => {
    it('returns an object', async () => {
      const response = await prodServ.update(2, 'Cinto de utilidades');

      expect(response).to.be.an('object');
    })

    it('returns the correct answer', async () => {
      const response = await prodServ.update(2, 'Cinto de utilidades');

      expect(response).to.deep.equal(data);
    })
  })
});

describe('Deletes the product from database', () => {
  const data = true;

  before(async () => {
    sinon.stub(prodModel, 'deleteProd').resolves(true);
  });

  after(async () => {
    prodModel.deleteProd.restore();
  });
  
  describe('with success', () => {
    it('returns true', async () => {
      const response = await prodServ.deleteProd(3);

      expect(response).to.be.true;
    })
  })
});

describe('Gets the element with name', () => {
  const data = [{ id: 1, name: 'Martelo de Thor' }];

  before(async () => {
    sinon.stub(prodModel, 'getByName').resolves(data);
  });

  after(async () => {
    prodModel.getByName.restore();
  });
  
  describe('with success', () => {
    it('returns an array', async () => {
      const response = await prodServ.getByName('Martelo');

      expect(response).to.be.an('array');
    })

    it('returns the correct array', async () => {
      const response = await prodServ.getByName(3);

      expect(response).to.deep.equal(data);
    })
  })
});