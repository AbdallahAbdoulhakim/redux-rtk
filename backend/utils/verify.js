import { Types } from "mongoose";

export const verifyParams = (
  res,
  params,
  mandatoryParams,
  optionalParams = []
) => {
  const keys = Object.keys(params);

  if (!keys.length) {
    res.status(400);
    throw new Error(`Bad request, no parameters provided!`);
  }

  const missingParameters = mandatoryParams.reduce(
    (prev, curr) => (keys.includes(curr) ? prev : [...prev, curr]),
    []
  );

  if (missingParameters.length) {
    res.status(400);
    throw new Error(
      `Bad request, missing mandatory parameter${
        missingParameters.length === 1 ? "" : "s"
      } ${missingParameters.join(", ")}.`
    );
  }

  const invalidParameters = keys.reduce(
    (prev, curr) =>
      [...mandatoryParams, ...optionalParams].includes(curr)
        ? prev
        : [...prev, curr],
    []
  );

  if (invalidParameters.length) {
    res.status(400);
    throw new Error(
      `Bad request, invalid parameter${
        invalidParameters.length === 1 ? "" : "s"
      } ${invalidParameters.join(", ")}.`
    );
  }

  return;
};

export const verifyBsonId = (res, id) => {
  const isValid = Types.ObjectId.isValid(id);

  if (!isValid) {
    res.status(400);
    throw new Error("the query parameter provided is not a valid BSON id.");
  }

  return;
};
