## TLDR

Extensible, customizable SVG powered React Charts. With some default [**variants**](https://polmoneys.github.io/charts/)

## Getting started

Paste **Chart** folder into your project. Use `<Chart/>`component and provide some datum. Customize further with **options** prop.

```jsx

 interface ChartProps {
    datum: Values;
    options?: Options;
}

const initialOptions: Options = {
    about: {
        source: '',
        title: '',
    },
    axis: {
        labelX: '',
        labelY: '',
    },
    svg: {
        height: '80',
        left: '0',
        viewBox: { x: '0', y: '2' },
        width: '80',
    },
    stroke: {
        color: 'blue',
        width: 1,
    },
    theme: {
        areaBg: 'rgb(227, 255, 168)',
        chartBg: 'rgba(0,0,0,.1)',
        ui: {
            bg: 'rgb(227, 255, 168)',
            color: '#222',
        },
        legend: true,
        minValues: 10,
        round: true,
        shades: ['rgba(69, 255, 188,1)', 'rgba(227, 255, 168,1)'], 
        topSpace: 10,
        median: false,
    },
    variant: 'line',
};


const colorsOptions = {
    ...initialOptions,
    stroke: {
        ...initialOptions.stroke,
        width: 3,
    },
};

    <section>
        {variantNames
            .filter((variant) => variant !== 'bar')
            .map((variant) => (
                <Chart
                    datum={variant === 'series' ? STOCKS_SERIES : STOCKS}
                    key={variant.trim().toLowerCase()}
                    options={{ ...colorsOptions, variant }}
                />
            ))}
    </section>

```

### Inspiration 💐

> Our requirements are more modest but at the same time more responsible: 
> buildings, furniture, drinking glasses may well be consumer items that 
> we can destroy without regret after they have served for some short or 
> long period, but while we use them we expect them to fullfill their role and serve us perfectly, so perfectly that we can also derive aesthetic 
> enjoyment from observing them in use. 

Erik Gunnar Asplund on **Swedish Grace**.

### Author 

@polmoneys 


