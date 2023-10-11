// criei essa função para evitar os erros de compilação no TypeScript relacionados ao tipo de inProgress quando ele é undefined
// isso estava atrapalhando o matchService, pois o TypeScript não deixa eu passar undefined para o método getMatchesInProgress
const isInProgress = (inProgress: unknown) => {
  switch (inProgress) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return undefined;
  }
};

export default isInProgress;
