const todoSort = (a: TodoType, b: TodoType): number => {
  const aUpdatedAt = a.updated_at && new Date(a.updated_at).getTime();
  const bUpdatedAt = b.updated_at && new Date(b.updated_at).getTime();
  const aCreatedAt = new Date(a.created_at).getTime();
  const bCreatedAt = new Date(b.created_at).getTime();
  if (aUpdatedAt && bUpdatedAt) {
    return bUpdatedAt - aUpdatedAt;
  }
  if (aUpdatedAt) {
    return 1;
  } else if (bUpdatedAt) {
    return -1;
  }
  return aCreatedAt - bCreatedAt;
};

export { todoSort };
