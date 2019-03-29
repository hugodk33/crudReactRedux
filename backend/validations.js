const fs = require("fs");
const path = require("path");
const REQUIRED_FIELDS = ["name"];

const getDB = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, "db.json"), (err, data) => {
      try {
        resolve(JSON.parse(data.toString()));
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  });
};

const getNextId = () => {
  return getDB().then(db => db.categories[db.categories.length - 1].id + 1);
};

const getById = id => {
  return getDB().then(db => {
    const categoriesFound = db.categories.filter(
      category => category.id === id
    );
    return categoriesFound.length ? categoriesFound[0] : null;
  });
};

const validateRequiredFields = body => {
  return new Promise((resolve, reject) => {
    const inputKeys = Object.keys(body).map(key => key.toLowerCase());
    const requiredFieldViolations = REQUIRED_FIELDS.filter(
      requiredField => inputKeys.indexOf(requiredField) === -1
    );
    if (requiredFieldViolations.length)
      return reject({
        status: 422,
        message: `campo(s) ${requiredFieldViolations.join(", ")} obrigatório(s)`
      });
    return resolve();
  });
};

const validateParentId = body => {
  return new Promise((resolve, reject) => {
    if (!body.parentId) return resolve();
    getById(body.parentId).then(parent => {
      if (!parent)
        return reject({
          status: 422,
          message: `categoria ${body.parentId} não existe`
        });
      return resolve();
    });
  });
};

const validate = body => {
  return Promise.all([validateRequiredFields(body), validateParentId(body)]);
};

const deleteCategory = (req, res, next) => {
  const id = Number(path.basename(req.url));
  getById(id).then(category => {
    if (category) {
      res.locals.body = { id: category.id };
    }
    next();
  });
};

const updateCategory = (req, res, next) => {
  const id = Number(path.basename(req.url));
  getById(id).then(category => {
    if (category) {
      validate(req.body)
        .then(() => {
          req.body = {
            name: req.body.name,
            parentId: req.body.parentId || null
          };
          res.locals.body = Object.assign({ id: category.id }, req.body);
          next();
        })
        .catch(err => res.status(err.status).send(err.message));
    } else next();
  });
};

const createCategory = (req, res, next) => {
  if (path.basename(req.url) === "categories")
    Promise.all([validate(req.body), getNextId()])
      .then(([validation, nextId]) => {
        req.body = {
          name: req.body.name,
          parentId: req.body.parentId || null
        };
        res.locals.body = Object.assign(
          {
            id: nextId
          },
          req.body
        );
        next();
      })
      .catch(err => res.status(err.status).send(err.message));
  else next();
};

module.exports = (req, res, next) => {
  if (req.url.toLowerCase().startsWith("/categories")) {
    switch (req.method) {
      case "DELETE":
        deleteCategory(req, res, next);
        break;
      case "PUT":
        updateCategory(req, res, next);
        break;
      case "POST":
        createCategory(req, res, next);
        break;
      default:
        return next();
    }
  } else next();
};
