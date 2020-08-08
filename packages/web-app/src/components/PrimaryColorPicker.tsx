import * as colors from '@material-ui/core/colors'
import Radio from '@material-ui/core/Radio'
import Slider from '@material-ui/core/Slider'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import CheckIcon from '@material-ui/icons/Check'
import React from 'react'

interface Props {
  defaultColor?: string | null
  onChange: (color: string) => void
}

const hues = Object.keys(colors).slice(1, 17) // missing: "brown", "grey", "blueGrey"
const shades = [
  900,
  800,
  700,
  'A700',
  600,
  500,
  400,
  'A400',
  300,
  200,
  'A200',
  100,
  'A100',
  50,
]

const useStyles = makeStyles((theme) => ({
  radio: {
    padding: 0,
  },
  radioIcon: {
    width: 48,
    height: 48,
  },
  radioIconSelectedWhite: {
    width: 48,
    height: 48,
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioIconSelectedBlack: {
    width: 48,
    height: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swatch: {
    width: 192,
  },
  sliderContainer: {
    width: 192,
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  slider: {
    width: 'calc(100% - 40px)',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
  },
}))

// map of color to hue, shade
interface ColorToHueShadeItem {
  hue: string
  shadeIndex: number
}
let colorToHueShadeMap: Map<string, ColorToHueShadeItem> | null = null
const buildColorToHueShadeMap = () => {
  if (!colorToHueShadeMap) {
    colorToHueShadeMap = new Map()
    for (let hue of hues) {
      let shadeIndex = 0
      for (let shade of shades) {
        // @ts-ignore
        const color = colors[hue][shade]
        colorToHueShadeMap.set(color, { hue, shadeIndex })
        shadeIndex++
      }
    }
  }
}
function hueFromColor(color: string) {
  buildColorToHueShadeMap()
  const hueShade = colorToHueShadeMap?.get(color)
  return hueShade ? hueShade.hue : 'blue'
}
function shadeFromColor(color: string) {
  buildColorToHueShadeMap()
  const hueShade = colorToHueShadeMap?.get(color)
  return hueShade ? hueShade.shadeIndex : 5
}

export default function PrimaryColorPicker({ defaultColor, onChange }: Props) {
  const classes = useStyles()
  const [selectedHue, setSelectedHue] = React.useState(
    hueFromColor(defaultColor ? defaultColor : '#2196f3')
  )
  const [selectedShadeIndex, setSelectedShadeIndex] = React.useState(
    shadeFromColor(defaultColor ? defaultColor : '#2196f3')
  )

  return (
    <React.Fragment>
      <div className={classes.sliderContainer}>
        <Typography id={'ShadeSliderLabel'}>Shade:</Typography>
        <Slider
          className={classes.slider}
          value={selectedShadeIndex}
          min={0}
          max={13}
          step={1}
          onChange={(e, shadeIndex) => {
            // @ts-ignore
            onChange(colors[selectedHue][shades[shadeIndex]])
            // @ts-ignore
            setSelectedShadeIndex(shadeIndex)
          }}
          aria-labelledby={'ShadeSliderLabel'}
        />
      </div>
      <div className={classes.swatch}>
        {hues.map((hue) => {
          // @ts-ignore
          const backgroundColor = colors[hue][shades[selectedShadeIndex]]
          return (
            <Tooltip placement="right" title={hue} key={hue}>
              <Radio
                className={classes.radio}
                color="default"
                checked={
                  // @ts-ignore
                  colors[selectedHue][shades[selectedShadeIndex]] ===
                  backgroundColor
                }
                data-testid={hue}
                onChange={(e) => {
                  onChange(
                    // @ts-ignore
                    colors[e.target.value][shades[selectedShadeIndex]]
                  )
                  setSelectedHue(e.target.value)
                }}
                value={hue}
                aria-labelledby={`tooltip-${hue}`}
                icon={
                  <div
                    className={classes.radioIcon}
                    style={{ backgroundColor }}
                  />
                }
                checkedIcon={
                  <div
                    className={
                      (selectedShadeIndex >= 6 && selectedShadeIndex <= 9) ||
                      selectedShadeIndex === 13
                        ? classes.radioIconSelectedBlack
                        : classes.radioIconSelectedWhite
                    }
                    style={{ backgroundColor }}
                  >
                    <CheckIcon style={{ fontSize: 30 }} />
                  </div>
                }
              />
            </Tooltip>
          )
        })}
      </div>
    </React.Fragment>
  )
}
