import { expect } from 'chai'
import { BemHelper } from '../bem-helper'

describe('BemHelper', () => {
  it('prefixes classes with "oy-" (block)', () => {
    const bem = new BemHelper('block')
    const c = bem()
    expect(c.className).to.equal('oy-block')
  })

  it('prefixes classes with "oy-" (element)', () => {
    const bem = new BemHelper('block')
    const c = bem('element')
    expect(c.className).to.equal('oy-block__element')
  })

  it('prefixes classes with "oy-" (block modifier)', () => {
    const bem = new BemHelper('block')
    const c = bem(undefined, 'modifier')
    expect(c.className).to.equal('oy-block oy-block--modifier')
  })

  it('prefixes classes with "oy-" (element modifier)', () => {
    const bem = new BemHelper('block')
    const c = bem('element', 'modifier')
    expect(c.className).to.equal('oy-block__element oy-block__element--modifier')
  })
})
