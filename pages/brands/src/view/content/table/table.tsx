import { BrandEntity } from '@library/domain';
import { Table as TableComponent } from '@sellgar/kit';
import { BrandModifyFrame } from '@frame/brand-modify';
import { useFrame } from '@tiyn/app';

import React from 'react';

import { Name } from './name';
import { Info } from './info';

interface IProps {
  data: BrandEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  const brandModifyFrame = useFrame(BrandModifyFrame);

  return (
    <TableComponent
      data={{ nodes: props.data }}
      surface="embedded"
      layout={{ scroll: 'external', stickyHeader: true }}
      row={{
        handlers: {
          click: ({ row }) => void brandModifyFrame.open({ uuid: row.uuid }),
        },
      }}
    >
      {({ Column }) => (
        <>
          <Column width={600}>
            {({ Head, Cell }) => (
              <>
                <Head label={'Наименование'} />
                <Cell>
                  <Name />
                </Cell>
              </>
            )}
          </Column>
          <Column>
            {({ Head, Cell }) => (
              <>
                <Head label={'Описание'} />
                <Cell>
                  <Info />
                </Cell>
              </>
            )}
          </Column>
        </>
      )}
    </TableComponent>
  );
};
