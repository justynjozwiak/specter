/**
 * INFO: function copied directly from Material UI
 * just do generate some colors for avatar since we
 * don't have company logo
 */
export const stringToColor =(string: string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(13)}`.slice(-2);
    }

    return color;
};
