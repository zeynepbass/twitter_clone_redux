import * as authService from './auth.service.js';

export const register = async (req, res) => {
  res.status(201).json(await authService.register(req.valid.body));
};

export const login = async (req, res) => {
  res.json(await authService.login(req.valid.body));
};

export const loginAdmin = async (req, res) => {
  res.json(await authService.loginAdmin(req.valid.body));
};

export const me = async (req, res) => {
  res.json(await authService.getCurrentUser(req.user));
};
