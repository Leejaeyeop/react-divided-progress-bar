# react-divided-progress-bar

[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&r=r&ts=1683906897&type=6e&v=0.18.14.2&x2=0)][npm_url]
[![license](https://img.shields.io/badge/license-MIT-blue)][npm_url]

[npm_url]: https://www.npmjs.com/package/react-divided-progress-bar

A progress-bar which has divided section based on React.js

![화면 기록 2023-10-29 오후 9 06 29](https://github.com/Leejaeyeop/react-divided-progress-bar/assets/93045720/e7321d21-af32-4dfc-a7d7-dbc2eda9d27f)

## Installation
npm:

```bash
npm install --save react-divided-progress-bar
```

## Usage

### Example

```tsx
import ProgressBar from "react-divided-progress-bar"
import { useState } from 'react';

export default function App() {
    const [number, setNumber] = useState(90);
    return  (
        <div style={{width: "50%"}}>
            <ProgressBar 
                value={number}
                sections={5}
                maxValue={100}
                color="primary"
                animated
                stripped
                colorChange
            />
        </div>
    )
}
```
## Available PropTypes, and Default Values

### `value & maxValue`
`value` means your current value; the default is `0`.  
`maxValue` means your maximum value is 100%; the default is '100'.

### `increaseDuration`
`increaseDuration` means microseconds to reach your value. The default is '1000'.

### `divide & sections`
`divide` means using divde funcion. If you set it to 'false', the dividing section will disappear. The default is 'true'.   
`sections` means how many sections you want. The default is '2'. If you set `divide` to false, this will not be applied.

### `color`
`color` is referenced by "bootstrap" and "react MUI". so there are serveral color tokens. the dafault is `primary`

```
primary   
secondary   
info   
success   
warning   
danger   
black   
```

### `animated & stripped & colorChange`
`animated` and `stripped`'s default is 'false'.   
`colorChange` means color will be gradually changed based on progress rate. The default is 'false'.
