# num-to-string-locale

`num-to-string-locale` is a lightweight TypeScript package that converts numbers to their string representation in multiple languages. The package supports lazy loading of locale files, ensuring optimal performance.

## Features

- Converts numbers to words in multiple languages.
- Supports negative numbers and decimal points.
- Includes lazy loading for locale files.
- Extensible and easy to use.

## Installation

Install the package using npm:

```bash
npm install num-to-string-locale
```

or using yarn:

```bash
yarn add num-to-string-locale
```

## Supported Languages

The following languages are supported:

- English (`Locales.EN`)
- Persian (`Locales.FA`)
- Arabic (`Locales.AR`)
- French (`Locales.FR`)
- German (`Locales.DE`)
- Spanish (`Locales.ES`)
- Turkish (`Locales.TR`)

## Usage

### Importing the Function

The `numberToString` function is the main method to convert numbers to words. Use it with a specified locale.

### Example Code

```typescript
import { numberToString, Locales } from "num-to-string-locale";

(async () => {
    // Convert numbers to words in English
    console.log(await numberToString(1234567, Locales.EN)); // "one million two hundred thirty-four thousand five hundred sixty-seven"

    // Convert numbers to words in Persian
    console.log(await numberToString(1234567, Locales.FA)); // "یک میلیون دویست و سی و چهار هزار پانصد و شصت و هفت"

    // Convert negative numbers
    console.log(await numberToString(-123, Locales.AR)); // "سالب مائة وثلاثة وعشرون"

    // Convert decimal numbers
    console.log(await numberToString(123.45, Locales.FR)); // "cent vingt-trois virgule quarante-cinq"
})();
```

### Lazy Loading of Locale Files

Locale files are dynamically imported to optimize performance. This ensures that only the necessary files are loaded when a specific locale is used.

## API Reference

### `numberToString(input: number | string, localeKey: Locales): Promise<string>`

- **`input`**: The number or numeric string to be converted.
- **`localeKey`**: A locale key from the `Locales` enum.

Returns a `Promise<string>` containing the number's string representation in the specified language.

### Enum: `Locales`

| Key | Description |
| --- | ----------- |
| `Locales.FA` | Persian |
| `Locales.EN` | English |
| `Locales.AR` | Arabic |
| `Locales.FR` | French |
| `Locales.DE` | German |
| `Locales.ES` | Spanish |
| `Locales.TR` | Turkish |

## Development

### Running Locally

Clone the repository and install dependencies:

```bash
git clone https://github.com/devzarghami/num-to-locale-string
cd num-to-string-locale
npm install
```

### Build the Package

```bash
npm run build
```

### Run Tests

```bash
npm test
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests on the [GitHub repository](https://github.com/devzarghami/num-to-locale-string).

## License

This project is licensed under the MIT License. See the LICENSE file for details.

