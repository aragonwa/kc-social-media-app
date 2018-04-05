export function alphaSort(items) {
  items.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase())
      return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
  return items;
}
export function socialMediaPlatformSort(items){
  const platformOrder = ['twitter', 'facebook', 'instagram', 'linkedin', 'youtube'];
  items.sort((a, b) => {
    const compA = platformOrder.findIndex(order =>  a.type === order);
    const compB = platformOrder.findIndex(order =>  b.type === order);
    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
  });
  return items;
}