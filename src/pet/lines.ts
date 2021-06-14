import moment from 'moment'
import { BorderCollieProps } from './BorderCollie'

const lines: string[] = [
  '呱！呱！',
  '寶貝最厲害！',
  '寶貝最可愛！',
  '肚子餓了～',
  '餵我吃東西啦！',
]

export function getLines(props: BorderCollieProps): string[] {
  return [
    `我是${props.name}!`,
    `我的生日是${moment(props.birthDay).format('YYYY-MM-DD')}`,
    ...lines,
  ]
}
