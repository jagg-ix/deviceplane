import React, { useMemo } from 'react';
import moment from 'moment';

import { useRequest, endpoints } from '../api';
import Layout from '../components/layout';
import Card from '../components/card';
import Table from '../components/table';
import { Column, Text } from '../components/core';

const Applications = ({
  route: {
    data: { params },
  },
}) => {
  const { data: applications } = useRequest(
    endpoints.applications({ projectId: params.project })
  );

  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      {
        Header: 'Services',
        accessor: 'latestRelease.config',
        Cell: ({ cell: { value: config } }) =>
          config ? (
            <Column>
              {Object.keys(config).map(name => (
                <Text>{name}</Text>
              ))}
            </Column>
          ) : (
            '-'
          ),
      },
      {
        Header: 'Scheduling',
        accessor: ({ schedulingRule: { scheduleType } }) =>
          scheduleType === 'AllDevices'
            ? 'All devices'
            : scheduleType === 'NoDevices'
            ? 'No devices'
            : 'Conditional',
      },
      {
        Header: 'Last Release',
        accessor: 'latestRelease.createdAt',
        Cell: ({ cell: { value } }) => (
          <Text>{value ? moment(value).fromNow() : '-'}</Text>
        ),
      },
      {
        Header: 'Devices',
        accessor: 'deviceCounts.allCount',
        maxWidth: '100px',
        minWidth: '100px',
      },
    ],
    []
  );

  return (
    <Layout alignItems="center">
      <Card
        title="Applications"
        size="xxlarge"
        actions={[{ title: 'Create Application', href: 'create' }]}
      >
        <Table
          columns={columns}
          data={applications}
          rowHref={({ name }) => `/${params.project}/applications/${name}`}
          placeholder={
            <Text>
              There are no <strong>Applications</strong>.
            </Text>
          }
        />
      </Card>
    </Layout>
  );
};

export default Applications;
