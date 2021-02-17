import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import type { Instance } from 'twind'
import type { VirtualSheet } from 'twind/sheets'

import { create } from 'twind'
import { virtualSheet } from 'twind/sheets'
import { aspectRatio } from '.'

const test = suite<{
  sheet: VirtualSheet
  tw: Instance['tw']
}>('@twind/aspect-ratio')

test.before((context) => {
  context.sheet = virtualSheet()
  const { tw } = create({
    sheet: context.sheet,
    mode: 'strict',
    preflight: false,
    prefix: false,
    plugins: {
      aspect: aspectRatio,
    },
  })
  context.tw = tw
})

test.after.each(({ sheet }) => {
  sheet.reset()
})

test('using directive', ({ tw, sheet }) => {
  assert.is(tw(aspectRatio(16, 9)), 'tw-1sfq0fj aspect-ratio')
  assert.equal(sheet.target, [
    '.aspect-ratio>*{position:absolute;height:100%;width:100%;top:0px;right:0px;bottom:0px;left:0px}',
    '.aspect-ratio{position:relative;padding-bottom:calc(var(--tw-aspect-h)/var(--tw-aspect-w)*100%)}',
    '.tw-1sfq0fj{--tw-aspect-w:16;--tw-aspect-h:9}',
  ])

  sheet.reset()

  assert.is(tw(aspectRatio('none')), 'tw-lqatbl')
  assert.equal(sheet.target, [
    '.tw-lqatbl>*{position:static;height:auto;width:auto;top:auto;right:auto;bottom:auto;left:auto}',
    '.tw-lqatbl{position:static;padding-bottom:0px}',
  ])

  sheet.reset()

  assert.is(tw(aspectRatio('1.85/1')), 'tw-mikpg4 aspect-ratio')
  assert.equal(sheet.target, [
    '.aspect-ratio>*{position:absolute;height:100%;width:100%;top:0px;right:0px;bottom:0px;left:0px}',
    '.aspect-ratio{position:relative;padding-bottom:calc(var(--tw-aspect-h)/var(--tw-aspect-w)*100%)}',
    '.tw-mikpg4{--tw-aspect-w:1.85;--tw-aspect-h:1}',
  ])

  sheet.reset()

  assert.is(tw(aspectRatio({ w: 3, h: 2 })), 'tw-gy87d0 aspect-ratio')
  assert.equal(sheet.target, [
    '.aspect-ratio>*{position:absolute;height:100%;width:100%;top:0px;right:0px;bottom:0px;left:0px}',
    '.aspect-ratio{position:relative;padding-bottom:calc(var(--tw-aspect-h)/var(--tw-aspect-w)*100%)}',
    '.tw-gy87d0{--tw-aspect-w:3;--tw-aspect-h:2}',
  ])

  sheet.reset()

  assert.is(tw(aspectRatio(4, 3)), 'tw-vvqhtr aspect-ratio')
  assert.equal(sheet.target, [
    '.aspect-ratio>*{position:absolute;height:100%;width:100%;top:0px;right:0px;bottom:0px;left:0px}',
    '.aspect-ratio{position:relative;padding-bottom:calc(var(--tw-aspect-h)/var(--tw-aspect-w)*100%)}',
    '.tw-vvqhtr{--tw-aspect-w:4;--tw-aspect-h:3}',
  ])
})

test('using plugin', ({ tw, sheet }) => {
  assert.is(
    tw`aspect-w-16 aspect-h-9 lg:aspect-none`,
    'aspect-w-16 aspect-h-9 aspect-ratio lg:aspect-none',
  )
  assert.equal(sheet.target, [
    '.aspect-ratio>*{position:absolute;height:100%;width:100%;top:0px;right:0px;bottom:0px;left:0px}',
    '.aspect-ratio{position:relative;padding-bottom:calc(var(--tw-aspect-h)/var(--tw-aspect-w)*100%)}',
    '.aspect-w-16{--tw-aspect-w:16}',
    '.aspect-h-9{--tw-aspect-h:9}',
    '@media (min-width:1024px){.lg\\:aspect-none>*{position:static;height:auto;width:auto;top:auto;right:auto;bottom:auto;left:auto}}',
    '@media (min-width:1024px){.lg\\:aspect-none{position:static;padding-bottom:0px}}',
  ])

  sheet.reset()

  assert.is(tw`aspect-4/3`, 'aspect-4/3 aspect-ratio')
  assert.equal(sheet.target, [
    '.aspect-ratio>*{position:absolute;height:100%;width:100%;top:0px;right:0px;bottom:0px;left:0px}',
    '.aspect-ratio{position:relative;padding-bottom:calc(var(--tw-aspect-h)/var(--tw-aspect-w)*100%)}',
    '.aspect-4\\/3{--tw-aspect-w:4;--tw-aspect-h:3}',
  ])

  sheet.reset()

  assert.is(tw`aspect-1.85-1`, 'aspect-1.85-1 aspect-ratio')
  assert.equal(sheet.target, [
    '.aspect-ratio>*{position:absolute;height:100%;width:100%;top:0px;right:0px;bottom:0px;left:0px}',
    '.aspect-ratio{position:relative;padding-bottom:calc(var(--tw-aspect-h)/var(--tw-aspect-w)*100%)}',
    '.aspect-1\\.85-1{--tw-aspect-w:1.85;--tw-aspect-h:1}',
  ])

  sheet.reset()

  // Tagged class is accepted - shim would end in infinite loop
  assert.is(tw`aspect-ratio`, 'aspect-ratio')
  assert.equal(sheet.target, [
    '.aspect-ratio>*{position:absolute;height:100%;width:100%;top:0px;right:0px;bottom:0px;left:0px}',
    '.aspect-ratio{position:relative;padding-bottom:calc(var(--tw-aspect-h)/var(--tw-aspect-w)*100%)}',
  ])
})

test.run()
