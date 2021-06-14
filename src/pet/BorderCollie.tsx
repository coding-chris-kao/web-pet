import { Component, CSSProperties } from 'react'
import BorderCollieImg1 from '../assets/border-collie-1.gif'
import '../assets/dialog-bubble.scss'
import { random, randomInt } from '../utils/random'
import './border-collie.scss'
import { getLines } from './lines'

export interface BorderCollieProps {
  name: string
  birthDay: Date
}

export interface BorderCollieState {
  location: [number, number]
  flip: boolean
  showDialog: boolean
}

export interface Possibilities {
  activity: number
  bark: number
}

export class BorderCollie extends Component<
  BorderCollieProps,
  BorderCollieState
> {
  private timerId: NodeJS.Timeout | null = null
  private timerPeriod = 1000
  private barkTimeout: NodeJS.Timeout | null = null
  private padding = 200
  private possibilities: Possibilities = {
    activity: 0.7,
    bark: 0.5,
  }
  private maxMoveDistance = 200
  private lines: string[] = []
  private currLine = this.getLine()

  constructor(props: BorderCollieProps) {
    super(props)
    this.state = {
      location: this.getRandomLocation([this.padding, this.padding]),
      flip: false,
      showDialog: false,
    }
    this.lines = getLines(props)
  }

  private get movePossibility() {
    return this.possibilities.activity
  }

  private getLine() {
    return this.lines[randomInt(this.lines.length)]
  }

  public componentDidMount() {
    this.timerId = setInterval(() => {
      this.tick()
    }, this.timerPeriod)
  }

  public componentWillUnmount() {
    clearInterval(this.timerId!)
    clearTimeout(this.barkTimeout!)
  }

  private tick() {
    this.walkAround()
    if (random(1) < this.possibilities.bark) {
      this.bark()
    }
  }

  public reproduce(): BorderCollie {
    return new BorderCollie({
      name: `${this.props.name} Junior`,
      birthDay: new Date(),
    })
  }

  private getRandomLocation(location: [number, number]): [number, number] {
    const maxWidth = window.innerWidth - 2 * this.padding
    const maxHeight = window.innerHeight - 2 * this.padding
    let width =
      location[0] + random(this.maxMoveDistance * 2) - this.maxMoveDistance
    let height =
      location[1] + random(this.maxMoveDistance * 2) - this.maxMoveDistance

    if (width > maxWidth) {
      width = maxWidth
    } else if (width < this.padding) {
      width = this.padding
    }
    if (height > maxHeight) {
      height = maxHeight
    } else if (height < this.padding) {
      height = this.padding
    }
    return [width, height]
  }

  private walkAround() {
    const chance = random(1)
    if (chance < this.movePossibility) {
      this.setState((state) => {
        const newLocation = this.getRandomLocation(state.location)
        return {
          location: newLocation,
          flip: newLocation[0] < state.location[0],
        }
      })
    }
  }

  private bark() {
    this.currLine = this.currLine ? this.currLine : this.getLine()
    this.setState({ showDialog: true })
    if (this.barkTimeout) return
    this.barkTimeout = setTimeout(() => {
      this.setState({ showDialog: false })
      this.currLine = ''
      clearTimeout(this.barkTimeout!)
      this.barkTimeout = null
    }, 2000)
  }

  public poop() {}

  public jump() {}

  public shakeButt() {}

  public shakeHand() {}

  public stand() {}

  public sit() {}

  public sleep() {}

  public render() {
    const styleObject: CSSProperties = {
      left: this.padding + this.state.location[0],
      top: this.padding + this.state.location[1],
    }

    const imgStyle: CSSProperties = {
      transform: `scaleX(${this.state.flip ? -1 : 1})`,
    }

    const dialogStyle: CSSProperties = {
      opacity: this.state.showDialog ? 1 : 0,
    }

    return (
      <div
        className="border-collie-wrapper"
        style={styleObject}
        onClick={() => this.bark()}
      >
        <div className="dialog-bubble" style={dialogStyle}>
          {this.currLine}
        </div>
        <img src={BorderCollieImg1} alt={this.props.name} style={imgStyle} />
      </div>
    )
  }
}
