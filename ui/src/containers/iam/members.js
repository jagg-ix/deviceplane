import React, { useMemo } from 'react';

import { useRequest, endpoints } from '../../api';
import Card from '../../components/card';
import Table from '../../components/table';
import { Text } from '../../components/core';

const Members = ({
  route: {
    data: { params },
  },
}) => {
  const { data: members } = useRequest(
    endpoints.memberships({
      projectId: params.project,
    })
  );

  const columns = useMemo(
    () => [
      { Header: 'Email', accessor: 'user.email' },
      {
        Header: 'Name',
        accessor: ({ user: { firstName, lastName } }) =>
          `${firstName} ${lastName}`,
      },
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
      title="Members"
      size="xlarge"
      actions={[{ href: 'add', title: 'Add member' }]}
    >
      <Table
        columns={columns}
        data={members}
        rowHref={({ user: { id } }) => `/${params.project}/iam/members/${id}`}
        placeholder={
          <Text>
            There are no <strong>Members</strong>.
          </Text>
        }
      />
    </Card>
  );
};

export default Members;
