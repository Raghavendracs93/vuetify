import { Wrapper } from '@vue/test-utils'

export function functionalContext(context = {}, children = []) {
  if (!Array.isArray(children)) children = [children]
  return {
    context: Object.assign({
      data: {},
      props: {}
    }, context),
    children
  }
}

export { rafPolyfill } from './util/rafPolyfill'

export function touch(element: Wrapper<any>) {
  const createTrigger = (eventName: string) => (clientX: number, clientY: number) => {
    const touches = [{ clientX, clientY }]
    const event = new Event(eventName)

    ;(event as any).touches = touches
    ;(event as any).changedTouches = touches
    element.element.dispatchEvent(event)

    return touch(element)
  }

  return {
    start: createTrigger('touchstart'),
    move: createTrigger('touchmove'),
    end: createTrigger('touchend')
  }
}

export const resizeWindow = (width = window.innerWidth, height = window.innerHeight) => {
  ;(window as any).innerWidth = width
  ;(window as any).innerHeight = height
  window.dispatchEvent(new Event('resize'))
  return new Promise(resolve => setTimeout(resolve, 200))
}

export const scrollWindow = (y: number) => {
  (window as any).pageYOffset = y
  window.dispatchEvent(new Event('scroll'))

  return new Promise(resolve => setTimeout(resolve, 200))
}

import toHaveBeenWarnedInit from './util/to-have-been-warned'
toHaveBeenWarnedInit()
