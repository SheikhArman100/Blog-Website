import logger from "../utils/logger.js";

export const zodValidation = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    const errorMessage=error.issues.map(error=>error.message)
    logger.error(`${errorMessage}  happens in ${schema}`);
    return res.status(400).json({ message: errorMessage});
  }
};

