import * as usersService from './users.service.js';

export const list = async (_req, res) => {
  res.json(await usersService.listUsers());
};

export const show = async (req, res) => {
  res.json(await usersService.getUser(req.valid.params.id));
};

export const update = async (req, res) => {
  res.json(await usersService.updateUser(req.valid.params.id, req.valid.body));
};

export const remove = async (req, res) => {
  await usersService.deleteUser(req.valid.params.id);
  res.status(204).end();
};
