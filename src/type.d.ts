import Brand from '@lift/design-tokens/dist/interface/brand'
import Global from '@lift/design-tokens/dist/interface/globals'

export interface Theme extends Brand, Global { };

declare module '@emotion/react' {
    export interface Theme extends Brand, Global {};
}