const runCode = (code: string, variables: any): any => {
  // eslint-disable-next-line no-eval
  const customFunction = eval(`(${code})`);

  return customFunction(variables);
};

export default runCode;
