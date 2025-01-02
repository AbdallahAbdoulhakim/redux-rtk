export const verifyParams = (
  res,
  params,
  mandatoryParams,
  optionalParams = []
) => {
  const keys = Object.keys(params);

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
};
