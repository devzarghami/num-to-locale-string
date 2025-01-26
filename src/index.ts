export enum Locales {
    FA = "fa",
    EN = "en",
    AR = "ar",
    FR = "fr",
    DE = "de",
    ES = "es",
    TR = "tr",
}

export interface Locale {
    delimiter: string;
    zero: string;
    negative: string;
    letters: string[][];
    decimalSuffixes: string[];
}

/**
 * A utility function to lazily load locale files.
 * @param locale - The locale to load.
 * @returns Promise<Locale>
 */
export const loadLocale = async (locale: Locales): Promise<Locale> => {
    switch (locale) {
        case Locales.FA:
            return await import("./locales/fa.json");
        case Locales.EN:
            return await import("./locales/en.json");
        case Locales.AR:
            return await import("./locales/ar.json");
        case Locales.FR:
            return await import("./locales/fr.json");
        case Locales.DE:
            return await import("./locales/de.json");
        case Locales.ES:
            return await import("./locales/es.json");
        case Locales.TR:
            return await import("./locales/tr.json");
        default:
            throw new Error(`Locale ${locale} is not supported.`);
    }
};

const prepareNumber = (num: number | string): string[] => {
    let out = num.toString();

    if (out.length % 3 === 1) {
        out = `00${out}`;
    } else if (out.length % 3 === 2) {
        out = `0${out}`;
    }

    return out.replace(/\d{3}(?=\d)/g, "$&*").split("*");
};

const tinyNumToWord = (num: string, locale: Locale): string => {
    const {letters, delimiter} = locale;

    if (parseInt(num, 10) === 0) {
        return "";
    }

    const parsedInt = parseInt(num, 10);

    if (parsedInt < 10) {
        return letters[0][parsedInt];
    }

    if (parsedInt <= 20) {
        return letters[1][parsedInt - 10];
    }

    if (parsedInt < 100) {
        const one = parsedInt % 10;
        const ten = Math.floor(parsedInt / 10);
        return one > 0 ? letters[2][ten] + delimiter + letters[0][one] : letters[2][ten];
    }

    const one = parsedInt % 10;
    const hundreds = Math.floor(parsedInt / 100);
    const ten = Math.floor((parsedInt % 100) / 10);

    const out = [letters[3][hundreds]];
    const secondPart = ten * 10 + one;

    if (secondPart === 0) {
        return out.join(delimiter);
    }

    if (secondPart < 10) {
        out.push(letters[0][secondPart]);
    } else if (secondPart <= 20) {
        out.push(letters[1][secondPart - 10]);
    } else {
        out.push(letters[2][ten]);
        if (one > 0) {
            out.push(letters[0][one]);
        }
    }

    return out.join(delimiter);
};

export const numberToString = async (input: number | string, localeKey: Locales): Promise<string> => {
    const locale = await loadLocale(localeKey);

    const {zero, negative, delimiter, letters} = locale;

    input = input.toString().replace(/[^0-9.-]/g, "");
    let isNegative = false;

    const floatParse = parseFloat(input);

    if (isNaN(floatParse)) {
        return zero;
    }

    if (floatParse === 0) {
        return zero;
    }

    if (floatParse < 0) {
        isNegative = true;
        input = input.replace(/-/g, "");
    }

    let decimalPart = "";
    let integerPart = input;
    const pointIndex = input.indexOf(".");
    if (pointIndex > -1) {
        integerPart = input.substring(0, pointIndex);
        decimalPart = input.substring(pointIndex + 1);
    }

    const slicedNumber = prepareNumber(integerPart);
    const out: string[] = [];

    for (let i = 0; i < slicedNumber.length; i++) {
        const converted = tinyNumToWord(slicedNumber[i], locale);
        if (converted !== "") {
            out.push(converted + letters[4][slicedNumber.length - (i + 1)]);
        }
    }

    if (decimalPart) {
        decimalPart = decimalPart.replace(/0*$/, "");
        if (decimalPart.length > 0) {
            return (
                (isNegative ? negative : "") +
                out.join(delimiter) +
                " point " +
                decimalPart
            );
        }
    }

    return (isNegative ? negative : "") + out.join(delimiter);
};
