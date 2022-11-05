import type * as Vue from 'vue'
import type { RuntimeFn, VariantGroups } from '@vanilla-extract/recipes/dist/declarations/src/types'
import { computed, defineComponent, h } from 'vue'
import type { IntrinsicElementAttributes } from './element-types'

type IntrinsicElementsKeys = keyof IntrinsicElementAttributes

type Component = Vue.Component | Vue.DefineComponent

type ExtractComponentProps<TComponent> =
  TComponent extends new () => {
    $props: infer P
  }
    ? P
    : never

export function styled<
  RecipeFn extends RuntimeFn<VariantGroups>,
  Type extends IntrinsicElementsKeys | Component,
>(
  tag: Type,
  recipeFn: RecipeFn,
) {
  type VariantProps = Parameters<RecipeFn>[0]
  type ElementProps = Type extends IntrinsicElementsKeys ? IntrinsicElementAttributes[Type]
    : Type extends Component ? ExtractComponentProps<typeof tag>
      : never

  const wrapper = defineComponent((props: Readonly<VariantProps & ElementProps>, { slots }) => {
    const classNames = computed(() => recipeFn(props as any))
    return () => h(tag as any, {
      class: classNames.value,
    }, slots)
  })

  return wrapper as typeof wrapper & {
    new (): {
      $slots: {
        default: (arg: VariantProps) => Vue.VNode[]
      }
    }
  }
}
