const conditionSelectBlock = (range, holdRange) => {
  if (
    (range?.x.start >= holdRange?.x.start &&
      range?.x.end <= holdRange?.x.end &&
      range?.y.start >= holdRange?.y.start &&
      range?.y.end <= holdRange?.y.end) ||
    (((range?.x.start <= holdRange?.x.start &&
      range?.x.end >= holdRange?.x.start) ||
      (range?.x.start <= holdRange?.x.end &&
        range?.x.end >= holdRange?.x.end)) &&
      range?.y.end >= holdRange?.y.start &&
      range?.y.start <= holdRange?.y.end) ||
    (((range?.y.start <= holdRange?.y.start &&
      range?.y.end >= holdRange?.y.start) ||
      (range?.y.start <= holdRange?.y.end &&
        range?.y.end >= holdRange?.y.end)) &&
      range?.x.end >= holdRange?.x.start &&
      range?.x.start <= holdRange?.x.end) ||
    (range?.y.start <= holdRange?.y.start &&
      range?.y.end >= holdRange?.y.end &&
      range?.x.start <= holdRange?.x.start &&
      range?.x.end >= holdRange?.x.end)
  ) {
    return true
  }
  return false
}

export { conditionSelectBlock }
