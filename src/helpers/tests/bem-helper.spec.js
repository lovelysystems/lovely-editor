import { expect } from 'code'

import { BemHelper } from '../bem-helper'

describe('BemHelper', () => {
  it('prefixes classes with "ls-" (block)', () => {
    const bem = new BemHelper('block')
    const c = bem()
    expect(c.className).to.equal('ls-block')
  })

  it('prefixes classes with "ls-" (element)', () => {
    const bem = new BemHelper('block')
    const c = bem('element')
    expect(c.className).to.equal('ls-block__element')
  })

  it('prefixes classes with "ls-" (block modifier)', () => {
    const bem = new BemHelper('block')
    const c = bem(undefined, 'modifier')
    expect(c.className).to.equal('ls-block ls-block--modifier')
  })

  it('prefixes classes with "ls-" (element modifier)', () => {
    const bem = new BemHelper('block')
    const c = bem('element', 'modifier')
    expect(c.className).to.equal(
      'ls-block__element ls-block__element--modifier',
    )
  })
})
