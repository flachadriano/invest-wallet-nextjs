import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { Broker } from '@prisma/client';
import { Box, Button, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Title from '@/components/title';
import Link from 'next/link';
import { executeQueries } from '@/middlewares/db';
import deleteApi from '@/lib/delete-api';
import { useState } from 'react';

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  const brokers = await executeQueries((prisma) => {
    return prisma.broker.findMany({
      where: { userId: +session?.user?.id }
    });
  });
  return {
    props: {
      session,
      brokers
    }
  };
}

interface BrokersPageProps {
  brokers: Broker[]
}

export default function BrokersPage({ brokers }: BrokersPageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteAction = (id: number) => {
    setLoading(true);
    deleteApi(`/api/brokers/${id}`)
      .then(() => router.replace(router.asPath))
      .finally(() => setLoading(false));
  };
  
  const renderActions = (params: GridRenderCellParams<any>) => (
    <Box>
      <Link href={`brokers/${params.row.id}`}><Button><EditIcon /></Button></Link>
      <Button onClick={() => deleteAction(params.row.id)}><DeleteIcon /></Button>
    </Box>
  );
  
  const columns: GridColDef[] = [
    { field: 'acronym', headerName: 'Nome', width: 150 },
    { field: 'cnpj', headerName: 'CNPJ', width: 150 },
    { field: 'name', headerName: 'Razão Social', width: 150 },
    { field: '', headerName: 'Ações', width: 150, renderCell: renderActions },
  ];
  
  return (
    <>
      <Head>
        <title>Tá investido - Corretoras</title>
      </Head>
      <div>
        <Title>
          Corretoras
          <Button onClick={() => router.push('/brokers/new')} sx={{ ml: 2 }}>Adicionar</Button>
        </Title>

        <Box sx={{ height: '400px', width: '100%' }}>
          <DataGrid
            loading={loading}
            columns={columns}
            rows={brokers}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10, 25, 50, 100]}
            disableRowSelectionOnClick
            slots={{
              noRowsOverlay: () => (
                <Stack height="100%" alignItems="center" justifyContent="center">
                  Crie a primeira corretora clicando no botão Adicionar.
                </Stack>
              ),
            }}
          />
        </Box>
      </div>
    </>
  );
}
