import { PropertyEntity } from '@library/domain';
import { Table as TableComponent } from '@sellgar/kit';
import { PropertyModifyFrame } from '@frame/property-modify';
import { useFrame } from '@tiyn/app';

import React from 'react';

import { Name } from './name';
import { Info } from './info';

import s from './default.module.scss';

interface IProps {
  data: PropertyEntity[];
}

export const Table: React.FC<IProps> = (props) => {
  const frame = useFrame(PropertyModifyFrame);

  return (
    <div className={s.wrapper}>
      <TableComponent
        data={{ nodes: props.data }}
        row={{
          handlers: {
            click: ({ row }) => void frame.open({ uuid: row.uuid }),
          },
        }}
      >
        {({ Column }) => (
          <>
            <Column>
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
    </div>
  );
};
