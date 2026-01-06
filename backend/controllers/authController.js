import * as AuthService from '../service/authService.js';

export const login = async (req, res) => {
  const result = await AuthService.login(req.body.email, req.body.password);
  res.json(result);
};

export const selectCompany = async (req, res) => {
  const result = await AuthService.selectCompany(
    req.user.userId,
    req.body.companyId
  );
  res.json(result);
};