import { Column } from 'material-table';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const exportPDF = (columns: Column<any>[], data: any[]): void => {
  const filteredColumns: {
    field: string;
    title: string;
    lookup: Record<any, any>;
  }[] = [];
  columns.forEach(column => {
    if (typeof column.field === 'string' && typeof column.title === 'string') {
      filteredColumns.push({
        field: column.field,
        title: column.title,
        lookup: column.lookup,
      });
    }
  });

  const docDefinition = {
    content: [
      {
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: filteredColumns.map(() => 'auto'),

          body: [
            filteredColumns.map(c => c.title),
            ...data.map(row =>
              filteredColumns.map(c => {
                const { field } = c;

                let value: any = '';
                const fieldSteps = field.split('.');
                value = row;
                fieldSteps.forEach(step => {
                  console.log(value, step);
                  if (value) value = value[step];
                });

                if (c.lookup) {
                  value = c.lookup[value];
                }

                return value || '';
              }),
            ),
          ],
        },
      },
    ],
  };
  pdfMake.createPdf(docDefinition).download('export');
};

export default exportPDF;
