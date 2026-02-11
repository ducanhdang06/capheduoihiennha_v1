import { ROLES } from "../constants/Roles";

const ROLE_PRIORITY = {
  [ROLES.MANAGER]: 1,
  [ROLES.ADMIN]: 2,
};

export function hasMinRole(user, minRole) {
  if (!user) return false;
  return ROLE_PRIORITY[user.role] >= ROLE_PRIORITY[minRole];
}

export function isAdmin(user) {
  return user?.role === ROLES.ADMIN;
}

export function isManager(user) {
  return (
    user?.role === ROLES.MANAGER ||
    user?.role === ROLES.ADMIN
  );
}
