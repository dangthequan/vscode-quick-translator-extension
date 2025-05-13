export default class CharRange {
    private startIndex: number;
    private length: number;

    getStartIndex(): number {
        return this.startIndex;
    }

    setStartIndex(value: number) {
        this.startIndex = value;
    }

    getLength(): number {
        return this.length;
    }

    setLength(value: number) {
        this.length = value;
    }

    constructor(startIndex: number, length: number) {
        this.startIndex = startIndex;
        this.length = length;
    }

    isInRange(index: number): boolean {
        return this.startIndex <= index && index <= this.startIndex + this.length - 1;
    }

    getEndIndex(): number {
        return this.startIndex + this.length - 1;
    }
}

