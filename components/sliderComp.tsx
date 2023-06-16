import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import styled from "@emotion/styled";

const marks = [
  {
    value: 0,
    label: "0%",
  },
  {
    value: 30,
    label: "30%",
  },

  {
    value: 98,
    label: "100%",
  },
];

function valuetext(value: number) {
  return `${value}%`;
}

const PrettoSlider = styled(Slider)({
    color: '#91D5FF',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 15,
      width: 15,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#F5F5F5',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });
export default function SliderComp() {
  return (
    <Box sx={{ width: 300 }}>
      <PrettoSlider
        aria-label="Custom marks"
        defaultValue={30}
        getAriaValueText={valuetext}
        step={10}
        // valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}
