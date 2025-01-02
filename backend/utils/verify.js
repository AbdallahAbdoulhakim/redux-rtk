import { Types } from "mongoose";

export const verifyParams = (
  res,
  params,
  mandatoryParams = [],
  optionalParams = [],
  emptyAllowed = false,
  mutuallyExclusive = []
) => {
  const keys = Object.keys(params);

  if (!keys.length && !emptyAllowed) {
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

  if (mutuallyExclusive.length) {
    mutuallyExclusive.forEach((lev) => {
      if (lev.every((value, index, arr) => keys.includes(value))) {
        res.status(400);
        throw new Error(
          `Only one of these parameters must be presents, (${lev.join(", ")}).`
        );
      }
    });
  }

  return;
};

export const verifyBsonId = (res, payload) => {
  const id = Object.values(payload)[0];
  const key = Object.keys(payload)[0];

  const isValid = isNaN(id) && Types.ObjectId.isValid(id);

  if (!isValid) {
    res.status(400);
    throw new Error(
      `the query parameter provided (${key}) is not a valid BSON id.`
    );
  }

  return;
};
