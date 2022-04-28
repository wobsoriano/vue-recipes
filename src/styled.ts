import type * as Vue from 'vue'
import type { RuntimeFn, VariantGroups } from '@vanilla-extract/recipes/dist/declarations/src/types'
import { computed, defineComponent, h } from 'vue'
import type {
  RecipeVariants,
} from '@vanilla-extract/recipes'
import type { IntrinsicElementAttributes } from './element-types'

type PublicProps = Vue.VNodeProps & Vue.AllowedComponentProps & Vue.ComponentCustomProps

type IntrinsicElementsKeys = keyof IntrinsicElementAttributes

type NonUndefinedable<T> = T extends undefined ? never : T
type TypePropsToRuntimeProps<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? {
    type: Vue.PropType<NonUndefinedable<T[K]>>
  } : {
    type: Vue.PropType<T[K]>
    required: true
  };
}

export type VariantsToProps<R extends RuntimeFn<VariantGroups>> = NonNullable<RecipeVariants<R>>

export function styled<
  RecipeFn extends RuntimeFn<VariantGroups>,
  Type extends IntrinsicElementsKeys | Vue.Component,
  PropsOrPropOptions = {},
  RawBindings = {},
  D = {},
  C extends Vue.ComputedOptions = Vue.ComputedOptions,
  M extends Vue.MethodOptions = Vue.MethodOptions,
  Mixin extends Vue.ComponentOptionsMixin = Vue.ComponentOptionsMixin,
  Extends extends Vue.ComponentOptionsMixin = Vue.ComponentOptionsMixin,
  E extends Vue.EmitsOptions = Record<string, any>,
  EE extends string = string,
  PP = PublicProps,
  Defaults = Vue.ExtractDefaultPropTypes<PropsOrPropOptions>,
>(
  tag: Type,
  recipeFn: RecipeFn
): Vue.DefineComponent<
  TypePropsToRuntimeProps<VariantsToProps<typeof recipeFn>>,
  RawBindings,
  D,
  C,
  M,
  Mixin,
  Extends,
  E,
  EE,
  PP,
  Readonly<Vue.ExtractPropTypes<TypePropsToRuntimeProps<VariantsToProps<typeof recipeFn>>> &
  (Type extends IntrinsicElementsKeys
    ? IntrinsicElementAttributes[Type]
    : {})>,
  Defaults
>

export function styled(
  tag: any,
  recipeFn: any,
) {
  return defineComponent({
    setup(_props, { attrs, slots }) {
      const classNames = computed(() => recipeFn(JSON.parse(JSON.stringify(attrs))))
      return () => h(tag, {
        class: classNames.value,
      }, slots)
    },
  })
}
