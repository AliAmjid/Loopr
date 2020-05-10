import { MarkingSchema, SubColumn } from '../types';

const findSubColumnByName = (
  name: string,
  markingSchema: MarkingSchema,
): SubColumn => {
  let wantedSubColumn: SubColumn;
  markingSchema.testColumns.forEach(column => {
    if (!wantedSubColumn) {
      column.subColumns.forEach(subColumn => {
        if (subColumn.name === name && !wantedSubColumn) {
          wantedSubColumn = subColumn;
        }
      });
    }
  });

  return wantedSubColumn;
};

export default findSubColumnByName;
