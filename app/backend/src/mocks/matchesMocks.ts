const listaDePartidasDBTotal = [
  {
    dataValues: {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: true,
      homeTeam: {
        teamName: 'São Paulo',
      },
      awayTeam: {
        teamName: 'Grêmio',
      },
    },
  },
  {
    dataValues: {
      id: 2,
      homeTeamId: 9,
      homeTeamGoals: 1,
      awayTeamId: 14,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: 'Internacional',
      },
      awayTeam: {
        teamName: 'Santos',
      },
    },
  },
  {
    dataValues:
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Corinthians',
    },
    awayTeam: {
      teamName: 'Napoli-SC',
    },
  },
  },
];

const listaDePartidasDBProgressFalse = [
  {
    dataValues: {
      id: 2,
      homeTeamId: 9,
      homeTeamGoals: 1,
      awayTeamId: 14,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: 'Internacional',
      },
      awayTeam: {
        teamName: 'Santos',
      },
    },
  },
  {
    dataValues:
    {
      id: 3,
      homeTeamId: 4,
      homeTeamGoals: 3,
      awayTeamId: 11,
      awayTeamGoals: 0,
      inProgress: false,
      homeTeam: {
        teamName: 'Corinthians',
      },
      awayTeam: {
        teamName: 'Napoli-SC',
      },
    },
  },
];

const listaDePartidasDBProgressTrue = [
  {
    dataValues: {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: true,
      homeTeam: {
        teamName: 'São Paulo',
      },
      awayTeam: {
        teamName: 'Grêmio',
      },
    },
  },
];

const listaDePartidasFindAll = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: true,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Internacional',
    },
    awayTeam: {
      teamName: 'Santos',
    },
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Corinthians',
    },
    awayTeam: {
      teamName: 'Napoli-SC',
    },
  },
];

const listaDePartidasInProgressFalse = [
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Internacional',
    },
    awayTeam: {
      teamName: 'Santos',
    },
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Corinthians',
    },
    awayTeam: {
      teamName: 'Napoli-SC',
    },
  },
];

const listaDePartidasInProgressTrue = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: true,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Grêmio',
    },
  },
];

const newMatchRetorno = {
  id: 50,
  homeTeamId: 9,
  homeTeamGoals: 0,
  awayTeamId: 14,
  awayTeamGoals: 1,
  inProgress: true,
};

const newMatchBody = {
  homeTeamId: 16,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export {
  listaDePartidasDBTotal,
  listaDePartidasDBProgressFalse,
  listaDePartidasDBProgressTrue,
  listaDePartidasFindAll,
  listaDePartidasInProgressFalse,
  listaDePartidasInProgressTrue,
  newMatchRetorno,
  newMatchBody,
};
