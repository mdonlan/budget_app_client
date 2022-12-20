export enum Time_Period {
    DAY,
    WEEK,
    MONTH,
    YEAR
}

export interface Week {
    start: Date;
    end: Date;
    expenses: number;
    income: number;
    name: string; // first, second, etc
};