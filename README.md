
# Number to String Conversion

This repository provides a utility for converting numbers into their written form in multiple languages. It supports various locales and allows the user to define a default locale for the conversion.

## Features

- Convert numbers to words in multiple languages.
- Supports localization for several languages (e.g., English, Arabic, French, German, Spanish, Turkish, Persian).
- Handles decimal and negative numbers.
- Customizable locale definitions for fine-grained control over the formatting.

## Installation

You can install the script via npm:

```bash
npm install number-to-word
```

or using yarn:

```bash
yarn add number-to-word
```
Alternatively, include it in your project directly.

## Usage
### Setting the Default Locale
To start using the script, you need to set a default locale. This can be done using the setDefaultLocale function.

```typescript
import { setDefaultLocale, Locales } from 'path-to-your-script';

// Set the default locale to English
await setDefaultLocale(Locales.EN);

```
### Converting Numbers to Words
Once the locale is set, you can use the `numberToString` function to convert numbers into their written form.

```typescript
import { numberToString } from 'path-to-your-script';

const result = numberToString(1234.56);
console.log(result); // Output will depend on the default locale

```
### Available Locales
The available locales are defined in the `Locales` enum:
```typescript
export enum Locales {
    FA = "fa", // Persian
    EN = "en", // English
    AR = "ar", // Arabic
    FR = "fr", // French
    DE = "de", // German
    ES = "es", // Spanish
    TR = "tr", // Turkish
}
```
To use a specific locale, pass the corresponding Locales enum value to the setDefaultLocale function.

### Custom Locale Files
The locales are loaded dynamically from separate JSON files, and you can modify or add new locales by editing or creating the appropriate `.json` files within the `locales` directory. Each locale should follow the structure defined in the `Locale` interface.
```json
{
    "delimiter": " ",
    "zero": "zero",
    "negative": "minus",
    "letters": [
        ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
        ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
        ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
        ["hundred"]
    ],
    "decimalSuffixes": ["point"]
}
```
### Handling Negative Numbers and Decimals
- `Negative numbers`: The script will prepend the locale’s `negative` string when the number is negative.
- `Decimal numbers`: Decimal parts are appended after the whole number with a separator, typically `"."`, followed by the decimal digits as words.

### Error Handling
If you attempt to call `numberToString` without setting a default locale, an error will be thrown:
```text
Error: Locale is not set. Please set a default locale using setDefaultLocale.
```
If you pass an unsupported locale to `setDefaultLocale`, an error will also be thrown:
```text
Error: Locale <locale> is not supported.
```

## Locale Configuration
The `Locale` interface defines how the locale-specific data should be structured:
```typescript
export interface Locale {
    delimiter: string; // Character separating parts of the number (e.g., " " for space)
    zero: string; // Word for zero
    negative: string; // Word for negative numbers
    letters: string[][]; // Word representations for single digits, tens, hundreds, etc.
    decimalSuffixes: string[]; // Words for decimal parts
}

```
## Contributing
Feel free to fork this repository and contribute by adding new locales or improving the existing code.

## License

This project is licensed under the MIT License. See the LICENSE file for details.