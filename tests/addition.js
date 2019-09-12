function addition(...terms) {
  return terms.reduce((total, term) => {
    if (typeof term !== 'number') throw new Error('Unsupported non-numeric addition')
    return term += total
  })
}