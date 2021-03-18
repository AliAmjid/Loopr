import { Column } from 'material-table';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const exportPDF = (columns: Column<any>[], data: any[]): void => {
  const filteredColumns: {
    field?: string;
    title: string;
    lookup?: Record<any, any>;
    render?: (row: any, type: 'row' | 'group') => any | undefined;
  }[] = [];

  columns.forEach(column => {
    if (typeof column.title === 'string' && !column.hidden) {
      filteredColumns.push({
        field: column.field as string | undefined,
        title: column.title,
        lookup: column.lookup,
        render: column.render,
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
                if (typeof field === 'string') {
                  const fieldSteps = field.split('.');
                  value = row;
                  fieldSteps.forEach(step => {
                    if (value) value = value[step];
                  });
                }

                if (c.lookup) {
                  value = c.lookup[value];
                }
                if (c.render) {
                  value = c.render(row, 'row');
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
