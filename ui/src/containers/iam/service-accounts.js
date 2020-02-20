import React, { useMemo } from 'react';

import { useRequest, endpoints } from '../../api';
import Card from '../../components/card';
import Table from '../../components/table';
import { Text } from '../../components/core';

const ServiceAccounts = ({
  route: {
    data: { params },
  },
}) => {
  const { data: serviceAccounts } = useRequest(
    endpoints.serviceAccounts({ projectId: params.project })
  );

  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Description', accessor: 'description', maxWidth: '2fr' },
      {
        Header: 'Roles',
        accessor: 'roles',
        Cell: ({ cell: { value } }) => (
          <Text>{value.map(({ name }) => name).join(', ')}</Text>
        ),
      },
    ],
    []
  );

  return (
    <Card
      title="Service Accounts"
      size="xlarge"
      actions={[
        {
          href: `create`,
          title: 'Create service account',
        },
      ]}
    >
      <Table
        columns={columns}
        data={serviceAccounts}
        rowHref={({ name }) =>
          `/${params.project}/iam/service-accounts/${name}`
        }
        placeholder={
          <Text>
            There are no <strong>Service Accounts</strong>.
          </Text>
        }
      />
    </Card>
  );
};

export default ServiceAccounts;
