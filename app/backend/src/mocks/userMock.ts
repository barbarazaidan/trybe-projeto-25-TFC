const user = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
};

const emailValido = 'user@user.com';

const bodyValido = {
  email: emailValido,
  password: 'secret_user',
};

const bodySemEmail = {
  email: '',
  password: 'secret_user',
};

const bodySemSenha = {
  email: emailValido,
  password: '',
};

const bodyComEmailInvalido = {
  email: 'user.user.com',
  password: 'secret_user',
};

const bodyComSenhaInvalida = {
  email: emailValido,
  password: 'secre',
};

const bodyComEmailInexistente = {
  email: 'babi@userController.com',
  password: 'secret_user',
};

const bodyComPasswordInexistente = {
  email: 'babi@userController.com',
  password: 'secret_us',
};

export {
  user,
  bodyValido,
  bodySemEmail,
  bodySemSenha,
  bodyComEmailInvalido,
  bodyComSenhaInvalida,
  bodyComEmailInexistente,
  bodyComPasswordInexistente,
};
