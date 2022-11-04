export default (size: number) => {
  if (size > 1024 * 1024) {
    return (size / (1024 * 1024)).toFixed(1) + 'Mb'
  } else if (size > 1024) {
    return (size / 1024).toFixed(1) + 'Kb'
  }
}
