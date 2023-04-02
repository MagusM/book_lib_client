type Func = (...args: any[]) => any;

export default function debounce<F extends Func>(func: F, delay: number): (...args: Parameters<F>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null;

    return function debounced(this: any, ...args: Parameters<F>) {
        const context = this;

        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}
