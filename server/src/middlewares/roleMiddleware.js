module.exports = (requiredRole) => {
  return (req, res, next) => {
    // O authMiddleware já coloca as informações do usuário (incluindo o role) em req.user
    if (!req.user || !req.user.role) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    // Verifica se o papel do usuário é o mesmo requerido
    if (req.user.role !== requiredRole) {
      return res
        .status(403)
        .json({ message: "Acesso negado: Função insuficiente" });
    }

    next();
  };
};
