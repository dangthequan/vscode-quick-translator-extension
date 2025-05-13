import _ from 'lodash';

export type Nullable<T> = T | undefined | null;

export type Map<V> = { [key: string]: V };

export const isNullOrEmpty = (value:any) => {
    return _.isNil(value) || _.isEmpty(value);
}